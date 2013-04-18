var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Input) {
            (function (Mouse) {
                var MouseHandler = (function () {
                    function MouseHandler(target) {
                        this._target = target;
                        this.OnClick = new Core.Utilities.EventHandler();
                        this.OnDoubleClick = new Core.Utilities.EventHandler();
                        this.OnDown = new Core.Utilities.EventHandler();
                        this.OnUp = new Core.Utilities.EventHandler();
                        this.OnMove = new Core.Utilities.EventHandler();
                        this.OnScroll = new Core.Utilities.EventHandler();
                        this.Wire();
                    }
                    MouseHandler.MouseButtonArray = [
                        null, 
                        Mouse.MouseButton.Left, 
                        Mouse.MouseButton.Middle, 
                        Mouse.MouseButton.Right
                    ];
                    MouseHandler.prototype.Wire = function () {
                        var _this = this;
                        this._target.onclick = this._target.oncontextmenu = this.BuildEvent(this.OnClick, this.BuildMouseClickEvent);
                        this._target.ondblclick = this.BuildEvent(this.OnDoubleClick, this.BuildMouseClickEvent);
                        this._target.onmousedown = this.BuildEvent(this.OnDown, this.BuildMouseClickEvent);
                        this._target.onmouseup = this.BuildEvent(this.OnUp, this.BuildMouseClickEvent);
                        this._target.onmousemove = this.BuildEvent(this.OnMove, this.BuildMouseEvent);
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
                        return new Core.Assets.Vector2d(event.offsetX ? (event.offsetX) : event.pageX - this._target.offsetLeft, event.offsetY ? (event.offsetY) : event.pageY - this._target.offsetTop);
                    };
                    MouseHandler.prototype.GetMouseButton = function (event) {
                        if(event.which) {
                            return MouseHandler.MouseButtonArray[event.which];
                        }
                        return Mouse.MouseButton.Right;
                    };
                    MouseHandler.prototype.GetMouseScrollDierction = function (event) {
                        return new Core.Assets.Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
                    };
                    return MouseHandler;
                })();
                Mouse.MouseHandler = MouseHandler;                
            })(Input.Mouse || (Input.Mouse = {}));
            var Mouse = Input.Mouse;
        })(Core.Input || (Core.Input = {}));
        var Input = Core.Input;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=MouseHandler.js.map
