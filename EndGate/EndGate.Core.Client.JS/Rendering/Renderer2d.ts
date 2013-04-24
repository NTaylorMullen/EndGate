/// <reference path="IRenderer.d.ts" />
/// <reference path="IRenderable.d.ts" />
/// <reference path="../Utilities/EventHandler.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />

module EndGate.Core.Rendering {

    export class Renderer2d implements IRenderer {
        public static _zindexSort: (a: IRenderable, b: IRenderable) => number = (a: IRenderable, b: IRenderable) => { return a.ZIndex - b.ZIndex; };

        // These essentially are used to create a double buffer for rendering
        private _visibleCanvas: HTMLCanvasElement;
        private _visibleContext: CanvasRenderingContext2D;
        public _bufferCanvas: HTMLCanvasElement;
        public _bufferContext: CanvasRenderingContext2D; // Protected

        private _disposed: bool;

        constructor(renderOnto: HTMLCanvasElement) {
            this._visibleCanvas = renderOnto;
            this._visibleContext = renderOnto.getContext("2d");

            // Create an equally sized canvas for a buffer
            this._bufferCanvas = <HTMLCanvasElement>document.createElement("canvas");
            this._bufferContext = this._bufferCanvas.getContext("2d");
            this.OnRendererSizeChange = new Utilities.EventHandler();
            this.UpdateBufferSize();

            this._disposed = false;
        }

        public OnRendererSizeChange: Utilities.EventHandler;

        public Render(renderables: IRenderable[]): CanvasRenderingContext2D {
            // Check if our visible canvas has changed size
            if (this._bufferCanvas.width !== this._visibleCanvas.width || this._bufferCanvas.height !== this._visibleCanvas.height) {
                this.UpdateBufferSize();
            }

            // Push buffer to screen
            this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
            this._visibleContext.drawImage(this._bufferCanvas, 0, 0);
            // Clear our buffer to prepare it for new drawings
            this._ClearBuffer();

            // Sort the renderables by the ZIndex so we draw in the correct order (for layering);
            renderables.sort(Renderer2d._zindexSort);

            // We do not save or restore the canvas state because we want to let the
            // dev decide how they manipulate the canvas            

            for (var i = 0; i < renderables.length; i++) {
                renderables[i].Draw(this._bufferContext);
            }

            return this._bufferContext;
        }

        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
            }
        }

        public _ClearBuffer() {
            this._bufferContext.clearRect(0, 0, this._bufferCanvas.width, this._bufferCanvas.height);
        }

        private UpdateBufferSize() {
            this._bufferCanvas.width = this._visibleCanvas.width;
            this._bufferCanvas.height = this._visibleCanvas.height;
            this.OnRendererSizeChange.Trigger(new Assets.Size2d(this._visibleCanvas.width, this._visibleCanvas.height))
        }
    }

}