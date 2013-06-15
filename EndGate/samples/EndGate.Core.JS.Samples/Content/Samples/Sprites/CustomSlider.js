// Wrap in module to keep code out of global scope
var Sprites;
(function (Sprites) {
    var CustomSlider = (function () {
        function CustomSlider(_target, _min, _max, _defaultValue, _onSliderChange) {
            this._target = _target;
            this._min = _min;
            this._max = _max;
            this._defaultValue = _defaultValue;
            this._onSliderChange = _onSliderChange;
            var _this = this;
            var sliderChange = function () {
                _this.SliderChange();
            };
            // Build slider with default values
            this._target.slider({
                orientation: "horizontal",
                range: "min",
                min: this._min,
                max: this._max,
                value: this._defaultValue,
                animate: true,
                slide: sliderChange,
                change: sliderChange
            });
            // This essentially triggers the onSliderChange event with the default values
            this.SliderChange();
        }
        CustomSlider.prototype.UpdateSlider = // Take an outside value and update the slider (this is used for things like animating)
        function (val) {
            this._target.slider("value", val);
        };
        CustomSlider.prototype.SliderChange = function () {
            this._onSliderChange(parseInt(this._target.slider("value")));
        };
        return CustomSlider;
    })();
    Sprites.CustomSlider = CustomSlider;    
})(Sprites || (Sprites = {}));
//@ sourceMappingURL=CustomSlider.js.map
