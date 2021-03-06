import 'phaser-ce';

import SaveGame from '../../BackEnd/SaveData';

/** Handles the playing of sounds */
export default class SoundManager
{
    /** The instance of the sound manager used to handle the sounds */
    private static instance: SoundManager = null;
    private _game: Phaser.Game;

    /** The manager that handles the sfx's */
    private _sound: Phaser.SoundManager;

    public onMusicEnd: Phaser.Signal;

    /** The manager that handles the music */
    public music: Phaser.Sound = null;
    private _music: {
        element: HTMLMediaElement,
        key: string
    };

    /** All the instances of audio clips */
    private audioInstances: {
        [name: string]: Phaser.Sound
    } = {};

    private constructor(game: Phaser.Game)
    {
        this._game = game;
        this._sound = game.sound;
        this._music = { element: <HTMLMediaElement>document.getElementById('musicPlayer'), key: ''};
        this._music.element.addEventListener('ended', this.musicEnded.bind(this));
        this.onMusicEnd = new Phaser.Signal;
    }

    /** Get an instance of the game to handle sounds with */
    public static getInstance(game?: Phaser.Game): SoundManager
    {
        if (null === SoundManager.instance)
        {
            if (!game)
            {
                throw new Error('Cant create a new instance without a game');
            }

            SoundManager.instance = new SoundManager(game);
        }

        return SoundManager.instance;
    }

    /** Pauser/ resumes the music */
    public pause(pause: boolean): void {
        if (this._game.device.safari || this._game.device.mobileSafari)
        {
            pause ? this.music.pause() : this.music.resume();
        }
        else
        {
            pause ? this._music.element.pause() : this._music.element.play();
        }
    }

    /** called when a music piece has ended in the gameplay state */
    private musicEnded(): void {
        this.onMusicEnd.dispatch();
    }

    /** Play a sfx */
    public play(key: string, volume: number = 1, loop: boolean = false): Phaser.Sound
    {
        if (SaveGame.SFX_MUTED)
        {
            return null;
        }

        if (!this.audioInstances.hasOwnProperty(key))
        {
            this.audioInstances[key] = this._sound.add(key);
        }

        this.audioInstances[key].play(undefined, undefined, volume * SaveGame.SFX_VOLUME, loop, true);
        return this.audioInstances[key];
    }

    /** Stop a sfx */
    public stop(key: string): void
    {
        if (this.audioInstances.hasOwnProperty(key))
        {
            this.audioInstances[key].stop();
        }
    }

    /** Start playing a background tune */
    public playMusic(key: string, volume: number = 1, loop: boolean = true): void
    {
        if (this._game.device.safari || this._game.device.mobileSafari) {
                if (null !== this.music && this.music.name !== key)
                {
                    this.music.stop();
                    console.error('sound already there!, stopping and playing again');
                }
                this.music = this._sound.play(key, 1, true);
                this.music.resume();
                console.error('playin ze muziek');
                return;
        } else {

        if (this._music.key !== key) {
            this._music.key = key;
            if ((typeof this._music.element.canPlayType === 'function' &&
            this._music.element.canPlayType('audio/mpeg;codecs=ogg') !== '')) {
                this._music.element.src = 'assets/music/' + key + '.ogg';
            } else {
                this._music.element.src = 'assets/music/' + key + '.mp3';
            }
            this._music.element.currentTime = 0;
        }
        this._music.element.volume = volume;
        this._music.element.load();
        this._music.element.play();
        this._music.element.loop = loop;
    }
        return;

        //console.error('doing nothing' );
    }

    /** Fade music folume to a spesific new volume */
    public fadeMusicVolume(duration: number, volume: number): void
    {
        if (this.music)
        {
            this.music.fadeTo(duration, volume);
        }
    }

    /** Stop the music */
    public stopMusic(): void
    {
        // if (null === this.music)
        // {
        //     return;
        // }
        if (this._game.device.safari || this._game.device.mobileSafari)
        {
            if (null === this.music)
        {
            return;
        }

            if (this.music.isPlaying)
            {
            this.music.pause();
            this.music.currentTime = 0;
            }
        }
        else
        {
        this._music.element.pause();
        this._music.element.currentTime = 0;
        }
    }

    /** Toggle the sfx mute switch */
    public toggleSfx(): void
    {
        SaveGame.SFX_MUTED = !SaveGame.SFX_MUTED;
    }

    /** Toggle the music mute switch */
    public toggleMusic(): void
    {
        SaveGame.MUSIC_MUTED = !SaveGame.MUSIC_MUTED;

        if (!SaveGame.MUSIC_MUTED)
        {
            if (this.music && this.music.isPlaying)
            {
                this.stopMusic();
            }
        }
        else
        {
            if (this.music)
            {
                this.music.play(undefined, undefined, 1, true);
            }
        }
    }
}
