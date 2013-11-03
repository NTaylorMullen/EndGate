/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="../Color.ts" />

module EndGate.Graphics {

    /**
    * Abstract drawable shape type that is used create customizable drawable graphics.
    */
    export class Shape extends Graphic2d {
        public _type: string = "Shape";

        /**
        * Gets or sets the PIXIBase object that is used to render the Shape.
        */
        public PixiBase: PIXI.Graphics;

        private _fillColor: Color;
        private _strokeColor: Color;
        private _borderThickness: number;
        private _graphicChangedWire: (color?: Color) => void;

        /**
        * Should only ever be called by derived classes.
        * @param pixiBase The underlying PIXI object to use for rendering.
        * @param position Initial Position of the current shape object.
        */
        constructor(pixiBase: PIXI.DisplayObjectContainer, position: Vector2d);
        /**
        * Should only ever be called by derived classes.
        * @param pixiBase The underlying PIXI object to use for rendering.
        * @param position Initial Position of the current shape object.
        * @param color Initial Color of the current shape object.
        */
        constructor(pixiBase: PIXI.DisplayObjectContainer, position: Vector2d, color: Color);
        /**
        * Should only ever be called by derived classes.
        * @param pixiBase The underlying PIXI object to use for rendering.
        * @param position Initial Position of the current shape object.
        * @param color Initial string Color of the current shape object.
        */
        constructor(pixiBase: PIXI.DisplayObjectContainer, position: Vector2d, color: string);
        constructor(pixiBase: PIXI.DisplayObjectContainer, position: Vector2d, color?: any) {
            super(pixiBase, position);

            this._graphicChangedWire = () => {
                this._BuildGraphic();
            };

            this.BorderColor = this._strokeColor = Color.Black;
            this._borderThickness = 0;

            if (typeof color !== "undefined") {
                if (typeof color === "string") {
                    color = new Color(color);
                }

                this.Color = this._fillColor = color;
            }
            else {
                this.Color = this._fillColor = Color.Black;
            }
        }

        /**
        * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get Color(): Color {
            return this._fillColor;
        }
        public set Color(color) {
            if (typeof color === "string") {
                color = new Color(<any>color);
            }

            // Unbind old
            this._fillColor.OnChange.Unbind(this._graphicChangedWire);
            this._fillColor = color;
            // Bind new
            this._fillColor.OnChange.Bind(this._graphicChangedWire);
            // Update state
            this._graphicChangedWire();
        }

        /**
        * Gets or sets the current border thickness.
        */
        public get BorderThickness(): number {
            return this._borderThickness;
        }
        public set BorderThickness(thickness: number) {
            this._borderThickness = thickness;
            this._graphicChangedWire();
        }

        /**
        * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get BorderColor(): Color {
            return this._strokeColor;
        }
        public set BorderColor(color) {
            if (typeof color === "string") {
                color = new Color(<any>color);
            }

            // Unbind old
            this._strokeColor.OnChange.Unbind(this._graphicChangedWire);
            this._strokeColor = color;
            // Bind new
            this._strokeColor.OnChange.Bind(this._graphicChangedWire);
            // Update state
            this._graphicChangedWire();
        }

        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Border(thickness: number, color: string): void
        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.
        */
        public Border(thickness: number, color: Color): void;
        public Border(thickness: number, color: any): void {
            this.BorderThickness = thickness;
            this.BorderColor = color;
        }

        // Should be called before any shape logic builds graphics
        public _StartBuildGraphic(): void {
            this.PixiBase.clear();

            if (this._borderThickness > 0) {
                this.PixiBase.lineStyle(this._borderThickness, this._strokeColor.toHexValue(), this._strokeColor.A);
            }

            this.PixiBase.beginFill(this._fillColor.toHexValue(), this._fillColor.A);
        }

        // Should be overridden to control what's built;
        public _BuildGraphic(): void {
            this._StartBuildGraphic();
            // Overridden graphic code should go here
            this._EndBuildGraphic();
        }

        // Should be called before any shape logic builds graphics
        public _EndBuildGraphic(): void {
            this.PixiBase.endFill();
        }

        public Dispose(): void {
            super.Dispose();

            this._fillColor.OnChange.Unbind(this._graphicChangedWire);
            this._strokeColor.OnChange.Unbind(this._graphicChangedWire);
        }

        public _Clone(graphic: Shape): void {
            graphic.Border(this.BorderThickness, this.BorderColor.Clone());

            super._Clone(graphic);
        }
    }
}