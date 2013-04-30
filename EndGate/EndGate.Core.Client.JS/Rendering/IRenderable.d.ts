/// <reference path="../Bounds/Bounds2d.ts" />

module EndGate.Rendering {

    export interface IRenderable {
        ZIndex: number;
        Draw(context: CanvasRenderingContext2D): void;
        GetDrawBounds(): Bounds.Abstractions.Bounds2d;
    }

}