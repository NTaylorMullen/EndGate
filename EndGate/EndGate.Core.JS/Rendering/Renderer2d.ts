/// <reference path="IRenderer.ts" />
/// <reference path="IRenderable.ts" />
/// <reference path="../Utilities/EventHandler1.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />

module eg.Rendering {

    /**
    * Defines a 2d renderer that uses a double buffer to draw graphics.
    */
    export class Renderer2d implements _.IRenderer {
        public static _zindexSort: (a: IRenderable, b: IRenderable) => number = (a: IRenderable, b: IRenderable) => { return a.ZIndex - b.ZIndex; };

        public _BufferCanvas: HTMLCanvasElement;
        public _BufferContext: CanvasRenderingContext2D; // Protected

        // These essentially are used to create a double buffer for rendering
        private _visibleCanvas: HTMLCanvasElement;
        private _visibleContext: CanvasRenderingContext2D;
        private _disposed: bool;
        private _onRendererSizeChange: EventHandler1<Size2d>;

        /**
        * Creates a new instance of the Renderer2d object.
        * @param renderOnto The canvas to render onto.
        */
        constructor(renderOnto: HTMLCanvasElement) {
            this._visibleCanvas = renderOnto;
            this._visibleContext = renderOnto.getContext("2d");

            // Create an equally sized canvas for a buffer
            this._BufferCanvas = <HTMLCanvasElement>document.createElement("canvas");
            this._BufferContext = this._BufferCanvas.getContext("2d");
            this._onRendererSizeChange = new EventHandler1<Size2d>();
            this.UpdateBufferSize();

            this._disposed = false;
        }

        /**
        * Gets an event that is triggered when the renderOnto canvas changes size.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnRendererSizeChange(): EventHandler1<Size2d> {
            return this._onRendererSizeChange;
        }

        /**
        * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
        * @param renderables Array of items that are to be rendered, assumes Visible is set to true.
        */
        public Render(renderables: IRenderable[]): CanvasRenderingContext2D {
            // Check if our visible canvas has changed size
            if (this._BufferCanvas.width !== this._visibleCanvas.width || this._BufferCanvas.height !== this._visibleCanvas.height) {
                this.UpdateBufferSize();
            }

            // Push buffer to screen
            this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
            this._visibleContext.drawImage(this._BufferCanvas, 0, 0);
            // Clear our buffer to prepare it for new drawings
            this._ClearBuffer();

            // Sort the renderables by the ZIndex so we draw in the correct order (for layering);
            renderables.sort(Renderer2d._zindexSort);

            // We do not save or restore the canvas state because we want to let the
            // dev decide how they manipulate the canvas            

            for (var i = 0; i < renderables.length; i++) {
                renderables[i].Draw(this._BufferContext);
            }

            return this._BufferContext;
        }

        /**
        * Destroys the visible canvas.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
            }
        }

        public _ClearBuffer() {
            this._BufferContext.clearRect(0, 0, this._BufferCanvas.width, this._BufferCanvas.height);
        }

        private UpdateBufferSize() {
            this._BufferCanvas.width = this._visibleCanvas.width;
            this._BufferCanvas.height = this._visibleCanvas.height;
            this.OnRendererSizeChange.Trigger(new Size2d(this._visibleCanvas.width, this._visibleCanvas.height))
        }
    }

}