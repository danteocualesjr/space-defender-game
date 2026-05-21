// Audio system using Web Audio API for retro synthesized sounds

class AudioManager {
    constructor() {
        this.audioContext = null;
        this.masterGain = null;
        this.initialized = false;
        this.muted = false;
        this.marchIndex = 0;
        this.marchNotes = [55, 49, 46, 41]; // Bass notes for march
    }
    
    init() {
        if (this.initialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = 0.3;
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }
    
    resume() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
    
    // Create an oscillator with envelope
    playTone(frequency, duration, type = 'square', attack = 0.01, decay = 0.1) {
        if (!this.initialized || this.muted) return;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = type;
        osc.frequency.value = frequency;
        
        gain.gain.setValueAtTime(0, this.audioContext.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + attack);
        gain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + attack + decay);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + duration);
    }
    
    // Player shoot sound
    playShoot() {
        if (!this.initialized || this.muted) return;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.15);
        
        gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.15);
    }
    
    // Invader explosion sound
    playExplosion() {
        if (!this.initialized || this.muted) return;
        
        // Create noise
        const bufferSize = this.audioContext.sampleRate * 0.2;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;
        
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, this.audioContext.currentTime);
        filter.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.2);
        
        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        
        noise.start(this.audioContext.currentTime);
        noise.stop(this.audioContext.currentTime + 0.2);
    }
    
    // Invader march sound (classic step sound)
    playMarch() {
        if (!this.initialized || this.muted) return;
        
        const freq = this.marchNotes[this.marchIndex];
        this.marchIndex = (this.marchIndex + 1) % this.marchNotes.length;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'square';
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.1);
    }
    
    // UFO sound (warbling)
    playUFO() {
        if (!this.initialized || this.muted) return;
        
        const osc = this.audioContext.createOscillator();
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.value = 400;
        
        lfo.type = 'sine';
        lfo.frequency.value = 8;
        lfoGain.gain.value = 100;
        
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        
        gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        lfo.start(this.audioContext.currentTime);
        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.3);
        lfo.stop(this.audioContext.currentTime + 0.3);
    }
    
    // Player death sound
    playPlayerDeath() {
        if (!this.initialized || this.muted) return;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.5);
        
        gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.5);
        
        // Add explosion noise
        setTimeout(() => this.playExplosion(), 100);
    }
    
    // Invader shoot sound
    playInvaderShoot() {
        if (!this.initialized || this.muted) return;
        
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, this.audioContext.currentTime + 0.2);
        
        gain.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(this.audioContext.currentTime);
        osc.stop(this.audioContext.currentTime + 0.2);
    }
    
    // Wave complete jingle
    playWaveComplete() {
        if (!this.initialized || this.muted) return;
        
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.2, 'square', 0.01, 0.15), i * 100);
        });
    }
    
    // Game over sound
    playGameOver() {
        if (!this.initialized || this.muted) return;
        
        const notes = [392, 349, 330, 262]; // G4, F4, E4, C4 (descending)
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.3, 'sawtooth', 0.01, 0.25), i * 200);
        });
    }
    
    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }
}

// Global audio instance
const Audio = new AudioManager();
