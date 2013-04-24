/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../BoundingObject/BoundingRectangle.ts" />
/// <reference path="Shape.ts" />

module EndGate.Core.Graphics.Shapes {

    export class Rectangle extends Shape {
        public _type: string = "Rectangle";

        public Size: Assets.Size2d;

        constructor(x: number, y: number, width: number, height: number, color?: string) {
            super(new Assets.Vector2d(x, y), color);

            this.Size = new Assets.Size2d(width, height);
        }

        public BuildPath(context: CanvasRenderingContext2D): void {
            context.rect(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
        }

        public GetDrawBounds(): BoundingObject.Bounds2d {
            var bounds = new BoundingObject.BoundingRectangle(this.Position, this.Size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }
    }

}