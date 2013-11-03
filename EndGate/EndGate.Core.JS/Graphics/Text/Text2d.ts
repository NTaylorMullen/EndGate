/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="../Color.ts" />
/// <reference path="../../Utilities/NoopTripInvoker.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />
/// <reference path="Font/FontSettings.ts" />

module EndGate.Graphics {

    /**
    * Defines a drawable text element.
    */
    export class Text2d extends Graphic2d {
        public _type: string = "Text2d";

        /**
        * Gets or sets the PIXIBase object that is used to render the Text2d.
        */
        public PixiBase: PIXI.Text;

        private _fontSettings: Assets.FontSettings;
        private _text: string;
        private _fillColor: Color;
        private _strokeColor: Color;
        private _borderThickness: number;
        private _graphicChangedWire: (color?: Color) => void;

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
        * @param color Initial color of the Text2d. Default is Black.
        */
        constructor(x: number, y: number, text: string, color: Color);
        /**
        * Creates a new instance of the Text2d object with a specified color.
        * @param x Initial horizontal location of the Text2d.
        * @param y Initial vertical location of the Text2d.
        * @param text Initial text of the Text2d.
        * @param color Initial string color of the Text2d. Default is Black.
        */
        constructor(x: number, y: number, text: string, color: string);
        constructor(x: number, y: number, text: string, color: any = Color.Black) {
            super(new PIXI.Text(text, {}), new Vector2d(x, y));

            // Save the built graphic and set it to a noop so it's not re-built tons of times during construction.
            var savedBuildGraphic = this._BuildGraphic;
            this._BuildGraphic = () => { };

            this._text = text;

            this._drawBounds = new Bounds.BoundingRectangle(this.Position, Size2d.One);

            this._fontSettings = new Assets.FontSettings();

            this.SetStyleProperty("font", this._fontSettings._BuildFont());
            this.PixiBase.anchor.x = this.PixiBase.anchor.y = .5;
            this.Align = "center";

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

            // Set the BuildGraphic function to its appropriate values now that all data points have been constructed.
            this._BuildGraphic = savedBuildGraphic;

            this._BuildGraphic();
        }

        /**
        * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get Color(): Color {
            return this._fillColor;
        }
        public set Color(color: any) {
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
        public set BorderColor(color: any) {
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

        /**
        * Gets or sets the text alignment of the Text2d.  Values can be "start", "end", "left", "center", or "right".
        */
        public get Align(): string {
            return this.GetStyleProperty("align");
        }
        public set Align(alignment: string) {
            this.SetStyleProperty("align", alignment);
        }

        /**
        * Gets the Text2d's FontSetting's.
        */
        public get FontSettings(): Assets.FontSettings {
            return this._fontSettings;
        }

        /**
        * Gets or sets the current Text2d's text.
        */
        public get Text(): string {
            return this._text;
        }
        public set Text(text: string) {
            this._text = text;
            this.PixiBase.setText(text);
        }

        public _BuildGraphic(): void {
            this.SetStyleProperty("fill", this.Color.toString());
            this.SetStyleProperty("strokeThickness", this.BorderThickness);
            this.SetStyleProperty("stroke", this.BorderColor);
        }

        /**
        * The bounding area that represents where the Text2d will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            this._drawBounds.Rotation = this.Rotation;
            this._drawBounds.Position = this.Position;
            this._drawBounds.Size.Width = this.PixiBase.width;
            this._drawBounds.Size.Height = this.PixiBase.height;

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
            var graphic = new Text2d(this.Position.X, this.Position.Y, this.Text, this.Color.Clone());

            graphic.Align = this.Align;
            graphic.FontSettings.FontFamily = this.FontSettings.FontFamily;
            graphic.FontSettings.FontSize = this.FontSettings.FontSize;
            graphic.FontSettings.FontStyle = this.FontSettings.FontStyle;
            graphic.FontSettings.FontVariant = this.FontSettings.FontVariant;
            graphic.FontSettings.FontWeight = this.FontSettings.FontWeight;
            
            super._Clone(graphic);

            return graphic;
        }

        private SetStyleProperty(property: string, value: any): void {
            (<any>this.PixiBase).style[property] = value;
            (<any>this.PixiBase).dirty = true;
        }

        private GetStyleProperty(property: string): any {
            return (<any>this.PixiBase).style[property];
        }
    }
}