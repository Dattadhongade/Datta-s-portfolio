import React from "react";

// Generic Pulse Box
export const SkeletonBox = ({ className = "" }) => (
  <div className={`skeleton-shimmer rounded-xl ${className}`} />
);

// 1. About / Home Page Skeleton
export const AboutSkeleton = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 animate-in fade-in duration-300">
      {/* Bio Banner Skeleton */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-3 border border-slate-200/80 dark:border-white/10">
        <SkeletonBox className="h-4 w-11/12" />
        <SkeletonBox className="h-4 w-full" />
        <SkeletonBox className="h-4 w-4/5" />
        <div className="pt-2 space-y-2">
          <SkeletonBox className="h-4 w-10/12" />
          <SkeletonBox className="h-4 w-9/12" />
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-4 text-center border border-slate-200/80 dark:border-white/10 space-y-2 flex flex-col items-center justify-center"
          >
            <SkeletonBox className="h-7 w-16 rounded-md" />
            <SkeletonBox className="h-3 w-20 rounded-md" />
          </div>
        ))}
      </div>

      {/* Capabilities Skeleton */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <SkeletonBox className="h-6 w-36" />
          <SkeletonBox className="h-4 w-28 hidden sm:block" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 flex items-start gap-4"
            >
              <SkeletonBox className="w-12 h-12 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2.5">
                <SkeletonBox className="h-4.5 w-1/2" />
                <SkeletonBox className="h-3 w-1/3" />
                <SkeletonBox className="h-3.5 w-full pt-1" />
                <SkeletonBox className="h-3.5 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lifestyle Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-3.5 flex items-center gap-3 border border-slate-200/80 dark:border-white/10"
          >
            <SkeletonBox className="w-9 h-9 rounded-lg shrink-0" />
            <div className="flex-1 space-y-1.5">
              <SkeletonBox className="h-3.5 w-2/3" />
              <SkeletonBox className="h-2.5 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Skills Page Skeleton
export const SkillsSkeleton = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-center">
        <SkeletonBox className="h-9 w-52 rounded-xl" />
      </div>

      {/* Category Tabs */}
      <div className="p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonBox key={i} className="h-9 w-28 rounded-xl" />
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3.5 border border-slate-200/80 dark:border-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <SkeletonBox className="w-10 h-10 rounded-xl" />
                <SkeletonBox className="h-5 w-28 rounded-md" />
              </div>
              <SkeletonBox className="h-4 w-10 rounded-md" />
            </div>
            <SkeletonBox className="w-full h-2 rounded-full" />
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="space-y-3 pt-2">
        <SkeletonBox className="h-5 w-48 rounded-md" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-4 border border-slate-200/80 dark:border-white/10 space-y-2"
            >
              <div className="flex justify-between items-start gap-2">
                <SkeletonBox className="h-4 w-3/4" />
                <SkeletonBox className="h-4 w-10 rounded-full" />
              </div>
              <SkeletonBox className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Projects Page Skeleton
export const ProjectsSkeleton = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Category Tabs */}
      <div className="flex justify-center">
        <div className="flex items-center justify-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex-wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonBox key={i} className="h-8 w-24 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-200/80 dark:border-white/10"
          >
            {/* Image Placeholder */}
            <div className="w-full aspect-16/10 relative">
              <SkeletonBox className="w-full h-full rounded-none" />
              <div className="absolute top-3 left-3">
                <SkeletonBox className="h-5 w-20 rounded-full" />
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
              <div className="space-y-2">
                <SkeletonBox className="h-5 w-3/4" />
                <SkeletonBox className="h-3.5 w-full" />
                <SkeletonBox className="h-3.5 w-4/5" />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between gap-2">
                <SkeletonBox className="h-4 w-16" />
                <div className="flex items-center gap-2">
                  <SkeletonBox className="w-8 h-8 rounded-lg" />
                  <SkeletonBox className="h-8 w-20 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Qualifications Page Skeleton
export const QualificationsSkeleton = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-3 sm:space-y-4 animate-in fade-in duration-300">
      {/* Badge */}
      <div className="flex justify-center">
        <SkeletonBox className="h-7 w-64 rounded-full" />
      </div>

      {/* Card container with timeline */}
      <div className="glass-card rounded-2xl p-4 sm:p-8 border border-slate-200/80 dark:border-white/10">
        <div className="relative pl-6 sm:pl-8 space-y-6 sm:space-y-8">
          {[1, 2].map((i) => (
            <div key={i} className="relative pl-4 sm:pl-5 space-y-2.5">
              <div className="flex justify-between items-start gap-2">
                <SkeletonBox className="h-5 w-3/5" />
                <SkeletonBox className="h-5 w-20 rounded-full" />
              </div>
              <div className="flex justify-between items-center">
                <SkeletonBox className="h-4 w-1/3" />
                <SkeletonBox className="h-3.5 w-24" />
              </div>
              <SkeletonBox className="h-3.5 w-full" />
              <SkeletonBox className="h-3.5 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 5. Experience Page Skeleton
export const ExperienceSkeleton = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 animate-in fade-in duration-300">
      {/* Badge */}
      <div className="flex justify-center">
        <SkeletonBox className="h-7 w-72 rounded-full" />
      </div>

      {/* Experience list */}
      <div className="space-y-4 sm:space-y-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-5 sm:p-7 border border-slate-200/80 dark:border-white/10 space-y-4"
          >
            {/* Company info */}
            <div className="flex items-center gap-3">
              <SkeletonBox className="h-5 w-44" />
              <SkeletonBox className="h-4 w-28" />
            </div>

            {/* Timeline container */}
            <div className="ml-3 sm:ml-5 pl-6 space-y-5 pt-1">
              {[1, 2].map((r) => (
                <div key={r} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <SkeletonBox className="h-4.5 w-36" />
                    <SkeletonBox className="h-4 w-20 rounded-full" />
                  </div>
                  <SkeletonBox className="h-3 w-28" />
                  <div className="space-y-1.5 pt-1">
                    <SkeletonBox className="h-3.5 w-full" />
                    <SkeletonBox className="h-3.5 w-11/12" />
                    <SkeletonBox className="h-3.5 w-4/5" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[1, 2, 3, 4].map((t) => (
                      <SkeletonBox key={t} className="h-5 w-16 rounded-md" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default {
  SkeletonBox,
  AboutSkeleton,
  SkillsSkeleton,
  ProjectsSkeleton,
  QualificationsSkeleton,
  ExperienceSkeleton
};
