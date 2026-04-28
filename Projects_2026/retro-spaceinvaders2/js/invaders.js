// Invader fleet system

// Invader sprites as pixel patterns (1 = filled, 0 = empty)
const INVADER_SPRITES = {
    // Type 1 - Top row (small squid) - 30 points
    type1: {
        frame1: [
            [0,0,0,1,1,0,0,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,0],
            [1,1,0,1,1,0,1,1],
            [1,1,1,1,1,1,1,1],
            [0,0,1,0,0,1,0,0],
            [0,1,0,1,1,0,1,0],
            [1,0,1,0,0,1,0,1]
        ],
        frame2: [
            [0,0,0,1,1,0,0,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,0],
            [1,1,0,1,1,0,1,1],
            [1,1,1,1,1,1,1,1],
            [0,1,0,1,1,0,1,0],
            [1,0,0,0,0,0,0,1],
            [0,1,0,0,0,0,1,0]
        ],
        points: 30,
        color: Colors.neonMagenta
    },
    // Type 2 - Middle rows (crab) - 20 points
    type2: {
        frame1: [
            [0,1,0,0,0,0,1,0],
            [0,0,1,0,0,1,0,0],
            [0,1,1,1,1,1,1,0],
            [1,1,0,1,1,0,1,1],
            [1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1],
            [1,0,1,0,0,1,0,1],
            [0,1,0,0,0,0,1,0]
        ],
        frame2: [
            [0,1,0,0,0,0,1,0],
            [1,0,1,0,0,1,0,1],
            [1,1,1,1,1,1,1,1],
            [1,1,0,1,1,0,1,1],
            [1,1,1,1,1,1,1,1],
            [0,1,1,1,1,1,1,0],
            [0,1,0,0,0,0,1,0],
            [1,0,0,0,0,0,0,1]
        ],
        points: 20,
        color: Colors.neonCyan
    },
    // Type 3 - Bottom rows (octopus) - 10 points  
    type3: {
        frame1: [
            [0,0,0,1,1,0,0,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,0],
            [1,1,0,1,1,0,1,1],
            [1,1,1,1,1,1,1,1],
            [0,0,1,0,0,1,0,0],
            [0,1,0,1,1,0,1,0],
            [1,0,1,0,0,1,0,1]
        ],
        frame2: [
            [0,0,0,1,1,0,0,0],
            [0,0,1,1,1,1,0,0],
            [0,1,1,1,1,1,1,0],
            [1,1,0,1,1,0,1,1],
            [1,1,1,1,1,1,1,1],
            [0,0,1,0,0,1,0,0],
            [0,1,1,0,0,1,1,0],
            [1,1,0,0,0,0,1,1]
        ],
        points: 10,
        color: Colors.neonGreen
    }
};

// UFO sprite
const UFO_SPRITE = [
    [0,0,0,0,1,1,1,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
    [1,1,0,1,1,0,1,1,0,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,1,1,1,0,0,0,0,1,1,1,0,0],
    [0,0,0,1,0,0,0,0,0,0,1,0,0,0]
];

class Invader {
    constructor(x, y, type, row, col) {
        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
        this.width = INVADER_WIDTH;
        this.height = INVADER_HEIGHT;
        this.type = type;
        this.sprite = INVADER_SPRITES[type];
        this.frame = 0;
        this.active = true;
        this.dying = false;
        this.deathTimer = 0;
    }
    
    draw(ctx, pixelSize = 4) {
        if (!this.active) return;
        
        const spriteData = this.frame === 0 ? this.sprite.frame1 : this.sprite.frame2;
        const color = this.dying ? Colors.white : this.sprite.color;
        
        Utils.applyGlow(ctx, color, this.dying ? 20 : 8);
        ctx.fillStyle = color;
        
        const spriteWidth = spriteData[0].length * pixelSize;
        const spriteHeight = spriteData.length * pixelSize;
        const startX = this.x - spriteWidth / 2;
        const startY = this.y - spriteHeight / 2;
        
        for (let row = 0; row < spriteData.length; row++) {
            for (let col = 0; col < spriteData[row].length; col++) {
                if (spriteData[row][col] === 1) {
                    ctx.fillRect(
                        startX + col * pixelSize,
                        startY + row * pixelSize,
                        pixelSize,
                        pixelSize
                    );
                }
            }
        }
        
        Utils.clearGlow(ctx);
    }
    
    getRect() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height
        };
    }
    
    kill() {
        this.dying = true;
        this.deathTimer = 0.1;
    }
}

