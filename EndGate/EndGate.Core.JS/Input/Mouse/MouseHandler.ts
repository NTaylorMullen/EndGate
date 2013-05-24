/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Utilities/EventHandler.ts" />
/// <reference path="MouseButton.ts" />
/// <reference path="IMouseEvent.ts" />
/// <reference path="IMouseClickEvent.ts" />
/// <reference path="IMouseScrollEvent.ts" />

module EndGate.Input {

    export class MouseHandler {
        // Active flags
        public LeftIsDown: bool;
        public MiddleIsDown: bool;
        public RightIsDown: bool;
        public IsDown: bool;

        // Used to determine mouse buttons without using extra conditional statements, performance enhancer
        private static MouseButtonArray = [null, MouseButton.Left, MouseButton.Middle, MouseButton.Right];

        private _target: HTMLCanvasElement;

        constructor(target: HTMLCanvasElement) {
            this._target = target;

            this.OnClick = new EventHandler();
            this.OnDoubleClick = new EventHandler();
            this.OnDown = new EventHandler();
            this.OnUp = new EventHandler();
            this.OnMove = new EventHandler();
            this.OnScroll = new EventHandler();

            // Generic flags to check mouse state
            this.LeftIsDown = false;
            this.MiddleIsDown= false;
            this.RightIsDown = false;

            this.Wire();

            this.OnDown.Bind((e: IMouseClickEvent) => {
                this.IsDown = true;
                this[e.Button + "IsDown"] = true;
            });

            this.OnUp.Bind((e: IMouseClickEvent) => {
                this.IsDown = false;
                this[e.Button + "IsDown"] = false;
            });
        }

        public OnClick: EventHandler;
        public OnDoubleClick: EventHandler;
        public OnDown: EventHandler;
        public OnUp: EventHandler;
        public OnMove: EventHandler;
        public OnScroll: EventHandler;

        private Wire(): void {
            this._target.addEventListener("click",this._target.oncontextmenu = this.BuildEvent(this.OnClick, this.BuildMouseClickEvent),false);
            this._target.addEventListener("dblclick", this.BuildEvent(this.OnDoubleClick, this.BuildMouseClickEvent), false);
            this._target.addEventListener("mousedown", this.BuildEvent(this.OnDown, this.BuildMouseClickEvent), false);
            this._target.addEventListener("mouseup", this.BuildEvent(this.OnUp, this.BuildMouseClickEvent), false);
            this._target.addEventListener("mousemove", this.BuildEvent(this.OnMove, this.BuildMouseEvent), false);

            // OnScroll, in order to detect horizontal scrolling need to hack a bit (browser sniffing)
            // if we were just doing vertical scrolling we could settle with the else statement in this block
            if ((/MSIE/i.test(navigator.userAgent))) {
                this._target.addEventListener("wheel", this.BuildEvent(this.OnScroll, (e: any) => {
                    e.wheelDeltaX = -e.deltaX;
                    e.wheelDeltaY = -e.deltaY;
                    return this.BuildMouseScrollEvent(e);
                }), false);
            }
            else if ((/Firefox/i.test(navigator.userAgent))) {
                this._target.addEventListener("DOMMouseScroll", this.BuildEvent(this.OnScroll, (e: any) => {
                    e.wheelDeltaX = e.axis === 1 ? -e.detail : 0;
                    e.wheelDeltaY = e.axis === 2 ? -e.detail : 0;
                    return this.BuildMouseScrollEvent(e);
                }), false);
            }
            else {
                this._target.addEventListener("mousewheel", this.BuildEvent(this.OnScroll, this.BuildMouseScrollEvent), false);
            }
        }

        private BuildEvent(eventHandler: EventHandler, mouseEventBuilder: (mouseEvent: MouseEvent) => IMouseEvent, returnValue: bool = false): (e: MouseEvent) => void {
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

            return MouseButton.Right;
        }

        private GetMouseScrollDierction(event: any): Vector2d{
            return new Vector2d(-Math.max(-1, Math.min(1, event.wheelDeltaX)), -Math.max(-1, Math.min(1, event.wheelDeltaY)));
        }
    }

}