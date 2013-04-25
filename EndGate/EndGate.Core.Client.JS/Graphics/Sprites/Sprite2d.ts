/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="ImageSource.ts" />

module EndGate.Core.Graphics.Sprites {

    export class Sprite2d extends Graphic2d {
        public Image: ImageSource;
        public Size: Assets.Size2d;

        constructor(x: number, y: number, image: ImageSource) {
            super(new Assets.Vector2d(x, y));

            this.Image = image;
            this.Size = this.Image.Size;
        }

        public Opacity(alpha?: number): number {
            return this.State.GlobalAlpha(alpha);
        }

        public Draw(context: CanvasRenderingContext2D): void {
            super.StartDraw(context);

            context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.X, this.Image.ClipSize.Width, this.Image.ClipSize.Height, this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight(), this.Size.Width, this.Size.Height)

            super.EndDraw(context);
        }

        public GetDrawBounds(): BoundingObject.Bounds2d {
            var bounds = new BoundingObject.BoundingRectangle(this.Position, this.Image.Size);

            bounds.Rotation = this.Rotation;

            return bounds;
        }
    }

}