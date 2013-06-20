/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Bounds/BoundingCircle.ts" />
/// <reference path="Shape.ts" />

module eg.Graphics {

    /**
    * Defines a drawable circle.
    */
    export class Circle extends Abstractions.Shape {
        public _type: string = "Circle";
         
        /**
        * Gets or sets the Radius of the Circle.
        */
        public Radius: number;

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
        constructor(x: number, y: number, radius: number, color: string);
        constructor(x: number, y: number, radius: number, color?: string) {
            super(new Vector2d(x, y), color);

            this.Radius = radius;
        }

        /**
        * The bounding area that represents where the Circle will draw.
        */
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = new Bounds.BoundingCircle(this.Position, this.Radius);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        public _BuildPath(context: CanvasRenderingContext2D): void {           
            context.arc(0, 0, this.Radius, 0, (<any>Math).twoPI);
        }        
    }
}