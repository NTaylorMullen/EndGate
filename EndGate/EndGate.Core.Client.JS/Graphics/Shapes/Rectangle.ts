/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../BoundingObject/BoundingRectangle.ts" />
/// <reference path="Shape.ts" />

module EndGate.Core.Graphics.Shapes {

    export class Rectangle extends Shape {
        public _type: string = "Rectangle";

        public Size: Assets.Size2d;

        constructor(x: number, y: number, width: number, height: number, color?: string) {
            super(new BoundingObject.BoundingRectangle(new Assets.Vector2d(x, y), new Assets.Size2d(width, height)), color);

            this.Size = (<BoundingObject.BoundingRectangle>this._bounds).Size;
        }

        public BuildPath(context: CanvasRenderingContext2D): void {
            context.rect(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
        }
    }

}