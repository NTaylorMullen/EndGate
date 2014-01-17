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

        private static _initialVectors: Vector2d = new Vector2d(-1000, -1000);

        /**
        * Gets or sets the PIXIBase object that is used to render the Line2d.
        */
        public PixiBase: PIXI.Graphics;

        private _from: Vector2d;
        private _lastDrawFrom: Vector2d;
        private _to: Vector2d;
        private _lastDrawTo: Vector2d;
        private _lastDrawPosition: Vector2d;
        private _lineColor: Color;
        private _lineWidth: number;
        private _colorChangeWire: (color: Color) => void;
        private _dirty: boolean;

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
            super(new PIXI.Graphics(), Vector2d.Zero);// Set to zero here then updated in the rest of the constructor (use same logic)

            this._dirty = true;

            this._to = this._from = Vector2d.Zero;

            this.From = new Vector2d(fromX, fromY);
            this.To = new Vector2d(toX, toY);
            this._lastDrawFrom = this._lastDrawTo = Line2d._initialVectors;
            this.UpdatePosition();
            this._lastDrawPosition = this.Position.Clone();

            this.LineWidth = lineWidth;

            this._colorChangeWire = (color: Color) => {
                this._lineColor = color;
                this._dirty = true;
            };

            if (typeof color !== "undefined") {
                if (typeof color === "string") {
                    color = new Color(color);
                }
                this.Color = this._lineColor = color;
            }
            else {
                this.Color = this._lineColor = Color.Black;
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
            return this._lineColor;
        }
        public set Color(color) {
            if (typeof color === "string") {
                color = new Color(<any>color);
            }

            // Unbind old
            this._lineColor.OnChange.Unbind(this._colorChangeWire);
            this._lineColor = color;
            // Bind new
            this._lineColor.OnChange.Bind(this._colorChangeWire);
            // Update state
            this._colorChangeWire(color);
        }

        /**
        * Gets or sets the line width.
        */
        public get LineWidth(): number {
            return this._lineWidth
        }
        public set LineWidth(width: number) {
            this._lineWidth = width;
            this._dirty = true;
        }        

        /**
        * Draws the line onto the given context.  If this Line2d is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the line onto.
        */
        public Draw(): void {
            if (!this._lastDrawPosition.Equivalent(this.Position)) {
                this.RefreshCache();
                this._lastDrawPosition = this.Position.Clone();
                this._lastDrawFrom = this.From.Clone();
                this._lastDrawTo = this.To.Clone();
                this._dirty = true;
            } else {
                if (!this._lastDrawFrom.Equivalent(this.From)) {
                    this._lastDrawFrom = this.From.Clone();
                    this.UpdatePosition();
                    this._dirty = true;
                }

                if (!this._lastDrawTo.Equivalent(this.To)) {
                    this._lastDrawTo = this.To.Clone();
                    this.UpdatePosition();
                    this._dirty = true;
                }
            }

            if (this._dirty) {
                this._BuildGraphic();
                this._dirty = false;
            }

            super.Draw();
        }

        /**
        * The bounding area that represents where the Line2d will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var boundsWidth = this._from.Distance(this._to).Length(),
                bounds = new Bounds.BoundingRectangle(this.Position, new Size2d(boundsWidth, this._lineWidth)),
                difference = this._to.Subtract(this._from);

            bounds.Rotation = Math.atan2(difference.Y, difference.X) + this.Rotation;

            return bounds;
        }

        /**
        * Returns a nearly identical copy of this Line2d.  If this Line2d belongs to a parent, the cloned Line2d will not. If this Line2d has children, all children will be cloned as well.  Lastly, the cloned Line2d will not have the same event bindings as this one does.
        */
        public Clone(): Line2d {
            var graphic = new Line2d(this.From.X, this.From.Y, this.To.X, this.To.Y, this.LineWidth, this.Color.Clone());

            super._Clone(graphic);

            return graphic;
        }

        /**
        * Triggers the OnDisposed event.  If this Line2d is used with a Scene2d it will be removed from the scene when disposed.
        */
        public Dispose(): void {
            super.Dispose();

            // We don't need any of our helper functions anymore so make them noop.
            this._BuildGraphic = this.UpdatePosition = this.RefreshCache = () => { };

            // Set the position to be a new Vector2d so it unbinds all monitors to the existing position object
            this.Position = this.From = this.To = eg.Vector2d.Zero;
                        
            this._lineColor.OnChange.Unbind(this._colorChangeWire);

            // Null out all objects so they can be garbage collected faster.
            this._lastDrawFrom = this._lastDrawPosition = this._lastDrawTo = this._to = this._from = this._lastDrawPosition = this._lineColor = this._lineWidth = this._colorChangeWire = null;
        }

        public _BuildGraphic(): void {
            this.PixiBase.clear();

            if (this._lineWidth > 0) {
                this.PixiBase.lineStyle(this._lineWidth, this._lineColor.toHexValue(), this._lineColor.A);
                this.PixiBase.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
                this.PixiBase.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
            }
        }

        private UpdatePosition(): void {
            this.Position = ((this._from.Add(this._to)).Divide(2));
        }

        private RefreshCache(): void {
            var difference = this.Position.Subtract(this._lastDrawPosition);
            if (!difference.IsZero()) {
                this._from.X += difference.X;
                this._from.Y += difference.Y;
                this._to.X += difference.X;
                this._to.Y += difference.Y;
            }
        }
    }

}