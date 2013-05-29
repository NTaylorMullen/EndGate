/// <reference path="../Bounds/Bounds2d.ts" />

declare module EndGate.Rendering {

    /**
    * Represents a renderable object that can be drawn to a canvas.
    */
    export interface IRenderable {
        /**
        * Gets or sets the ZIndex.  The ZIndex is used to control draw order.  Higher ZIndexes appear above lower ZIndexed renderables.
        */
        ZIndex: number;
        /**
        * Draws the renderable to the provided canvas context
        * @param context The canvas context to draw the renderable onto.
        */
        Draw(context: CanvasRenderingContext2D): void;
        /**
        * Returns the bounding area that represents where the renderable will draw.
        */
        GetDrawBounds(): Bounds.Abstractions.Bounds2d;
    }

}