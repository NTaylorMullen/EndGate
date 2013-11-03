/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />
/// <reference path="../Color.ts" />
/// <reference path="Shape.ts" />

module EndGate.Graphics {

    /**
    * Defines a drawable rectangle.
    */
    export class Rectangle extends Shape {
        public _type: string = "Rectangle";

        /**
        * Gets or sets the PIXIBase object that is used to render the Rectangle.
        */
        public PixiBase: PIXI.Graphics;

        private _size: Size2d;
        private _proxyWidth: number;
        private _proxyHeight: number;

        /**
        * Creates a new instance of the Rectangle object.
        * @param x Initial horizontal location of the Rectangle.
        * @param y Initial vertical location of the Rectangle.
        * @param width Initial width of the Rectangle.
        * @param height Initial height of the Rectangle.
        */
        constructor(x: number, y: number, width: number, height: number);
        /**
        * Creates a new instance of the Rectangle object with a specified color.
        * @param x Initial horizontal location of the Rectangle.
        * @param y Initial vertical location of the Rectangle.
        * @param width Initial width of the Rectangle.
        * @param height Initial height of the Rectangle.
        * @param color Initial color of the Rectangle.
        */
        constructor(x: number, y: number, width: number, height: number, color: Color);
        /**
        * Creates a new instance of the Rectangle object with a specified color.
        * @param x Initial horizontal location of the Rectangle.
        * @param y Initial vertical location of the Rectangle.
        * @param width Initial width of the Rectangle.
        * @param height Initial height of the Rectangle.
        * @param color Initial string color of the Rectangle.
        */
        constructor(x: number, y: number, width: number, height: number, color: string);
        constructor(x: number, y: number, width: number, height: number, color?: any) {
            super(new PIXI.Graphics(), new Vector2d(x, y), color);

            this._size = Size2d.Zero;
            this.Size = new Size2d(width, height);
        }

        /**
        * Gets or sets the Size of the Rectangle.
        */
        public get Size(): Size2d {
            return this._size;
        }
        public set Size(size: Size2d) {
            var previousWidth = this._size.Width,
                previousHeight = this._size.Height;

            // Delete the old size to remove any property bindings on the Size2d
            delete this._size.Width;
            delete this._size.Height;

            // Reset the size to its previous values (the monitor should not be applying now)
            this._size.Width = previousWidth;
            this._size.Height = previousHeight;

            this._size = size;
            this._proxyWidth = size.Width;
            this._proxyHeight = size.Height;

            // If our Size changes we need to update the underlying PIXI object to match
            this._MonitorProperty(size, "Width", () => {
                return this._proxyWidth;
            }, (width: number) => {
                    this._proxyWidth = width;
                    this._BuildGraphic();
                });

            this._MonitorProperty(size, "Height", () => {
                return this._proxyHeight
            }, (height: number) => {
                    this._proxyHeight = height;
                    this._BuildGraphic();
                });

            this._BuildGraphic();
        }

        /**
        * The bounding area that represents where the Rectangle will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this.Size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        /**
        * Scale's the rectangle graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            this.Size.Width *= scale;
            this.Size.Height *= scale;
        }

        /**
        * Returns a nearly identical copy of this Rectangle.  If this Rectangle belongs to a parent, the cloned Rectangle will not. If this Rectangle has children, all children will be cloned as well.  Lastly, the cloned Rectangle will not have the same event bindings as this one does.
        */
        public Clone(): Rectangle {
            var graphic = new Rectangle(this.Position.X, this.Position.Y, this.Size.Width, this.Size.Height, this.Color.Clone());

            super._Clone(graphic);

            return graphic;
        }

        public _BuildGraphic(): void {
            if (this.Size) {
                this._StartBuildGraphic();
                this.PixiBase.drawRect(-this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);
                this._EndBuildGraphic();
            }
        }
    }

}