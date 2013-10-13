var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/IDisposable.ts" />
    /// <reference path="../Interfaces/ICloneable.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    /// <reference path="../Utilities/EventHandler1.ts" />
    (function (Graphics) {
        /**
        * Defines an image resource that can be used within Sprite's, SpriteAnimation's and other drawable graphics.
        */
        var ImageSource = (function () {
            function ImageSource(image, width, height, clipX, clipY, clipWidth, clipHeight) {
                if (typeof clipX === "undefined") { clipX = 0; }
                if (typeof clipY === "undefined") { clipY = 0; }
                if (typeof clipWidth === "undefined") { clipWidth = width; }
                if (typeof clipHeight === "undefined") { clipHeight = height; }
                var _this = this;
                var sizeDefined = typeof width !== "undefined", imageLocation;

                this._onLoaded = new EndGate.EventHandler1();

                if (typeof image === "string") {
                    imageLocation = image;
                    this._loaded = false;
                    this.Source = new Image();
                    this._loadWire = function (e) {
                        _this._loaded = true;

                        if (!sizeDefined) {
                            _this._size = new EndGate.Size2d(_this.Source.width, _this.Source.height);
                            _this.ClipLocation = EndGate.Vector2d.Zero;
                            _this.ClipSize = _this._size.Clone();
                        }

                        _this._onLoaded.Trigger(_this);
                    };

                    this.Source.src = imageLocation;
                    this._imageLocation = imageLocation;

                    if (sizeDefined) {
                        this._size = new EndGate.Size2d(width, height);
                        this.ClipLocation = new EndGate.Vector2d(clipX, clipY);
                        this.ClipSize = new EndGate.Size2d(clipWidth, clipHeight);
                    } else {
                        this.ClipSize = null;
                    }
                } else {
                    clipWidth = clipX;
                    clipHeight = clipY;
                    clipX = width;
                    clipY = height;

                    this.Source = image;

                    this._loaded = false;

                    this._loadWire = function (e) {
                        _this._loaded = true;
                        _this._onLoaded.Trigger(_this);
                    };

                    this._imageLocation = image.src;
                    this._size = new EndGate.Size2d(image.width, image.height);

                    this.ClipLocation = new EndGate.Vector2d(clipX, clipY);
                    this.ClipSize = new EndGate.Size2d(clipWidth, clipHeight);
                }

                if (!this.Source.complete) {
                    this.Source.addEventListener("load", this._loadWire, false);
                } else {
                    setTimeout(this._loadWire, 0);
                }
            }
            Object.defineProperty(ImageSource.prototype, "OnLoaded", {
                get: /**
                * Gets an event that is triggered when the base image is finished loading.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onLoaded;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(ImageSource.prototype, "Size", {
                get: /**
                * Returns the base Size of the image source.
                */
                function () {
                    return this._size.Clone();
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Determines if the ImageSource has been loaded.
            */
            ImageSource.prototype.IsLoaded = function () {
                return this._loaded;
            };

            /**
            * Returns an ImageSource that is extracted from the current ImageSource based on the provided clip location and clip size.
            * @param clipX The horizontal location of the clip.
            * @param clipY The vertical location of the clip.
            * @param clipWidth The width of the clip.
            * @param clipHeight The height of the clip.
            */
            ImageSource.prototype.Extract = function (clipX, clipY, clipWidth, clipHeight) {
                return new ImageSource(this._imageLocation, this._size.Width, this._size.Height, clipX, clipY, clipWidth, clipHeight);
            };

            /**
            * Disposes the image source and unbinds all bound events.
            */
            ImageSource.prototype.Dispose = function () {
                this.Source.removeEventListener("load", this._loadWire);
                this.Source = null;
                this._onLoaded.Dispose();
            };

            /**
            * Returns an identical copy of this image source.  Uses existing base image source.
            */
            ImageSource.prototype.Clone = function () {
                if (this.ClipSize) {
                    return new ImageSource(this.Source, this.ClipLocation.X, this.ClipLocation.Y, this.ClipSize.Width, this.ClipSize.Height);
                } else {
                    return new ImageSource(this.Source);
                }
            };
            return ImageSource;
        })();
        Graphics.ImageSource = ImageSource;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
