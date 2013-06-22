var eg;
(function (eg) {
    (function (Graphics) {
        /// <reference path="../../Assets/Vectors/Vector2d.ts" />
        /// <reference path="../../Assets/Sizes/Size2d.ts" />
        /// <reference path="../../Utilities/EventHandler1.ts" />
        (function (Assets) {
            /**
            * Defines an image resource that can be used within Sprite's, SpriteAnimation's and other drawable graphics.
            */
            var ImageSource = (function () {
                function ImageSource(imageLocation, width, height, clipX, clipY, clipWidth, clipHeight) {
                    if (typeof clipX === "undefined") { clipX = 0; }
                    if (typeof clipY === "undefined") { clipY = 0; }
                    if (typeof clipWidth === "undefined") { clipWidth = width; }
                    if (typeof clipHeight === "undefined") { clipHeight = height; }
                    var _this = this;
                    var setSize = typeof width !== "undefined";

                    this._loaded = false;
                    this.OnLoaded = new eg.EventHandler1();
                    this.Source = new Image();

                    this.Source.onload = function () {
                        _this._loaded = true;

                        if (!setSize) {
                            _this._size = new eg.Size2d(_this.Source.width, _this.Source.height);
                            _this.ClipLocation = eg.Vector2d.Zero;
                            _this.ClipSize = _this._size.Clone();
                        }

                        _this.OnLoaded.Trigger(_this);
                    };

                    this.Source.src = imageLocation;
                    this._imageLocation = imageLocation;

                    if (setSize) {
                        this._size = new eg.Size2d(width, height);
                        this.ClipLocation = new eg.Vector2d(clipX, clipY);
                        this.ClipSize = new eg.Size2d(clipWidth, clipHeight);
                    }
                }
                /**
                * Returns the base Size of the image source.
                */
                ImageSource.prototype.Size = function () {
                    return this._size.Clone();
                };

                /**
                * Determines if the ImageSource has been loaded.
                */
                ImageSource.prototype.Loaded = function () {
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
                return ImageSource;
            })();
            Assets.ImageSource = ImageSource;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
