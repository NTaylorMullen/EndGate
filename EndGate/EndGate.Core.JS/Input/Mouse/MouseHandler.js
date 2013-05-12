var EndGate;
(function (EndGate) {
    (function (Input) {
        var MouseHandler = (function () {
            function MouseHandler(target) {
                var _this = this;
                this._target = target;
                this.OnClick = new EndGate.EventHandler();
                this.OnDoubleClick = new EndGate.EventHandler();
                this.OnDown = new EndGate.EventHandler();
                this.OnUp = new EndGate.EventHandler();
                this.OnMove = new EndGate.EventHandler();
                this.OnScroll = new EndGate.EventHandler();
                this.LeftIsDown = false;
                this.MiddleIsDown = false;
                this.RightIsDown = false;
                this.Wire();
                this.OnDown.Bind(function (e) {
                    _this.IsDown = true;
                    _this[e.Button + "IsDown"] = true;
                });
                this.OnUp.Bind(function (e) {
                    _this.IsDown = false;
                    _this[e.Button + "IsDown"] = false;
                });
            }
            MouseHandler.MouseButtonArray = [
                null, 
                Input.MouseButton.Left, 
                Input.MouseButton.Middle, 
                Input.MouseButton.Right
            ];
            MouseHandler.prototype.Wire = function () {
                var _this = this;
                this._target.addEventListener("click", this._target.oncontextmenu = this.BuildEvent(this.OnClick, this.BuildMouseClickEvent), false);
                this._target.addEventListener("dblclick", this.BuildEvent(this.OnDoubleClick, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mousedown", this.BuildEvent(this.OnDown, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mouseup", this.BuildEvent(this.OnUp, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mousemove", this.BuildEvent(this.OnMove, this.BuildMouseEvent), false);
                if((/MSIE/i.test(navigator.userAgent))) {
                    this._target.addEventListener("wheel", this.BuildEvent(this.OnScroll, function (e) {
                        e.wheelDeltaX = -e.deltaX;
                        e.wheelDeltaY = -e.deltaY;
                        return _this.BuildMouseScrollEvent(e);
                    }), false);
                } else if((/Firefox/i.test(navigator.userAgent))) {
                    this._target.addEventListener("DOMMouseScroll", this.BuildEvent(this.OnScroll, function (e) {
                        e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                        e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                        return _this.BuildMouseScrollEvent(e);
                    }), false);
                } else {
                    this._target.addEventListener("mousewheel", this.BuildEvent(this.OnScroll, this.BuildMouseScrollEvent), false);
                }
            };
            MouseHandler.prototype.BuildEvent = function (eventHandler, mouseEventBuilder, returnValue) {
                if (typeof returnValue === "undefined") { returnValue = false; }
                var _this = this;
                return function (e) {
                    if(eventHandler.HasBindings()) {
                        eventHandler.Trigger(mouseEventBuilder.call(_this, e));
                        e.preventDefault();
                    }
                    return returnValue;
                };
            };
            MouseHandler.prototype.BuildMouseScrollEvent = function (event) {
                return {
                    Position: this.GetMousePosition(event),
                    Direction: this.GetMouseScrollDierction(event)
                };
            };
            MouseHandler.prototype.BuildMouseEvent = function (event) {
                return {
                    Position: this.GetMousePosition(event)
                };
            };
            MouseHandler.prototype.BuildMouseClickEvent = function (event) {
                return {
                    Position: this.GetMousePosition(event),
                    Button: this.GetMouseButton(event)
                };
            };
            MouseHandler.prototype.GetMousePosition = function (event) {
                return new EndGate.Vector2d(event.offsetX ? (event.offsetX) : event.pageX - this._target.offsetLeft, event.offsetY ? (event.offsetY) : event.pageY - this._target.offsetTop);
            };
            MouseHandler.prototype.GetMouseButton = function (event) {
                if(event.which) {
                    return MouseHandler.MouseButtonArray[event.which];
                }
                return Input.MouseButton.Right;
            };
            MouseHandler.prototype.GetMouseScrollDierction = function (event) {
                return new EndGate.Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
            };
            return MouseHandler;
        })();
        Input.MouseHandler = MouseHandler;        
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=MouseHandler.js.map
