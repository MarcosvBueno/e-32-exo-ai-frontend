// Component.tsx
import { cn } from "@/lib/utils";

export const MinGlobe = () => {
  return (
    <div
    >
      {/* Ambient glow (adapts) */}
      
      <div className="relative flex flex-col items-end text-center w-full">
        
        {/* Globe illustration */}
        <div className="absolute -top-4 md:-top-6 right-0 h-14 w-14 md:h-20 md:w-20 overflow-hidden">
          <svg
            viewBox="0 0 300 300"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Glow hub - adaptive to theme */}
              <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                <stop
                  offset="0%"
                  stopColor="rgba(34,211,238,0.9)" // cyan‑500
                />
                <stop
                  offset="100%"
                  stopColor="rgba(59,130,246,0.1)" // blue‑500 faint
                />
              </radialGradient>
              {/* Line trail gradients - dark mode */}
              <linearGradient id="trailBright" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />{/* cyan-400 */}
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />{/* indigo-500 */}
              </linearGradient>
              <linearGradient id="trailDim" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
              </linearGradient>
              {/* Light mode gradients */}
              <linearGradient id="trailBrightLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8" />{/* cyan-600 */}
                <stop offset="100%" stopColor="#4338ca" stopOpacity="0.6" />{/* indigo-600 */}
              </linearGradient>
              <linearGradient id="trailDimLight" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#4338ca" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Enhanced globe group - no rotation */}
            <g>
              {/* Latitude lines - enhanced visibility */}
              {[...Array(6)].map((_, i) => (
                <ellipse
                  key={`lat-${i}`}
                  cx="150"
                  cy="150"
                  rx={120}
                  ry={40 + i * 12}
                  stroke="url(#trailDim)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeDasharray="5 5"
                  style={{ animation: "flowAnimation 10s linear infinite" }}
                  opacity={0.8}
                  transform="rotate(-25,150,150)"
                  className="dark:stroke-[url(#trailDim)] stroke-[url(#trailDimLight)]"
                />
              ))}

              {/* Longitude lines - enhanced visibility */}
              {[...Array(8)].map((_, i) => (
                <path
                  key={`lon-${i}`}
                  d="M150,30 A120,120 0 0,1 150,270"
                  stroke="url(#trailDim)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeDasharray="4 4"
                  style={{ animation: "flowAnimation 12s linear infinite reverse" }}
                  opacity={0.8}
                  transform={`rotate(${i * 22.5},150,150)`}
                  className="dark:stroke-[url(#trailDim)] stroke-[url(#trailDimLight)]"
                />
              ))}

              {/* Orbital trails - enhanced visibility */}
              <ellipse
                cx="150"
                cy="150"
                rx="140"
                ry="60"
                stroke="url(#trailBright)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10 10"
                style={{ animation: "flowAnimation 14s linear infinite" }}
                opacity="1"
                transform="rotate(20,150,150)"
                className="dark:stroke-[url(#trailBright)] stroke-[url(#trailBrightLight)]"
              />
              <ellipse
                cx="150"
                cy="150"
                rx="130"
                ry="50"
                stroke="url(#trailDim)"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="12 12"
                style={{ animation: "flowAnimation 9s linear infinite reverse" }}
                opacity="0.9"
                transform="rotate(-40,150,150)"
                className="dark:stroke-[url(#trailDim)] stroke-[url(#trailDimLight)]"
              />

            </g>
          </svg>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes flowAnimation {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </div>
  );
};
