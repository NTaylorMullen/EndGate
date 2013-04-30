var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            var ImageSource = (function () {
                function ImageSource(imageLocation, width, height, xClip, yClip, widthClip, heightClip) {
                    if (typeof xClip === "undefined") { xClip = 0; }
                    if (typeof yClip === "undefined") { yClip = 0; }
                    if (typeof widthClip === "undefined") { widthClip = width; }
                    if (typeof heightClip === "undefined") { heightClip = height; }
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
                    this.ClipLocation = new EndGate.Vector2d(xClip, yClip);
                    this.ClipSize = new EndGate.Size2d(widthClip, heightClip);
                }
                return ImageSource;
            })();
            Assets.ImageSource = ImageSource;            
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=ImageSource.js.map