class UFO {
    constructor() {
        this.width = 60;
        this.height = 28;
        this.x = -this.width;
        this.y = 50;
        this.speed = 150;
        this.direction = 1;
        this.active = false;
        this.color = Colors.neonRed;
        this.points = [50, 100, 150, 200, 300];
        this.soundTimer = 0;
    }
    
    spawn() {
        this.active = true;
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.x = this.direction > 0 ? -this.width : GAME_WIDTH + this.width;
    }
    
    update(deltaTime) {
        if (!this.active) return;
        
        this.x += this.speed * this.direction * deltaTime;
        
        // Play sound periodically
        this.soundTimer += deltaTime;
        if (this.soundTimer > 0.3) {
            Audio.playUFO();
            this.soundTimer = 0;
        }
        
        // Check if off screen
        if ((this.direction > 0 && this.x > GAME_WIDTH + this.width) ||
            (this.direction < 0 && this.x < -this.width)) {
            this.active = false;
        }
    }
    
    draw(ctx) {
        if (!this.active) return;
        
        const pixelSize = 4;
        Utils.applyGlow(ctx, this.color, 15);
        ctx.fillStyle = this.color;
        
        const startX = this.x - (UFO_SPRITE[0].length * pixelSize) / 2;
        const startY = this.y - (UFO_SPRITE.length * pixelSize) / 2;
        
        for (let row = 0; row < UFO_SPRITE.length; row++) {
            for (let col = 0; col < UFO_SPRITE[row].length; col++) {
                if (UFO_SPRITE[row][col] === 1) {
                    ctx.fillRect(
                        startX + col * pixelSize,
                        startY + row * pixelSize,
                        pixelSize,
                        pixelSize
                    );
                }
            }
        }
        
        Utils.clearGlow(ctx);
    }
    
    getRect() {
        return {
            x: this.x - this.width / 2,
            y: this.y - this.height / 2,
            width: this.width,
            height: this.height
        };
    }
    
    getPoints() {
        return this.points[Utils.random(0, this.points.length - 1)];
    }
}

class InvaderFleet {
    constructor() {
        this.invaders = [];
        this.ufo = new UFO();
        this.direction = 1;
        this.baseSpeed = 30;
        this.speed = this.baseSpeed;
        this.moveTimer = 0;
        this.moveInterval = 1;
        this.dropDistance = 20;
        this.frame = 0;
        this.shootTimer = 0;
        this.shootInterval = 1.5;
        this.ufoTimer = 0;
        this.ufoInterval = 15;
        this.wave = 1;
    }
    
    init(wave = 1) {
        this.invaders = [];
        this.wave = wave;
        this.direction = 1;
        this.frame = 0;
        this.speed = this.baseSpeed + (wave - 1) * 5;
        
        const startX = 100;
        const startY = 100 + Math.min((wave - 1) * 10, 50);
        
        // Row types: top row = type1, next 2 = type2, bottom 2 = type3
        const rowTypes = ['type1', 'type2', 'type2', 'type3', 'type3'];
        
        for (let row = 0; row < INVADER_ROWS; row++) {
            for (let col = 0; col < INVADER_COLS; col++) {
                const x = startX + col * (INVADER_WIDTH + INVADER_PADDING);
                const y = startY + row * (INVADER_HEIGHT + INVADER_PADDING);
                const type = rowTypes[row];
                
                this.invaders.push(new Invader(x, y, type, row, col));
            }
        }
        
        this.updateMoveInterval();
    }
    
    updateMoveInterval() {
        const aliveCount = this.invaders.filter(i => i.active).length;
        const speedMultiplier = 1 + (55 - aliveCount) / 55 * 3;
        this.moveInterval = Math.max(0.1, 1 / speedMultiplier);
    }
    
