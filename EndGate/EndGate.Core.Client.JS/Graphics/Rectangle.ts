/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="Graphic2d.ts" />

module EndGate.Core.Graphics {

    import Assets = module(EndGate.Core.Assets);

    export class Rectangle extends Graphic2d {
        public _type: string = "Rectangle";

        constructor(x: number, y: number, width: number, height: number) {
            super(new Assets.Vector2d(x, y), new Assets.Size2d(width, height));            
        }

        public Color(color: string): string {
            return this.State.FillStyle(color);
        }

        public Draw(context: CanvasRenderingContext2D): void {
            this.StartDraw(context);

            context.fillRect(this.Position.X, this.Position.Y, this.Size.Width, this.Size.Height);

            this.EndDraw(context);
        }
    }

}