'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Version } from '@/lib/versions.mock';
import { useVersionMode } from '@/hooks/useVersionMode';
import { VersionWindow } from './version-window';
import { BrowserWindow } from './browser-window';
import { VersionControls } from './version-controls';
import { TimelineSidebar } from './timeline-sidebar';
import { ViewTypeSelector } from './view-type-selector';

interface VersionModeProps {
  isOpen: boolean;
  onClose: () => void;
  versions: Version[];
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function VersionMode({ isOpen, onClose, versions, triggerRef }: VersionModeProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [viewType, setViewType] = useState<'scope' | 'browser'>('scope');
  const [isMounted, setIsMounted] = useState(false);
  const { selectedIndex, isAnimating, selectVersion, prevDirection, nextVersion, prevVersion } = useVersionMode({
    totalVersions: versions.length,
    onClose,
    isOpen,
  });
  
  const prevSelectedIndexRef = useRef(selectedIndex);

  // Ensure client-side only rendering for random elements
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Track previous selected index for enter/exit logic
  useEffect(() => {
    prevSelectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Focus the overlay when it opens
    overlay.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = overlay.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [tabindex="0"]'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    overlay.addEventListener('keydown', handleTab);
    return () => overlay.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Return focus to trigger when closed
  useEffect(() => {
    if (!isOpen && triggerRef?.current) {
      triggerRef.current.focus();
    }
  }, [isOpen, triggerRef]);

  const handleRestore = () => {
    const selectedVersion = versions[selectedIndex];
    console.log('Restoring version:', selectedVersion.id);
  };

  // Build the windows to render with enter/exit tracking
  const windowsToRender = [];
  for (let depth = 0; depth < 15; depth++) {
    const versionIndex = selectedIndex - depth; // Go backwards to older versions
    if (versionIndex >= 0) {
      // Determine if this card is entering or exiting
      const isEntering = prevDirection === 'forward' && depth === 0; // New card entering from bottom when going forward
      const isExiting = prevDirection === 'backward' && versionIndex === selectedIndex + 1; // Old top card exiting down when going back
      
      windowsToRender.push({
        version: versions[versionIndex],
        depth,
        versionIndex,
        isEntering,
        isExiting,
      });
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-40 overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, #1e3a8a 0%, #0f172a 50%, #000000 100%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Version history"
        >
          {/* Starfield background effect */}
          {isMounted && (
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-px h-px bg-white rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.3,
                  }}
                />
              ))}
            </div>
          )}

          {/* View Type Selector */}
          <ViewTypeSelector viewType={viewType} onViewTypeChange={setViewType} />

          {/* 3D Perspective container */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              perspective: '2200px',
              perspectiveOrigin: '50% 35%',
            }}
          >
            <div
              className="relative"
              style={{
                width: '85vw',
                maxWidth: '1100px',
                height: '70vh',
                maxHeight: '750px',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {/* Windows stack */}
              <AnimatePresence mode="popLayout">
                {windowsToRender.map(({ version, depth, versionIndex, isEntering, isExiting }) => (
                  viewType === 'scope' ? (
                    <VersionWindow
                      key={version.id}
                      version={version}
                      depth={depth}
                      isActive={depth === 0}
                      onClick={() => selectVersion(versionIndex)}
                      direction={prevDirection}
                      isEntering={isEntering}
                      isExiting={isExiting}
                    />
                  ) : (
                    <BrowserWindow
                      key={version.id}
                      version={version}
                      depth={depth}
                      isActive={depth === 0}
                      onClick={() => selectVersion(versionIndex)}
                      direction={prevDirection}
                      isEntering={isEntering}
                      isExiting={isExiting}
                    />
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Floating Navigation Arrows */}
          <div className="fixed left-[calc(50%-650px)] top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
            {/* Up Arrow - Go to Older Version */}
            <button
              onClick={prevVersion}
              disabled={selectedIndex === 0}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg cursor-pointer"
              aria-label="Go to older version"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6"/>
              </svg>
            </button>
            
            {/* Down Arrow - Go to Newer Version */}
            <button
              onClick={nextVersion}
              disabled={selectedIndex === versions.length - 1}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg cursor-pointer"
              aria-label="Go to newer version"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>

          {/* Timeline Sidebar */}
          <TimelineSidebar
            versions={versions}
            selectedIndex={selectedIndex}
            onSelect={selectVersion}
          />

          {/* Controls */}
          <VersionControls
            onRestore={handleRestore}
            onClose={onClose}
            isAnimating={isAnimating}
            selectedVersion={versions[selectedIndex]}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
