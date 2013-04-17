/// <reference path="../Interfaces/IDisposable.d.ts" />
/// <reference path="../Interfaces/ITyped.d.ts" />
/// <reference path="../GameTime.ts" />
/// <reference path="../Graphics/Graphic2d.ts" />
/// <reference path="IRenderer.d.ts" />
/// <reference path="Renderer2d.ts" />

module EndGate.Core.Rendering {
    
    export class Scene implements ITyped, IDisposable {
        public _type: string = "Scene";

        private _actors: Graphics.Graphic2d[];
        private _renderer: IRenderer;
        private _onDraw: (context: CanvasRenderingContext2D) => void;

        private _disposed: bool;

        constructor(drawArea?: HTMLCanvasElement, onDraw?: (context: CanvasRenderingContext2D) => void) {
            this._actors = [];

            if (typeof drawArea === "undefined") {
                drawArea = this.CreateDefaultDrawArea();
            }

            if (typeof onDraw === "undefined") {
                this._onDraw = _ => { };
            }
            else {
                this._onDraw = onDraw;
            }

            this._renderer = new Renderer2d(drawArea);
            this._disposed = false;
        }

        public Add(actor: Graphics.Graphic2d): void {
            this._actors.push(actor);
        }

        public Remove(actor: Graphics.Graphic2d): void {
            for (var i = 0; i < this._actors.length; i++) {
                if (this._actors[i] === actor) {
                    this._actors.splice(i, 1);
                    return;
                }
            }
        }

        public Draw(): void {
            this._onDraw(this._renderer.Render(this._actors));
        }

        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this._actors = [];
                this._renderer.Dispose();
            }
        }

        private CreateDefaultDrawArea(): HTMLCanvasElement {
            var drawArea = <HTMLCanvasElement>document.createElement("canvas");
            drawArea.width = window.innerWidth;
            drawArea.height = window.innerHeight;
            document.getElementsByTagName('body')[0].appendChild(drawArea);

            return drawArea;
        }
    }

}