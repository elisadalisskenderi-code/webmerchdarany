/**
 * Audio Engine playing DARANY — « Make a Wish (interlude) »
 * Automatically plays on loop with instant mute toggle control in top-right.
 */

type AudioListener = (isPlaying: boolean, isMuted: boolean) => void;

class SoundEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private isMuted = false;
  private listeners: Set<AudioListener> = new Set();
  private hasInitialized = false;

  public trackTitle = 'Make a Wish (interlude)';
  public artist = 'DARANY';

  public get active(): boolean {
    return this.isPlaying && !this.isMuted;
  }

  public get muted(): boolean {
    return this.isMuted;
  }

  private initAudio() {
    if (!this.audio && typeof window !== 'undefined') {
      this.audio = new Audio('/assets/audio/make_a_wish_interlude.mp3');
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = 0.75;

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notifyListeners();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notifyListeners();
      });
    }
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying, this.isMuted);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.isPlaying, this.isMuted));
  }

  /**
   * Initializes automatic playback on loop.
   * If the browser blocks initial unprompted autoplay, hooks into first user gesture.
   */
  public initAutoplay() {
    if (this.hasInitialized || typeof window === 'undefined') return;
    this.hasInitialized = true;
    this.initAudio();

    if (!this.audio) return;

    const attemptPlay = () => {
      if (!this.audio || this.isMuted) return;
      this.audio.play()
        .then(() => {
          this.isPlaying = true;
          this.notifyListeners();
          removeGestureListeners();
        })
        .catch(() => {
          // Browser requires user interaction, gesture listeners will catch it
        });
    };

    const handleFirstGesture = () => {
      attemptPlay();
    };

    const removeGestureListeners = () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('scroll', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    // Attempt direct play immediately
    attemptPlay();
  }

  public toggle(): boolean {
    return this.toggleMute();
  }

  public toggleMute(): boolean {
    this.initAudio();
    if (!this.audio) return false;

    if (this.isMuted) {
      // Unmute
      this.isMuted = false;
      this.audio.muted = false;
      this.audio.volume = 0.75;
      if (this.audio.paused) {
        this.audio.play().catch(() => {});
      }
      this.isPlaying = true;
    } else {
      // Mute
      this.isMuted = true;
      this.audio.muted = true;
    }

    this.notifyListeners();
    return this.isMuted;
  }

  public isSoundMuted(): boolean {
    return this.isMuted;
  }

  public unmute() {
    this.start();
  }

  public mute() {
    this.initAudio();
    if (!this.audio) return;
    this.isMuted = true;
    this.audio.muted = true;
    this.notifyListeners();
  }

  public start() {
    this.initAudio();
    if (!this.audio) return;

    this.isMuted = false;
    this.audio.muted = false;
    this.audio.volume = 0.75;
    this.audio.play().catch(() => {});
    this.isPlaying = true;
    this.notifyListeners();
  }

  public stop() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.notifyListeners();
  }
}

export const soundEngine = new SoundEngine();
