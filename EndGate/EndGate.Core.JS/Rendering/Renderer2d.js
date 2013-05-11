var EndGate;
(function (EndGate) {
    (function (Rendering) {
        var Renderer2d = (function () {
            function Renderer2d(renderOnto) {
                this._visibleCanvas = renderOnto;
                this._visibleContext = renderOnto.getContext("2d");
                this._bufferCanvas = document.createElement("canvas");
                this._bufferContext = this._bufferCanvas.getContext("2d");
                this.OnRendererSizeChange = new EndGate.EventHandler();
                this.UpdateBufferSize();
                this._disposed = false;
            }
            Renderer2d._zindexSort = function (a, b) {
                return a.ZIndex - b.ZIndex;
            };
            Renderer2d.prototype.Render = function (renderables) {
                if(this._bufferCanvas.width !== this._visibleCanvas.width || this._bufferCanvas.height !== this._visibleCanvas.height) {
                    this.UpdateBufferSize();
                }
                this._visibleContext.clearRect(0, 0, this._visibleCanvas.width, this._visibleCanvas.height);
                this._visibleContext.drawImage(this._bufferCanvas, 0, 0);
                this._ClearBuffer();
                renderables.sort(Renderer2d._zindexSort);
                for(var i = 0; i < renderables.length; i++) {
                    renderables[i].Draw(this._bufferContext);
                }
                return this._bufferContext;
            };
            Renderer2d.prototype.Dispose = function () {
                if(!this._disposed) {
                    this._disposed = true;
                    this._visibleCanvas.parentNode.removeChild(this._visibleCanvas);
                }
            };
            Renderer2d.prototype._ClearBuffer = function () {
                this._bufferContext.clearRect(0, 0, this._bufferCanvas.width, this._bufferCanvas.height);
            };
            Renderer2d.prototype.UpdateBufferSize = function () {
                this._bufferCanvas.width = this._visibleCanvas.width;
                this._bufferCanvas.height = this._visibleCanvas.height;
                this.OnRendererSizeChange.Trigger(new EndGate.Size2d(this._visibleCanvas.width, this._visibleCanvas.height));
            };
            return Renderer2d;
        })();
        Rendering.Renderer2d = Renderer2d;        
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Renderer2d.js.map
