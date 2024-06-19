import { makeAutoObservable, runInAction } from 'mobx';
import { pauseAnimation } from '../utils/pauseAnimation';

class TrackStore {
    currentTrack = null;
    audio = null;
    isPlaying = false;
    currentTime = 0;
    volume = 0.3;

    constructor() {
        makeAutoObservable(this);
    }

    playTrack(track) {
        if (this.audio) {
            this.audio.pause();
        }
        this.currentTrack = track;
        this.audio = new Audio(track.src);
        this.audio.volume = this.volume;
        this.audio.play();
        this.isPlaying = true;

        this.audio.ontimeupdate = () => {
            runInAction(() => {
                this.currentTime = this.audio.currentTime;
            });
        };

        this.audio.onended = () => {
            runInAction(() => {
                this.resetTrack();
            });
        };
    }

    pauseTrack() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
        }
    }

    togglePlayPause(track) {
        if (this.currentTrack && this.currentTrack.id === track.id) {
            if (this.isPlaying) {
                this.pauseTrack();
                pauseAnimation();
            } else {
                this.audio.play();
                this.isPlaying = true;
            }
        } else {
            this.playTrack(track);
        }
    }

    resetTrack() {
        this.currentTrack = null;
        this.audio = null;
        this.isPlaying = false;
        this.currentTime = 0;
        pauseAnimation();
    }
}

const trackStore = new TrackStore();
export default trackStore;
