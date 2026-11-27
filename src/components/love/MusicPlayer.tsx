import { useEffect, useRef, useState } from "react";
import { Disc, Pause, Play, Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  playTrigger?: number; // increments when envelope heart seal is clicked
  onPlaybackChange?: (isPlaying: boolean) => void;
}

// Official song "Bairan" by Banjaare
const PRIMARY_VIDEO_ID = "oafxkMv4xnc";
const FALLBACK_VIDEO_ID = "k4dJcU0Xf5M";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function MusicPlayer({ playTrigger = 0, onPlaybackChange }: MusicPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const isReadyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const currentVideoIdRef = useRef(PRIMARY_VIDEO_ID);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Initialize YouTube IFrame Player
  useEffect(() => {
    let isMounted = true;
    let pollTimer: ReturnType<typeof setInterval> | null = null;

    const initPlayer = () => {
      if (!isMounted || !containerRef.current || playerRef.current) return;
      if (!window.YT || !window.YT.Player) return;

      try {
        playerRef.current = new window.YT.Player(containerRef.current, {
          width: "200",
          height: "200",
          videoId: currentVideoIdRef.current,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            loop: 1,
            playlist: currentVideoIdRef.current, // required for YouTube iframe loop
            playsinline: 1,
            origin: typeof window !== "undefined" ? window.location.origin : undefined,
          },
          events: {
            onReady: (event: any) => {
              if (!isMounted) return;
              isReadyRef.current = true;
              if (pendingPlayRef.current) {
                event.target.playVideo();
                pendingPlayRef.current = false;
              }
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              // YT.PlayerState: 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                setIsPlaying(true);
                onPlaybackChange?.(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
                onPlaybackChange?.(false);
              } else if (event.data === 0) {
                // Ensure seamless loop on track completion
                event.target.playVideo();
              }
            },
            onError: (event: any) => {
              console.warn("YouTube player warning/error:", event.data);
              // Error 100, 101, or 150 (embedding restriction or unavailable): fallback
              if (
                (event.data === 101 || event.data === 150 || event.data === 100) &&
                currentVideoIdRef.current === PRIMARY_VIDEO_ID
              ) {
                currentVideoIdRef.current = FALLBACK_VIDEO_ID;
                if (playerRef.current?.loadVideoById) {
                  playerRef.current.loadVideoById({
                    videoId: FALLBACK_VIDEO_ID,
                    suggestedQuality: "small",
                  });
                  if (pendingPlayRef.current || isPlaying) {
                    playerRef.current.playVideo();
                  }
                }
              }
            },
          },
        });
      } catch (err) {
        console.warn("Failed to initialize YouTube player:", err);
      }
    };

    if (typeof window !== "undefined") {
      if (window.YT && window.YT.Player) {
        initPlayer();
      } else {
        // Poll for window.YT in case script is currently loading
        pollTimer = setInterval(() => {
          if (window.YT && window.YT.Player) {
            if (pollTimer) clearInterval(pollTimer);
            initPlayer();
          }
        }, 150);

        // Inject YouTube API script if not already present
        const existingScript = document.getElementById("youtube-iframe-api");
        if (!existingScript) {
          const scriptTag = document.createElement("script");
          scriptTag.id = "youtube-iframe-api";
          scriptTag.src = "https://www.youtube.com/iframe_api";
          document.body.appendChild(scriptTag);
        }

        const prevReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (typeof prevReady === "function") prevReady();
          if (pollTimer) clearInterval(pollTimer);
          initPlayer();
        };
      }
    }

    return () => {
      isMounted = false;
      if (pollTimer) clearInterval(pollTimer);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore cleanup errors
        }
        playerRef.current = null;
      }
    };
  }, [onPlaybackChange]);

  // Triggered when visitor clicks the heart seal to open the envelope
  useEffect(() => {
    if (playTrigger > 0) {
      if (playerRef.current && isReadyRef.current) {
        try {
          playerRef.current.playVideo();
        } catch (e) {
          console.warn("Error playing audio on trigger:", e);
        }
      } else {
        pendingPlayRef.current = true;
      }
    }
  }, [playTrigger]);

  const togglePlay = () => {
    if (!playerRef.current || !isReadyRef.current) {
      pendingPlayRef.current = !pendingPlayRef.current;
      return;
    }
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (e) {
      console.warn("Toggle play error:", e);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current || !isReadyRef.current) {
      setIsMuted(!isMuted);
      return;
    }
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (e) {
      console.warn("Toggle mute error:", e);
    }
  };

  return (
    <>
      {/* Hidden YouTube Audio Player Container (Offscreen & Invisible, Audio Functional) */}
      <div
        aria-hidden="true"
        className="fixed -bottom-96 -right-96 w-48 h-48 opacity-0 pointer-events-none overflow-hidden select-none -z-50"
        tabIndex={-1}
      >
        <div ref={containerRef} />
      </div>

      {/* Floating Romantic Music Player */}
      <aside
        aria-label="Background music player"
        className="fixed top-4 right-4 z-50 animate-step-in select-none"
      >
        <div
          className={`flex items-center gap-2 sm:gap-3 rounded-full border px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-md transition-all duration-300 shadow-lg ${
            isPlaying
              ? "border-[#FF4F98]/50 bg-[#2A0B1D]/85 shadow-[0_0_25px_rgba(255,79,152,0.35)]"
              : "border-[#FF9BCB]/30 bg-[#1A0614]/75 hover:border-[#FF4F98]/50 hover:bg-[#2A0B1D]/85"
          }`}
        >
          {/* Rotating Vinyl Disc */}
          <div className="relative flex items-center justify-center">
            <div
              className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF4F98] via-[#8A184A] to-[#120711] p-[2px] shadow-[0_0_12px_rgba(255,79,152,0.4)] ${
                isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
              }`}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#180512] border border-[#FF9BC4]/30">
                <Disc className="h-4 w-4 text-[#FFD6E8]" />
              </div>
            </div>
            {/* Pulsing glow ring when active */}
            {isPlaying && (
              <span className="absolute inset-0 rounded-full bg-[#FF4F98]/30 animate-ping pointer-events-none" />
            )}
          </div>

          {/* Song Info */}
          <div className="flex flex-col text-left leading-tight pr-1">
            <span className="text-xs font-semibold text-[#FFF0F5] tracking-wide flex items-center gap-1">
              Bairan
              {isPlaying && <span className="inline-block animate-pulse text-[10px] text-[#FF4F98]">🎵</span>}
            </span>
            <span className="text-[10px] text-[#FF9BC4]/80">Banjaare</span>
          </div>

          {/* Controls: Play/Pause */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#FF4F98]/20 hover:bg-[#FF4F98]/40 text-[#FFD6E8] hover:text-white transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary outline-none"
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5 fill-current" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Controls: Mute/Unmute */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute music" : "Mute music"}
            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#FF4F98]/20 hover:bg-[#FF4F98]/40 text-[#FFD6E8] hover:text-white transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary outline-none"
          >
            {isMuted ? (
              <VolumeX className="h-3.5 w-3.5 text-[#FF9BC4]" />
            ) : (
              <Volume2 className="h-3.5 w-3.5 text-[#FFD6E8]" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
