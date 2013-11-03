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

        /**
        * Gets or sets the PIXIBase object that is used to render the Line2d.
        */
        public PixiBase: PIXI.Graphics;

        private _position: Vector2d;
        private _from: Vector2d;
        private _to: Vector2d;
        private _cachedPosition: Vector2d;
        private _lineColor: Color;
        private _lineWidth: number;
        private _colorChangeWire: (color: Color) => void;

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

            // Save the built graphic and set it to a noop so it's not re-built tons of times during construction.
            var savedBuildGraphic = this._BuildGraphic;
            this._BuildGraphic = () => { };

            // Set a dummy vector2d so that when setting the property it clears an invalid object
            this._to = this._from = Vector2d.Zero;

            this.From = new Vector2d(fromX, fromY);
            this.To = new Vector2d(toX, toY);
            this.UpdatePosition();

            this.LineWidth = lineWidth;

            this._colorChangeWire = (color: Color) => {
                this._lineColor = color;
                this._BuildGraphic();
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

            // Set the BuildGraphic function to its appropriate values now that all data points have been constructed.
            this._BuildGraphic = savedBuildGraphic;

            this._BuildGraphic();
        }

        /**
        * Gets or sets the From location of the Line2d.
        */
        public get From(): Vector2d {
            return this._from;
        }
        public set From(from: Vector2d) {
            var previousX = this._from.X,
                previousY = this._from.Y;

            // Delete the old position to remove any property bindings on the vector2d
            delete this._from.X;
            delete this._from.Y;

            // Reset the position to its previous values (the monitor should not be applying now)
            this._from.X = previousX;
            this._from.Y = previousY;

            this._from = from;

            // If our Position changes we need to update the underlying PIXI object to match
            this._MonitorProperty(from, "X", () => {
                return from.X;
            }, (newX: number) => {
                    from.X = newX;
                    this.UpdatePosition();
                });

            this._MonitorProperty(from, "Y", () => {
                return from.Y;
            }, (newY: number) => {
                    from.Y = newY;
                    this.UpdatePosition();
                });

            this.UpdatePosition();
        }

        /**
        * Gets or sets the To location of the Line2d.
        */
        public get To(): Vector2d {
            return this._to;
        }
        public set To(to: Vector2d) {
            var previousX = this._to.X,
                previousY = this._to.Y;

            // Delete the old position to remove any property bindings on the vector2d
            delete this._to.X;
            delete this._to.Y;

            // Reset the position to its previous values (the monitor should not be applying now)
            this._to.X = previousX;
            this._to.Y = previousY;

            this._to = to;

            // If our Position changes we need to update the underlying PIXI object to match
            this._MonitorProperty(to, "X", () => {
                return to.X;
            }, (newX: number) => {
                    to.X = newX;
                    this.UpdatePosition();
                });

            this._MonitorProperty(to, "Y", () => {
                return to.Y;
            }, (newY: number) => {
                    to.Y = newY;
                    this.UpdatePosition();
                });

            this.UpdatePosition();
        }

        /**
        * Gets or sets the Position of the Line2d.  The Position determines where the graphic will be drawn on the screen.
        */
        public get Position(): Vector2d {
            return this._position;
        }
        public set Position(position: Vector2d) {
            var previousX = this._position.X,
                previousY = this._position.Y;

            // Delete the old position to remove any property bindings on the vector2d
            delete this._position.X;
            delete this._position.Y;

            // Reset the position to its previous values (the monitor should not be applying now)
            this._position.X = previousX;
            this._position.Y = previousY;

            this._position = position;

            // If our Position changes we need to update the underlying PIXI object to match
            this._MonitorProperty(position, "X", () => {
                return position.X;
            }, (newX: number) => {
                    position.X = newX;
                    this.RefreshCache();
                });

            this._MonitorProperty(position, "Y", () => {
                return position.Y;
            }, (newY: number) => {
                    position.Y = newY;
                    this.RefreshCache();
                });

            this.RefreshCache();
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
            this._BuildGraphic();
        }

        public _BuildGraphic(): void {
            this.PixiBase.clear();

            if (this._lineWidth > 0) {
                this.PixiBase.lineStyle(this._lineWidth, this._lineColor.toHexValue(), this._lineColor.A);
                this.PixiBase.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
                this.PixiBase.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
            }
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

            super._Clone(graphic);

            return graphic;
        }

        public Dispose(): void {
            super.Dispose();

            // We don't need any of our helper functions anymore so make them noop.
            this._BuildGraphic = this.UpdatePosition = this.RefreshCache = () => { };

            // Set the position to be a new Vector2d so it unbinds all monitors to the existing position object
            this.Position = this.From = this.To = eg.Vector2d.Zero;
                        
            this._lineColor.OnChange.Unbind(this._colorChangeWire);

            // Null out all objects so they can be garbage collected faster.
            this._position = this._to = this._from = this._cachedPosition = this._lineColor = this._lineWidth = this._colorChangeWire = null;
        }

        private UpdatePosition(): void {
            this.Position = ((this._from.Add(this._to)).Divide(2));
            this._BuildGraphic();
        }

        private RefreshCache(): void {
            var difference = this.Position.Subtract(this._cachedPosition);
            if (!difference.IsZero()) {
                this._from.X += difference.X;
                this._from.Y += difference.Y;
                this._to.X += difference.X;
                this._to.Y += difference.Y;
                this._cachedPosition = this.Position.Clone();
                this._BuildGraphic();
            }
        }
    }

}