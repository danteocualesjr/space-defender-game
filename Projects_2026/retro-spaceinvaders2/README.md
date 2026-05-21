# Retro Space Invaders

A neon synthwave-styled Space Invaders game built with HTML5 Canvas and vanilla JavaScript.

## Play the Game

Simply open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge).

### Using Python (if available):
```bash
python -m http.server 8000
```
Then open http://localhost:8000

### Using Node.js (if available):
```bash
npx serve
```

## Controls

| Key | Action |
|-----|--------|
| ← / A | Move Left |
| → / D | Move Right |
| Space | Fire / Start Game |
| M | Toggle Mute |

## Features

- Classic Space Invaders gameplay
- Neon synthwave visual aesthetic with glowing effects
- CRT-style scanline overlay
- Destructible shields with pixel-level damage
- Mystery UFO with random point values
- Progressive difficulty across waves
- Synthesized retro sound effects
- High score persistence (localStorage)
- Screen shake effects
- Animated starfield background

## Scoring

| Enemy | Points |
|-------|--------|
| Top Row (Squid) | 30 |
| Middle Rows (Crab) | 20 |
| Bottom Rows (Octopus) | 10 |
| Mystery UFO | 50-300 |

## Technical Details

- Pure HTML5 Canvas rendering
- Web Audio API for synthesized sounds
- No external dependencies
- Responsive design
- 60 FPS game loop
