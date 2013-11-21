/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Bounds/BoundingRectangle.ts" />
/// <reference path="Graphic2d.ts" />
/// <reference path="Color.ts" />

module EndGate.Graphics {

    /**
    * Defines a drawable 2d line element.
    */
    export class Line2d extends Graphic2d {
        public _type: string = "Line2d";

        private _from: Vector2d;
        private _to: Vector2d;
        private _difference: Vector2d;
        private _boundsWidth: number;
        private _cachedPosition: Vector2d;
        private _strokeStyle: Color;
        private _strokeChangeWire: (color: Color) => void;

        /**
        * Creates a new instance of the Line2d object with a line width of 1.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number);
        /**
        * Creates a new instance of the Line2d object with a specified line width.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        * @param lineWidth Initial thickness of the line.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number);
        /**
        * Creates a new instance of the Line2d object with a specified line width and color.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        * @param lineWidth Initial thickness of the line.
        * @param color Initial color of the line.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number, color: Color);
        /**
        * Creates a new instance of the Line2d object with a specified line width and color.
        * @param fromX Starting horizontal coordinate.
        * @param fromY Starting vertical coordinate.
        * @param toX Ending horizontal coordinate.
        * @param toY Ending vertical coordinate.
        * @param lineWidth Initial thickness of the line.
        * @param color Initial color string of the line.
        */
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number, color: string);
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number = 1, color?: any) {
            super(Vector2d.Zero);// Set to zero here then updated in the rest of the constructor (use same logic)

            this._from = new Vector2d(fromX, fromY);
            this._to = new Vector2d(toX, toY);
            this.LineWidth = lineWidth;
            this.UpdatePosition();

            this._strokeChangeWire = (color: Color) => {
                this._State.StrokeStyle = color.toString();
            };

            if (typeof color !== "undefined") {
                if (typeof color === "string") {
                    color = new Color(color);
                }
                this.Color = this._strokeStyle = color;
            }
            else {
                this.Color = this._strokeStyle = Color.Black;
            }
        }

        /**
        * Gets or sets the From location of the Line2d.
        */
        public get From(): Vector2d {
            return this._from;
        }
        public set From(newPosition: Vector2d) {
            this._from = newPosition;
            this.UpdatePosition();
        }

        /**
        * Gets or sets the To location of the Line2d.
        */
        public get To(): Vector2d {
            return this._to;
        }
        public set To(newPosition: Vector2d) {
            this._to = newPosition;
            this.UpdatePosition();
        }

        /**
        * Gets or sets the line color.  Valid colors are strings like "red" or "rgb(255,0,0)".
        */
        public get Color(): Color {
            return this._strokeStyle;
        }
        public set Color(color) {
            if (typeof color === "string") {
                color = new Color(<any>color);
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
        * Gets or sets the line width.
        */
        public get LineWidth(): number {
            return this._State.LineWidth;
        }
        public set LineWidth(width: number) {
            this._State.LineWidth = width;
        }

        /**
        * Gets or sets the line cap.  Values can be "butt", "round", "square".
        */
        public get LineCap(): string {
            return this._State.LineCap;
        }
        public set LineCap(cap: string) {
            this._State.LineCap = cap;
        }

        /**
        * Draws the line onto the given context.  If this Line2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the line onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            // Need to check to ensure that the colors still match up so if people are performing direct color manipulation
            // such as color.R = 131.
            if (this._strokeStyle.toString() !== this._State.StrokeStyle) {
                this._State.StrokeStyle = this._strokeStyle.toString();
            }

            super._StartDraw(context);

            // Check if the user has modified the position directly, if so we need to translate the from and to positions accordingly
            if (!this._cachedPosition.Equivalent(this.Position)) {
                this.RefreshCache();
            }

            // Context origin is at the center point of the line
            context.beginPath();
            context.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
            context.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
            context.stroke();

            super._EndDraw(context);
        }

        /**
        * The bounding area that represents where the Line2d will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, new Size2d(this._boundsWidth, this.LineWidth));

            bounds.Rotation = Math.atan2(this._difference.Y, this._difference.X) + this.Rotation;

            return bounds;
        }

        /**
        * Scale's the Line2d graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            this.From = this.Position.Add(this.From.Subtract(this.Position).Multiply(scale));
            this.To = this.Position.Add(this.To.Subtract(this.Position).Multiply(scale));
        }

        /**
        * Returns a nearly identical copy of this Line2d.  If this Line2d belongs to a parent, the cloned Line2d will not. If this Line2d has children, all children will be cloned as well.  Lastly, the cloned Line2d will not have the same event bindings as this one does.
        */
        public Clone(): Line2d {
            var graphic = new Line2d(this.From.X, this.From.Y, this.To.X, this.To.Y, this.LineWidth, this.Color.Clone());

            graphic.LineCap = this.LineCap;

            super._Clone(graphic);

            return graphic;
        }

        public Dispose(): void {
            super.Dispose();

            this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
        }

        private UpdatePosition(): void {
            this.Position = ((this._from.Add(this._to)).Divide(2));
            this._difference = this._to.Subtract(this._from);
            this._boundsWidth = this._from.Distance(this._to).Length();
            this._cachedPosition = this.Position.Clone();
        }

        private RefreshCache(): void {
            var difference = this.Position.Subtract(this._cachedPosition);
            this._from.X += difference.X;
            this._from.Y += difference.Y;
            this._to.X += difference.X;
            this._to.Y += difference.Y;
            this._cachedPosition = this.Position.Clone();
        }
    }

}