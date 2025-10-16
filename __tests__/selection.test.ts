import { describe, it, expect } from 'vitest';
import { clampSelection } from '@/hooks/useVersionMode';

describe('Selection Logic', () => {
  const maxVersions = 12;

  describe('clampSelection', () => {
    it('should return the index when within bounds', () => {
      expect(clampSelection(0, maxVersions)).toBe(0);
      expect(clampSelection(5, maxVersions)).toBe(5);
      expect(clampSelection(11, maxVersions)).toBe(11);
    });

    it('should clamp to 0 when index is negative', () => {
      expect(clampSelection(-1, maxVersions)).toBe(0);
      expect(clampSelection(-5, maxVersions)).toBe(0);
      expect(clampSelection(-100, maxVersions)).toBe(0);
    });

    it('should clamp to max-1 when index exceeds bounds', () => {
      expect(clampSelection(12, maxVersions)).toBe(11);
      expect(clampSelection(15, maxVersions)).toBe(11);
      expect(clampSelection(100, maxVersions)).toBe(11);
    });

    it('should handle edge cases at boundaries', () => {
      expect(clampSelection(0, maxVersions)).toBe(0);
      expect(clampSelection(11, maxVersions)).toBe(11);
    });
  });

  describe('increment/decrement behavior', () => {
    it('should increment selection within bounds', () => {
      const current = 5;
      const next = clampSelection(current + 1, maxVersions);
      expect(next).toBe(6);
    });

    it('should decrement selection within bounds', () => {
      const current = 5;
      const prev = clampSelection(current - 1, maxVersions);
      expect(prev).toBe(4);
    });

    it('should not go below 0 when decrementing from 0', () => {
      const current = 0;
      const prev = clampSelection(current - 1, maxVersions);
      expect(prev).toBe(0);
    });

    it('should not exceed max when incrementing from last', () => {
      const current = 11;
      const next = clampSelection(current + 1, maxVersions);
      expect(next).toBe(11);
    });
  });

  describe('simulated navigation sequences', () => {
    it('should handle multiple increments correctly', () => {
      let index = 0;
      index = clampSelection(index + 1, maxVersions); // 1
      index = clampSelection(index + 1, maxVersions); // 2
      index = clampSelection(index + 1, maxVersions); // 3
      expect(index).toBe(3);
    });

    it('should handle multiple decrements correctly', () => {
      let index = 5;
      index = clampSelection(index - 1, maxVersions); // 4
      index = clampSelection(index - 1, maxVersions); // 3
      index = clampSelection(index - 1, maxVersions); // 2
      expect(index).toBe(2);
    });

    it('should handle increment beyond max', () => {
      let index = 10;
      index = clampSelection(index + 1, maxVersions); // 11
      index = clampSelection(index + 1, maxVersions); // clamped to 11
      index = clampSelection(index + 1, maxVersions); // still 11
      expect(index).toBe(11);
    });

    it('should handle decrement below 0', () => {
      let index = 2;
      index = clampSelection(index - 1, maxVersions); // 1
      index = clampSelection(index - 1, maxVersions); // 0
      index = clampSelection(index - 1, maxVersions); // clamped to 0
      expect(index).toBe(0);
    });
  });
});

