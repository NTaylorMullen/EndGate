/// <reference path="../../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Graphic2d.ts" />
/// <reference path="../../../Utilities/NoopTripInvoker.ts" />
/// <reference path="../../../Bounds/BoundingRectangle.ts" />
/// <reference path="../Shape.ts" />
/// <reference path="Font/FontSettings.ts" />

module EndGate.Graphics {

    /**
    * Defines a drawable text element.
    */
    export class Text2d extends Shape {
        public _type: string = "Text2d";

        private _fontSettings: Assets.FontSettings;
        private _text: string;
        private _recalculateBoundsSize: boolean;

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
            super(new Vector2d(x, y), color);

            this._text = text;

            this._drawBounds = new Bounds.BoundingRectangle(this.Position, Size2d.One);
            this._recalculateBoundsSize = true;

            this._fontSettings = new Assets.FontSettings();
            this.Align = "center";
            this.Baseline = "middle";
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
        * Gets the Text2d's FontSetting's.
        */
        public get FontSettings(): Assets.FontSettings {
            this._recalculateBoundsSize = true;

            return this._fontSettings;
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

        public _StartDraw(context: CanvasRenderingContext2D): void {
            context.save();
            this._State.SetContextState(context);

            context.translate(this.Position.X, this.Position.Y);

            if (this.Rotation !== 0) {
                context.rotate(this.Rotation);
            }
        }

        public _EndDraw(context: CanvasRenderingContext2D): void {
            var children = this.GetChildren();

            for (var i = 0; i < children.length; i++) {
                if (children[i].Visible) {
                    children[i].Draw(context);
                }
            }

            context.restore();
        }

        /**
        * Draws the text onto the given context.  If this Text2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the text onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            var textSize;

            this._State.Font = this._fontSettings._BuildFont();

            this._StartDraw(context);

            context.fillText(this._text, 0, 0);
            if (this._State.LineWidth > 0) {
                context.strokeText(this._text, 0, 0);
            }

            // Only recalculate bounds if the text or font has changed since the last draw.
            if (this._recalculateBoundsSize) {
                this._recalculateBoundsSize = false;
                textSize = context.measureText(this._text);
                this._drawBounds.Size.Width = textSize.width;
                this._drawBounds.Size.Height = parseInt(this._fontSettings.FontSize) * 1.5;
            }

            this._EndDraw(context);
        }

        /**
        * The bounding area that represents where the Text2d will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            this._drawBounds.Rotation = this.Rotation;
            this._drawBounds.Position = this.Position;

            return this._drawBounds;
        }

        /**
        * Scale's the fonts FontSize.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            var size = parseInt(this.FontSettings.FontSize);

            this.FontSettings.FontSize = this.FontSettings.FontSize.replace(size.toString(), (size * scale).toString());
        }

        /**
        * Returns a nearly identical copy of this Text2d.  If this Text2d belongs to a parent, the cloned Text2d will not. If this Text2d has children, all children will be cloned as well.  Lastly, the cloned Text2d will not have the same event bindings as this one does.
        */
        public Clone(): Text2d {
            var graphic = new Text2d(this.Position.X, this.Position.Y, this.Text, this.Color);

            graphic.Align = this.Align;
            graphic.Baseline = this.Baseline;
            graphic.FontSettings.FontFamily = this.FontSettings.FontFamily;
            graphic.FontSettings.FontSize = this.FontSettings.FontSize;
            graphic.FontSettings.FontStyle = this.FontSettings.FontStyle;
            graphic.FontSettings.FontVariant = this.FontSettings.FontVariant;
            graphic.FontSettings.FontWeight = this.FontSettings.FontWeight;
            
            super._Clone(graphic);

            return graphic;
        }
    }
}