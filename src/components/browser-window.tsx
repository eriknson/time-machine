'use client';

import { motion } from 'framer-motion';
import { Version } from '@/lib/versions.mock';

interface BrowserWindowProps {
  version: Version;
  depth: number;
  isActive: boolean;
  onClick: () => void;
  direction: 'forward' | 'backward' | null;
  isEntering?: boolean;
  isExiting?: boolean;
}

export function BrowserWindow({ 
  version, 
  depth, 
  isActive, 
  onClick, 
  direction,
  isEntering = false,
  isExiting = false,
}: BrowserWindowProps) {
  const { browserState } = version;
  
  // Stack positioning: front card flat, stack behind recedes with perspective
  const baseTranslateY = 280 * depth;
  const baseTranslateZ = -800 * depth;
  const baseRotateX = depth === 0 ? 0 : -15;
  const baseScale = 1 - 0.03 * depth;
  const baseOpacity = depth === 0 ? 1 : Math.max(0.7, 0.95 - 0.025 * depth);
  const zIndex = 1000 - depth;

  const getTransform = (y: number, z: number, scale: number, rotateX: number) => 
    `translate3d(-50%, ${y}px, ${z}px) rotateX(${rotateX}deg) scale(${scale})`;

  const initial = isEntering
    ? {
        transform: getTransform(window.innerHeight * 0.5, 200, 1.08, 0),
        opacity: 0,
      }
    : undefined;

  const exit = isExiting
    ? {
        transform: getTransform(window.innerHeight * 0.5, 100, 1.12, 0),
        opacity: 0,
      }
    : undefined;

  const animate = {
    transform: getTransform(baseTranslateY, baseTranslateZ, baseScale, baseRotateX),
    opacity: baseOpacity,
  };

  const bgColor = browserState.isDarkMode ? '#1E1E1E' : '#FFFFFF';
  const textColor = browserState.isDarkMode ? '#FFFFFF' : '#000000';
  const mutedColor = browserState.isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)';

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
      aria-label={`Browser view ${version.version} from ${version.timestamp.toLocaleDateString('en-US')}`}
    >
      {/* Browser Window Container */}
      <div
        className="relative w-full h-full rounded-lg overflow-hidden"
        style={{
          backgroundColor: '#191919',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 1px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Music App Content */}
        <div
          className="h-full overflow-hidden"
          style={{
            backgroundColor: bgColor,
          }}
        >
          {browserState.layout === 'minimal' ? (
            // Minimal Layout (v0.5-0.9)
            <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${browserState.primaryColor} 0%, ${browserState.accentColor} 100%)` }}>
              <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-4">{browserState.heroText}</h1>
                <p className="text-xl text-white/80 mb-8">Your music journey starts here</p>
                {browserState.sidebarItems.includes('Login') && (
                  <button className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:scale-105 transition">
                    Get Started
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Standard & Full Layouts
            <div className="flex h-full">
              {/* Sidebar */}
              {browserState.hasSidebar && (
                <div
                  className="w-60 p-6 border-r"
                  style={{
                    backgroundColor: browserState.isDarkMode ? '#000000' : '#F5F5F5',
                    borderColor: browserState.isDarkMode ? '#282828' : '#E5E5E5',
                  }}
                >
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold" style={{ color: browserState.accentColor }}>
                      MusicFlow
                    </h2>
                  </div>
                  <nav className="space-y-4">
                    {browserState.sidebarItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg transition"
                        style={{
                          color: idx === 0 ? textColor : mutedColor,
                          backgroundColor: idx === 0 ? (browserState.isDarkMode ? '#282828' : '#E5E5E5') : 'transparent',
                        }}
                      >
                        <div className="w-5 h-5 flex items-center justify-center">
                          {item === 'Home' && '🏠'}
                          {item === 'Search' && '🔍'}
                          {item === 'Library' && '📚'}
                          {item === 'Playlists' && '🎵'}
                          {item === 'Friends' && '👥'}
                          {item === 'Radio' && '📻'}
                          {item === 'Podcasts' && '🎙️'}
                          {item === 'Analytics' && '📊'}
                          {item === 'Concert Finder' && '🎸'}
                          {item === 'Profile' && '👤'}
                          {(item === 'Browse' || item === 'Login') && '🌐'}
                        </div>
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </nav>
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1 overflow-auto">
                {/* Hero Section */}
                <div
                  className="h-72 flex items-end p-8"
                  style={{
                    background: `linear-gradient(135deg, ${browserState.primaryColor} 0%, ${browserState.accentColor} 100%)`,
                  }}
                >
                  <div>
                    <h1 className="text-5xl font-bold text-white mb-2">{browserState.heroText}</h1>
                    <p className="text-white/80">{version.version}</p>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="p-8">
                  {browserState.hasPlaylists && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4" style={{ color: textColor }}>
                        {browserState.hasSearch ? 'Popular Playlists' : 'Your Library'}
                      </h2>
                      <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: browserState.layout === 'full' ? 8 : 4 }).map((_, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg p-4 transition hover:opacity-80"
                            style={{
                              backgroundColor: browserState.isDarkMode ? '#282828' : '#F5F5F5',
                            }}
                          >
                            <div
                              className="w-full aspect-square rounded mb-3"
                              style={{
                                backgroundColor: browserState.primaryColor,
                                opacity: 0.3 + (idx * 0.1),
                              }}
                            />
                            <p className="font-semibold text-sm" style={{ color: textColor }}>
                              Playlist {idx + 1}
                            </p>
                            <p className="text-xs mt-1" style={{ color: mutedColor }}>
                              {15 + idx * 3} songs
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {browserState.hasSocial && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4" style={{ color: textColor }}>
                        Friends Activity
                      </h2>
                      <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-4 p-3 rounded-lg"
                            style={{
                              backgroundColor: browserState.isDarkMode ? '#282828' : '#F5F5F5',
                            }}
                          >
                            <div
                              className="w-10 h-10 rounded-full"
                              style={{ backgroundColor: browserState.accentColor }}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium" style={{ color: textColor }}>
                                Friend {idx + 1}
                              </p>
                              <p className="text-xs" style={{ color: mutedColor }}>
                                Listening to Track {idx + 1}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Player Bar */}
          {browserState.hasPlayer && (
            <div
              className="absolute bottom-0 left-0 right-0 h-20 px-4 flex items-center gap-4 border-t"
              style={{
                backgroundColor: browserState.isDarkMode ? '#181818' : '#F9F9F9',
                borderColor: browserState.isDarkMode ? '#282828' : '#E5E5E5',
              }}
            >
              {/* Album Art */}
              <div
                className="w-14 h-14 rounded"
                style={{ backgroundColor: browserState.primaryColor, opacity: 0.5 }}
              />

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: textColor }}>
                  Current Track
                </p>
                <p className="text-xs truncate" style={{ color: mutedColor }}>
                  Artist Name
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6">
                {browserState.playerFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 flex items-center justify-center rounded-full"
                    style={{
                      backgroundColor: feature === 'Play/Pause' ? browserState.accentColor : 'transparent',
                      color: feature === 'Play/Pause' ? '#FFF' : mutedColor,
                    }}
                  >
                    {feature === 'Play/Pause' && '▶'}
                    {feature === 'Skip' && '⏭'}
                    {feature === 'Volume' && '🔊'}
                    {feature === 'Repeat' && '🔁'}
                    {feature === 'Shuffle' && '🔀'}
                    {feature === 'Queue' && '📝'}
                    {(feature === 'EQ' || feature === 'Lyrics' || feature === 'HiFi') && '⚙️'}
                  </div>
                ))}
              </div>

              {/* Volume */}
              <div className="w-32 h-1 rounded-full" style={{ backgroundColor: browserState.isDarkMode ? '#282828' : '#E5E5E5' }}>
                <div
                  className="h-full rounded-full"
                  style={{ backgroundColor: browserState.accentColor, width: '70%' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

