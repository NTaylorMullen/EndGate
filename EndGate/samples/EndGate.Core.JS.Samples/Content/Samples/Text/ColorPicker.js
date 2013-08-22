// Wrap in module to keep code out of global scope, misspelling of Texts is purposeful to avoid namespace conflict
var Texts;
(function (Texts) {
    var ColorPicker = (function () {
        function ColorPicker(red, green, blue, defaultColor, _onColorChange) {
            var _this = this;
            this.red = red;
            this.green = green;
            this.blue = blue;
            this._onColorChange = _onColorChange;
            var updateGraphic = function () {
                _this.UpdateColor();
            };

            // build the sliders, at this point these are just the holders for the sliders
            this.sliders = [this.red, this.green, this.blue];

            for (var i = 0; i < 3; i++) {
                this.sliders[i].slider({
                    orientation: "horizontal",
                    range: "min",
                    max: 255,
                    value: defaultColor[i],
                    animate: true,
                    slide: updateGraphic,
                    change: updateGraphic
                });
            }

            this.UpdateColor();
        }
        ColorPicker.prototype.UpdateColor = function () {
            // Pull the slider values
            var red = this.red.slider("value"), green = this.green.slider("value"), blue = this.blue.slider("value");

            // Post the updated color to the callback
            this._onColorChange("rgb(" + red + ", " + green + ", " + blue + ")");
        };
        return ColorPicker;
    })();
    Texts.ColorPicker = ColorPicker;
})(Texts || (Texts = {}));
//# sourceMappingURL=ColorPicker.js.map
