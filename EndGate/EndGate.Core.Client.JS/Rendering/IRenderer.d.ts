/// <reference path="../Interfaces/IDisposable.d.ts" />
/// <reference path="IRenderable.d.ts" />

module EndGate.Core.Rendering {

    export interface IRenderer extends IDisposable {
        Render(renderables: IRenderable[]): void;
    }

}