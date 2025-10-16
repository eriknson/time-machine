'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseVersionModeProps {
  totalVersions: number;
  onClose: () => void;
  isOpen: boolean;
}

export function useVersionMode({ totalVersions, onClose, isOpen }: UseVersionModeProps) {
  // Start at the newest version (last index)
  const [selectedIndex, setSelectedIndex] = useState(totalVersions - 1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevDirection, setPrevDirection] = useState<'forward' | 'backward' | null>(null);

  // Reset to newest version when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(totalVersions - 1);
      setPrevDirection(null);
    }
  }, [isOpen, totalVersions]);

  const selectVersion = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(totalVersions - 1, index));
    if (clampedIndex !== selectedIndex) {
      // Track direction: forward = going to newer (higher index), backward = going to older (lower index)
      setPrevDirection(clampedIndex > selectedIndex ? 'forward' : 'backward');
      setIsAnimating(true);
      setSelectedIndex(clampedIndex);
      
      // Reset animation flag after transition completes
      setTimeout(() => setIsAnimating(false), 550);
    }
  }, [selectedIndex, totalVersions]);

  // Going forward in time = newer versions = higher index
  const nextVersion = useCallback(() => {
    selectVersion(selectedIndex + 1);
  }, [selectedIndex, selectVersion]);

  // Going backward in time = older versions = lower index
  const prevVersion = useCallback(() => {
    selectVersion(selectedIndex - 1);
  }, [selectedIndex, selectVersion]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Up arrow OR Left arrow = back in time (older, lower index)
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        prevVersion();
      } 
      // Down arrow OR Right arrow = forward in time (newer, higher index)
      else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextVersion();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextVersion, prevVersion, onClose]);

  return {
    selectedIndex,
    isAnimating,
    nextVersion,
    prevVersion,
    selectVersion,
    prevDirection,
  };
}

// Utility function for tests
export function clampSelection(index: number, max: number): number {
  return Math.max(0, Math.min(max - 1, index));
}

