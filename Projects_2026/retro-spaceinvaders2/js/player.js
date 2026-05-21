// Player ship

class Player {
    constructor() {
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.x = GAME_WIDTH / 2;
        this.y = GAME_HEIGHT - 60;
        this.speed = 300;
        this.velocity = 0;
        this.acceleration = 1500;
        this.friction = 0.9;
        this.color = Colors.neonCyan;
        this.canShoot = true;
        this.shootCooldown = 0;
        this.shootDelay = 0.25;
        this.invincible = false;
        this.invincibleTime = 0;
        this.visible = true;
        this.blinkTimer = 0;
    }
    
    reset() {
        this.x = GAME_WIDTH / 2;
        this.velocity = 0;
        this.invincible = false;
        this.invincibleTime = 0;
        this.visible = true;
        this.canShoot = true;
        this.shootCooldown = 0;
    }
    
    update(deltaTime, input) {
        // Handle movement
        if (input.left) {
            this.velocity -= this.acceleration * deltaTime;
        }
        if (input.right) {
            this.velocity += this.acceleration * deltaTime;
        }
        
        // Apply friction when not pressing keys
        if (!input.left && !input.right) {
            this.velocity *= this.friction;
        }
        
        // Clamp velocity
        this.velocity = Utils.clamp(this.velocity, -this.speed, this.speed);
        
        // Update position
        this.x += this.velocity * deltaTime;
        
        // Keep in bounds
        const halfWidth = this.width / 2;
        this.x = Utils.clamp(this.x, halfWidth + 10, GAME_WIDTH - halfWidth - 10);
        
        // Update shoot cooldown
        if (this.shootCooldown > 0) {
            this.shootCooldown -= deltaTime;
        }
        
        // Handle shooting
        if (input.shoot && this.shootCooldown <= 0) {
            if (Bullets.shootPlayer(this.x, this.y - this.height / 2)) {
                this.shootCooldown = this.shootDelay;
            }
        }
        
        // Update invincibility
        if (this.invincible) {
            this.invincibleTime -= deltaTime;
            this.blinkTimer += deltaTime;
            
            // Blink effect
            if (this.blinkTimer > 0.1) {
                this.visible = !this.visible;
                this.blinkTimer = 0;
            }
            
            if (this.invincibleTime <= 0) {
                this.invincible = false;
                this.visible = true;
            }
        }
    }
    
    draw(ctx) {
        if (!this.visible) return;
        
        const x = this.x;
        const y = this.y;
        const w = this.width;
        const h = this.height;
        
        Utils.applyGlow(ctx, this.color, 15);
        ctx.fillStyle = this.color;
        
        // Draw ship body (pixel art style)
        ctx.beginPath();
        
        // Main body
        ctx.fillRect(x - w/2, y - h/4, w, h/2);
        
        // Cockpit/top
        ctx.fillRect(x - w/6, y - h/2, w/3, h/4);
        ctx.fillRect(x - w/10, y - h/2 - 5, w/5, 5);
        
        // Wings
        ctx.fillRect(x - w/2 - 5, y, 10, h/3);
        ctx.fillRect(x + w/2 - 5, y, 10, h/3);
        
        // Engine glow
        ctx.fillStyle = Colors.neonMagenta;
        Utils.applyGlow(ctx, Colors.neonMagenta, 10);
        ctx.fillRect(x - w/4, y + h/4 - 2, w/2, 6);
        
        // Bright core
        ctx.fillStyle = Colors.white;
        ctx.fillRect(x - w/6, y - h/4, w/3, h/4);
        
        Utils.clearGlow(ctx);
    }
    
    hit() {
        this.invincible = true;
        this.invincibleTime = 2;
        this.blinkTimer = 0;
        Audio.playPlayerDeath();
        Effects.createExplosion(this.x, this.y, Colors.neonCyan, 30);
        Effects.shake(8, 0.3);
    }
    
    getRect() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height
        };
    }
}
