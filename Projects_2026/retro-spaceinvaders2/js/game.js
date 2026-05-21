// Main Game Controller

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;
        
        // Game state
        this.state = 'start'; // start, playing, paused, gameOver, waveTransition
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('spaceInvadersHighScore')) || 0;
        this.lives = 3;
        this.wave = 1;
        
        // Game objects
        this.player = new Player();
        this.invaderFleet = new InvaderFleet();
        
        // Input state
        this.input = {
            left: false,
            right: false,
            shoot: false
        };
        
        // Timing
        this.lastTime = 0;
        this.gameTime = 0;
        this.waveTransitionTimer = 0;
        
        // UI Elements
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('highScore');
        this.livesElement = document.getElementById('lives');
        this.startScreen = document.getElementById('startScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.waveScreen = document.getElementById('waveScreen');
        this.waveNumberElement = document.getElementById('waveNumber');
        this.finalScoreElement = document.getElementById('finalScore');
        this.gameContainer = document.querySelector('.game-container');
        
        // Initialize
        this.setupInput();
        this.updateUI();
        Effects.init(GAME_WIDTH, GAME_HEIGHT);
        
        // Start game loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    setupInput() {
        // Keyboard input
        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                this.input.left = true;
            }
            if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                this.input.right = true;
            }
            if (e.code === 'Space') {
                e.preventDefault();
                this.input.shoot = true;
                this.handleSpacePress();
            }
            if (e.code === 'KeyM') {
                Audio.toggleMute();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
                this.input.left = false;
            }
            if (e.code === 'ArrowRight' || e.code === 'KeyD') {
                this.input.right = false;
            }
            if (e.code === 'Space') {
                this.input.shoot = false;
            }
        });
    }
    
    handleSpacePress() {
        Audio.init();
        Audio.resume();
        
        if (this.state === 'start') {
            this.startGame();
        } else if (this.state === 'gameOver') {
            this.resetGame();
        }
    }
    
    startGame() {
        this.state = 'playing';
        this.startScreen.classList.add('hidden');
        this.invaderFleet.init(this.wave);
        Shields.init();
    }
    
    resetGame() {
        this.score = 0;
        this.lives = 3;
        this.wave = 1;
        this.player.reset();
        this.invaderFleet.init(this.wave);
        Shields.init();
        Bullets.clear();
        Effects.clear();
        this.gameOverScreen.classList.add('hidden');
        this.state = 'playing';
        this.updateUI();
    }
    
    gameLoop(currentTime) {
        // Calculate delta time
        const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;
        this.gameTime += deltaTime;
        
        // Update
        this.update(deltaTime);
        
        // Render
        this.render();
        
        // Continue loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    update(deltaTime) {
        // Always update effects (stars, particles)
        Effects.update(deltaTime);
        
        if (this.state !== 'playing') {
            if (this.state === 'waveTransition') {
                this.waveTransitionTimer -= deltaTime;
                if (this.waveTransitionTimer <= 0) {
                    this.waveScreen.classList.add('hidden');
                    this.state = 'playing';
                }
            }
            return;
        }
        
        // Update player
        this.player.update(deltaTime, this.input);
        
        // Update invaders
        this.invaderFleet.update(deltaTime);
        
        // Update bullets
        Bullets.update(deltaTime);
        
        // Check collisions
        this.checkCollisions();
        
        // Check shields for invader damage
        Shields.checkInvaderCollision(this.invaderFleet.invaders);
        
        // Check win/lose conditions
        this.checkGameState();
    }
    
    checkCollisions() {
        // Player bullets vs invaders
        for (const bullet of Bullets.playerBullets) {
            if (!bullet.active) continue;
            
            // Check shields first
            if (Shields.checkBulletCollision(bullet)) {
                bullet.active = false;
                continue;
            }
            
            // Check invaders
            const result = this.invaderFleet.checkCollision(bullet);
            if (result.hit) {
                bullet.active = false;
                this.addScore(result.points);
            }
        }
        
        // Enemy bullets vs player
        if (!this.player.invincible) {
            for (const bullet of Bullets.enemyBullets) {
                if (!bullet.active) continue;
                
                // Check shields
                if (Shields.checkBulletCollision(bullet)) {
                    bullet.active = false;
                    continue;
                }
                
                // Check player
                if (Utils.rectCollision(bullet.getRect(), this.player.getRect())) {
                    bullet.active = false;
                    this.playerHit();
                }
            }
        }
    }
    
    playerHit() {
        this.lives--;
        this.player.hit();
        this.updateUI();
        
        // Add screen shake class for CSS animation
        this.gameContainer.classList.add('shake');
        setTimeout(() => this.gameContainer.classList.remove('shake'), 300);
        
        if (this.lives <= 0) {
            this.gameOver();
        }
    }
    
    addScore(points) {
        this.score += points;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('spaceInvadersHighScore', this.highScore);
        }
        this.updateUI();
    }
    
    checkGameState() {
        // Check if all invaders are dead
        if (this.invaderFleet.getAliveCount() === 0) {
            this.nextWave();
            return;
        }
        
        // Check if invaders reached the bottom
        if (this.invaderFleet.getLowestY() >= this.player.y - 20) {
            this.gameOver();
        }
    }
    
    nextWave() {
        this.wave++;
        Audio.playWaveComplete();
        Bullets.clear();
        this.player.reset();
        
        // Show wave screen
        this.waveNumberElement.textContent = this.wave;
        this.waveScreen.classList.remove('hidden');
        this.state = 'waveTransition';
        this.waveTransitionTimer = 2;
        
        // Initialize new wave
        this.invaderFleet.init(this.wave);
        
        // Repair shields slightly for new wave
        if (this.wave % 3 === 1) {
            Shields.reset();
        }
    }
    
    gameOver() {
        this.state = 'gameOver';
        Audio.playGameOver();
        this.finalScoreElement.textContent = Utils.formatScore(this.score);
        this.gameOverScreen.classList.remove('hidden');
        Effects.shake(10, 0.5);
    }
    
    updateUI() {
        this.scoreElement.textContent = Utils.formatScore(this.score);
        this.highScoreElement.textContent = Utils.formatScore(this.highScore);
        
        // Display lives as ship icons
        let livesHTML = '';
        for (let i = 0; i < this.lives; i++) {
            livesHTML += '▲ ';
        }
        this.livesElement.textContent = livesHTML;
    }
    
    render() {
        const ctx = this.ctx;
        
        // Apply screen shake
        const shakeOffset = Effects.getShakeOffset();
        ctx.save();
        ctx.translate(shakeOffset.x, shakeOffset.y);
        
        // Clear canvas
        ctx.fillStyle = Colors.darkBg;
        ctx.fillRect(-10, -10, GAME_WIDTH + 20, GAME_HEIGHT + 20);
        
        // Draw starfield background
        Effects.drawStars(ctx, this.gameTime);
        
        // Draw game objects
        if (this.state === 'playing' || this.state === 'waveTransition' || this.state === 'gameOver') {
            Shields.draw(ctx);
            this.invaderFleet.draw(ctx);
            this.player.draw(ctx);
            Bullets.draw(ctx);
        }
        
        // Draw particles (always)
        Effects.drawParticles(ctx);
        
        ctx.restore();
    }
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});
