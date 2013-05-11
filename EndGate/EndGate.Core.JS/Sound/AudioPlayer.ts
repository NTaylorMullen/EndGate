/// <reference path="AudioClip.ts" />
/// <reference path="AudioSettings.ts" />

module EndGate.Sound {

    export class AudioPlayer {
        private _source: any;

        constructor(sourceLocation: any) {
            this._source = sourceLocation;
        }

        public Play(settings?: AudioSettings = AudioSettings.Default): AudioClip {
            var clip = new AudioClip(this._source, settings);

            clip.Play();

            return clip;
        }
    }

}
