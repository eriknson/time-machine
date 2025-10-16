'use client';

import { Version } from '@/lib/versions.mock';

interface VersionControlsProps {
  onRestore: () => void;
  onClose: () => void;
  isAnimating: boolean;
  selectedVersion: Version;
}

export function VersionControls({
  onRestore,
  onClose,
  isAnimating,
  selectedVersion,
}: VersionControlsProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
      <button
        onClick={onClose}
        className="px-8 py-3 rounded-xl text-sm font-medium transition-all backdrop-blur-md border hover:scale-105 cursor-pointer"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          color: '#fff',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
        aria-label="Close version history"
      >
        Cancel
      </button>
      <button
        onClick={onRestore}
        disabled={isAnimating}
        className="px-8 py-3 rounded-xl text-sm font-medium transition-all backdrop-blur-md border hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
        style={{
          background: 'rgba(59, 130, 246, 0.3)',
          borderColor: 'rgba(59, 130, 246, 0.5)',
          color: '#fff',
          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
        aria-label={`Restore version ${selectedVersion.id}`}
      >
        Restore
      </button>
    </div>
  );
}

