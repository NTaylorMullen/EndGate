/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Bounds/BoundingRectangle.ts" />
/// <reference path="Graphic2d.ts" />

module eg.Graphics {

    export class Line2d extends Abstractions.Graphic2d {
        public _type: string = "Line2d";

        private _from: Vector2d;
        private _to: Vector2d;
        private _difference: Vector2d;
        private _boundsWidth: number;
        private _cachedPosition: Vector2d;

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
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number, color: string);
        constructor(fromX: number, fromY: number, toX: number, toY: number, lineWidth: number = 1, color?: string) {
            super(Vector2d.Zero);// Set to zero here then updated in the rest of the constructor (use same logic)

            this._from = new Vector2d(fromX, fromY);
            this._to = new Vector2d(toX, toY);
            this.LineWidth(lineWidth);
            this.UpdatePosition();

            if (typeof color !== "undefined") {
                this.Color(color);
            }
        }

        /**
        * Gets the From location of the Line2d.
        */
        public From(): Vector2d;
        /**
        * Sets and gets the new From location of the Line2d.
        * @param newPosition New From location.
        */
        public From(newPosition: Vector2d): Vector2d;
        public From(newPosition?: Vector2d): Vector2d {
            return this.GetOrSetLinePoint("from", newPosition);
        }

        /**
        * Gets the To location of the Line2d.
        */
        public To(): Vector2d;
        /**
        * Sets and gets the new To location of the Line2d.
        * @param newPosition New To location.
        */
        public To(newPosition: Vector2d): Vector2d;
        public To(newPosition?: Vector2d): Vector2d {
            return this.GetOrSetLinePoint("to", newPosition);
        }

        /**
        * Gets the current line color.
        */
        public Color(): string;
        /**
        * Gets and sets the current line color.
        * @param color The new color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
        */
        public Color(color: string): string;
        public Color(color?: string): string {
            return this._State.StrokeStyle(color);
        }

        /**
        * Gets the current line width.
        */
        public LineWidth(): number;
        /**
        * Gets and sets the current line width.
        * @param width The new line width.
        */
        public LineWidth(width: number): number;
        public LineWidth(width?: number): number {
            return this._State.LineWidth(width);
        }

        /**
        * Gets the current line cap.
        */
        public LineCap(): string;
        /**
        * Gets and sets the current line cap.
        * @param width The new line cap.  Values can be "butt", "round", "square".
        */
        public LineCap(cap: string): string;
        public LineCap(cap?: string): string {
            return this._State.LineCap(cap);
        }

        /**
        * Draws the line onto the given context.  If this Line2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the line onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
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
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, new Size2d(this._boundsWidth, this.LineWidth()));

            bounds.Rotation = Math.atan2(this._difference.Y, this._difference.X) + this.Rotation;

            return bounds;
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

        private GetOrSetLinePoint(name: string, newPosition?: Vector2d): Vector2d {
            if (typeof newPosition === "undefined") {
                this["_" + name] = newPosition;
                this.UpdatePosition();
            }

            return this["_" + name];
        }
    }

}