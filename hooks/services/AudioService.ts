// import {
//   AudioPlayer,
//   createAudioPlayer,
//   setIsAudioActiveAsync
// } from 'expo-audio';

// // Define a safe interface for the Event Emitter
// type ListenerCallback = (data?: any) => void;

// class AudioService {
//   private player: AudioPlayer | null = null;
//   private currentTrack: any = null;
//   private isPlaying = false;
//   private listeners: Record<string, ListenerCallback[]> = {};

//   async initialize() {
//     try {
//       // Activate audio session
//       await setIsAudioActiveAsync(true);
//       return true;
//     } catch (error) {
//       console.error("Failed to initialize audio session", error);
//       return false;
//     }
//   }

//   // --- SAFE GETTERS ---
//   getDuration(): number {
//     // Returns duration in seconds. Returns 0 if player is null.
//     return this.player?.duration || 0;
//   }

//   getCurrentPosition(): number {
//     // Returns current time in seconds.
//     return this.player?.currentTime || 0;
//   }
//   // --------------------

//   setRate(rate: number) {
//     if (this.player) {
//       this.player.playbackRate = rate;
//     }
//   }

//   async loadAndPlay(track: any) {
//     // Destroy previous player to prevent overlap
//     if (this.player) {
//       this.player.pause();
//       this.player.remove();
//       this.player = null;
//     }

//     try {
//       // Create new player
//       this.player = createAudioPlayer({
//         uri: track.url,
//       });

//       this.currentTrack = track;

//       // Listen to state changes
//       this.player.addListener('playbackStatusUpdate', status => {
//         this.isPlaying = status.playing;

//         if (status.didJustFinish) {
//           this.emit('trackFinished', this.currentTrack);
//         }
//       });

//       this.player.play();
//       this.isPlaying = true;
//     } catch (error) {
//       console.error("Error loading track:", error);
//     }
//   }

//   play() {
//     this.player?.play();
//     this.isPlaying = true;
//   }

//   pause() {
//     this.player?.pause();
//     this.isPlaying = false;
//   }

//   stop() {
//     if (this.player) {
//       this.player.pause();
//       this.player.remove();
//       this.player = null;
//     }
//     this.isPlaying = false;
//   }

//   seekTo(seconds: number) {
//     this.player?.seekTo(seconds); 
//   }

//   setVolume(volume: number) {
//     if (this.player) {
//       this.player.volume = volume;
//     }
//   }

//   // Simple event emitter logic
//   on(event: string, cb: ListenerCallback) {
//     this.listeners[event] ??= [];
//     this.listeners[event].push(cb);
//   }

//   emit(event: string, data?: any) {
//     this.listeners[event]?.forEach(cb => cb(data));
//   }
// }

// export default new AudioService();