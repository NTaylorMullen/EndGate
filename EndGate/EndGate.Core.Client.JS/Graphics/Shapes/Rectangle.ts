/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="Shape.ts" />

module EndGate.Core.Graphics.Shapes {

    export class Rectangle extends Shape {
        public _type: string = "Rectangle";

        constructor(x: number, y: number, width: number, height: number, color?: string) {
            super(new Assets.Vector2d(x, y), new Assets.Size2d(width, height), color);
        }

        public Draw(context: CanvasRenderingContext2D): void {
            this.StartDraw(context);

            context.fillRect(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight(), this.Size.Width, this.Size.Height);

            this.EndDraw(context);
        }
    }

}