// Destructible shield/barrier system

class Shield {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.pixelSize = 4;
        this.color = Colors.neonGreen;
        
        // Shield shape pattern (1 = solid, 0 = empty)
        this.pattern = [
            [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
            [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
            [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
            [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],
            [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1]
        ];
        
        // Create a copy of the pattern that we can modify
        this.pixels = this.pattern.map(row => [...row]);
        
        this.width = this.pixels[0].length * this.pixelSize;
        this.height = this.pixels.length * this.pixelSize;
    }
    
    reset() {
        this.pixels = this.pattern.map(row => [...row]);
    }
    
    draw(ctx) {
        Utils.applyGlow(ctx, this.color, 5);
        ctx.fillStyle = this.color;
        
        for (let row = 0; row < this.pixels.length; row++) {
            for (let col = 0; col < this.pixels[row].length; col++) {
                if (this.pixels[row][col] === 1) {
                    ctx.fillRect(
                        this.x + col * this.pixelSize,
                        this.y + row * this.pixelSize,
                        this.pixelSize,
                        this.pixelSize
                    );
                }
            }
        }
        
        Utils.clearGlow(ctx);
    }
    
    // Check bullet collision and damage shield
    checkCollision(bullet) {
        const bulletRect = bullet.getRect();
        
        // Quick bounds check
        if (bulletRect.x + bulletRect.width < this.x ||
            bulletRect.x > this.x + this.width ||
            bulletRect.y + bulletRect.height < this.y ||
            bulletRect.y > this.y + this.height) {
            return false;
        }
        
        // Detailed pixel collision
        let hit = false;
        const damageRadius = bullet.isPlayer ? 2 : 3;
        
        for (let row = 0; row < this.pixels.length; row++) {
            for (let col = 0; col < this.pixels[row].length; col++) {
                if (this.pixels[row][col] === 0) continue;
                
                const pixelX = this.x + col * this.pixelSize;
                const pixelY = this.y + row * this.pixelSize;
                
                const pixelRect = {
                    x: pixelX,
                    y: pixelY,
                    width: this.pixelSize,
                    height: this.pixelSize
                };
                
                if (Utils.rectCollision(bulletRect, pixelRect)) {
                    hit = true;
                    // Damage surrounding pixels
                    this.damageArea(col, row, damageRadius);
                    break;
                }
            }
            if (hit) break;
        }
        
        return hit;
    }
    
    // Damage pixels in an area
    damageArea(centerCol, centerRow, radius) {
        for (let row = centerRow - radius; row <= centerRow + radius; row++) {
            for (let col = centerCol - radius; col <= centerCol + radius; col++) {
                if (row < 0 || row >= this.pixels.length) continue;
                if (col < 0 || col >= this.pixels[row].length) continue;
                
                // Random chance to destroy pixel based on distance from center
                const dist = Math.abs(row - centerRow) + Math.abs(col - centerCol);
                const chance = 1 - dist / (radius * 2);
                
                if (Math.random() < chance) {
                    this.pixels[row][col] = 0;
                }
            }
        }
    }
    
    // Check if invader touches shield
    checkInvaderCollision(invaderRect) {
        // Quick bounds check
        if (invaderRect.x + invaderRect.width < this.x ||
            invaderRect.x > this.x + this.width ||
            invaderRect.y + invaderRect.height < this.y ||
            invaderRect.y > this.y + this.height) {
            return false;
        }
        
        // If invader overlaps, destroy overlapping portion
        let hit = false;
        
        for (let row = 0; row < this.pixels.length; row++) {
            for (let col = 0; col < this.pixels[row].length; col++) {
                if (this.pixels[row][col] === 0) continue;
                
                const pixelX = this.x + col * this.pixelSize;
                const pixelY = this.y + row * this.pixelSize;
                
                const pixelRect = {
                    x: pixelX,
                    y: pixelY,
                    width: this.pixelSize,
                    height: this.pixelSize
                };
                
                if (Utils.rectCollision(invaderRect, pixelRect)) {
                    this.pixels[row][col] = 0;
                    hit = true;
                }
            }
        }
        
        return hit;
    }
}

class ShieldManager {
    constructor() {
        this.shields = [];
    }
    
    init() {
        this.shields = [];
        
        const shieldSpacing = GAME_WIDTH / (SHIELD_COUNT + 1);
        const shieldY = GAME_HEIGHT - 150;
        
        for (let i = 0; i < SHIELD_COUNT; i++) {
            const x = shieldSpacing * (i + 1) - 40;
            this.shields.push(new Shield(x, shieldY));
        }
    }
    
    reset() {
        this.shields.forEach(s => s.reset());
    }
    
    draw(ctx) {
        this.shields.forEach(s => s.draw(ctx));
    }
    
    checkBulletCollision(bullet) {
        for (const shield of this.shields) {
            if (shield.checkCollision(bullet)) {
                return true;
            }
        }
        return false;
    }
    
    checkInvaderCollision(invaders) {
        for (const inv of invaders) {
            if (!inv.active) continue;
            
            for (const shield of this.shields) {
                shield.checkInvaderCollision(inv.getRect());
            }
        }
    }
}

// Global shields instance
const Shields = new ShieldManager();
