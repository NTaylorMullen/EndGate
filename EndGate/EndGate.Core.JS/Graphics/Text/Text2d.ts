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
            this.Align("center");
            this.Baseline("middle");
            this.Color(color);
        }

        /**
        * Gets the text alignment of the Text2d.
        */
        public Align(): string;
        /**
        * Gets and sets the text alignment of the Text2d.
        * @param alignment The new textual alignment for the Text2d.  Values are "start", "end", "left", "center", or "right".
        */
        public Align(alignment: string): string;
        public Align(alignment?: string): string {
            return this._State.TextAlign(alignment);
        }

        /**
        * Gets the text baseline of the Text2d.
        */
        public Baseline(): string;
        /**
        * Gets and sets the text baseline of the Text2d.
        * @param baseline The new textual baseline for the Text2d.  Values are "top", "hanging", "middle", "alphabetic", "ideographic", and "bottom".
        */
        public Baseline(baseline: string): string;
        public Baseline(baseline?: string): string {
            return this._State.TextBaseline(baseline);
        }

        /**
        * Gets the current text color.
        */
        public Color(): string;
        /**
        * Gets and sets the current text color.
        * @param color The new color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Color(color: string): string;
        public Color(color?: string): string {
            return this._State.FillStyle(color);
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

        /**
        * Gets the Text2d's FontSetting's.
        */
        public FontSettings(): Assets.FontSettings {
            this._recalculateBoundsSize = true;

            return this._fontSettings;
        }

        /**
        * Gets the current Text2d's text.
        */
        public Text(): string;
        /**
        * Sets and gets the current Text2d's text.
        * @param text The new text.
        */
        public Text(text: string): string;
        public Text(text?: string): string {
            if (typeof text !== "undefined") {
                this._recalculateBoundsSize = true;
                this._text = text;
            }

            return this._text;
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
            if (thickness === 0) {
                this._stroker.Reset();
            }
            else {
                this._stroker.Trip();
            }

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
            this._stroker.Trip();
            return this._State.StrokeStyle(color);
        }

        /**
        * Draws the text onto the given context.  If this Text2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the text onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            var textSize;

            super._StartDraw(context);

            this._State.Font(this._fontSettings._BuildFont());

            context.fillText(this._text, 0, 0);
            this._stroker.Invoke(context);

            super._EndDraw(context);

            // Only recalculate bounds if the text or font has changed since the last draw.
            if (this._recalculateBoundsSize) {
                this._recalculateBoundsSize = false;
                textSize = context.measureText(this._text);
                this._drawBounds.Size.Width = textSize.width;
                this._drawBounds.Size.Height = parseInt(this._fontSettings.FontSize()) * 1.5;
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