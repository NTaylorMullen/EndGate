var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            var ImageSource = (function () {
                function ImageSource(imageLocation, width, height, clipX, clipY, clipWidth, clipHeight) {
                    if (typeof clipX === "undefined") { clipX = 0; }
                    if (typeof clipY === "undefined") { clipY = 0; }
                    if (typeof clipWidth === "undefined") { clipWidth = width; }
                    if (typeof clipHeight === "undefined") { clipHeight = height; }
                    var _this = this;
                    this.Loaded = false;
                    this.OnLoaded = new EndGate.EventHandler();
                    this.Size = new EndGate.Size2d(width, height);
                    this.Source = new Image();
                    this.Source.onload = function () {
                        _this.Loaded = true;
                        _this.OnLoaded.Trigger(_this);
                    };
                    this.Source.src = imageLocation;
                    this.ClipLocation = new EndGate.Vector2d(clipX, clipY);
                    this.ClipSize = new EndGate.Size2d(clipWidth, clipHeight);
                    this._imageLocation = imageLocation;
                }
                ImageSource.prototype.Extract = function (clipX, clipY, clipWidth, clipHeight) {
                    return new ImageSource(this._imageLocation, this.Size.Width, this.Size.Height, clipX, clipY, clipWidth, clipHeight);
                };
                return ImageSource;
            })();
            Assets.ImageSource = ImageSource;            
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=ImageSource.js.map
