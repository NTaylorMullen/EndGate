var EndGate;
(function (EndGate) {
    /// <reference path="../Graphics/ImageSource.ts" />
    /// <reference path="../Sound/AudioPlayer.ts" />
    (function (Content) {
        /**
        * Defines a content manager that is used to preload AudioClip's and ImageSource's so that they can be used throughout a game.
        */
        var ContentManager = (function () {
            function ContentManager() {
                this._images = {};
                this._audioPlayers = {};
            }
            ContentManager.prototype.LoadImage = function (name, src, width, height) {
                var imageSource = new EndGate.Graphics.ImageSource(src, width, height);

                this._images[name] = imageSource;

                return imageSource.Clone();
            };

            /**
            * Retrieves an ImageSource designated under the provided name.
            * @param name The mapped name of the ImageSource to retrieve.
            */
            ContentManager.prototype.GetImage = function (name) {
                if (this._images[name]) {
                    return this._images[name].Clone();
                } else {
                    throw new Error("Image with name '" + name + "' was not found.");
                }
            };

            /**
            * Unload the ImageSource that is mapped to the provided name.
            * @param name The mapped name of the ImageSource to unload.
            */
            ContentManager.prototype.UnloadImage = function (name) {
                if (this._images[name]) {
                    delete this._images[name];

                    return true;
                }

                return false;
            };

            ContentManager.prototype.LoadAudio = function (name, src) {
                this._audioPlayers[name] = new EndGate.Sound.AudioPlayer(src);

                return this._audioPlayers[name];
            };

            /**
            * Retrieves a loaded audio player under the provided name.
            * @param name The mapped name of the AudioPlayer to retrieve.
            */
            ContentManager.prototype.GetAudio = function (name) {
                if (this._audioPlayers[name]) {
                    return this._audioPlayers[name];
                } else {
                    throw new Error("Audio with name '" + name + "' was not found.");
                }
            };

            /**
            * Unload the AudioPlayer that is mapped to the provided name.
            * @param name The mapped name of the AudioPlayer to unload.
            */
            ContentManager.prototype.UnloadAudio = function (name) {
                var player = this._audioPlayers[name];

                delete this._audioPlayers[name];

                return player;
            };
            return ContentManager;
        })();
        Content.ContentManager = ContentManager;
    })(EndGate.Content || (EndGate.Content = {}));
    var Content = EndGate.Content;
})(EndGate || (EndGate = {}));
