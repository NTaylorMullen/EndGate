/// <reference path="Camera2d.ts" />
/// <reference path="../Renderer2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="Camera2dCanvasContextBuilder.ts" />

module EndGate.Core.Rendering.Camera {

    export class Camera2dRenderer extends Renderer2d {
        private _camera: Camera2d;
        private _contextBuilder: Camera2dCanvasContextBuilder;

        constructor(renderOnto: HTMLCanvasElement, camera: Camera2d) {
            super(renderOnto);

            this._camera = camera;
            this._contextBuilder = new Camera2dCanvasContextBuilder(this._camera);

            this.OnRendererSizeChange.Bind(this._contextBuilder.UpdateCanvasCenter);
            this._contextBuilder.UpdateCanvasCenter(new Assets.Size2d(renderOnto.width, renderOnto.height));
            this._bufferContext = this._contextBuilder.BuildFrom(this._bufferContext);

        }

        public Render(renderables: IRenderable[]): CanvasRenderingContext2D {
            var context,
                inverseScale = this._camera.GetInverseDistanceScale();

            this._bufferContext.save();
            this._bufferContext.scale(inverseScale, inverseScale)

            context = super.Render(this.GetOnScreenRenderables(renderables));

            this._bufferContext.restore();

            return context;
        }

        public _ClearBuffer() {
            var cameraScale = this._camera.GetDistanceScale();
            (<any>this._bufferContext).unModifiedClearRect(0, 0, this._bufferCanvas.width * cameraScale, this._bufferCanvas.height * cameraScale);
        }

        private GetOnScreenRenderables(allRenderables: IRenderable[]): IRenderable[] {
            var onscreen: IRenderable[] = [],
                scale = this._camera.GetDistanceScale(),
                unscale = 1 / scale;

            // Scale camera size to our zoom level
            this._camera.Scale(scale, scale);

            for (var i = 0; i < allRenderables.length; i++) {
                if (this._camera.Intersects(allRenderables[i].GetDrawBounds())) {
                    onscreen.push(allRenderables[i]);
                }
            }

            this._camera.Scale(unscale, unscale);

            return onscreen;
        }
    }

}