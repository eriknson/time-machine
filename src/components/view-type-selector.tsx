'use client';

import { motion } from 'framer-motion';

type ViewType = 'scope' | 'browser';

interface ViewTypeSelectorProps {
  viewType: ViewType;
  onViewTypeChange: (viewType: ViewType) => void;
}

export function ViewTypeSelector({ viewType, onViewTypeChange }: ViewTypeSelectorProps) {
  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30">
      <div
        className="flex items-center gap-2 px-2 py-2 rounded-2xl backdrop-blur-md border"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <button
          onClick={() => onViewTypeChange('scope')}
          className="relative px-5 py-2 rounded-xl text-sm font-medium transition-colors z-10 cursor-pointer"
          style={{
            color: viewType === 'scope' ? '#fff' : 'rgba(255, 255, 255, 0.6)',
          }}
          aria-label="View release notes"
          aria-pressed={viewType === 'scope'}
        >
          {viewType === 'scope' && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </span>
        </button>
        
        <button
          onClick={() => onViewTypeChange('browser')}
          className="relative px-5 py-2 rounded-xl text-sm font-medium transition-colors z-10 cursor-pointer"
          style={{
            color: viewType === 'browser' ? '#fff' : 'rgba(255, 255, 255, 0.6)',
          }}
          aria-label="View browser mockups"
          aria-pressed={viewType === 'browser'}
        >
          {viewType === 'browser' && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

