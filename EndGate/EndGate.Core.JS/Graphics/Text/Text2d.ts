/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="../../Utilities/NoopTripInvoker.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />
/// <reference path="Font/FontSettings.ts" />

module eg.Graphics {

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
        * Gets the text alignment of the Text2d.
        */
        public get Align(): string {
            return this._State.TextAlign;
        }

        /**
        * Gets the text alignment of the Text2d.
        * @param alignment The new textual alignment for the Text2d.  Values are "start", "end", "left", "center", or "right".
        */
        public set Align(alignment: string) {
            this._State.TextAlign = alignment;
        }        

        /**
        * Gets the text baseline of the Text2d.
        */
        public get Baseline(): string {
            return this._State.TextBaseline;
        }

        /**
        * Gets the text baseline of the Text2d.
        * @param baseline The new textual baseline for the Text2d.  Values are "top", "hanging", "middle", "alphabetic", "ideographic", and "bottom".
        */
        public set Baseline(baseline: string) {
            this._State.TextBaseline = baseline;
        }

        /**
        * Gets the current text color.
        */
        public get Color(): string {
            return this._State.FillStyle;
        }

        /**
        * Gets the current text color.
        * @param color The new color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public set Color(color: string) {
            this._State.FillStyle = color;
        }

        /**
        * Gets the current shadow color.
        */
        public get ShadowColor(): string {
            return this._State.ShadowColor;
        }

        /**
        * Sets the current shadow color.
        * @param color The new shadow color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public set ShadowColor(color: string) {
            this._State.ShadowColor = color;
        }

        /**
        * Gets the current horizontal shadow position.
        */
        public get ShadowX(): number {
            return this._State.ShadowOffsetX;
        }

        /**
        * Sets the current horizontal shadow position.
        * @param x The shadows new horizontal position.
        */
        public set ShadowX(x: number) {
            this._State.ShadowOffsetX = x;
        }

        /**
        * Gets the current vertical shadow position.
        */
        public get ShadowY(): number {
            return this._State.ShadowOffsetY;
        }

        /**
        * Sets the current vertical shadow position.
        * @param y The shadows new vertical position.
        */
        public set ShadowY(y: number) {
            this._State.ShadowOffsetY = y;
        }

        /**
        * Gets the current shadow blur.
        */
        public get ShadowBlur(): number {
            return this._State.ShadowBlur;
        }

        /**
        * Sets the current shadow blur.
        * @param blur The shadows new blur.
        */
        public set ShadowBlur(blur: number) {
            this._State.ShadowBlur = blur;
        }

        /**
        * Gets the current opacity.  Value is between 0 and 1.
        */
        public get Opacity(): number {
            return this._State.GlobalAlpha;
        }

        /**
        * Sets the current opacity.
        * @param alpha New opacity, value is between 0 and 1.
        */
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
* Gets the current border thickness.
*/
        public get BorderThickness(): number {
            return this._State.LineWidth;
        }

        /**
        * Sets the current border thickness.
        * @param thickness The new border thickness in pixels.
        */
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
        * Gets the current border color.
        */
        public get BorderColor(): string {
            return this._State.StrokeStyle;
        }

        /**
        * Sets the current border color.
        * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public set BorderColor(color: string) {
            this._stroker.Trip();
            this._State.StrokeStyle = color;
        }

        /**
        * Gets the current Text2d's text.
        */
        public get Text(): string {
            return this._text;
        }

        /**
        * Sets and gets the current Text2d's text.
        * @param text The new text.
        */
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