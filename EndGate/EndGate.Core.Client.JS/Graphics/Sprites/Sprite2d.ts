/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="ImageSource.ts" />

module EndGate.Graphics {

    export class Sprite2d extends Abstractions.Graphic2d {
        public _type: string = "Sprite2d";

        public Image: Assets.ImageSource;
        public Size: Size2d;

        constructor(x: number, y: number, image: Assets.ImageSource, width?: number = image.ClipSize.Width, height?: number = image.ClipSize.Height) {
            super(new Vector2d(x, y));

            this.Image = image;
            this.Size = new Size2d(width, height);
        }

        public Opacity(alpha?: number): number {
            return this.State.GlobalAlpha(alpha);
        }

        public Draw(context: CanvasRenderingContext2D): void {
            super.StartDraw(context);

            context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, - this.Size.HalfWidth(), - this.Size.HalfHeight(), this.Size.Width, this.Size.Height)

            super.EndDraw(context);
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = new Bounds.BoundingRectangle(this.Position, this.Image.Size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }
    }

}