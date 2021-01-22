import { UStorage } from "../base/storage/UStorage";
import { UObject } from "../base/type/UObject";

let _AUDIO_KEY = "cu.audio.object";

export class Audio {
    private audioObj = {
        _inited: false,
        musicStatus: true,
        musicVolume: 1.0,
        effectStatus: true,
        effectVolume: 1.0,
        vibrateStatus: true,
    };

    private getAudioObj(): any {
        if (!this.audioObj._inited) {
            let str = UStorage.get(_AUDIO_KEY);
            if (!str) {
                this.audioObj._inited = true;
                this.saveAudioObj(this.audioObj);
            } else {
                let audioObj = JSON.parse(str);
                UObject.mixIn(this.audioObj, audioObj);
                this.audioObj._inited = true;
            }
        }
        return this.audioObj;
    }

    private saveAudioObj(obj: any): void {
        setTimeout(() => {
            let str = JSON.stringify(obj);
            UStorage.set(_AUDIO_KEY, str);
        }, 1);
    };

    init(): void {
        let musicStatus = this.getMusicStatus();
        this.setMusicStatus(musicStatus);
        let musicVolume = this.getMusicVolume();
        this.setMusicVolume(musicVolume);
        let effectStatus = this.getEffectStatus();
        this.setEffectStatus(effectStatus);
        let effectVolume = this.getEffectVolume();
        this.setEffectVolume(effectVolume);
    }

    getMusicStatus(): boolean {
        this.audioObj = this.getAudioObj();
        return this.audioObj.musicStatus;
    }

    setMusicStatus(musicStatus: boolean) {
        this.audioObj = this.getAudioObj();
        if (this.audioObj.musicStatus != musicStatus) {
            this.audioObj.musicStatus = musicStatus;
            this.saveAudioObj(this.audioObj);
        }
        if (musicStatus) {
            this.pauseMusic();
        } else {
            this.pauseMusic();
        }
    }

    getMusicVolume(): number {
        this.audioObj = this.getAudioObj();
        return this.audioObj.musicVolume;
    }

    setMusicVolume(musicVolume: number) {
        this.audioObj = this.getAudioObj();
        if (this.audioObj.musicVolume != musicVolume) {
            this.audioObj.musicVolume = musicVolume;
            cc.audioEngine.setMusicVolume(musicVolume);
            this.saveAudioObj(this.audioObj);
        }
    }

    getEffectStatus(): boolean {
        this.audioObj = this.getAudioObj();
        return this.audioObj.effectStatus;
    }

    setEffectStatus(effectStatus: boolean) {
        this.audioObj = this.getAudioObj();
        if (this.audioObj.effectStatus != effectStatus) {
            this.audioObj.effectStatus = effectStatus;
            this.saveAudioObj(this.audioObj);
        }
        if (effectStatus) {
            this.resumeAllEffects();
        } else {
            this.pauseAllEffects();
        }
    }

    getEffectVolume(): number {
        this.audioObj = this.getAudioObj();
        return this.audioObj.effectVolume;
    }

    setEffectVolume(effectVolume) {
        this.audioObj = this.getAudioObj();
        if (this.audioObj.effectVolume != effectVolume) {
            this.audioObj.effectVolume = effectVolume;
            this.saveAudioObj(this.audioObj);
        }
    }

    getVibrateStatus(): boolean {
        this.audioObj = this.getAudioObj();
        return this.audioObj.vibrateStatus;
    }

    setVibrateStatus(vibrateStatus: boolean) {
        this.audioObj = this.getAudioObj();
        if (this.audioObj.vibrateStatus != vibrateStatus) {
            this.audioObj.vibrateStatus = vibrateStatus;
            this.saveAudioObj(this.audioObj);
        }

        if (vibrateStatus) {
            this.startVibrate(1);
        } else {
            this.stopVibrate();
        }
    }

    stopAll() {
        cc.audioEngine.stopAll();
    }

    pauseAll() {
        cc.audioEngine.pauseAll();
    }

    resumeAll() {
        cc.audioEngine.resumeAll();
    }

    isMusicPlaying() {
        return cc.audioEngine.isMusicPlaying();
    }

    playMusic(clip: cc.AudioClip, loop = true) {
        if (!clip) {
            return;
        }
        let isOpen = this.getMusicStatus();
        if (isOpen) {
            let audioID = cc.audioEngine.playMusic(clip, loop);
            return audioID;
        }
        return null;
    }

    stopMusic() {
        cc.audioEngine.stopMusic();
    }

    pauseMusic() {
        cc.audioEngine.pauseMusic();
    }

    resumeMusic() {
        cc.audioEngine.resumeMusic();
    }

    playEffect(clip: cc.AudioClip, loop = false) {
        if (!clip) {
            return;
        }
        let isOpen = this.getEffectStatus();
        if (isOpen && clip) {
            let audioID = cc.audioEngine.playEffect(clip, loop);
            return audioID;
        }
        return null;
    }

    stopEffect(audioId: number) {
        if (audioId) {
            cc.audioEngine.stopEffect(audioId);
        }
    }

    pauseEffect(audioId: number) {
        if (audioId) {
            cc.audioEngine.pauseEffect(audioId);
        }
    }

    resumeEffect(audioId: number) {
        let isOpen = this.getEffectStatus();
        if (audioId || isOpen) {
            cc.audioEngine.resumeEffect(audioId);
        }
    }

    stopAllEffects() {
        cc.audioEngine.stopAllEffects();
    }

    pauseAllEffects() {
        cc.audioEngine.pauseAllEffects();
    }

    resumeAllEffects() {
        let isOpen = this.getEffectStatus();
        if (isOpen) {
            cc.audioEngine.resumeAllEffects();
        }
    }

    startVibrate(duration: number) {
        if (!cc.sys.isNative) {
            navigator.vibrate(duration * 1000);
            return
        } else if (cc.sys.os === cc.sys.OS_ANDROID) {

        } else if (cc.sys.os === cc.sys.OS_IOS) {

        }
    }

    stopVibrate() {
        if (!cc.sys.isNative) {
            navigator.vibrate(0);
            return
        } else if (cc.sys.os === cc.sys.OS_ANDROID) {

        } else if (cc.sys.os === cc.sys.OS_IOS) {

        }
    }
}