/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module Shapes {

    export class Game extends eg.Game {
        public Shape: any;

        constructor(private _canvas: HTMLCanvasElement, targetBuilders: JQuery) {
            super(_canvas);
            var that = this,
                // Builders represent the shape building, aka viewing a circle or a rectangle
                builderClicked = function () {
                    if (!$(this).hasClass("disabled")) {
                        targetBuilders.removeClass("disabled");
                        $(this).addClass("disabled");
                        that.BuildShape($(this)[0]);
                    }
                };

            // Bind all of the click events for the builders
            $.each(targetBuilders, function (index, val) {
                $(val).click(builderClicked);
            });

            // Apply default builder
            $(targetBuilders[0]).click();
        }

        // Used to go from circle to rectangle or vice versa
        private BuildShape(builder: HTMLElement): void {
            var shapeTypeName = $(builder).attr("shape"),
                shapeType = eg.Graphics[shapeTypeName],
                newShape: eg.Graphics.Shape;

            // If there is no current shape
            if (!this.Shape) {
                newShape = new shapeType(this._canvas.width / 2, this._canvas.height / 2, 200, 200);
            }
            else {
                // Need to special case circles because of the Size difference (Size2d vs Radius)
                if (shapeTypeName !== "Circle") {
                    newShape = new shapeType(this.Shape.Position.X, this.Shape.Position.Y, (<any>this.Shape).Radius * 2, (<any>this.Shape).Radius * 2);
                }
                else {
                    newShape = new shapeType(this.Shape.Position.X, this.Shape.Position.Y, Math.min((<any>this.Shape).Size.Width, (<any>this.Shape).Size.Height) / 2);
                }
                // Copy all of the previous shapes settings over to the new shape
                newShape.Color = this.Shape.Color;
                newShape.Border(this.Shape.BorderThickness, this.Shape.BorderColor);
                //newShape.Shadow(this.Shape.ShadowX, this.Shape.ShadowY, this.Shape.ShadowColor, this.Shape.ShadowBlur);
                newShape.Opacity = this.Shape.Opacity;
                newShape.Rotation = this.Shape.Rotation;

                // Remove the current shape from the draw area so we can start drawing the new one
                this.Scene.Remove(this.Shape);
            }

            // Get new shape instantiated and drawing
            this.Shape = newShape;
            this.Scene.Add(this.Shape);
        }
    }

}