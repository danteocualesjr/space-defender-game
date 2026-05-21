// Utility functions for Space Invaders

const Utils = {
    // Random number between min and max (inclusive)
    random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    // Random float between min and max
    randomFloat: (min, max) => Math.random() * (max - min) + min,
    
    // Clamp value between min and max
    clamp: (value, min, max) => Math.max(min, Math.min(max, value)),
    
    // Linear interpolation
    lerp: (start, end, t) => start + (end - start) * t,
    
    // Distance between two points
    distance: (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
    
    // Check rectangle collision
    rectCollision: (rect1, rect2) => {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    },
    
    // Format score with leading zeros
    formatScore: (score, digits = 4) => {
        return String(score).padStart(digits, '0');
    },
    
    // Create a glow effect for drawing
    applyGlow: (ctx, color, blur = 10) => {
        ctx.shadowColor = color;
        ctx.shadowBlur = blur;
    },
    
    // Clear glow effect
    clearGlow: (ctx) => {
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
    },
    
    // Convert hex color to rgba
    hexToRgba: (hex, alpha = 1) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
    
    // Ease out quad
    easeOutQuad: (t) => t * (2 - t),
    
    // Ease in out quad
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
};

// Color palette for the game
const Colors = {
    neonCyan: '#00ffff',
    neonMagenta: '#ff00ff',
    neonPurple: '#bf00ff',
    neonGreen: '#39ff14',
    neonYellow: '#ffff00',
    neonOrange: '#ff6600',
    neonRed: '#ff0040',
    neonPink: '#ff1493',
    white: '#ffffff',
    darkBg: '#0a0a12'
};

// Game constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 30;
const INVADER_ROWS = 5;
const INVADER_COLS = 11;
const INVADER_WIDTH = 40;
const INVADER_HEIGHT = 30;
const INVADER_PADDING = 10;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 15;
const SHIELD_COUNT = 4;
