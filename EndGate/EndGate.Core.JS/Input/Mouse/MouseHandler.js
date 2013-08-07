var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Utilities/EventHandler1.ts" />
    /// <reference path="../../Interfaces/IDisposable.ts" />
    /// <reference path="MouseButton.ts" />
    /// <reference path="IMouseEvent.ts" />
    /// <reference path="IMouseClickEvent.ts" />
    /// <reference path="IMouseScrollEvent.ts" />
    (function (Input) {
        /**
        * Defines a handler that will monitor mouse events over a specified area and will execute appropriate functions based on the events.
        */
        var MouseHandler = (function () {
            /**
            * Creates a new instance of the MouseHandler object.
            * @param target The object to monitor mouse events for.
            */
            function MouseHandler(target) {
                var _this = this;
                this._target = target;
                this._disposed = false;

                this._onClick = new EndGate.EventHandler1();
                this._onDoubleClick = new EndGate.EventHandler1();
                this._onDown = new EndGate.EventHandler1();
                this._onUp = new EndGate.EventHandler1();
                this._onMove = new EndGate.EventHandler1();
                this._onScroll = new EndGate.EventHandler1();

                // Generic flags to check mouse state
                this._leftIsDown = false;
                this._middleIsDown = false;
                this._rightIsDown = false;

                this.Wire();

                this.OnDown.Bind(function (e) {
                    _this._isDown = true;
                    _this[e.Button + "IsDown"] = true;
                });

                this.OnUp.Bind(function (e) {
                    _this._isDown = false;
                    _this[e.Button + "IsDown"] = false;
                });
            }
            Object.defineProperty(MouseHandler.prototype, "LeftIsDown", {
                get: /**
                * Indicates if the left mouse button is down
                */
                function () {
                    return this._leftIsDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "MiddleIsDown", {
                get: /**
                * Indicates if the middle mouse button is down
                */
                function () {
                    return this._middleIsDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "RightIsDown", {
                get: /**
                * Indicates if the right mouse button is down
                */
                function () {
                    return this._rightIsDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "IsDown", {
                get: /**
                * Indicates if any mouse button is down.
                */
                function () {
                    return this._isDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnClick", {
                get: /**
                * Gets an event that is triggered when a mouse click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onClick;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnDoubleClick", {
                get: /**
                * Gets an event that is triggered when a mouse double click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onDoubleClick;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnDown", {
                get: /**
                * Gets an event that is triggered when a mouse down event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnUp", {
                get: /**
                * Gets an event that is triggered when a mouse up event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnMove", {
                get: /**
                * Gets an event that is triggered when a mouse move event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onMove;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnScroll", {
                get: /**
                * Gets an event that is triggered when a mouse scroll event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onScroll;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Disposes the MouseHandler and unbinds all bound events.
            */
            MouseHandler.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    this._onClick.Dispose();
                    this._onDoubleClick.Dispose();
                    this._onDown.Dispose();
                    this._onMove.Dispose();
                    this._onScroll.Dispose();
                    this._onUp.Dispose();

                    this.Unwire();

                    this._target = null;
                } else {
                    throw new Error("MouseHandler cannot be disposed more than once");
                }
            };

            MouseHandler.prototype.Wire = function () {
                var _this = this;
                this._clickWire = this._contextMenuWire = this.BuildEvent(this._onClick, this.BuildMouseClickEvent);
                this._dblClickWire = this.BuildEvent(this._onDoubleClick, this.BuildMouseClickEvent);
                this._mouseDownWire = this.BuildEvent(this._onDown, this.BuildMouseClickEvent);
                this._mouseUpWire = this.BuildEvent(this._onUp, this.BuildMouseClickEvent);
                this._mouseMoveWire = this.BuildEvent(this._onMove, this.BuildMouseEvent);

                if ((/MSIE/i.test(navigator.userAgent))) {
                    this._mouseWheelWireName = "wheel";
                    this._mouseWheelWire = this.BuildEvent(this._onScroll, function (e) {
                        e.wheelDeltaX = -e.deltaX;
                        e.wheelDeltaY = -e.deltaY;
                        return _this.BuildMouseScrollEvent(e);
                    });
                } else if ((/Firefox/i.test(navigator.userAgent))) {
                    this._mouseWheelWireName = "DOMMouseScroll";
                    this._mouseWheelWire = this.BuildEvent(this._onScroll, function (e) {
                        e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                        e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                        return _this.BuildMouseScrollEvent(e);
                    });
                } else {
                    this._mouseWheelWireName = "mousewheel";
                    this._mouseWheelWire = this.BuildEvent(this._onScroll, this.BuildMouseScrollEvent);
                }

                this._target.addEventListener("click", this._clickWire, false);
                this._target.addEventListener("contextmenu", this._contextMenuWire, false);
                this._target.addEventListener("dblclick", this._dblClickWire, false);
                this._target.addEventListener("mousedown", this._mouseDownWire, false);
                this._target.addEventListener("mouseup", this._mouseUpWire, false);
                this._target.addEventListener("mousemove", this._mouseMoveWire, false);
                this._target.addEventListener(this._mouseWheelWireName, this._mouseWheelWire, false);
            };

            MouseHandler.prototype.Unwire = function () {
                this._target.removeEventListener("click", this._clickWire, false);
                this._target.removeEventListener("contextmenu", this._contextMenuWire, false);
                this._target.removeEventListener("dblclick", this._dblClickWire, false);
                this._target.removeEventListener("mousedown", this._mouseDownWire, false);
                this._target.removeEventListener("mouseup", this._mouseUpWire, false);
                this._target.removeEventListener("mousemove", this._mouseMoveWire, false);
                this._target.removeEventListener(this._mouseWheelWireName, this._mouseWheelWire, false);
            };

            MouseHandler.prototype.BuildEvent = function (eventHandler, mouseEventBuilder, returnValue) {
                if (typeof returnValue === "undefined") { returnValue = false; }
                var _this = this;
                return function (e) {
                    if (eventHandler.HasBindings()) {
                        eventHandler.Trigger(mouseEventBuilder.call(_this, e));
                    }

                    e.preventDefault();

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
                if (event.which) {
                    return MouseHandler.MouseButtonArray[event.which];
                }

                return Input._.MouseButton.Right;
            };

            MouseHandler.prototype.GetMouseScrollDierction = function (event) {
                return new EndGate.Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
            };
            MouseHandler.MouseButtonArray = [null, Input._.MouseButton.Left, Input._.MouseButton.Middle, Input._.MouseButton.Right];
            return MouseHandler;
        })();
        Input.MouseHandler = MouseHandler;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
