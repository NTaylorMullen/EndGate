/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="../Color.ts" />

module EndGate.Graphics {

    /**
    * Abstract drawable shape type that is used create customizable drawable graphics.
    */
    export class Shape extends Graphic2d {
        public _type: string = "Shape";
        private _fillStyle: Color;
        private _strokeStyle: Color;
        private _shadowColor: Color;
        private _fillChangeWire: (color: Color) => void;
        private _strokeChangeWire: (color: Color) => void;
        private _shadowChangeWire: (color: Color) => void;

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
        constructor(position: Vector2d, color: Color);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current shape object.
        * @param color Initial string Color of the current shape object.
        */
        constructor(position: Vector2d, color: string);
        constructor(position: Vector2d, color?: any) {
            super(position);

            this._fillChangeWire = (color: Color) => {
                this._State.FillStyle = color.toString();
            };

            this._strokeChangeWire = (color: Color) => {
                this._State.StrokeStyle = color.toString();
            };

            this._shadowChangeWire = (color: Color) => {
                this._State.ShadowColor = color.toString();
            };

            this.ShadowColor = this._shadowColor = Color.Black;
            this.BorderColor = this._strokeStyle = Color.Black;

            if (typeof color !== "undefined") {
                if (typeof color === "string") {
                    color = new Color(color);
                }

                this.Color = this._fillStyle = color;
            }
            else {
                this.Color = this._fillStyle = Color.Black;
            }
        }

        /**
        * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get Color(): Color {
            return this._fillStyle;
        }
        public set Color(color: any) {
            if (typeof color === "string") {
                color = new Color(color);
            }

            // Unbind old
            this._fillStyle.OnChange.Unbind(this._fillChangeWire);
            this._fillStyle = color;
            // Bind new
            this._fillStyle.OnChange.Bind(this._fillChangeWire);
            // Update state
            this._fillChangeWire(color);
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
        public get BorderColor(): Color {
            return this._strokeStyle;
        }
        public set BorderColor(color: any) {
            if (typeof color === "string") {
                color = new Color(color);
            }

            // Unbind old
            this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
            this._strokeStyle = color;
            // Bind new
            this._strokeStyle.OnChange.Bind(this._strokeChangeWire);
            // Update state
            this._strokeChangeWire(color);
        }

        /**
        * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get ShadowColor(): Color {
            return this._shadowColor;
        }
        public set ShadowColor(color: any) {
            if (typeof color === "string") {
                color = new Color(color);
            }

            // Unbind old
            this._shadowColor.OnChange.Unbind(this._shadowChangeWire);
            this._shadowColor = color;
            // Bind new
            this._shadowColor.OnChange.Bind(this._shadowChangeWire);
            // Update state
            this._shadowChangeWire(color);
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
        * @param color The new shadow color.
        */
        public Shadow(x: number, y: number, color: Color): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        * @param blur The new shadow blur.
        */
        public Shadow(x: number, y: number, color: string, blur: number): void;
        /**
        * Sets the current shadow x and y positions and shadows color.
        * @param x The shadows new horizontal position.
        * @param y The shadows new vertical position.
        * @param color The new shadow color.
        * @param blur The new shadow blur.
        */
        public Shadow(x: number, y: number, color: Color, blur: number): void;
        public Shadow(x: number, y: number, color?: any, blur?: number): void {
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
            context.fill();

            if (this._State.LineWidth > 0) {
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

        public Dispose(): void {
            super.Dispose();

            this._fillStyle.OnChange.Unbind(this._fillChangeWire);
            this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
            this._shadowColor.OnChange.Unbind(this._shadowChangeWire);
        }

        public _Clone(graphic: Shape): void {
            graphic.Border(this.BorderThickness, this.BorderColor.Clone());
            graphic.Shadow(this.ShadowX, this.ShadowY, this.ShadowColor.Clone(), this.ShadowBlur);

            super._Clone(graphic);
        }
    }
}