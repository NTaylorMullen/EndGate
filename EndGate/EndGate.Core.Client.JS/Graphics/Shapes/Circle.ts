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
                this.Size.Width = this.Size.Height = val * 2;
            }

            return this._radius;
        }

        public Draw(context: CanvasRenderingContext2D): void {
            this.SyncSize();

            super.Draw(context);
        }

        public BuildPath(context: CanvasRenderingContext2D): void {           
            context.arc(this.Position.X, this.Position.Y, this._radius, 0, Math.twoPI);
        }

        private SyncSize() {
            var circumfrence = this._radius * 2;

            if (circumfrence !== this.Size.Width) {
                this.Radius(this.Size.Width / 2);
            }
            else if (circumfrence !== this.Size.Height) {
                this.Radius(this.Size.Height / 2);
            }
        }
    }
}