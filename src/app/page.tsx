'use client';

import { VersionMode } from '@/components/version-mode';
import { mockVersions } from '@/lib/versions.mock';

export default function Home() {
  return (
    <VersionMode
      isOpen={true}
      onClose={() => {}}
      versions={mockVersions}
    />
  );
}
