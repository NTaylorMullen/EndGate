/// <reference path="../BoundingObject/Bounds2d.ts" />

module EndGate.Core.Rendering {

    export interface IRenderable {
        ZIndex: number;
        Draw(context: CanvasRenderingContext2D): void;
        GetDrawBounds(): BoundingObject.Bounds2d;
    }

}