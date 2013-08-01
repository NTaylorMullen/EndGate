/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Utilities/EventHandler1.ts" />
/// <reference path="../../Interfaces/IDisposable.ts" />
/// <reference path="MouseButton.ts" />
/// <reference path="IMouseEvent.ts" />
/// <reference path="IMouseClickEvent.ts" />
/// <reference path="IMouseScrollEvent.ts" />

module EndGate.Input {

    /**
    * Defines a handler that will monitor mouse events over a specified area and will execute appropriate functions based on the events.
    */
    export class MouseHandler implements IDisposable {
        // Used to determine mouse buttons without using extra conditional statements, performance enhancer
        private static MouseButtonArray = [null, _.MouseButton.Left, _.MouseButton.Middle, _.MouseButton.Right];

        // Active flags        
        private _leftIsDown: boolean;
        private _middleIsDown: boolean;
        private _rightIsDown: boolean;
        private _isDown: boolean;

        // Events
        private _onClick: EventHandler1<IMouseClickEvent>;
        private _onDoubleClick: EventHandler1<IMouseClickEvent>;
        private _onDown: EventHandler1<IMouseClickEvent>;
        private _onUp: EventHandler1<IMouseClickEvent>;
        private _onMove: EventHandler1<IMouseEvent>;
        private _onScroll: EventHandler1<IMouseScrollEvent>;

        private _target: HTMLElement;

        // For disposing
        private _contextMenuWire: (e: MouseEvent) => void;
        private _clickWire: (e: MouseEvent) => void;
        private _dblClickWire: (e: MouseEvent) => void;
        private _mouseDownWire: (e: MouseEvent) => void;
        private _mouseUpWire: (e: MouseEvent) => void;
        private _mouseMoveWire: (e: MouseEvent) => void;
        private _mouseWheelWireName: string;
        private _mouseWheelWire: (e: MouseEvent) => void;
        private _disposed: boolean;

        /**
        * Creates a new instance of the MouseHandler object.
        * @param target The object to monitor mouse events for.
        */
        constructor(target: HTMLElement) {
            this._target = target;
            this._disposed = false;

            this._onClick = new EventHandler1<IMouseClickEvent>();
            this._onDoubleClick = new EventHandler1<IMouseClickEvent>();
            this._onDown = new EventHandler1<IMouseClickEvent>();
            this._onUp = new EventHandler1<IMouseClickEvent>();
            this._onMove = new EventHandler1<IMouseEvent>();
            this._onScroll = new EventHandler1<IMouseScrollEvent>();

            // Generic flags to check mouse state
            this._leftIsDown = false;
            this._middleIsDown = false;
            this._rightIsDown = false;

            this.Wire();

            this.OnDown.Bind((e: IMouseClickEvent) => {
                this._isDown = true;
                this[e.Button + "IsDown"] = true;
            });

            this.OnUp.Bind((e: IMouseClickEvent) => {
                this._isDown = false;
                this[e.Button + "IsDown"] = false;
            });
        }

        /**
        * Indicates if the left mouse button is down
        */
        public get LeftIsDown(): boolean {
            return this._leftIsDown;
        }

        /**
        * Indicates if the middle mouse button is down
        */
        public get MiddleIsDown(): boolean {
            return this._middleIsDown;
        }

        /**
        * Indicates if the right mouse button is down
        */
        public get RightIsDown(): boolean {
            return this._rightIsDown;
        }

        /**
        * Indicates if any mouse button is down.
        */
        public get IsDown(): boolean {
            return this._isDown;
        }

        /**
        * Gets an event that is triggered when a mouse click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnClick(): EventHandler1<IMouseClickEvent> {
            return this._onClick;
        }

        /**
        * Gets an event that is triggered when a mouse double click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDoubleClick(): EventHandler1<IMouseClickEvent> {
            return this._onDoubleClick;
        }

        /**
        * Gets an event that is triggered when a mouse down event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDown(): EventHandler1<IMouseClickEvent> {
            return this._onDown;
        }

        /**
        * Gets an event that is triggered when a mouse up event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnUp(): EventHandler1<IMouseClickEvent> {
            return this._onUp;
        }

        /**
        * Gets an event that is triggered when a mouse move event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnMove(): EventHandler1<IMouseEvent> {
            return this._onMove;
        }

        /**
        * Gets an event that is triggered when a mouse scroll event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnScroll(): EventHandler1<IMouseScrollEvent> {
            return this._onScroll;
        }

        /**
        * Disposes the MouseHandler and unbinds all bound events.
        */
        public Dispose(): void {
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
            }
            else {
                throw new Error("MouseHandler cannot be disposed more than once");
            }
        }

