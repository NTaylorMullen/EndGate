var eg;
(function (eg) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Utilities/EventHandler1.ts" />
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

                this._onClick = new eg.EventHandler1();
                this._onDoubleClick = new eg.EventHandler1();
                this._onDown = new eg.EventHandler1();
                this._onUp = new eg.EventHandler1();
                this._onMove = new eg.EventHandler1();
                this._onScroll = new eg.EventHandler1();

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
                * Event: Triggered when a mouse click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                * Passes an IMouseClickEvent event object to bound functions.
                */
                function () {
                    return this._onClick;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnDoubleClick", {
                get: /**
                * Event: Triggered when a mouse double click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                * Passes an IMouseClickEvent event object to bound functions.
                */
                function () {
                    return this._onDoubleClick;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnDown", {
                get: /**
                * Event: Triggered when a mouse down event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                * Passes an IMouseClickEvent event object to bound functions.
                */
                function () {
                    return this._onDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnUp", {
                get: /**
                * Event: Triggered when a mouse up event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                * Passes an IMouseClickEvent event object to bound functions.
                */
                function () {
                    return this._onUp;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnMove", {
                get: /**
                * Event: Triggered when a mouse move event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                * Passes an IMouseEvent event object to bound functions.
                */
                function () {
                    return this._onMove;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(MouseHandler.prototype, "OnScroll", {
                get: /**
                * Event: Triggered when a mouse scroll event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                * Passes an IMouseScrollEvent event object to bound functions.
                */
                function () {
                    return this._onScroll;
                },
                enumerable: true,
                configurable: true
            });

            MouseHandler.prototype.Wire = function () {
                var _this = this;
                this._target.addEventListener("click", this._target.oncontextmenu = this.BuildEvent(this._onClick, this.BuildMouseClickEvent), false);
                this._target.addEventListener("dblclick", this.BuildEvent(this._onDoubleClick, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mousedown", this.BuildEvent(this._onDown, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mouseup", this.BuildEvent(this._onUp, this.BuildMouseClickEvent), false);
                this._target.addEventListener("mousemove", this.BuildEvent(this._onMove, this.BuildMouseEvent), false);

                if ((/MSIE/i.test(navigator.userAgent))) {
                    this._target.addEventListener("wheel", this.BuildEvent(this._onScroll, function (e) {
                        e.wheelDeltaX = -e.deltaX;
                        e.wheelDeltaY = -e.deltaY;
                        return _this.BuildMouseScrollEvent(e);
                    }), false);
                } else if ((/Firefox/i.test(navigator.userAgent))) {
                    this._target.addEventListener("DOMMouseScroll", this.BuildEvent(this._onScroll, function (e) {
                        e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                        e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                        return _this.BuildMouseScrollEvent(e);
                    }), false);
                } else {
                    this._target.addEventListener("mousewheel", this.BuildEvent(this._onScroll, this.BuildMouseScrollEvent), false);
                }
            };

            MouseHandler.prototype.BuildEvent = function (eventHandler, mouseEventBuilder, returnValue) {
                if (typeof returnValue === "undefined") { returnValue = false; }
                var _this = this;
                return function (e) {
                    if (eventHandler.HasBindings()) {
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
                return new eg.Vector2d(event.offsetX ? (event.offsetX) : event.pageX - this._target.offsetLeft, event.offsetY ? (event.offsetY) : event.pageY - this._target.offsetTop);
            };

            MouseHandler.prototype.GetMouseButton = function (event) {
                if (event.which) {
                    return MouseHandler.MouseButtonArray[event.which];
                }

                return Input._.MouseButton.Right;
            };

            MouseHandler.prototype.GetMouseScrollDierction = function (event) {
                return new eg.Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
            };
            MouseHandler.MouseButtonArray = [null, Input._.MouseButton.Left, Input._.MouseButton.Middle, Input._.MouseButton.Right];
            return MouseHandler;
        })();
        Input.MouseHandler = MouseHandler;
    })(eg.Input || (eg.Input = {}));
    var Input = eg.Input;
})(eg || (eg = {}));
