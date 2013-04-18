/// <reference path="../Interfaces/ITyped.d.ts" />
/// <reference path="../Rendering/IRenderable.d.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../BoundingObject/Bounds2d.ts" />
/// <reference path="Graphic2dState.ts" />

module EndGate.Core.Graphics {

    export class Graphic2d implements ITyped, Rendering.IRenderable {
        public _type: string = "Graphic2d";

        public ZIndex: number;
        public Position: Assets.Vector2d;
        public Rotation: number;
        public State: Graphic2dState;

        constructor(position: Assets.Vector2d) {
            this.Position = position;
            this.Rotation = 0;
            this.ZIndex = 0;
            this.State = new Graphic2dState();
        }

        public StartDraw(context: CanvasRenderingContext2D): void {
            context.save();
            this.State.SetContextState(context);

            if (this.Rotation !== 0) {
                context.translate(this.Position.X, this.Position.Y);
                context.rotate(this.Rotation);
                context.translate(-this.Position.X, -this.Position.Y);
            }
        }

        public EndDraw(context: CanvasRenderingContext2D): void {
            context.restore();
        }

        public Draw(context: CanvasRenderingContext2D): void {
        }
    }

}