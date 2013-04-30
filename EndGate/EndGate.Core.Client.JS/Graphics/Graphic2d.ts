/// <reference path="../Interfaces/ITyped.d.ts" />
/// <reference path="../Interfaces/IMoveable.d.ts" />
/// <reference path="../Rendering/IRenderable.d.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Bounds/Bounds2d.ts" />
/// <reference path="Graphic2dState.ts" />

module EndGate.Graphics.Abstractions {

    export class Graphic2d implements _.ITyped, Rendering.IRenderable, IMoveable {
        public _type: string = "Graphic2d";

        public ZIndex: number;
        public Position: Vector2d;
        public Rotation: number;
        public State: Assets.Graphic2dState;

        constructor(position: Vector2d) {
            this.Position = position;
            this.Rotation = 0;
            this.ZIndex = 0;
            this.State = new Assets.Graphic2dState();
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

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            throw new Error("GetDrawBounds is abstract, it must be implemented.");
        }
    }

}