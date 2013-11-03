/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Bounds/BoundingCircle.ts" />
/// <reference path="../Color.ts" />
/// <reference path="Shape.ts" />

module EndGate.Graphics {

    /**
    * Defines a drawable circle.
    */
    export class Circle extends Shape {
        public _type: string = "Circle";
         
        /**
        * Gets or sets the PIXIBase object that is used to render the Circle.
        */
        public PixiBase: PIXI.Graphics;

        private _radius: number;

        /**
        * Creates a new instance of the Circle object.
        * @param x Initial horizontal location of the Circle.
        * @param y Initial vertical location of the Circle.
        * @param radius Initial Radius of the Circle.
        */
        constructor(x: number, y: number, radius: number);
        /**
        * Creates a new instance of the Circle object with a specified color.
        * @param x Initial horizontal location of the Circle.
        * @param y Initial vertical location of the Circle.
        * @param radius Initial Radius of the Circle.
        * @param color Initial color of the Circle.
        */
        constructor(x: number, y: number, radius: number, color: Color);
        /**
        * Creates a new instance of the Circle object with a specified color.
        * @param x Initial horizontal location of the Circle.
        * @param y Initial vertical location of the Circle.
        * @param radius Initial Radius of the Circle.
        * @param color Initial color string of the Circle.
        */
        constructor(x: number, y: number, radius: number, color: string);
        constructor(x: number, y: number, radius: number, color?: any) {
            super(new PIXI.Graphics(), new Vector2d(x, y), color);

            this.Radius = radius;
        }

        /**
        * Gets or sets the Radius of the Circle.
        */
        public get Radius(): number {
            return this._radius;
        }
        public set Radius(radius: number) {
            this._radius = radius;
            this._BuildGraphic();
        }

        /**
        * The bounding area that represents where the Circle will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingCircle(this.Position, this.Radius);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        /**
        * Scale's the circle graphic.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            this.Radius *= scale;
        }

        /**
        * Returns a nearly identical copy of this Circle.  If this Circle belongs to a parent, the cloned Circle will not. If this Circle has children, all children will be cloned as well.  Lastly, the cloned Circle will not have the same event bindings as this one does.
        */
        public Clone(): Circle {
            var graphic = new Circle(this.Position.X, this.Position.Y, this.Radius, this.Color.Clone());

            super._Clone(graphic);

            return graphic;
        }

        public _BuildGraphic(): void {
            if (typeof this._radius !== "undefined") {
                this._StartBuildGraphic();
                this.PixiBase.drawCircle(0, 0, this.Radius);
                this._EndBuildGraphic();
            }
        }
    }
}