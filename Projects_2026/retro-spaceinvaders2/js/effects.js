// Visual effects system - particles, explosions, stars

class Particle {
    constructor(x, y, vx, vy, color, size, life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = size;
        this.life = life;
        this.maxLife = life;
        this.active = true;
    }
    
    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.vy += 200 * deltaTime; // Gravity
        this.life -= deltaTime;
        
        if (this.life <= 0) {
            this.active = false;
        }
    }
    
    draw(ctx) {
        const alpha = this.life / this.maxLife;
        ctx.fillStyle = Utils.hexToRgba(this.color, alpha);
        Utils.applyGlow(ctx, this.color, 5 * alpha);
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        Utils.clearGlow(ctx);
    }
}

class Star {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.reset();
    }
    
    reset() {
        this.x = Utils.random(0, this.canvasWidth);
        this.y = Utils.random(0, this.canvasHeight);
        this.size = Utils.randomFloat(0.5, 2);
        this.speed = this.size * 20;
        this.brightness = Utils.randomFloat(0.3, 1);
        this.twinkleSpeed = Utils.randomFloat(2, 5);
        this.twinkleOffset = Utils.randomFloat(0, Math.PI * 2);
    }
    
    update(deltaTime) {
        this.y += this.speed * deltaTime;
        if (this.y > this.canvasHeight) {
            this.y = 0;
            this.x = Utils.random(0, this.canvasWidth);
        }
    }
    
    draw(ctx, time) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * this.twinkleSpeed + this.twinkleOffset);
        const alpha = this.brightness * twinkle;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class EffectsManager {
    constructor() {
        this.particles = [];
        this.stars = [];
        this.screenShake = 0;
        this.screenShakeIntensity = 0;
    }
    
    init(canvasWidth, canvasHeight) {
        // Create starfield
        this.stars = [];
        for (let i = 0; i < 100; i++) {
            this.stars.push(new Star(canvasWidth, canvasHeight));
        }
    }
    
    // Create explosion at position
    createExplosion(x, y, color, count = 20) {
        for (let i = 0; i < count; i++) {
            const angle = Utils.randomFloat(0, Math.PI * 2);
            const speed = Utils.randomFloat(50, 200);
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const size = Utils.random(2, 6);
            const life = Utils.randomFloat(0.3, 0.8);
            
            this.particles.push(new Particle(x, y, vx, vy, color, size, life));
        }
    }
    
    // Create pixel debris (for invader death)
    createPixelDebris(x, y, width, height, color) {
        const pixelSize = 4;
        const cols = Math.floor(width / pixelSize);
        const rows = Math.floor(height / pixelSize);
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (Math.random() > 0.3) continue; // Only some pixels
                
                const px = x + col * pixelSize;
                const py = y + row * pixelSize;
                const vx = Utils.randomFloat(-100, 100);
                const vy = Utils.randomFloat(-150, 50);
                const life = Utils.randomFloat(0.5, 1);
                
                this.particles.push(new Particle(px, py, vx, vy, color, pixelSize, life));
            }
        }
    }
    
    // Trigger screen shake
    shake(intensity = 5, duration = 0.2) {
        this.screenShake = duration;
        this.screenShakeIntensity = intensity;
    }
    
    // Get current shake offset
    getShakeOffset() {
        if (this.screenShake <= 0) return { x: 0, y: 0 };
        
        return {
            x: Utils.randomFloat(-this.screenShakeIntensity, this.screenShakeIntensity),
            y: Utils.randomFloat(-this.screenShakeIntensity, this.screenShakeIntensity)
        };
    }
    
    update(deltaTime) {
        // Update particles
        this.particles = this.particles.filter(p => p.active);
        this.particles.forEach(p => p.update(deltaTime));
        
        // Update stars
        this.stars.forEach(s => s.update(deltaTime));
        
        // Update screen shake
        if (this.screenShake > 0) {
            this.screenShake -= deltaTime;
        }
    }
    
    drawStars(ctx, time) {
        this.stars.forEach(s => s.draw(ctx, time));
    }
    
    drawParticles(ctx) {
        this.particles.forEach(p => p.draw(ctx));
    }
    
    clear() {
        this.particles = [];
    }
}

// Global effects instance
const Effects = new EffectsManager();
