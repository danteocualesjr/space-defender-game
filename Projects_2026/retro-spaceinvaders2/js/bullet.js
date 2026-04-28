// Bullet/Projectile system

class Bullet {
    constructor(x, y, speed, isPlayer = true) {
        this.x = x;
        this.y = y;
        this.width = BULLET_WIDTH;
        this.height = BULLET_HEIGHT;
        this.speed = speed;
        this.isPlayer = isPlayer;
        this.active = true;
        this.color = isPlayer ? Colors.neonCyan : Colors.neonGreen;
    }
    
    update(deltaTime) {
        this.y += this.speed * deltaTime;
        
        // Remove if off screen
        if (this.y < -this.height || this.y > GAME_HEIGHT + this.height) {
            this.active = false;
        }
    }
    
    draw(ctx) {
        Utils.applyGlow(ctx, this.color, 10);
        
        if (this.isPlayer) {
            // Player bullet - thin laser
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);
            
            // Bright core
            ctx.fillStyle = Colors.white;
            ctx.fillRect(this.x - 1, this.y + 2, 2, this.height - 4);
        } else {
            // Enemy bullet - zigzag style
            ctx.fillStyle = this.color;
            const segments = 3;
            const segHeight = this.height / segments;
            
            for (let i = 0; i < segments; i++) {
                const offset = (i % 2 === 0) ? -2 : 2;
                ctx.fillRect(
                    this.x - this.width / 2 + offset,
                    this.y + i * segHeight,
                    this.width,
                    segHeight
                );
            }
        }
        
        Utils.clearGlow(ctx);
    }
    
    getRect() {
        return {
            x: this.x - this.width / 2,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}

class BulletManager {
    constructor() {
        this.playerBullets = [];
        this.enemyBullets = [];
        this.maxPlayerBullets = 3;
    }
    
    shootPlayer(x, y) {
        if (this.playerBullets.length >= this.maxPlayerBullets) return false;
        
        this.playerBullets.push(new Bullet(x, y, -500, true));
        Audio.playShoot();
        return true;
    }
    
    shootEnemy(x, y) {
        this.enemyBullets.push(new Bullet(x, y, 250, false));
        Audio.playInvaderShoot();
    }
    
    update(deltaTime) {
        // Update and filter player bullets
        this.playerBullets.forEach(b => b.update(deltaTime));
        this.playerBullets = this.playerBullets.filter(b => b.active);
        
        // Update and filter enemy bullets
        this.enemyBullets.forEach(b => b.update(deltaTime));
        this.enemyBullets = this.enemyBullets.filter(b => b.active);
    }
    
    draw(ctx) {
        this.playerBullets.forEach(b => b.draw(ctx));
        this.enemyBullets.forEach(b => b.draw(ctx));
    }
    
    clear() {
        this.playerBullets = [];
        this.enemyBullets = [];
    }
}

// Global bullet manager
const Bullets = new BulletManager();
