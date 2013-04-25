var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (Sprites) {
                var ImageSource = (function () {
                    function ImageSource(imageLocation, width, height, xClip, yClip, widthClip, heightClip) {
                        if (typeof xClip === "undefined") { xClip = 0; }
                        if (typeof yClip === "undefined") { yClip = 0; }
                        if (typeof widthClip === "undefined") { widthClip = width; }
                        if (typeof heightClip === "undefined") { heightClip = height; }
                        var _this = this;
                        this.Loaded = false;
                        this.OnLoaded = new Core.Utilities.EventHandler();
                        this.Size = new Core.Assets.Size2d(width, height);
                        this.Source = new Image();
                        this.Source.onload = function () {
                            _this.Loaded = true;
                            _this.OnLoaded.Trigger(_this);
                        };
                        this.Source.src = imageLocation;
                        this.ClipLocation = new Core.Assets.Vector2d(xClip, yClip);
                        this.ClipSize = new Core.Assets.Size2d(widthClip, heightClip);
                    }
                    return ImageSource;
                })();
                Sprites.ImageSource = ImageSource;                
            })(Graphics.Sprites || (Graphics.Sprites = {}));
            var Sprites = Graphics.Sprites;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=ImageSource.js.map
