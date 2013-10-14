/// <reference path="Camera2d.ts" />
/// <reference path="../Renderer2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="Camera2dCanvasContextBuilder.ts" />

module EndGate.Rendering {

    /**
    * Defines a camera rendering object that when used in conjunction with a Camera2d draws all objects in a camera relative position.
    */
    export class Camera2dRenderer extends Renderer2d {
        private _camera: Camera2d;
        private _contextBuilder: _.Camera2dCanvasContextBuilder;

        /**
        * Creates a new instance of the Camera2dRenderer.
        * @param renderOnto The canvas to render onto.
        * @param camera The camera that ultimately decides what is drawn to the renderOnto canvas.
        */
        constructor(renderOnto: HTMLCanvasElement, camera: Camera2d) {
            super(renderOnto);

            this._camera = camera;
            this._contextBuilder = new _.Camera2dCanvasContextBuilder(this._camera);

            this.OnRendererSizeChange.Bind((newSize: eg.Size2d) => {
                this._contextBuilder._UpdateCanvasCenter(newSize);
                this._camera.Size = newSize;
            });

            this._contextBuilder._UpdateCanvasCenter(new Size2d(renderOnto.width, renderOnto.height));
            this._BufferContext = this._contextBuilder.Build(this._BufferContext);

        }

        /**
        * Renders the provided renderables onto the renderOnto canvas.  Returns the canvas that was rendered onto.
        * @param renderables Array of items that are to be rendered. 
        */
        public Render(renderables: IRenderable[]): CanvasRenderingContext2D {
            var context,
                inverseScale = this._camera._GetInverseDistanceScale();

            this._BufferContext.save();
            this._BufferContext.scale(inverseScale, inverseScale)

            context = super.Render(this.GetOnScreenRenderables(renderables));

            this._BufferContext.restore();

            return context;
        }

        public _ClearBuffer() {
            var cameraScale = this._camera._GetDistanceScale();
            (<any>this._BufferContext).unModifiedClearRect(0, 0, this._BufferCanvas.width * cameraScale, this._BufferCanvas.height * cameraScale);
        }

        private GetOnScreenRenderables(allRenderables: IRenderable[]): IRenderable[] {
            var onscreen: IRenderable[] = [],
                scale = this._camera._GetDistanceScale(),
                unscale = 1 / scale;

            // Scale camera size to our zoom level
            this._camera.Scale(scale, scale);

            for (var i = 0; i < allRenderables.length; i++) {
                if (allRenderables[i].Visible && this._camera.Intersects(allRenderables[i].GetDrawBounds())) {
                    onscreen.push(allRenderables[i]);
                }
            }

            this._camera.Scale(unscale, unscale);

            return onscreen;
        }
    }

}