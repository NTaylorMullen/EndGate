/// <reference path="../Interfaces/IDisposable.d.ts" />
/// <reference path="../Interfaces/ITyped.d.ts" />
/// <reference path="../GameTime.ts" />
/// <reference path="../Graphics/Graphic2d.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="Camera/Camera2d.ts" />
/// <reference path="IRenderer.d.ts" />
/// <reference path="Camera/Camera2dRenderer.ts" />

module EndGate.Rendering {

    export class Scene2d implements EndGate._.ITyped, IDisposable {
        public _type: string = "Scene";

        public DrawArea: HTMLCanvasElement;
        public Camera: Camera2d;

        private _actors: Graphics.Abstractions.Graphic2d[];
        private _renderer: IRenderer;
        private _onDraw: (context: CanvasRenderingContext2D) => void;

        private _disposed: bool;

        constructor(drawArea?: HTMLCanvasElement, onDraw?: (context: CanvasRenderingContext2D) => void ) {
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

            this.ApplyStyles(drawArea);

            this.DrawArea = drawArea;
            this.Camera = new Camera2d(new Vector2d(this.DrawArea.width / 2, this.DrawArea.height / 2), new Size2d(this.DrawArea.width, this.DrawArea.height));
            this._renderer = new Camera2dRenderer(this.DrawArea, this.Camera);
            this._disposed = false;
        }

        public Add(actor: Graphics.Abstractions.Graphic2d): void {
            this._actors.push(actor);
        }

        public Remove(actor: Graphics.Abstractions.Graphic2d): void {
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

        private ApplyStyles(drawArea: HTMLCanvasElement): void {
            drawArea.style.position = "absolute";
            drawArea.style.zIndex = "2"
            drawArea.parentElement.style.position = "relative";
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