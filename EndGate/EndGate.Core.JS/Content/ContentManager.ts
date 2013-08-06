/// <reference path="../Graphics/ImageSource.ts" />
/// <reference path="../Sound/AudioPlayer.ts" />

module EndGate.Content {

    /**
    * Defines a content manager that is used to preload AudioClip's and ImageSource's so that they can be used throughout a game.
    */
    export class ContentManager {
        private _images: { [name: string]: Graphics.ImageSource };
        private _audioPlayers: { [name: string]: Sound.AudioPlayer; };

        /**
        * Creates a new instance of the ContentManager object.
        */
        constructor() {
            this._images = {};
            this._audioPlayers = {};
        }

        /**
        * Loads the image located at the provided source location as an ImageSource.  Returns the loaded ImageSource.
        * @param name The mapped name for the ImageSource.
        * @param src Source path to the base image.
        */
        public LoadImage(name: string, src: string): Graphics.ImageSource;
        /**
        * Loads the image located at the provided source location as an ImageSource.  Returns the loaded ImageSource.
        * @param name The mapped name for the ImageSource.
        * @param src Source path to the base image.
        * @param width Width of the image source.
        * @param height Height of the image source.
        */
        public LoadImage(name: string, src: string, width: number, height: number): Graphics.ImageSource;
        public LoadImage(name: string, src: string, width?: number, height?: number): Graphics.ImageSource {
            var imageSource = new Graphics.ImageSource(src, width, height);

            this._images[name] = imageSource;

            return imageSource.Clone();
        }

        /**
        * Retrieves an ImageSource designated under the provided name.
        * @param name The mapped name of the ImageSource to retrieve.
        */
        public GetImage(name: string): Graphics.ImageSource {
            if (this._images[name]) {
                return this._images[name].Clone();
            }
            else {
                throw new Error("Image with name '" + name + "' was not found.");
            }
        }

        /**
        * Unload the ImageSource that is mapped to the provided name.
        * @param name The mapped name of the ImageSource to unload.
        */
        public UnloadImage(name: string): boolean {
            if (this._images[name]) {
                delete this._images[name];

                return true;
            }

            return false;
        }

        /**
        * Loads an AudioPlayer for the provided clip info.  Returns the loaded player for easy access.
        * @param name The mapped name for the AudioPlayer.
        * @param src Source path to an audio clip.
        */
        public LoadAudio(name: string, src: string): Sound.AudioPlayer;
        /**
        * Loads an AudioPlayer, returns the AudioPlayer for easy access.
        * @param name The mapped name for the AudioPlayer.
        * @param src An array of source paths to audio clips.  Pass in multiple audio types of the same clip to ensure cross browser compatibility.
        */
        public LoadAudio(name: string, src: string[]): Sound.AudioPlayer;
        public LoadAudio(name: string, src: any): Sound.AudioPlayer {
            this._audioPlayers[name] = new Sound.AudioPlayer(src);

            return this._audioPlayers[name];
        }

        /**
        * Retrieves a loaded audio player under the provided name.
        * @param name The mapped name of the AudioPlayer to retrieve.
        */
        public GetAudio(name: string): Sound.AudioPlayer {
            if(this._audioPlayers[name]) {
                return this._audioPlayers[name];
            }
            else {
                throw new Error("Audio with name '" + name + "' was not found.");
            }
        }

        /**
        * Unload the AudioPlayer that is mapped to the provided name.
        * @param name The mapped name of the AudioPlayer to unload.
        */
        public UnloadAudio(name: string): Sound.AudioPlayer {
            var player = this._audioPlayers[name];

            delete this._audioPlayers[name];

            return player;
        }

    }

}