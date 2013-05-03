/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />
/// <reference path="Shape.ts" />

module EndGate.Graphics {

    export class Rectangle extends Abstractions.Shape {
        public _type: string = "Rectangle";

        public Size: Size2d;

        constructor(x: number, y: number, width: number, height: number, color?: string) {
            super(new Vector2d(x, y), color);

            this.Size = new Size2d(width, height);
        }

        public BuildPath(context: CanvasRenderingContext2D): void {
            context.rect(-this.Size.HalfWidth(), -this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this.Size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }
    }

}