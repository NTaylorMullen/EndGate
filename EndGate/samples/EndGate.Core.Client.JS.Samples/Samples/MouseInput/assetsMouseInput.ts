/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class MouseMonitor extends EndGate.Core.Game {
    private _radiusSize: number = 5;
    private _scrollSpeed: number = 5;
    private _clickColors: { [name: string]: string; } = {
        Left: "#ff0000",
        Middle: "#00ff00",
        Right: "#0000ff"
    };
    private _inbetweenColors: { [name: string]: string; } = {
        Left: "#ffa5a5",
        Middle: "#a5ffa5",
        Right: "#a5a5ff"
    };
    private _doubleClickColor: string = "#000000";
    private _onMoveColor: string = "#000000";
    private _shapes: EndGate.Core.Graphics.Shapes.Shape[] = [];

    constructor(canvas: HTMLCanvasElement, lastMouseEvent: JQuery) {
        super(canvas);

        this.Input.Mouse.OnClick.Bind((clickEvent: EndGate.Core.Input.Mouse.IMouseClickEvent) => {
            lastMouseEvent.text(clickEvent.Button + " Click at " + clickEvent.Position.toString());
            this.MarkLocationWithCircle(clickEvent.Position, this._radiusSize, this._clickColors[clickEvent.Button]);
        });

        this.Input.Mouse.OnDoubleClick.Bind((clickEvent: EndGate.Core.Input.Mouse.IMouseClickEvent) => {
            lastMouseEvent.text(clickEvent.Button + " Double Click at " + clickEvent.Position.toString());
            this.MarkLocationWithCircle(clickEvent.Position, this._radiusSize, this._doubleClickColor);
        });

        this.Input.Mouse.OnDown.Bind((clickEvent: EndGate.Core.Input.Mouse.IMouseClickEvent) => {
            lastMouseEvent.text(clickEvent.Button + " button down at " + clickEvent.Position.toString());
            this.MarkLocationWithCircle(clickEvent.Position, this._radiusSize, this._inbetweenColors[clickEvent.Button]);
        });

        this.Input.Mouse.OnUp.Bind((clickEvent: EndGate.Core.Input.Mouse.IMouseClickEvent) => {
            lastMouseEvent.text(clickEvent.Button + " button up at " + clickEvent.Position.toString());
            this.MarkLocationWithRectangle(clickEvent.Position, new EndGate.Core.Assets.Size2d(this._radiusSize * 4, this._radiusSize * 4), this._inbetweenColors[clickEvent.Button]);
        });

        this.Input.Mouse.OnMove.Bind((clickEvent: EndGate.Core.Input.Mouse.IMouseEvent) => {
            this.MarkLocationWithCircle(clickEvent.Position, 1, this._onMoveColor);
            lastMouseEvent.text("Mouse move at " + clickEvent.Position.toString());
        });

        this.Input.Mouse.OnScroll.Bind((scrollEvent: EndGate.Core.Input.Mouse.IMouseScrollEvent) => {
            // Note we still have access to the Position property here that we can use, I just don't.
            for (var i = 0; i < this._shapes.length; i++) {
                this._shapes[i].Position = this._shapes[i].Position.Add(scrollEvent.Direction.Multiply(this._scrollSpeed));
            }

            lastMouseEvent.text("Mouse scroll at " + scrollEvent.Position.toString() + " in the direction: " + scrollEvent.Direction.toString());
        });
    }

    private MarkLocationWithCircle(position: EndGate.Core.Assets.Vector2d, radius: number, color: string): void {
        var shape = new EndGate.Core.Graphics.Shapes.Circle(position.X, position.Y, radius, color);

        this._shapes.push(shape);
        this.Scene.Add(shape);
    }

    private MarkLocationWithRectangle(position: EndGate.Core.Assets.Vector2d, size: EndGate.Core.Assets.Size2d, color: string): void {
        var shape = new EndGate.Core.Graphics.Shapes.Rectangle(position.X, position.Y, size.Width, size.Height, color);

        this._shapes.push(shape);
        this.Scene.Add(shape);
    }

}