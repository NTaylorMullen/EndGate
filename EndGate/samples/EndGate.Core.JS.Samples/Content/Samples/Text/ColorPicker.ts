// Wrap in module to keep code out of global scope, misspelling of Texts is purposeful to avoid namespace conflict
module Texts {

    export class ColorPicker {
        // slider for red, green and blue
        private sliders: any[];

        constructor(private red: any, private green: any, private blue: any, defaultColor: number[], private _onColorChange: Function) {
            var updateGraphic = () => {
                this.UpdateColor();
            };

            // build the sliders, at this point these are just the holders for the sliders
            this.sliders = [this.red, this.green, this.blue];

            // Cycle through all the sliders and set them up with default values (jquery ui)
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

        private UpdateColor(): void {
            // Pull the slider values
            var red = this.red.slider("value"),
                green = this.green.slider("value"),
                blue = this.blue.slider("value");

            // Post the updated color to the callback
            this._onColorChange("rgb(" + red + ", " + green + ", " + blue + ")")
        }
    }

}