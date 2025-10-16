'use client';

import { motion } from 'framer-motion';
import { Version } from '@/lib/versions.mock';

interface VersionWindowProps {
  version: Version;
  depth: number;
  isActive: boolean;
  onClick: () => void;
  direction: 'forward' | 'backward' | null;
  isEntering?: boolean;
  isExiting?: boolean;
}

export function VersionWindow({ 
  version, 
  depth, 
  isActive, 
  onClick, 
  direction,
  isEntering = false,
  isExiting = false,
}: VersionWindowProps) {
  // Stack positioning: front card flat, stack behind recedes with perspective
  const baseTranslateY = 280 * depth; // Cards go DOWN as they recede (dramatic spacing)
  const baseTranslateZ = -800 * depth; // Cards go BACK as they recede
  const baseRotateX = depth === 0 ? 0 : -15; // Front card flat, others tilt away
  const baseScale = 1 - 0.03 * depth; // Minimal scaling to keep cards large
  const baseOpacity = depth === 0 ? 1 : Math.max(0.7, 0.95 - 0.025 * depth);
  const zIndex = 1000 - depth;

  // Calculate transforms
  const getTransform = (y: number, z: number, scale: number, rotateX: number) => 
    `translate3d(-50%, ${y}px, ${z}px) rotateX(${rotateX}deg) scale(${scale})`;

  // Initial state when entering
  const initial = isEntering
    ? {
        // Enter from BELOW screen, coming UP
        transform: getTransform(window.innerHeight * 0.5, 200, 1.08, 0),
        opacity: 0,
      }
    : undefined;

  // Exit state when leaving
  const exit = isExiting
    ? {
        // Exit DOWN and OUT of screen
        transform: getTransform(window.innerHeight * 0.5, 100, 1.12, 0),
        opacity: 0,
      }
    : undefined;

  // Normal animated state
  const animate = {
    transform: getTransform(baseTranslateY, baseTranslateZ, baseScale, baseRotateX),
    opacity: baseOpacity,
  };

  return (
    <motion.div
      key={version.id}
      className="absolute left-1/2"
      style={{
        transformStyle: 'preserve-3d',
        width: '85vw',
        maxWidth: '1100px',
        height: '70vh',
        maxHeight: '750px',
        zIndex,
        cursor: isActive ? 'default' : 'pointer',
        willChange: 'transform, opacity',
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
      }}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 28,
        mass: 0.6,
      }}
      onClick={!isActive ? onClick : undefined}
      role="button"
      tabIndex={isActive ? 0 : -1}
      aria-label={`Version ${version.version} from ${version.timestamp.toLocaleDateString('en-US')}`}
    >
      {/* Window Container */}
      <div
        className="relative w-full h-full rounded-lg overflow-hidden"
        style={{
          backgroundColor: '#191919',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 1px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Document Content Area - Notion-style Dark Mode */}
        <div className="h-full bg-[#191919] overflow-auto">
          <div className="max-w-3xl mx-auto px-24 py-16">
            {/* Document Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-white mb-6 tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                {version.title}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                  {version.version}
                </span>
                <span className="text-sm text-gray-400">
                  {version.timestamp.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <p className="text-[15px] text-gray-400 leading-relaxed">
                {version.description}
              </p>
            </div>

            {/* Divider */}
            <div className="my-10 border-t border-gray-800/60" />

            {/* Features Section */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6 tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                What's New
              </h2>
              <div className="space-y-1">
                {version.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 py-2.5 hover:bg-white/[0.03] -mx-2 px-2 rounded-md transition-colors">
                    {/* Checkmark Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="text-emerald-400"
                      >
                        <rect x="3" y="3" width="14" height="14" rx="3" fill="currentColor" opacity="0.15" />
                        <path
                          d="M6 10L9 13L14 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[15px] text-gray-300 leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-20 pt-10 border-t border-gray-800/60">
              <p className="text-xs text-gray-500">
                Snapshot captured at {version.timestamp.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