    update(deltaTime) {
        // Update dying invaders
        this.invaders.forEach(inv => {
            if (inv.dying) {
                inv.deathTimer -= deltaTime;
                if (inv.deathTimer <= 0) {
                    inv.active = false;
                    Effects.createPixelDebris(
                        inv.x - inv.width/2, 
                        inv.y - inv.height/2, 
                        inv.width, 
                        inv.height, 
                        inv.sprite.color
                    );
                }
            }
        });
        
        // Movement timer
        this.moveTimer += deltaTime;
        
        if (this.moveTimer >= this.moveInterval) {
            this.moveTimer = 0;
            this.move();
            Audio.playMarch();
        }
        
        // Shooting timer
        this.shootTimer += deltaTime;
        if (this.shootTimer >= this.shootInterval - this.wave * 0.1) {
            this.shootTimer = 0;
            this.shoot();
        }
        
        // UFO timer
        if (!this.ufo.active) {
            this.ufoTimer += deltaTime;
            if (this.ufoTimer >= this.ufoInterval) {
                this.ufoTimer = 0;
                this.ufo.spawn();
            }
        }
        
        this.ufo.update(deltaTime);
    }
    
    move() {
        const activeInvaders = this.invaders.filter(i => i.active && !i.dying);
        if (activeInvaders.length === 0) return;
        
        // Toggle animation frame
        this.frame = 1 - this.frame;
        activeInvaders.forEach(inv => inv.frame = this.frame);
        
        // Check boundaries
        let hitEdge = false;
        let minX = GAME_WIDTH, maxX = 0;
        
        activeInvaders.forEach(inv => {
            minX = Math.min(minX, inv.x - inv.width / 2);
            maxX = Math.max(maxX, inv.x + inv.width / 2);
        });
        
        if ((this.direction > 0 && maxX >= GAME_WIDTH - 20) ||
            (this.direction < 0 && minX <= 20)) {
            hitEdge = true;
        }
        
        if (hitEdge) {
            // Move down and reverse direction
            activeInvaders.forEach(inv => {
                inv.y += this.dropDistance;
            });
            this.direction *= -1;
        } else {
            // Move horizontally
            activeInvaders.forEach(inv => {
                inv.x += this.speed * this.direction;
            });
        }
        
        this.updateMoveInterval();
    }
    
    shoot() {
        const activeInvaders = this.invaders.filter(i => i.active && !i.dying);
        if (activeInvaders.length === 0) return;
        
        // Find bottom invaders in each column
        const bottomInvaders = [];
        for (let col = 0; col < INVADER_COLS; col++) {
            const columnInvaders = activeInvaders.filter(i => i.col === col);
            if (columnInvaders.length > 0) {
                const bottom = columnInvaders.reduce((a, b) => a.row > b.row ? a : b);
                bottomInvaders.push(bottom);
            }
        }
        
        // Random bottom invader shoots
        if (bottomInvaders.length > 0) {
            const shooter = bottomInvaders[Utils.random(0, bottomInvaders.length - 1)];
            Bullets.shootEnemy(shooter.x, shooter.y + shooter.height / 2);
        }
    }
    
    draw(ctx) {
        this.invaders.forEach(inv => inv.draw(ctx));
        this.ufo.draw(ctx);
    }
    
    getAliveCount() {
        return this.invaders.filter(i => i.active).length;
    }
    
    getLowestY() {
        const active = this.invaders.filter(i => i.active);
        if (active.length === 0) return 0;
        return Math.max(...active.map(i => i.y + i.height / 2));
    }
    
    checkCollision(bullet) {
        // Check UFO
        if (this.ufo.active && Utils.rectCollision(bullet.getRect(), this.ufo.getRect())) {
            const points = this.ufo.getPoints();
            this.ufo.active = false;
            Audio.playExplosion();
            Effects.createExplosion(this.ufo.x, this.ufo.y, Colors.neonRed, 40);
            return { hit: true, points: points };
        }
        
        // Check invaders
        for (const inv of this.invaders) {
            if (!inv.active || inv.dying) continue;
            
            if (Utils.rectCollision(bullet.getRect(), inv.getRect())) {
                inv.kill();
                Audio.playExplosion();
                return { hit: true, points: inv.sprite.points };
            }
        }
        
        return { hit: false, points: 0 };
    }
}
