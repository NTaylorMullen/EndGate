/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="Shape.ts" />

module EndGate.Core.Graphics.Shapes {

    export class Circle extends Shape {
        public _type: string = "Circle";

        private _radius: number;

        constructor(x: number, y: number, radius: number, color?: string) {
            super(new Assets.Vector2d(x, y), new Assets.Size2d(radius * 2, radius * 2), color);

            this._radius = radius;
        }

        public Radius(val?: number): number {
            if (typeof val !== "undefined") {
                this._radius = val;
                this.Size.Width = val * 2;
                this.Size.Height = val * 2;
            }

            return this._radius;
        }

        public BuildPath(context: CanvasRenderingContext2D): void {
            context.arc(this.Position.X, this.Position.Y, this._radius, 0, Math.twoPI);
        }
    }
}