        private Wire(): void {
            this._clickWire = this._contextMenuWire = this.BuildEvent<IMouseClickEvent>(this._onClick, this.BuildMouseClickEvent);
            this._dblClickWire = this.BuildEvent<IMouseClickEvent>(this._onDoubleClick, this.BuildMouseClickEvent);
            this._mouseDownWire = this.BuildEvent<IMouseClickEvent>(this._onDown, this.BuildMouseClickEvent);
            this._mouseUpWire = this.BuildEvent<IMouseClickEvent>(this._onUp, this.BuildMouseClickEvent)
            this._mouseMoveWire = this.BuildEvent<IMouseEvent>(this._onMove, this.BuildMouseEvent);

            // OnScroll, in order to detect horizontal scrolling need to hack a bit (browser sniffing)
            // if we were just doing vertical scrolling we could settle with the else statement in this block
            if ((/MSIE/i.test(navigator.userAgent))) {
                this._mouseWheelWireName = "wheel";
                this._mouseWheelWire = this.BuildEvent<IMouseScrollEvent>(this._onScroll, (e: any) => {
                    e.wheelDeltaX = -e.deltaX;
                    e.wheelDeltaY = -e.deltaY;
                    return this.BuildMouseScrollEvent(e);
                });
            }
            else if ((/Firefox/i.test(navigator.userAgent))) {
                this._mouseWheelWireName = "DOMMouseScroll";
                this._mouseWheelWire = this.BuildEvent<IMouseScrollEvent>(this._onScroll, (e: any) => {
                    e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                    e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                    return this.BuildMouseScrollEvent(e);
                });
            }
            else {
                this._mouseWheelWireName = "mousewheel";
                this._mouseWheelWire = this.BuildEvent<IMouseScrollEvent>(this._onScroll, this.BuildMouseScrollEvent);
            }

            this._target.addEventListener("click", this._clickWire, false);
            this._target.addEventListener("contextmenu", this._contextMenuWire, false);
            this._target.addEventListener("dblclick", this._dblClickWire, false);
            this._target.addEventListener("mousedown", this._mouseDownWire, false);
            this._target.addEventListener("mouseup", this._mouseUpWire, false);
            this._target.addEventListener("mousemove", this._mouseMoveWire, false);            
            this._target.addEventListener(this._mouseWheelWireName, this._mouseWheelWire, false);
        }

        private Unwire(): void {
            this._target.removeEventListener("click", this._clickWire, false);
            this._target.removeEventListener("contextmenu", this._contextMenuWire, false);
            this._target.removeEventListener("dblclick", this._dblClickWire, false);
            this._target.removeEventListener("mousedown", this._mouseDownWire, false);
            this._target.removeEventListener("mouseup", this._mouseUpWire, false);
            this._target.removeEventListener("mousemove", this._mouseMoveWire, false);
            this._target.removeEventListener(this._mouseWheelWireName, this._mouseWheelWire, false);
        }

        private BuildEvent<T>(eventHandler: EventHandler1<T>, mouseEventBuilder: (mouseEvent: MouseEvent) => IMouseEvent, returnValue: boolean = false): (e: MouseEvent) => void {
            return (e: MouseEvent) => {
                if (eventHandler.HasBindings()) {
                    eventHandler.Trigger(mouseEventBuilder.call(this, e));
                    e.preventDefault();
                }

                return returnValue;
            }
        }

        private BuildMouseScrollEvent(event: MouseWheelEvent): IMouseScrollEvent {
            return {
                Position: this.GetMousePosition(event),
                Direction: this.GetMouseScrollDierction(event)
            };
        }

        private BuildMouseEvent(event: MouseEvent): IMouseEvent {
            return {
                Position: this.GetMousePosition(event)
            };
        }

        private BuildMouseClickEvent(event: MouseEvent): IMouseClickEvent {
            return {
                Position: this.GetMousePosition(event),
                Button: this.GetMouseButton(event)
            };
        }

        private GetMousePosition(event: MouseEvent): Vector2d {
            return new Vector2d(
                event.offsetX ? (event.offsetX) : event.pageX - this._target.offsetLeft,
                event.offsetY ? (event.offsetY) : event.pageY - this._target.offsetTop
                );
        }

        private GetMouseButton(event: MouseEvent): string {
            if (event.which) {
                return MouseHandler.MouseButtonArray[event.which];
            }

            return _.MouseButton.Right;
        }

        private GetMouseScrollDierction(event: any): Vector2d {
            return new Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
        }
    }

}