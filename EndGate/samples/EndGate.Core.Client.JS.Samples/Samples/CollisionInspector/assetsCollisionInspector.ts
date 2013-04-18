/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class CollidableShape implements EndGate.Core.IUpdateable extends EndGate.Core.Collision.Collidable {
    public Graphic: EndGate.Core.Graphics.Shapes.Shape;
    private _collisionBorderColor: string = "black";
    private _collisionBorderThickness: number = 4;
    private _lastCollision: EndGate.Core.Collision.CollisionData = null;

    constructor(graphic: EndGate.Core.Graphics.Shapes.Shape, bounds: EndGate.Core.BoundingObject.Bounds2d) {
        super(bounds);

        this.Graphic = graphic;
        this.Graphic.BorderColor(this._collisionBorderColor);
        this.Graphic.BorderThickness(0);
    }

    public Move(position: EndGate.Core.Assets.Vector2d): void {
        // Update the graphic location and the bounds location
        this.Bounds.Position = this.Graphic.Position = position;
    }

    public Rotate(rotation: number) {
        this.Bounds.Rotation = this.Graphic.Rotation = this.Graphic.Rotation + rotation;
    }

    public Collided(data: EndGate.Core.Collision.CollisionData): void {        
        this.Graphic.BorderThickness(this._collisionBorderThickness);

        this._lastCollision = data;

        super.Collided(data);
    }

    public Update(gameTime: EndGate.Core.GameTime): void {
        if (this._lastCollision !== null) {
            if (!this._lastCollision.With.IsCollidingWith(this)) {
                this.Graphic.BorderThickness(0);
                this._lastCollision = null;
            }
        }
    }
}

class CollidableRectangle extends CollidableShape {
    constructor(x: number, y: number, width: number, height: number, color: string) {
        super(new EndGate.Core.Graphics.Shapes.Rectangle(x, y, width, height, color), new EndGate.Core.BoundingObject.BoundingRectangle(new EndGate.Core.Assets.Vector2d(x, y), new EndGate.Core.Assets.Size2d(width, height)))
    }
}

class CollidableCircle extends CollidableShape {
    constructor(x: number, y: number, radius: number, color: string) {
        super(new EndGate.Core.Graphics.Shapes.Circle(x, y, radius, color), new EndGate.Core.BoundingObject.BoundingCircle(new EndGate.Core.Assets.Vector2d(x, y), radius))
    }
}

class CollisionInspector extends EndGate.Core.Game {
    private _collidableShapes: CollidableShape[] = [];
    private _rotatingObject: CollidableShape;
    private _draggingObject: CollidableShape;
    private _dragOffset: EndGate.Core.Assets.Vector2d;
    private _currentMousePosition: EndGate.Core.Assets.Vector2d;
    private _decreasingZIndex: number;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this._draggingObject = null;
        this._rotatingObject = null;

        this._decreasingZIndex = 0;

        this.Input.Mouse.OnDown.Bind((clickEvent: EndGate.Core.Input.Mouse.IMouseClickEvent) => {
            var obj = this.GetShapeAt(clickEvent.Position);

            if (obj !== null) {
                if (clickEvent.Button === "Left") {
                    this._draggingObject = obj;
                    this._dragOffset = clickEvent.Position.Subtract(obj.Bounds.Position);
                }
                else if (clickEvent.Button === "Right") {
                    this._rotatingObject = obj;
                }
            }
        });

        this.Input.Mouse.OnUp.Bind((clickEvent: EndGate.Core.Input.Mouse.IMouseClickEvent) => {
            this._draggingObject = null;
            this._dragOffset = null;
            this._rotatingObject = null;
        });

        this.Input.Mouse.OnMove.Bind((mouseEvent: EndGate.Core.Input.Mouse.IMouseEvent) => {
            this._currentMousePosition = mouseEvent.Position;
        });
    }

    public Add(shape: CollidableShape): void {
        // For finding mouse clicks and who they intersect
        this._collidableShapes.push(shape);
        // Keep decreasing the zindex so the highest value is always closest to the front, meaning 
        // we will always return items that are in the viewing area even if they overlap.
        shape.Graphic.ZIndex = this._decreasingZIndex--;

        // For drawing the shape
        this.Scene.Add(shape.Graphic);

        // For detecting collision amongst the shapes
        this.CollisionManager.Monitor(shape);
    }

    public Update(gameTime: EndGate.Core.GameTime): void {
        var rotateSpeed: number,
            rotateDirection: number,
            difference: EndGate.Core.Assets.Vector2d;

        if (this._draggingObject !== null) {
            this._draggingObject.Move(this._currentMousePosition.Add(this._dragOffset.Negate()));
        }
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

    private GetShapeAt(position: EndGate.Core.Assets.Vector2d): CollidableShape {
        for (var i = 0; i < this._collidableShapes.length; i++) {
            if (this._collidableShapes[i].Bounds.ContainsPoint(position)) {
                return this._collidableShapes[i];
            }
        }

        return null;
    }
}