/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Bounds/BoundingCircle.ts" />
/// <reference path="Shape.ts" />

module EndGate.Graphics {

    export class Circle extends Abstractions.Shape {
        public _type: string = "Circle";

        public Radius: number;

        constructor(x: number, y: number, radius: number, color?: string) {
            super(new Vector2d(x, y), color);

            this.Radius = radius;
        }

        public BuildPath(context: CanvasRenderingContext2D): void {           
            context.arc(0, 0, this.Radius, 0, (<any>Math).twoPI);
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = new Bounds.BoundingCircle(this.Position, this.Radius);

            bounds.Rotation = this.Rotation;

            return bounds;
        }
    }
}