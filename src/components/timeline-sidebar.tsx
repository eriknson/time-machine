'use client';

import { Version } from '@/lib/versions.mock';
import { motion } from 'framer-motion';

interface TimelineSidebarProps {
  versions: Version[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function TimelineSidebar({ versions, selectedIndex, onSelect }: TimelineSidebarProps) {
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  };

  return (
    <div className="fixed right-12 top-1/4 bottom-1/4 flex flex-col items-end z-50 pointer-events-auto">
      {/* Gradient fade top */}
      
      {/* Timeline container */}
      <div className="flex-1 overflow-y-auto scrollbar-hide py-6 relative">
        <div className="relative flex flex-col gap-4">
          {versions.map((version, index) => {
            const isActive = index === selectedIndex;

            return (
              <motion.button
                key={version.id}
                onClick={() => onSelect(index)}
                className="relative flex items-start gap-4 text-right transition-all group cursor-pointer"
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0.5,
                }}
                whileHover={{ opacity: 1 }}
                aria-label={`Jump to ${version.changeTitle}`}
              >
                {/* Content */}
                <div className="text-right flex-1">
                  <div className={`text-sm font-medium leading-snug mb-1 transition-colors ${
                    isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
                  }`} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                    {version.changeTitle}
                  </div>
                  <div className="text-xs text-white/50">
                    {getTimeAgo(version.timestamp)}
                  </div>
                </div>
                
                {/* Dot indicator */}
                <div
                  className={`w-2.5 h-2.5 rounded-full border-2 transition-all flex-shrink-0 mt-1 ${
                    isActive
                      ? 'bg-white border-white scale-125 shadow-lg shadow-white/50'
                      : 'bg-transparent border-white/40 group-hover:border-white/60'
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Gradient fade bottom */}
    </div>
  );
}

