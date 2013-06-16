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
                this.Color(color);
            }
        }

        /**
        * Gets the current shape color.
        */
        public Color(): string;
        /**
        * Gets and sets the current shape color.
        * @param color The new color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Color(color: string): string;
        public Color(color?: string): string {
            this._fill = true;
            return this._State.FillStyle(color);
        }

        /**
        * Sets the current borders thickness and color.
        * @param thickness The new border thickness in pixels.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Border(thickness: number, color: string): void {
            this.BorderThickness(thickness);
            this.BorderColor(color);
        }

        /**
        * Gets the current border thickness.
        */
        public BorderThickness(): number;
        /**
        * Sets and gets the current border thickness.
        * @param thickness The new border thickness in pixels.
        */
        public BorderThickness(thickness: number): number;
        public BorderThickness(thickness?: number): number {
            return this._State.LineWidth(thickness);
        }

        /**
        * Gets the current border color.
        */
        public BorderColor(): string;
        /**
        * Sets and gets the current border color.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public BorderColor(color: string): string;
        public BorderColor(color?: string): string {
            this._stroke = true;
            return this._State.StrokeStyle(color);
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
            this.ShadowX(x);
            this.ShadowY(y);
            this.ShadowColor(color);
            this.ShadowBlur(blur);
        }

        /**
        * Gets the current shadow color.
        */
        public ShadowColor(): string;
        /**
        * Sets and gets the current shadow color.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public ShadowColor(color: string): string;
        public ShadowColor(color?: string): string {
            this._fill = true;
            return this._State.ShadowColor(color);
        }

        /**
        * Gets the current horizontal shadow position.
        */
        public ShadowX(): number;
        /**
        * Sets and gets the current horizontal shadow position.
        * @param x The shadows new horizontal position.
        */
        public ShadowX(x: number): number;
        public ShadowX(x?: number): number {
            return this._State.ShadowOffsetX(x);
        }

        /**
        * Gets the current vertical shadow position.
        */
        public ShadowY(): number;
        /**
        * Sets and gets the current vertical shadow position.
        * @param y The shadows new vertical position.
        */
        public ShadowY(y: number): number;
        public ShadowY(y?: number): number {
            return this._State.ShadowOffsetY(y);
        }

        /**
        * Gets the current shadow blur.
        */
        public ShadowBlur(): number;
        /**
        * Sets and gets the current shadow blur.
        * @param blur The shadows new blur.
        */
        public ShadowBlur(blur: number): number;
        public ShadowBlur(blur?: number): number {
            return this._State.ShadowBlur(blur);
        }

        /**
        * Gets the current opacity.  Value is between 0 and 1.
        */
        public Opacity(): number;
        /**
        * Sets and gets the current opacity.
        * @param alpha New opacity, value is between 0 and 1.
        */
        public Opacity(alpha: number): number;
        public Opacity(alpha?: number): number {
            return this._State.GlobalAlpha(alpha);
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