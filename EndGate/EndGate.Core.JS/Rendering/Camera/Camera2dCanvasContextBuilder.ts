/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="Camera2d.ts" />

module eg.Rendering._ {

    /**
    * Defines a builder that is used to build a camera sensitive CanvasRenderingContext2d so that anything drawn to it becomes relative to the Camera2d.
    */
    export class Camera2dCanvasContextBuilder {
        private _camera: Camera2d;
        private _canvasCenter: Vector2d;
        private _translated: bool;
        private _translationState: any[];

        /**
        * Creates a new instance of the Camera2dCanvasContextBuilder object.
        * @param camera Camera to link to built CanvasRenderingContext2d's (Cannot change after construction).
        */
        constructor(camera: Camera2d) {
            this._camera = camera;
            this._canvasCenter = this._camera.Position.Clone();
            this._translated = false;
            this._translationState = [];
            this._translationState.push(this._translated);
        }

        /**
        * Builds a new CanvasRenderingContext2d around the provided context that is linked to the camera.  Anything drawn to the context becomes relative to the camera.
        * @param context The context to build the camera linked context around.
        */
        public Build(context: CanvasRenderingContext2D): CanvasRenderingContext2D {
            var that = this,
                savedCreateRadialGradient = context.createRadialGradient,
                savedTranslate = context.translate,
                savedSave = context.save,
                savedRestore = context.restore,
                savedDrawImage1 = this.BuildPositionReplacer(context.drawImage, 1),
                savedDrawImage2 = this.BuildPositionReplacer(context.drawImage, 5);

            (<any>context).unModifiedClearRect = context.clearRect;

            context.arc = this.BuildPositionReplacer(context.arc);
            context.arcTo = this.BuildPositionReplacer(context.arcTo, 0, 4);
            context.bezierCurveTo = this.BuildPositionReplacer(context.bezierCurveTo, 0, 6);
            context.clearRect = this.BuildPositionReplacer(context.clearRect);
            context.createLinearGradient = this.BuildPositionReplacer(context.createLinearGradient, 0, 4);
            context.createRadialGradient = function () {
                var scale = that._camera._GetDistanceScale();
                arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                arguments[3] += -that._camera.Position.X + that._canvasCenter.X * scale;
                arguments[4] += -that._camera.Position.Y + that._canvasCenter.Y * scale;

                return savedCreateRadialGradient.apply(this, arguments);
            };
            context.drawImage = function() {
                if (arguments.length <= 5) {
                    savedDrawImage1.apply(this, arguments);
                }
                else {
                    savedDrawImage2.apply(this, arguments);
                }
            };
            context.fillRect = this.BuildPositionReplacer(context.fillRect);
            context.fillText = this.BuildPositionReplacer(context.fillText, 1);
            context.getImageData = this.BuildPositionReplacer(context.getImageData);
            context.isPointInPath = this.BuildPositionReplacer(context.isPointInPath);
            context.lineTo = this.BuildPositionReplacer(context.lineTo);
            context.moveTo = this.BuildPositionReplacer(context.moveTo);
            context.putImageData = this.BuildPositionReplacer(context.putImageData, 1);
            context.quadraticCurveTo = this.BuildPositionReplacer(context.quadraticCurveTo, 0, 4);
            context.rect = this.BuildPositionReplacer(context.rect);
            context.strokeRect = this.BuildPositionReplacer(context.strokeRect);
            context.strokeText = this.BuildPositionReplacer(context.strokeText, 1);

            context.save = function () {
                that._translationState.push(that._translated);

                savedSave.call(this);
            };

            context.restore = function () {
                that._translated = that._translationState.pop();

                savedRestore.call(this);
            };

            context.translate = function () {
                var scale;

                if (!that._translated) {
                    scale = that._camera._GetDistanceScale();

                    arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                    arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                }

                that._translated = true;

                savedTranslate.apply(this, arguments);
            };

            return context;
        }

        public _UpdateCanvasCenter(newSize: Size2d): void {
            this._canvasCenter.X = newSize.Width / 2;
            this._canvasCenter.Y = newSize.Height / 2;
        }

        private BuildPositionReplacer(replacee: Function, positionArgOffset: number = 0, argCount: number = 2): any {
            var that = this,
                axiList = ["X", "Y"];

            return function () {
                var scale: number,
                    axi: string;

                if (!that._translated) {
                    scale = that._camera._GetDistanceScale();
                    for (var i = 0; i < argCount; i++) {
                        axi = axiList[i % 2];
                        arguments[positionArgOffset + i] += -that._camera.Position[axi] + that._canvasCenter[axi] * scale;
                    }
                }

                return replacee.apply(this, arguments);
            };
        }
    }

}