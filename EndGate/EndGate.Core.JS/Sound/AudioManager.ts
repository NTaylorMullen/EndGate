/// <reference path="AudioPlayer.ts" />
/// <reference path="AudioSettings.ts" />

module EndGate.Sound {

    export class AudioManager {
        private _audioPlayers: { [name: string]: AudioPlayer; };

        constructor() {
            this._audioPlayers = {};
        }

        public Load(name: string, src: any): AudioPlayer {
            this._audioPlayers[name] = new AudioPlayer(src);

            return this._audioPlayers[name];
        }

        public Unload(name: string): AudioPlayer {
            var player = this._audioPlayers[name];

            delete this._audioPlayers[name];

            return player;
        }

        public Play(name: string, settings?: AudioSettings = AudioSettings.Default): AudioClip {
            return this._audioPlayers[name].Play(settings);
        }

        public GetPlayer(name: string): AudioPlayer {
            return this._audioPlayers[name];
        }
    }

}