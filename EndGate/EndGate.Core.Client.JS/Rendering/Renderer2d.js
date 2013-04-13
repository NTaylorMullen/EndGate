var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Rendering) {
            var Renderer2d = (function () {
                function Renderer2d(renderOnto) {
                    this._visibleCanvas = renderOnto;
                    this._visibleContext = renderOnto.getContext("2d");
                    this._bufferCanvas = document.createElement("canvas");
                    this.UpdateBufferSize();
                    this._disposed = false;
                }
                Renderer2d.prototype.Render = function (renderables) {
                    if(this._bufferCanvas.width !== this._visibleCanvas.width || this._bufferCanvas.height !== this._visibleCanvas.height) {
                        this.UpdateBufferSize();
                    }
                    this._bufferContext.clearRect(0, 0, this._bufferCanvas.width, this._bufferCanvas.height);
                    for(var i = 0; i < renderables.length; i++) {
                        renderables[i].Draw(this._bufferContext);
                    }
                    this._visibleContext.drawImage(this._bufferCanvas, 0, 0);
                };
                Renderer2d.prototype.Dispose = function () {
                    if(!this._disposed) {
                        this._disposed = true;
                        this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
                    }
                };
                Renderer2d.prototype.UpdateBufferSize = function () {
                    this._bufferCanvas.width = this._visibleCanvas.width;
                    this._bufferCanvas.height = this._visibleCanvas.height;
                };
                return Renderer2d;
            })();
            Rendering.Renderer2d = Renderer2d;            
        })(Core.Rendering || (Core.Rendering = {}));
        var Rendering = Core.Rendering;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
