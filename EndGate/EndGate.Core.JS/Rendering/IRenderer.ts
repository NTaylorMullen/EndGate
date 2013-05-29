/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="IRenderable.ts" />

declare module EndGate.Rendering._ {

    export interface IRenderer extends IDisposable {
        Render(renderables: IRenderable[]): CanvasRenderingContext2D;
    }

}