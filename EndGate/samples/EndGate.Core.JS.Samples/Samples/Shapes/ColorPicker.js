var ColorPicker = (function () {
    function ColorPicker(red, green, blue, defaultColor, _onColorChange) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this._onColorChange = _onColorChange;
        var _this = this;
        var updateGraphic = function () {
            _this.UpdateColor();
        };
        this.sliders = [
            this.red, 
            this.green, 
            this.blue
        ];
        for(var i = 0; i < 3; i++) {
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
        var red = this.red.slider("value"), green = this.green.slider("value"), blue = this.blue.slider("value");
        this._onColorChange("rgb(" + red + ", " + green + ", " + blue + ")");
    };
    return ColorPicker;
})();
//@ sourceMappingURL=ColorPicker.js.map
