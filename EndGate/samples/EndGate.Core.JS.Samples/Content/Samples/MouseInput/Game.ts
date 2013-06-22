/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module MouseInput {

    export class Game extends eg.Game {
        // Default values
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

        private _shapes: eg.Graphics.Abstractions.Shape[] = [];

        constructor(canvas: HTMLCanvasElement, lastMouseEvent: JQuery) {
            super(canvas);

            this.Input.Mouse.OnClick = null;

            // Bind each of the mouse events individually to draw different color circles
            this.Input.Mouse.OnClick.Bind((clickEvent: eg.Input.IMouseClickEvent) => {
                lastMouseEvent.text(clickEvent.Button + " Click at " + clickEvent.Position.toString());
                this.MarkLocationWithCircle(clickEvent.Position, this._radiusSize, this._clickColors[clickEvent.Button]);
            });

            this.Input.Mouse.OnDoubleClick.Bind((clickEvent: eg.Input.IMouseClickEvent) => {
                lastMouseEvent.text(clickEvent.Button + " Double Click at " + clickEvent.Position.toString());
                this.MarkLocationWithCircle(clickEvent.Position, this._radiusSize, this._doubleClickColor);
            });

            this.Input.Mouse.OnDown.Bind((clickEvent: eg.Input.IMouseClickEvent) => {
                lastMouseEvent.text(clickEvent.Button + " button down at " + clickEvent.Position.toString());
                this.MarkLocationWithCircle(clickEvent.Position, this._radiusSize, this._inbetweenColors[clickEvent.Button]);
            });

            this.Input.Mouse.OnUp.Bind((clickEvent: eg.Input.IMouseClickEvent) => {
                lastMouseEvent.text(clickEvent.Button + " button up at " + clickEvent.Position.toString());
                this.MarkLocationWithRectangle(clickEvent.Position, new eg.Size2d(this._radiusSize * 4, this._radiusSize * 4), this._inbetweenColors[clickEvent.Button]);
            });

            // When we move the cursor draw a small circle to represent where the mouse is
            this.Input.Mouse.OnMove.Bind((clickEvent: eg.Input.IMouseEvent) => {
                this.MarkLocationWithCircle(clickEvent.Position, 1, this._onMoveColor);
                lastMouseEvent.text("Mouse move at " + clickEvent.Position.toString());
            });

            this.Input.Mouse.OnScroll.Bind((scrollEvent: eg.Input.IMouseScrollEvent) => {
                // Cycle through every shape in the game area and move it according to our scroll direction
                for (var i = 0; i < this._shapes.length; i++) {
                    this._shapes[i].Position = this._shapes[i].Position.Add(scrollEvent.Direction.Multiply(this._scrollSpeed));
                }

                lastMouseEvent.text("Mouse scroll at " + scrollEvent.Position.toString() + " in the direction: " + scrollEvent.Direction.toString());
            });
        }

        // Helper function to add shapes to our managed shapes list and to the scene simultaneously
        private MarkLocationWithCircle(position: eg.Vector2d, radius: number, color: string): void {
            var shape = new eg.Graphics.Circle(position.X, position.Y, radius, color);

            this._shapes.push(shape);
            this.Scene.Add(shape);
        }

        // Helper function to add shapes to our managed shapes list and to the scene simultaneously
        private MarkLocationWithRectangle(position: eg.Vector2d, size: eg.Size2d, color: string): void {
            var shape = new eg.Graphics.Rectangle(position.X, position.Y, size.Width, size.Height, color);

            this._shapes.push(shape);
            this.Scene.Add(shape);
        }

    }

}