/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="CollidableShape.ts" />

class CollisionInspector extends eg.Game {
    private _collidableShapes: CollidableShape[] = [];
    private _rotatingObject: CollidableShape;
    private _draggingObject: CollidableShape;
    private _dragOffset: eg.Vector2d;
    private _currentMousePosition: eg.Vector2d;
    private _decreasingZIndex: number;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this._draggingObject = null;
        this._rotatingObject = null;
        this._decreasingZIndex = 0;

        // Triggers when any button gets pressed down within the game area
        this.Input.Mouse.OnDown.Bind((clickEvent: eg.Input.IMouseClickEvent) => {
            // Find what shape we've clicked
            var obj = this.GetShapeAt(clickEvent.Position);

            // If we've actually clicked an object
            if (obj !== null) {
                // Move on left click
                if (clickEvent.Button === "Left") {
                    this._draggingObject = obj;
                    // Calculate where we clicked the shape
                    this._dragOffset = clickEvent.Position.Subtract(obj.Bounds.Position);
                }// Rotate on right click
                else if (clickEvent.Button === "Right") {
                    this._rotatingObject = obj;
                }
            }
        });

        // Triggers when any button gets released within the game area
        this.Input.Mouse.OnUp.Bind((clickEvent: eg.Input.IMouseClickEvent) => {
            // Reset all the dragging behaviors
            this._draggingObject = null;
            this._dragOffset = null;
            this._rotatingObject = null;
        });

        // Triggers when the mouse is moved within the game area
        this.Input.Mouse.OnMove.Bind((mouseEvent: eg.Input.IMouseEvent) => {
            // Update the current mouse position (so we can track it)
            this._currentMousePosition = mouseEvent.Position;
        });
    }

    public Add(shape: CollidableShape): void {
        // For finding mouse clicks and who they intersect
        this._collidableShapes.push(shape);
        // Keep decreasing the zindex so the highest value is always closest to the front, meaning 
        // we will always return items that are in the viewing area even if they overlap.
        shape.Graphic.ZIndex = shape.TextPosition.ZIndex = this._decreasingZIndex--;

        // For drawing the shape
        this.Scene.Add(shape.Graphic);

        // For detecting collision amongst the shapes
        this.CollisionManager.Monitor(shape);
    }

    public Update(gameTime: eg.GameTime): void {
        var rotateSpeed: number,
            rotateDirection: number,
            difference: eg.Vector2d;

        // If we're currently dragging an object
        if (this._draggingObject !== null) {
            this._draggingObject.Move(this._currentMousePosition.Add(this._dragOffset.Negate()));
        }
            // If we're currently rotating an object
        else if (this._rotatingObject !== null) {
            // Rotate faster the further away the mouse is from the center of the rotating object
            difference = this._currentMousePosition.Subtract(this._rotatingObject.Bounds.Position);
            rotateSpeed = difference.Magnitude() / 100;
            // Will rotate different directions based on what side of the axis the X is on
            rotateDirection = difference.Sign().X;

            this._rotatingObject.Rotate(rotateSpeed * gameTime.ElapsedSecond * rotateDirection)
        }

        for (var i = 0; i < this._collidableShapes.length; i++) {
            this._collidableShapes[i].Update(gameTime);
        }
    }

    // Find the shape that we click
    private GetShapeAt(position: eg.Vector2d): CollidableShape {
        for (var i = 0; i < this._collidableShapes.length; i++) {
            if (this._collidableShapes[i].Bounds.ContainsPoint(position)) {
                return this._collidableShapes[i];
            }
        }

        return null;
    }
}