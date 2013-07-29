/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />
/// <reference path="Shape.ts" />

module EndGate.Graphics {

    /**
    * Defines a drawable rectangle.
    */
    export class Rectangle extends Abstractions.Shape {
        public _type: string = "Rectangle";

        /**
        * Gets or sets the Size of the Rectangle.
        */
        public Size: Size2d;

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
        constructor(x: number, y: number, width: number, height: number, color: string);
        constructor(x: number, y: number, width: number, height: number, color?: string) {
            super(new Vector2d(x, y), color);

            this.Size = new Size2d(width, height);
        }

        /**
        * The bounding area that represents where the Rectangle will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this.Size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }

        public _BuildPath(context: CanvasRenderingContext2D): void {
            context.rect(-this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);
        }
    }

}