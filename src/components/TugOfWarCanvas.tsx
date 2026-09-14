import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TeamState } from '../types';

interface TugOfWarCanvasProps {
  ropePosition: number; // -100 (Blue full win) to +100 (Red full win), 0 is center
  blueTeam: TeamState;
  redTeam: TeamState;
  activeTurn?: 'blue' | 'red';
  lastActionEffect?: {
    team: 'blue' | 'red';
    type: 'pull' | 'slip';
    text: string;
  } | null;
}

export const TugOfWarCanvas: React.FC<TugOfWarCanvasProps> = ({
  ropePosition,
  blueTeam,
  redTeam,
  activeTurn,
  lastActionEffect,
}) => {
  // Clamp ropePosition between -100 and 100
  const clampedPos = Math.max(-100, Math.min(100, ropePosition));
  // In pixels on a 1000px wide viewBox:
  // Center is 500. Shift can be up to ±180px
  const centerShiftPx = (clampedPos / 100) * 190;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-b from-sky-100 via-amber-50/60 to-emerald-100/70 p-3 shadow-inner md:p-6">
      {/* Action Flash Banner */}
      <AnimatePresence>
        {lastActionEffect && (
          <motion.div
            key={lastActionEffect.text + Date.now()}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className={`pointer-events-none absolute top-3 left-1/2 z-30 -translate-x-1/2 rounded-full px-5 py-2 font-black tracking-wide text-white shadow-xl text-xs sm:text-sm md:text-base ${
              lastActionEffect.type === 'pull'
                ? lastActionEffect.team === 'blue'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 ring-4 ring-blue-300'
                  : 'bg-gradient-to-r from-red-600 to-rose-600 ring-4 ring-rose-300'
                : 'bg-gradient-to-r from-amber-600 to-orange-600 ring-4 ring-orange-300'
            }`}
          >
            {lastActionEffect.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG Arena */}
      <div className="relative w-full aspect-[21/9] min-h-[220px] sm:min-h-[260px] md:min-h-[300px]">
        <svg
          viewBox="0 0 1000 420"
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
          id="tug-of-war-svg"
        >
          <defs>
            {/* Rope Gradient Pattern */}
            <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            <pattern id="ropePattern" width="16" height="16" patternUnits="userSpaceOnUse">
              <path
                d="M0 16 L16 0 M8 16 L16 8 M0 8 L8 0"
                stroke="#92400e"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M-4 4 L4 -4 M12 20 L20 12"
                stroke="#f59e0b"
                strokeWidth="1.5"
              />
            </pattern>

            {/* Ground Grass Pattern */}
            <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="25%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            <linearGradient id="dirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e2c290" />
              <stop offset="60%" stopColor="#d4a373" />
              <stop offset="100%" stopColor="#bc6c25" />
            </linearGradient>
          </defs>

          {/* Background Elements: Clouds / Cheering Arena Sky */}
          <g opacity="0.6">
            <ellipse cx="180" cy="50" rx="60" ry="22" fill="#ffffff" />
            <ellipse cx="220" cy="45" rx="45" ry="25" fill="#ffffff" />
            <ellipse cx="780" cy="55" rx="70" ry="25" fill="#ffffff" />
            <ellipse cx="830" cy="50" rx="50" ry="20" fill="#ffffff" />
          </g>

          {/* Stadium / Arena Fence or Flags */}
          <g opacity="0.4">
            {Array.from({ length: 19 }).map((_, i) => (
              <polygon
                key={`pennant-${i}`}
                points={`${40 + i * 50},20 ${65 + i * 50},20 ${52.5 + i * 50},45`}
                fill={i % 2 === 0 ? '#3b82f6' : '#ef4444'}
              />
            ))}
            <line x1="30" y1="20" x2="970" y2="20" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
          </g>

          {/* Ground Platform */}
          {/* Grassy upper bank */}
          <path d="M0,280 Q500,270 1000,280 L1000,420 L0,420 Z" fill="url(#grassGrad)" />
          {/* Competition Dirt Runway where characters stand */}
          <rect x="30" y="295" width="940" height="95" rx="16" fill="url(#dirtGrad)" stroke="#a16207" strokeWidth="2" />
          
          {/* Ground Markers */}
          {/* Center line (White double line) */}
          <rect x="496" y="292" width="8" height="100" fill="#ffffff" rx="3" opacity="0.9" />
          <line x1="500" y1="270" x2="500" y2="300" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />

          {/* Center text mark */}
          <text x="500" y="405" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="700">
            VẠCH TRUNG TÂM (0)
          </text>

          {/* Blue Win Boundary Line (Left: 310) */}
          <rect x="308" y="292" width="4" height="100" fill="#2563eb" rx="2" opacity="0.8" />
          <text x="310" y="405" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="700">
            THẮNG ĐỘI XANH
          </text>

          {/* Red Win Boundary Line (Right: 690) */}
          <rect x="688" y="292" width="4" height="100" fill="#dc2626" rx="2" opacity="0.8" />
          <text x="690" y="405" textAnchor="middle" fill="#b91c1c" fontSize="11" fontWeight="700">
            THẮNG ĐỘI ĐỎ
          </text>

          {/* Small Tick Marks on Dirt Track */}
          {[-80, -60, -40, -20, 20, 40, 60, 80].map((step) => {
            const xPos = 500 + (step / 100) * 190;
            return (
              <line
                key={`tick-${step}`}
                x1={xPos}
                y1="335"
                x2={xPos}
                y2="345"
                stroke="#9a3412"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
              />
            );
          })}

          {/* DYNAMIC PULL SYSTEM: Everything connected to the rope moves together with centerShiftPx */}
          <motion.g
            animate={{ x: centerShiftPx }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          >
            {/* The ROPE */}
            {/* Rope Shadow */}
            <path
              d="M 60 252 Q 500 256 940 252"
              fill="none"
              stroke="#00000020"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Main Rope Body */}
            <path
              d="M 60 240 Q 500 244 940 240"
              fill="none"
              stroke="url(#ropeGrad)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Braided Rope Pattern Overlay */}
            <path
              d="M 60 240 Q 500 244 940 240"
              fill="none"
              stroke="url(#ropePattern)"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Center Red/Gold Ribbon Knot (Flag) */}
            <g transform="translate(500, 240)">
              {/* Ribbon Ring */}
              <circle cx="0" cy="0" r="13" fill="#e11d48" stroke="#ffffff" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="7" fill="#fbbf24" />
              {/* Hanging Red Ribbon tails */}
              <path
                d="M -6,7 Q -14,35 -8,55 L 0,48 L 8,55 Q 14,35 6,7 Z"
                fill="#e11d48"
                stroke="#be123c"
                strokeWidth="1"
              />
              {/* Gold hanging ribbon */}
              <path
                d="M -3,7 Q -8,30 -3,42 L 0,38 L 3,42 Q 8,30 3,7 Z"
                fill="#facc15"
              />
              {/* Downward indicator pointer */}
              <polygon points="-5,58 5,58 0,68" fill="#e11d48" />
            </g>

            {/* BLUE TEAM (3 Characters on Left side of rope) */}
            <g id="team-blue-members">
              {/* Blue Player 3 (Anchor / End) */}
              <TugCharacter
                x={140}
                y={200}
                team="blue"
                role="anchor"
                isPulling={blueTeam.isPulling}
                isStumbling={blueTeam.isStumbling}
                playerIndex={3}
                label="Cự Phách"
              />
              {/* Blue Player 2 (Middle) */}
              <TugCharacter
                x={225}
                y={200}
                team="blue"
                role="middle"
                isPulling={blueTeam.isPulling}
                isStumbling={blueTeam.isStumbling}
                playerIndex={2}
                label="Bền Bỉ"
              />
              {/* Blue Player 1 (Front / Captain) */}
              <TugCharacter
                x={310}
                y={200}
                team="blue"
                role="captain"
                isPulling={blueTeam.isPulling}
                isStumbling={blueTeam.isStumbling}
                playerIndex={1}
                label="Đội Trưởng"
              />
            </g>

            {/* RED TEAM (3 Characters on Right side of rope) */}
            <g id="team-red-members">
              {/* Red Player 1 (Front / Captain) */}
              <TugCharacter
                x={690}
                y={200}
                team="red"
                role="captain"
                isPulling={redTeam.isPulling}
                isStumbling={redTeam.isStumbling}
                playerIndex={1}
                label="Đội Trưởng"
              />
              {/* Red Player 2 (Middle) */}
              <TugCharacter
                x={775}
                y={200}
                team="red"
                role="middle"
                isPulling={redTeam.isPulling}
                isStumbling={redTeam.isStumbling}
                playerIndex={2}
                label="Bền Bỉ"
              />
              {/* Red Player 3 (Anchor / End) */}
              <TugCharacter
                x={860}
                y={200}
                team="red"
                role="anchor"
                isPulling={redTeam.isPulling}
                isStumbling={redTeam.isStumbling}
                playerIndex={3}
                label="Cự Phách"
              />
            </g>
          </motion.g>

          {/* ACTIVE TURN LIGHT BEACON OVERHEAD */}
          {activeTurn && (
            <motion.g
              animate={{ opacity: [0.6, 0.95, 0.6], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              {activeTurn === 'blue' ? (
                <g transform="translate(240, 70)">
                  <rect x="-70" y="-18" width="140" height="32" rx="16" fill="#1d4ed8" />
                  <polygon points="0,18 -8,14 8,14" fill="#1d4ed8" />
                  <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">
                    LƯỢT ĐỘI XANH
                  </text>
                </g>
              ) : (
                <g transform="translate(760, 70)">
                  <rect x="-70" y="-18" width="140" height="32" rx="16" fill="#b91c1c" />
                  <polygon points="0,18 -8,14 8,14" fill="#b91c1c" />
                  <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">
                    LƯỢT ĐỘI ĐỎ
                  </text>
                </g>
              )}
            </motion.g>
          )}
        </svg>
      </div>

      {/* Dynamic Tug Meter Bar */}
      <div className="mt-3 flex flex-col gap-1.5 px-2">
        <div className="flex items-center justify-between text-xs font-bold sm:text-sm">
          <div className="flex items-center gap-1.5 text-blue-700">
            <span className="inline-block h-3 w-3 rounded-full bg-blue-600 animate-pulse" />
            <span>ĐỘI XANH {clampedPos < 0 ? `(Chiếm ưu thế ${Math.abs(Math.round(clampedPos))}%)` : ''}</span>
          </div>
          <div className="text-slate-600 font-mono text-xs">
            {clampedPos === 0
              ? '⚖️ CÂN BẰNG TẠI TRUNG TÂM'
              : clampedPos < 0
              ? `⬅️ Dây lệch về XANH ${Math.abs(Math.round(clampedPos))}%`
              : `Dây lệch về ĐỎ ${Math.round(clampedPos)}% ➡️`}
          </div>
          <div className="flex items-center gap-1.5 text-red-700">
            <span>{clampedPos > 0 ? `(Chiếm ưu thế ${Math.round(clampedPos)}%) ` : ''}ĐỘI ĐỎ</span>
            <span className="inline-block h-3 w-3 rounded-full bg-red-600 animate-pulse" />
          </div>
        </div>

        {/* Meter Gauge */}
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-200 shadow-inner p-0.5 border border-slate-300">
          {/* Left Win Zone (0 to 15% from left) */}
          <div className="absolute top-0 bottom-0 left-0 w-[15%] bg-blue-200/90 border-r border-blue-400" />
          {/* Right Win Zone (85% to 100% from left) */}
          <div className="absolute top-0 bottom-0 right-0 w-[15%] bg-red-200/90 border-l border-red-400" />
          {/* Center line marker */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-slate-500 z-10" />

          {/* Tug of war marker bead */}
          {/* Map clampedPos (-100 to +100) to 0% to 100% */}
          <motion.div
            className="absolute top-0 bottom-0 w-6 -ml-3 rounded-full shadow-md z-20 flex items-center justify-center text-[10px] font-black text-white"
            style={{
              left: `${50 + clampedPos * 0.45}%`,
              backgroundColor: clampedPos < 0 ? '#2563eb' : clampedPos > 0 ? '#dc2626' : '#f59e0b',
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            ●
          </motion.div>
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 font-medium px-1">
          <span className="text-blue-600 font-bold">VẠCH THẮNG XANH</span>
          <span>VẠCH XUẤT PHÁT GIỮA</span>
          <span className="text-red-600 font-bold">VẠCH THẮNG ĐỎ</span>
        </div>
      </div>
    </div>
  );
};

// Character component representing 1 tugger
interface TugCharacterProps {
  x: number;
  y: number;
  team: 'blue' | 'red';
  role: 'captain' | 'middle' | 'anchor';
  isPulling: boolean;
  isStumbling: boolean;
  playerIndex: number;
  label: string;
}

const TugCharacter: React.FC<TugCharacterProps> = ({
  x,
  y,
  team,
  isPulling,
  isStumbling,
  playerIndex,
}) => {
  const isBlue = team === 'blue';

  // Leaning angle:
  // When pulling: Blue leans left (-18 deg), Red leans right (+18 deg)
  // When stumbling: Blue slips right (+12 deg), Red slips left (-12 deg)
  const defaultAngle = isBlue ? -8 : 8;
  const pullAngle = isBlue ? -22 : 22;
  const slipAngle = isBlue ? 14 : -14;

  const currentAngle = isPulling ? pullAngle : isStumbling ? slipAngle : defaultAngle;

  const primaryColor = isBlue ? '#2563eb' : '#dc2626';
  const bandanaColor = isBlue ? '#1d4ed8' : '#b91c1c';
  const skinTone = playerIndex === 2 ? '#fbd38d' : playerIndex === 3 ? '#f6ad55' : '#fed7aa';

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Dynamic Motion Group for lean, pull, stumble */}
      <motion.g
        animate={{
          rotate: currentAngle,
          y: isPulling ? [0, -3, 0] : isStumbling ? [0, 6, 2] : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 18,
        }}
        style={{ transformOrigin: 'bottom center' }}
      >
        {/* Shadow */}
        <ellipse cx="0" cy="115" rx="22" ry="7" fill="#00000025" />

        {/* Legs planted firmly */}
        {isBlue ? (
          // Blue facing right, pulling leftwards
          <g>
            {/* Back Leg (Left) */}
            <path
              d="M -10 65 L -26 112 L -34 114"
              stroke="#1e3a8a"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Front Leg (Right, bracing) */}
            <path
              d="M 8 65 L 18 108 L 28 114"
              stroke="#1e3a8a"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Shoes */}
            <ellipse cx="-30" cy="114" rx="7" ry="4" fill="#0f172a" />
            <ellipse cx="24" cy="114" rx="7" ry="4" fill="#0f172a" />
          </g>
        ) : (
          // Red facing left, pulling rightwards
          <g>
            {/* Front Leg (Left, bracing) */}
            <path
              d="M -8 65 L -18 108 L -28 114"
              stroke="#7f1d1d"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Back Leg (Right) */}
            <path
              d="M 10 65 L 26 112 L 34 114"
              stroke="#7f1d1d"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Shoes */}
            <ellipse cx="-24" cy="114" rx="7" ry="4" fill="#0f172a" />
            <ellipse cx="30" cy="114" rx="7" ry="4" fill="#0f172a" />
          </g>
        )}

        {/* Torso / Jersey */}
        <path
          d="M -15,22 L 15,22 L 12,68 L -12,68 Z"
          fill={primaryColor}
          rx="5"
        />
        {/* Team Number */}
        <text
          x="0"
          y="48"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="14"
          fontWeight="900"
          fontFamily="sans-serif"
        >
          {playerIndex}
        </text>

        {/* Arms holding the rope */}
        {isBlue ? (
          <g>
            {/* Back arm */}
            <path
              d="M -12 28 L 5 44 L 20 40"
              stroke={skinTone}
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Fist on rope */}
            <circle cx="18" cy="40" r="5" fill={skinTone} stroke="#c05621" strokeWidth="1" />
            {/* Front arm */}
            <path
              d="M 12 30 L 26 42 L 34 40"
              stroke={skinTone}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="32" cy="40" r="5" fill={skinTone} stroke="#c05621" strokeWidth="1" />
          </g>
        ) : (
          <g>
            {/* Back arm */}
            <path
              d="M 12 28 L -5 44 L -20 40"
              stroke={skinTone}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="-18" cy="40" r="5" fill={skinTone} stroke="#c05621" strokeWidth="1" />
            {/* Front arm */}
            <path
              d="M -12 30 L -26 42 L -34 40"
              stroke={skinTone}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="-32" cy="40" r="5" fill={skinTone} stroke="#c05621" strokeWidth="1" />
          </g>
        )}

        {/* Head */}
        <circle cx="0" cy="8" r="15" fill={skinTone} />

        {/* Hair / Headband */}
        <path
          d="M -15,5 Q 0,-12 15,5 Q 12,-16 -4,-16 Q -14,-14 -15,5 Z"
          fill="#1e293b"
        />
        {/* Colored Bandana */}
        <rect x="-15" y="-1" width="30" height="6" rx="2" fill={bandanaColor} />
        {/* Bandana Knot Knot tail */}
        <polygon
          points={isBlue ? '-15,1 -22,-3 -20,6' : '15,1 22,-3 20,6'}
          fill={bandanaColor}
        />

        {/* Face Expressions */}
        {isStumbling ? (
          // Dizzy / shocked eyes (X X) and wavy mouth
          <g>
            <text x={isBlue ? '3' : '-7'} y="9" fontSize="9" fontWeight="bold" fill="#334155">
              ✖
            </text>
            <path
              d={isBlue ? 'M 2,16 Q 6,12 10,16' : 'M -10,16 Q -6,12 -2,16'}
              fill="none"
              stroke="#334155"
              strokeWidth="1.5"
            />
          </g>
        ) : isPulling ? (
          // Determined grit face (> <)
          <g>
            <path
              d={isBlue ? 'M 3,6 L 8,9 L 3,11' : 'M -3,6 L -8,9 L -3,11'}
              fill="none"
              stroke="#1e293b"
              strokeWidth="1.8"
            />
            {/* Grit mouth */}
            <rect
              x={isBlue ? '4' : '-10'}
              y="14"
              width="7"
              height="3"
              rx="1"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="1"
            />
          </g>
        ) : (
          // Normal game face
          <g>
            <circle cx={isBlue ? '6' : '-6'} cy="7" r="2" fill="#0f172a" />
            <path
              d={isBlue ? 'M 4,14 Q 8,16 11,14' : 'M -11,14 Q -8,16 -4,14'}
              fill="none"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
          </g>
        )}

        {/* Sweat drops or power sparks */}
        {isPulling && (
          <g>
            <circle cx={isBlue ? '-14' : '14'} cy="-6" r="3" fill="#38bdf8" />
            <circle cx={isBlue ? '-18' : '18'} cy="2" r="2" fill="#38bdf8" />
          </g>
        )}

        {isStumbling && (
          <g>
            <text x="0" y="-12" textAnchor="middle" fontSize="11" fill="#f59e0b">
              💫
            </text>
          </g>
        )}
      </motion.g>
    </g>
  );
};
