/// <reference path="../Interfaces/ITyped.d.ts" />
/// <reference path="../Rendering/IRenderable.d.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="Graphic2dState.ts" />

module EndGate.Core.Graphics {

    import Rendering = module(EndGate.Core.Rendering);
    import Assets = module(EndGate.Core.Assets);

    export class Graphic2d implements ITyped, Rendering.IRenderable {
        public _type: string = "Graphic2d";

        public Size: Assets.Size2d;
        public Position: Assets.Vector2d;
        public Rotation: number;
        public State: Graphic2dState;

        constructor(position: Assets.Vector2d, size: Assets.Size2d) {
            this.Position = position;
            this.Size = size;
            this.Rotation = 0;
            this.State = new Graphic2dState();
        }

        public StartDraw(context: CanvasRenderingContext2D): void {
            context.save();
            this.State.SetContextState(context);
        }

        public EndDraw(context: CanvasRenderingContext2D): void {
            context.restore();
        }

        public Draw(context: CanvasRenderingContext2D): void {
        }        
    }

}