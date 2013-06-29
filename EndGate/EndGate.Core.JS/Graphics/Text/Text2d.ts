/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="../../Utilities/NoopTripInvoker.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />
/// <reference path="Font/FontSettings.ts" />

module EndGate.Graphics {

    /**
    * Defines a drawable text element.
    */
    export class Text2d extends Abstractions.Graphic2d {
        public _type: string = "Text2d";        

        private _fontSettings: Assets.FontSettings;
        private _text: string;
        private _stroker: _.Utilities.NoopTripInvoker;
        private _recalculateBoundsSize: bool;

        // For GetDrawBounds
        private _drawBounds: Bounds.BoundingRectangle;

        /**
        * Creates a new instance of the Text2d object.
        * @param x Initial horizontal location of the Text2d.
        * @param y Initial vertical location of the Text2d.
        * @param text Initial text of the Text2d.
        */
        constructor(x: number, y: number, text: string);
        /**
        * Creates a new instance of the Text2d object with a specified color.
        * @param x Initial horizontal location of the Text2d.
        * @param y Initial vertical location of the Text2d.
        * @param text Initial text of the Text2d.
        * @param color Initial color of the Text2d.
        */
        constructor(x: number, y: number, text: string, color: string);
        constructor(x: number, y: number, text: string, color: string = "black") {
            super(new Vector2d(x, y));

            this._text = text;
            this._stroker = new _.Utilities.NoopTripInvoker((context: CanvasRenderingContext2D) => {
                context.strokeText(this._text, 0, 0);
            });

            this._drawBounds = new Bounds.BoundingRectangle(this.Position, Size2d.One);
            this._recalculateBoundsSize = true;

            this._fontSettings = new Assets.FontSettings();
            this.Align = "center";
            this.Baseline = "middle";
            this.Color = color;
        }

        /**
        * Gets or sets the text alignment of the Text2d.  Values can be "start", "end", "left", "center", or "right".
        */
        public get Align(): string {
            return this._State.TextAlign;
        }
        public set Align(alignment: string) {
            this._State.TextAlign = alignment;
        }        

        /**
        * Gets or sets the text baseline of the Text2d.  Values can be "top", "hanging", "middle", "alphabetic", "ideographic", and "bottom".
        */
        public get Baseline(): string {
            return this._State.TextBaseline;
        }
        public set Baseline(baseline: string) {
            this._State.TextBaseline = baseline;
        }

        /**
        * Gets or sets the current text color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get Color(): string {
            return this._State.FillStyle;
        }
        public set Color(color: string) {
            this._State.FillStyle = color;
        }

        /**
        * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get ShadowColor(): string {
            return this._State.ShadowColor;
        }
        public set ShadowColor(color: string) {
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
        * Gets the Text2d's FontSetting's.
        */
        public get FontSettings(): Assets.FontSettings {
            this._recalculateBoundsSize = true;

            return this._fontSettings;
        }

        /**
        * Gets or sets the current border thickness.
        */
        public get BorderThickness(): number {
            return this._State.LineWidth;
        }
        public set BorderThickness(thickness: number) {
            if (thickness === 0) {
                this._stroker.Reset();
            }
            else {
                this._stroker.Trip();
            }

            this._State.LineWidth = thickness;
        }

        /**
        * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get BorderColor(): string {
            return this._State.StrokeStyle;
        }
        public set BorderColor(color: string) {
            this._stroker.Trip();
            this._State.StrokeStyle = color;
        }

        /**
        * Gets or sets the current Text2d's text.
        */
        public get Text(): string {
            return this._text;
        }
        public set Text(text: string) {
            this._recalculateBoundsSize = true;
            this._text = text;
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
        * Draws the text onto the given context.  If this Text2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the text onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            var textSize;

            super._StartDraw(context);

            this._State.Font = this._fontSettings._BuildFont();

            context.fillText(this._text, 0, 0);
            this._stroker.Invoke(context);

            super._EndDraw(context);

            // Only recalculate bounds if the text or font has changed since the last draw.
            if (this._recalculateBoundsSize) {
                this._recalculateBoundsSize = false;
                textSize = context.measureText(this._text);
                this._drawBounds.Size.Width = textSize.width;
                this._drawBounds.Size.Height = parseInt(this._fontSettings.FontSize) * 1.5;
            }
        }

        /**
        * The bounding area that represents where the Text2d will draw.
        */
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            this._drawBounds.Rotation = this.Rotation;
            this._drawBounds.Position = this.Position;

            return this._drawBounds;
        }
    }
}