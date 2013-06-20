/// <reference path="AudioPlayer.ts" />
/// <reference path="AudioSettings.ts" />

module eg.Sound {

    /**
    * Defines an audio manager that is used to preload AudioClip's that can be played at any time.
    */
    export class AudioManager {
        private _audioPlayers: { [name: string]: AudioPlayer; };

        /**
        * Creates a new instance of the AudioManager object.
        */
        constructor() {
            this._audioPlayers = {};
        }

        /**
        * Loads AudioPlayer for the provided clip info.  Returns the loaded player for easy access.
        * @param name The mapped name for the AudioPlayer.
        * @param src Source path to an audio clip.
        */
        public Load(name: string, src: string): AudioPlayer;
        /**
        * Loads an audio player, returns the AudioPlayer for easy access.
        * @param name The mapped name for the AudioPlayer.
        * @param src An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        public Load(name: string, src: string[]): AudioPlayer;
        public Load(name: string, src: any): AudioPlayer {
            this._audioPlayers[name] = new AudioPlayer(src);

            return this._audioPlayers[name];
        }

        /**
        * Unload player that is mapped to the provided name.
        * @param name The mapped name of the AudioPlayer to unload.
        */
        public Unload(name: string): AudioPlayer {
            var player = this._audioPlayers[name];

            delete this._audioPlayers[name];

            return player;
        }

        /**
        * Plays a new audio clip that's mapped to the provided name with the default audio settings.
        * @param name The mapped name of the AudioPlayer to Play.
        */
        public Play(name: string): AudioClip;
        /**
        * Plays a new audio clip that's mapped to the provided name.
        * @param name The mapped name of the AudioPlayer to Play.
        * @param settings The audio settings to play the clip with.
        */
        public Play(name: string, settings: AudioSettings = AudioSettings.Default): AudioClip;
        public Play(name: string, settings: AudioSettings = AudioSettings.Default): AudioClip {
            return this._audioPlayers[name].Play(settings);
        }

        /**
        * Retrieves a loaded audio player under the provided name.
        * @param name The mapped name of the AudioPlayer to retrieve.
        */
        public GetAudioPlayer(name: string): AudioPlayer {
            return this._audioPlayers[name];
        }
    }

}