/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../BoundingObject/BoundingCircle.ts" />
/// <reference path="Shape.ts" />

module EndGate.Core.Graphics.Shapes {

    export class Circle extends Shape {
        public _type: string = "Circle";

        public Radius: number;

        constructor(x: number, y: number, radius: number, color?: string) {
            super(new Assets.Vector2d(x, y), color);

            this.Radius = radius;
        }

        public BuildPath(context: CanvasRenderingContext2D): void {           
            context.arc(this.Position.X, this.Position.Y, this.Radius, 0, (<any>Math).twoPI);
        }
    }
}