/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Graphic2d.ts" />

module EndGate.Graphics.Abstractions {

    /**
    * Abstract drawable shape type that is used create customizable drawable graphics.
    */
    export class Shape extends Graphic2d {
        public _type: string = "Shape";
        private _fill: bool;
        private _stroke: bool;

        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        */
        constructor(position: Vector2d);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        * @param color Initial Color of the current shape object.
        */
        constructor(position: Vector2d, color: string);
        constructor(position: Vector2d, color?: string) {
            super(position);

            this._fill = false;
            this._stroke = false;

            if (typeof color !== "undefined") {
                this.Color = color;
            }
        }

        /**
        * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get Color(): string {
            return this._State.FillStyle;
        }
        public set Color(color: string) {
            this._fill = true;
            this._State.FillStyle = color;
        }

        /**
        * Gets or sets the current border thickness.
        */
        public get BorderThickness(): number {
            return this._State.LineWidth;
        }
        public set BorderThickness(thickness: number) {
            this._State.LineWidth = thickness;
        }

        /**
        * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get BorderColor(): string {
            return this._State.StrokeStyle;
        }
        public set BorderColor(color: string) {
            this._stroke = true;
            this._State.StrokeStyle = color;
        }

        /**
        * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get ShadowColor(): string {
            return this._State.ShadowColor;
        }
        public set ShadowColor(color: string) {
            this._fill = true;
            this._State.ShadowColor = color;
        }

        /**
        * Gets or sets the current horizontal shadow position.
        */
        public get ShadowX(): number {
            return this._State.ShadowOffsetX;
        }
        public set ShadowX(x: number) {
            this._State.ShadowOffsetX = x;
        }

        /**
        * Gets or sets the current vertical shadow position.
        */
        public get ShadowY(): number {
            return this._State.ShadowOffsetY;
        }
        public set ShadowY(y: number) {
            this._State.ShadowOffsetY = y;
        }

        /**
        * Gets or sets the current shadow blur.
        */
        public get ShadowBlur(): number {
            return this._State.ShadowBlur;
        }
        public set ShadowBlur(blur: number) {
            this._State.ShadowBlur = blur;
        }

        /**
        * Gets or sets the current opacity.  Value is between 0 and 1.
        */
        public get Opacity(): number {
            return this._State.GlobalAlpha;
        }
        public set Opacity(alpha: number) {
            this._State.GlobalAlpha = alpha;
        }

        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Border(thickness: number, color: string): void {
            this.BorderThickness = thickness;
            this.BorderColor = color;
        }

        /**
        * Sets the current shadow x and y positions.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        */
        public Shadow(x: number, y: number): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Shadow(x: number, y: number, color: string): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        * @param blur The new shadow blur.
        */
        public Shadow(x: number, y: number, color: string, blur: number): void;
        public Shadow(x: number, y: number, color?: string, blur?: number): void {
            this.ShadowX = x;
            this.ShadowY = y;
            this.ShadowColor = color;
            this.ShadowBlur = blur;
        }

        public _StartDraw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);
            context.beginPath();
        }

        public _EndDraw(context: CanvasRenderingContext2D): void {
            if (this._fill) {
                context.fill();
            }

            if (this._stroke) {
                context.stroke();
            }
            else {
                context.closePath();
            }

            super._EndDraw(context);
        }

        // This should be overridden if you want to build a proper shape
        public _BuildPath(context: CanvasRenderingContext2D): void {
        }

        /**
        * Draws the shape onto the given context.  If this shape is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the shape onto.
        */
        public Draw(context: CanvasRenderingContext2D): void { // You can override this Draw if you want to implement your own logic for applying styles and drawing (do not recommend overriding)
            this._StartDraw(context);
            this._BuildPath(context);
            this._EndDraw(context);
        }
    }
}