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
                    var setSize = typeof width !== "undefined";
                    this.Loaded = false;
                    this.OnLoaded = new EndGate.EventHandler();
                    this.Source = new Image();
                    this.Source.onload = function () {
                        _this.Loaded = true;
                        if(!setSize) {
                            _this.Size = new EndGate.Size2d(_this.Source.width, _this.Source.height);
                            _this.ClipLocation = EndGate.Vector2d.Zero();
                            _this.ClipSize = _this.Size.Clone();
                        }
                        _this.OnLoaded.Trigger(_this);
                    };
                    this.Source.src = imageLocation;
                    this._imageLocation = imageLocation;
                    if(setSize) {
                        this.Size = new EndGate.Size2d(width, height);
                        this.ClipLocation = new EndGate.Vector2d(clipX, clipY);
                        this.ClipSize = new EndGate.Size2d(clipWidth, clipHeight);
                    }
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
