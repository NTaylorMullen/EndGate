var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Rendering) {
            (function (Camera) {
                var Camera2dCanvasContextBuilder = (function () {
                    function Camera2dCanvasContextBuilder(camera) {
                        this._camera = camera;
                        this._canvasCenter = this._camera.Position.Clone();
                        this._translated = false;
                        this._translationState = [];
                        this._translationState.push(this._translated);
                    }
                    Camera2dCanvasContextBuilder.prototype.BuildFrom = function (context) {
                        var that = this, savedCreateRadialGradient = context.createRadialGradient, savedTranslate = context.translate, savedSave = context.save, savedRestore = context.restore;
                        (context).unModifiedClearRect = context.clearRect;
                        context.arc = this.BuildPositionReplacer(context.arc);
                        context.arcTo = this.BuildPositionReplacer(context.arcTo, 0, 4);
                        context.bezierCurveTo = this.BuildPositionReplacer(context.bezierCurveTo, 0, 6);
                        context.clearRect = this.BuildPositionReplacer(context.clearRect);
                        context.createLinearGradient = this.BuildPositionReplacer(context.createLinearGradient, 0, 4);
                        context.createRadialGradient = function () {
                            var scale = that._camera.GetDistanceScale();
                            arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                            arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                            arguments[3] += -that._camera.Position.X + that._canvasCenter.X * scale;
                            arguments[4] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                            return savedCreateRadialGradient.apply(this, arguments);
                        };
                        context.drawImage = this.BuildPositionReplacer(context.drawImage, 1);
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
                            if(!that._translated) {
                                scale = that._camera.GetDistanceScale();
                                arguments[0] += -that._camera.Position.X + that._canvasCenter.X * scale;
                                arguments[1] += -that._camera.Position.Y + that._canvasCenter.Y * scale;
                            }
                            that._translated = true;
                            savedTranslate.apply(this, arguments);
                        };
                        return context;
                    };
                    Camera2dCanvasContextBuilder.prototype.UpdateCanvasCenter = function (newSize) {
                        this._canvasCenter.X = newSize.Width / 2;
                        this._canvasCenter.Y = newSize.Height / 2;
                    };
                    Camera2dCanvasContextBuilder.prototype.BuildPositionReplacer = function (replacee, positionArgOffset, argCount) {
                        if (typeof positionArgOffset === "undefined") { positionArgOffset = 0; }
                        if (typeof argCount === "undefined") { argCount = 2; }
                        var that = this, axiList = [
                            "X", 
                            "Y"
                        ];
                        return function () {
                            var scale, axi;
                            if(!that._translated) {
                                scale = that._camera.GetDistanceScale();
                                for(var i = 0; i < argCount; i++) {
                                    axi = axiList[i % 2];
                                    arguments[positionArgOffset + i] += -that._camera.Position[axi] + that._canvasCenter[axi] * scale;
                                }
                            }
                            return replacee.apply(this, arguments);
                        };
                    };
                    return Camera2dCanvasContextBuilder;
                })();
                Camera.Camera2dCanvasContextBuilder = Camera2dCanvasContextBuilder;                
            })(Rendering.Camera || (Rendering.Camera = {}));
            var Camera = Rendering.Camera;
        })(Core.Rendering || (Core.Rendering = {}));
        var Rendering = Core.Rendering;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Camera2dCanvasContextBuilder.js.map
