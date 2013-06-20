/// <reference path="AudioClip.ts" />
/// <reference path="AudioSettings.ts" />

module eg.Sound {

    /**
    * Defines an AudioPlayer that is mapped to a specific source.  Ultimately used to play the same sound simultaneously.
    */
    export class AudioPlayer {
        private _source: any;

        /**
        * Creates a new instance of the AudioPlayer object.
        * @param source Source path to an audio clip.
        */
        constructor(source: string);
        /**
        * Creates a new instance of the AudioPlayer object.
        * @param source An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        constructor(source: string[]);
        constructor(source: any) {
            this._source = source;
        }

        /**
        * Builds an AudioClip and plays it with the default settings.  Returns the built audio clip.
        */
        public Play(): AudioClip;
        /**
        * Builds an AudioClip and plays it with the provided settings.  Returns the built audio clip.
        * @param settings Audio settings to play the AudioClip with.
        */
        public Play(settings: AudioSettings): AudioClip;
        public Play(settings: AudioSettings = AudioSettings.Default): AudioClip {
            var clip = new AudioClip(this._source, settings);

            clip.Play();

            return clip;
        }
    }

}
