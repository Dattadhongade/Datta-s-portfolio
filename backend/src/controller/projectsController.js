const { getPortfolioData, savePortfolioData } = require('../models/portfolioModel');

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const data = await getPortfolioData();
    res.json({
      success: true,
      data: data.projects || [],
      categories: data.projectCategories || ["All", "Full Stack", "AI / SaaS", "Frontend"]
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// CREATE new project
exports.createProject = async (req, res) => {
  try {
    const data = await getPortfolioData();
    const newProject = {
      id: Date.now(),
      status: 'Published',
      tags: [],
      highlights: [],
      ...req.body
    };
    data.projects = [newProject, ...(data.projects || [])];
    await savePortfolioData(data);
    res.status(201).json({ success: true, message: 'Project created', data: newProject });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE project
exports.updateProject = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await getPortfolioData();
    data.projects = (data.projects || []).map((p) => (p.id === id ? { ...p, ...req.body } : p));
    await savePortfolioData(data);
    res.json({ success: true, message: 'Project updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE project
exports.deleteProject = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await getPortfolioData();
    data.projects = (data.projects || []).filter((p) => p.id !== id);
    await savePortfolioData(data);
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const path = require('path');
const { Readable } = require('stream');
const { cloudinary, isCloudinaryConfigured, CLOUDINARY_FOLDER } = require('../config/cloudinary');

// Helper to stream upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer, originalname) => {
  return new Promise((resolve, reject) => {
    const isPdf = path.extname(originalname).toLowerCase() === '.pdf';
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: CLOUDINARY_FOLDER,
        resource_type: 'auto',
        use_filename: true,
        unique_filename: true,
        format: isPdf ? 'pdf' : undefined
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

// UPLOAD project image or document (100% Cloudinary)
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    if (!isCloudinaryConfigured()) {
      return res.status(500).json({
        success: false,
        error: 'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in environment variables.'
      });
    }

    const result = await uploadToCloudinary(req.file.buffer, req.file.originalname);
    return res.json({
      success: true,
      message: 'File uploaded to Cloudinary successfully',
      url: result.secure_url,
      public_id: result.public_id,
      folder: CLOUDINARY_FOLDER
    });
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'File upload to Cloudinary failed'
    });
  }
};


