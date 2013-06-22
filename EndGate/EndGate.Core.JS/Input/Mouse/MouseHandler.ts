/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Utilities/EventHandler1.ts" />
/// <reference path="MouseButton.ts" />
/// <reference path="IMouseEvent.ts" />
/// <reference path="IMouseClickEvent.ts" />
/// <reference path="IMouseScrollEvent.ts" />

module eg.Input {

    /**
    * Defines a handler that will monitor mouse events over a specified area and will execute appropriate functions based on the events.
    */
    export class MouseHandler {       
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

        /**
        * Creates a new instance of the MouseHandler object.
        * @param target The object to monitor mouse events for.
        */
        constructor(target: HTMLElement) {
            this._target = target;

            this._onClick = new EventHandler1<IMouseClickEvent>();
            this._onDoubleClick = new EventHandler1<IMouseClickEvent>();
            this._onDown = new EventHandler1<IMouseClickEvent>();
            this._onUp = new EventHandler1<IMouseClickEvent>();
            this._onMove = new EventHandler1<IMouseEvent>();
            this._onScroll = new EventHandler1<IMouseScrollEvent>();

            // Generic flags to check mouse state
            this._leftIsDown = false;
            this._middleIsDown= false;
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
        * Event: Triggered when a mouse click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMouseClickEvent event object to bound functions.
        */
        public get OnClick(): EventHandler1<IMouseClickEvent> {
            return this._onClick;
        }

        /**
        * Event: Triggered when a mouse double click occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMouseClickEvent event object to bound functions.
        */
        public get OnDoubleClick(): EventHandler1<IMouseClickEvent> {
            return this._onDoubleClick;
        }

        /**
        * Event: Triggered when a mouse down event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMouseClickEvent event object to bound functions.
        */
        public get OnDown(): EventHandler1<IMouseClickEvent> {
            return this._onDown;
        }

        /**
        * Event: Triggered when a mouse up event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMouseClickEvent event object to bound functions.
        */
        public get OnUp(): EventHandler1<IMouseClickEvent> {
            return this._onUp;
        }

        /**
        * Event: Triggered when a mouse move event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMouseEvent event object to bound functions.
        */
        public get OnMove(): EventHandler1<IMouseEvent> {
            return this._onMove;
        }

        /**
        * Event: Triggered when a mouse scroll event occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMouseScrollEvent event object to bound functions.
        */
        public get OnScroll(): EventHandler1<IMouseScrollEvent> {
            return this._onScroll;
        }

        private Wire(): void {
            this._target.addEventListener("click",this._target.oncontextmenu = this.BuildEvent<IMouseClickEvent>(this._onClick, this.BuildMouseClickEvent),false);
            this._target.addEventListener("dblclick", this.BuildEvent<IMouseClickEvent>(this._onDoubleClick, this.BuildMouseClickEvent), false);
            this._target.addEventListener("mousedown", this.BuildEvent<IMouseClickEvent>(this._onDown, this.BuildMouseClickEvent), false);
            this._target.addEventListener("mouseup", this.BuildEvent<IMouseClickEvent>(this._onUp, this.BuildMouseClickEvent), false);
            this._target.addEventListener("mousemove", this.BuildEvent<IMouseEvent>(this._onMove, this.BuildMouseEvent), false);

            // OnScroll, in order to detect horizontal scrolling need to hack a bit (browser sniffing)
            // if we were just doing vertical scrolling we could settle with the else statement in this block
            if ((/MSIE/i.test(navigator.userAgent))) {
                this._target.addEventListener("wheel", this.BuildEvent<IMouseScrollEvent>(this._onScroll, (e: any) => {
                    e.wheelDeltaX = -e.deltaX;
                    e.wheelDeltaY = -e.deltaY;
                    return this.BuildMouseScrollEvent(e);
                }), false);
            }
            else if ((/Firefox/i.test(navigator.userAgent))) {
                this._target.addEventListener("DOMMouseScroll", this.BuildEvent<IMouseScrollEvent>(this._onScroll, (e: any) => {
                    e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                    e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                    return this.BuildMouseScrollEvent(e);
                }), false);
            }
            else {
                this._target.addEventListener("mousewheel", this.BuildEvent<IMouseScrollEvent>(this._onScroll, this.BuildMouseScrollEvent), false);
            }
        }

        private BuildEvent<T>(eventHandler: EventHandler1<T>, mouseEventBuilder: (mouseEvent: MouseEvent) => IMouseEvent, returnValue: bool = false): (e: MouseEvent) => void {
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

        private GetMouseScrollDierction(event: any): Vector2d{
            return new Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
        }
    }

}