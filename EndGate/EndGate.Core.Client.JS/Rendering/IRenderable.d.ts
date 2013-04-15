module EndGate.Core.Rendering {

    export interface IRenderable {
        ZIndex: number;
        Draw(context: CanvasRenderingContext2D): void;
    }

}