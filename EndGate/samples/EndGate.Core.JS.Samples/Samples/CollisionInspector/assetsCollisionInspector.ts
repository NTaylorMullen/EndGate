/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.ts" />

class CollidableShape implements eg.IUpdateable extends eg.Collision.Collidable {
    public Graphic: eg.Graphics.Abstractions.Shape;
    public TextPosition: eg.Graphics.Text2d;
    private _collisionBorderColor: string = "black";
    private _collisionBorderThickness: number = 4;
    private _lastCollision: eg.Collision.Assets.CollisionData = null;

    constructor(graphic: eg.Graphics.Abstractions.Shape, bounds: eg.Bounds.Abstractions.Bounds2d) {
        super(bounds);

        this.Graphic = graphic;
        this.TextPosition = new eg.Graphics.Text2d(graphic.Position.X, graphic.Position.Y, graphic.Position.toString());

        this.Graphic.BorderColor(this._collisionBorderColor);
        this.Graphic.BorderThickness(0);
    }

    public Move(position: eg.Vector2d): void {
        // Update the graphic location and the bounds location
        this.Bounds.Position = this.Graphic.Position = this.TextPosition.Position = position;

        // Round the position and then update its text
        this.TextPosition.Position.Apply(Math.round);
        this.TextPosition.Text(this.TextPosition.Position.toString());
    }

    public Rotate(rotation: number) {
        this.Bounds.Rotation = this.Graphic.Rotation = this.TextPosition.Rotation = this.Graphic.Rotation + rotation;
    }

    public Collided(data: eg.Collision.Assets.CollisionData): void {        
        this.Graphic.BorderThickness(this._collisionBorderThickness);

        this._lastCollision = data;

        super.Collided(data);
    }

    public Update(gameTime: eg.GameTime): void {
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
        super(new eg.Graphics.Rectangle(x, y, width, height, color), new eg.Bounds.BoundingRectangle(new eg.Vector2d(x, y), new eg.Size2d(width, height)))
    }
}

class CollidableCircle extends CollidableShape {
    constructor(x: number, y: number, radius: number, color: string) {
        super(new eg.Graphics.Circle(x, y, radius, color), new eg.Bounds.BoundingCircle(new eg.Vector2d(x, y), radius))
    }
}

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

        this.Input.Mouse.OnDown.Bind((clickEvent: eg.Input.IMouseClickEvent) => {
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

        this.Input.Mouse.OnUp.Bind((clickEvent: eg.Input.IMouseClickEvent) => {
            this._draggingObject = null;
            this._dragOffset = null;
            this._rotatingObject = null;
        });

        this.Input.Mouse.OnMove.Bind((mouseEvent: eg.Input.IMouseEvent) => {
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
        this.Scene.Add(shape.TextPosition);

        // For detecting collision amongst the shapes
        this.CollisionManager.Monitor(shape);
    }

    public Update(gameTime: eg.GameTime): void {
        var rotateSpeed: number,
            rotateDirection: number,
            difference: eg.Vector2d;

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

    private GetShapeAt(position: eg.Vector2d): CollidableShape {
        for (var i = 0; i < this._collidableShapes.length; i++) {
            if (this._collidableShapes[i].Bounds.ContainsPoint(position)) {
                return this._collidableShapes[i];
            }
        }

        return null;
    }
}