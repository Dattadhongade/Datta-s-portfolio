import React, { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, RotateCw, ChevronLeft, ChevronRight, Loader2, AlertCircle, ExternalLink } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

// Set worker to matching version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || "4.10.38"}/pdf.worker.min.mjs`;

const ActualPdfViewer = ({ pdfUrl }) => {
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [scale, setScale] = useState(1.15);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [useCloudinaryImage, setUseCloudinaryImage] = useState(false);
  const [error, setError] = useState(null);

  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  const isCloudinary = Boolean(pdfUrl && pdfUrl.includes("res.cloudinary.com"));
  const cloudinaryImageUrl = isCloudinary
    ? pdfUrl.replace(/\.pdf$/i, ".png")
    : null;

  // 1. Try Loading with PDF.js
  useEffect(() => {
    if (!pdfUrl) {
      setError("No PDF URL provided");
      setLoading(false);
      return;
    }

    let isCancelled = false;
    setLoading(true);
    setError(null);
    setUseCloudinaryImage(false);

    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/cmaps/",
          cMapPacked: true,
        });

        const doc = await loadingTask.promise;
        if (!isCancelled) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setPageNum(1);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          // If Cloudinary returns 401 or restricted delivery on raw .pdf, fall back to high-res image page
          if (isCloudinary) {
            console.log("PDF.js restricted, falling back to Cloudinary high-res page render:", err);
            setUseCloudinaryImage(true);
            setLoading(false);
          } else {
            console.error("PDF.js loading error:", err);
            setError("Failed to load PDF document. Please check the file URL.");
            setLoading(false);
          }
        }
      }
    };

    loadPdf();

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl, isCloudinary]);

  // 2. Render Page onto Canvas (when PDF.js succeeds)
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || useCloudinaryImage) return;

    let isCancelled = false;

    const renderPage = async () => {
      try {
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const page = await pdfDoc.getPage(pageNum);
        if (isCancelled) return;

        const viewport = page.getViewport({ scale, rotation });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");

        // High-DPI 2x crisp rendering
        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        const renderContext = {
          canvasContext: context,
          viewport,
          transform
        };

        const task = page.render(renderContext);
        renderTaskRef.current = task;
        await task.promise;
      } catch (err) {
        if (err?.name !== "RenderingCancelledException") {
          console.error("Page render error:", err);
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdfDoc, pageNum, scale, rotation, useCloudinaryImage]);

  const handlePrevPage = () => {
    setPageNum((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPageNum((prev) => Math.min(prev + 1, numPages));
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-950/90 rounded-xl overflow-hidden select-none">
      {/* PDF Controls Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-300 gap-2 shrink-0 flex-wrap">
        {/* Pagination (if multi-page) */}
        {!useCloudinaryImage && numPages > 1 ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevPage}
              disabled={pageNum <= 1 || loading}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-mono text-xs font-semibold px-1">
              Page {pageNum} of {numPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={pageNum >= numPages || loading}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
              title="Next Page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span>📄 Original Resume Document</span>
          </div>
        )}

        {/* Zoom & Rotation Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomOut}
            disabled={loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <span className="font-mono text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
          <button
            onClick={handleZoomIn}
            disabled={loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={handleRotate}
            disabled={loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer ml-1"
            title="Rotate Clockwise"
          >
            <RotateCw size={14} />
          </button>
        </div>
      </div>

      {/* Document Viewport */}
      <div className="flex-1 w-full overflow-auto p-4 sm:p-6 flex items-start justify-center min-h-0 bg-[#1e222d]">
        {loading && (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-cyan-400">
            <Loader2 size={32} className="animate-spin" />
            <p className="text-xs text-slate-300 font-medium">Loading uploaded PDF document...</p>
          </div>
        )}

        {error && !useCloudinaryImage && (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-rose-400 p-6 text-center max-w-md">
            <AlertCircle size={32} />
            <p className="text-sm font-semibold">{error}</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold"
            >
              Open Directly in New Tab
            </a>
          </div>
        )}

        {/* 1. Canvas Rendering (PDF.js) */}
        {!useCloudinaryImage && !loading && !error && (
          <div className="relative shadow-2xl rounded-lg overflow-hidden bg-white">
            <canvas ref={canvasRef} className="block max-w-full" />
          </div>
        )}

        {/* 2. Cloudinary High-Res Render (No 401 restrictions) */}
        {useCloudinaryImage && !loading && (
          <div
            className="relative shadow-2xl rounded-xl overflow-hidden bg-white transition-transform duration-200"
            style={{
              transform: `scale(${scale / 1.15}) rotate(${rotation}deg)`,
              transformOrigin: "top center",
              maxWidth: "850px",
              width: "100%"
            }}
          >
            <img
              src={cloudinaryImageUrl}
              alt="Uploaded Resume PDF Document"
              className="w-full h-auto object-contain block select-none"
              onError={() => setError("Unable to load Cloudinary document")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActualPdfViewer;
