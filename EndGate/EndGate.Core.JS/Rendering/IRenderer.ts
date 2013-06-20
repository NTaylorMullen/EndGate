/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="IRenderable.ts" />

declare module eg.Rendering._ {

    export interface IRenderer extends IDisposable {
        Render(renderables: IRenderable[]): CanvasRenderingContext2D;
    }

}