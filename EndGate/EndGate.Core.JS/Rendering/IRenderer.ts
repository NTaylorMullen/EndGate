/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="IRenderable.ts" />

declare module EndGate.Rendering._ {

    export interface IRenderer extends IDisposable {
        Render(preRender: (context: CanvasRenderingContext2D) => void, renderables: IRenderable[]): CanvasRenderingContext2D;
    }

}