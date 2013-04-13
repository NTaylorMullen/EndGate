module EndGate.Core.Rendering {

    export interface IRenderable {
        Draw(context: CanvasRenderingContext2D): void;
    }

}