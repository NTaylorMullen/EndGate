/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="../Interfaces/IMoveable.ts" />
/// <reference path="../Rendering/IRenderable.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Bounds/Bounds2d.ts" />
/// <reference path="Graphic2dState.ts" />

module EndGate.Graphics.Abstractions {

    /**
    * Abstract drawable graphic type that is used create the base for graphics.
    */
    export class Graphic2d implements _.ITyped, Rendering.IRenderable, IMoveable, IDisposable {
        public _type: string = "Graphic2d";

        /**
        * Gets or sets the ZIndex of the Graphic2d.  The ZIndex is used to control draw order.  Higher ZIndexes appear above lower ZIndexed graphics.
        */
        public ZIndex: number;

        /**
        * Gets or sets the Visible property.  The Visible property determines whether the renderable will be drawn to the game screen.
        */
        public Visible: bool;

        /**
        * Gets or sets the Position of the Graphic2d.  The Position determines where the graphic will be drawn on the screen.
        */
        public Position: Vector2d;
        /**
        * Gets or sets the Rotation of the Graphic2d..
        */
        public Rotation: number;

        public _State: Assets._.Graphic2dState;

        public static _zindexSort: (a: Graphic2d, b: Graphic2d) => number = (a: Graphic2d, b: Graphic2d) => { return a.ZIndex - b.ZIndex; };

        private _children: Graphic2d[];
        private _onDisposed: EventHandler1<Graphic2d>;
        private _disposed: boolean;

        constructor(position: Vector2d) {
            this.Position = position;
            this.Rotation = 0;
            this.ZIndex = 0;
            this.Visible = true;
            this._State = new Assets._.Graphic2dState();
            this._children = [];
            this._disposed = false;
            this._onDisposed = new EventHandler1<Graphic2d>();
        }

        /**
        * Gets an event that is triggered when the Graphic2d has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDisposed(): EventHandler1<Graphic2d> {
            return this._onDisposed;
        }

        /**
        * Adds a child to the Graphic2d.  Children are drawn with relative positions to the parent Graphic2d.  Children
        * of a Graphic2d should not be added to the Scene, parent Graphic2d's are responsible for drawing their children.
        * @param graphic Child to add.
        */
        public AddChild(graphic: Graphic2d): void {
            this._children.push(graphic);
            this._children.sort(Graphic2d._zindexSort);
        }

        /**
        * Removes a child from the Graphic2d.  Returns a Boolean value indicating whether or not the child was able to be removed.
        * @param graphic Child to remove.
        */
        public RemoveChild(graphic: Graphic2d): bool {
            var index = this._children.indexOf(graphic);

            if (index >= 0) {
                this._children.splice(index, 1);
                return true;
            }

            return false;
        }

        /**
        * Returns the list of children for the current Graphic2d.
        */
        public Children(): Graphic2d[]{
            return this._children;
        }

        public _StartDraw(context: CanvasRenderingContext2D): void {
            context.save();
            this._State.SetContextState(context);

            context.translate(this.Position.X, this.Position.Y);

            if (this.Rotation !== 0) {
                context.rotate(this.Rotation);
            }
        }

        public _EndDraw(context: CanvasRenderingContext2D): void {
            for (var i = 0; i < this._children.length; i++) {
                this._children[i].Draw(context);
            }

            context.restore();
        }

        /**
        * Abstract: Should be overridden to draw the derived class onto the context.  If this graphic is part of a scene the Draw function will be called automatically.
        * @param context The canvas context to draw the graphic onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            throw new Error("The Draw method is abstract on Graphic2d and should not be called.");
        }

        /**
        * Abstract: Should be overridden to return the bounding area that represents where the graphic will draw.
        */
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            throw new Error("GetDrawBounds is abstract, it must be implemented.");
        }

        /**
        * Triggers the OnDisposed event.  If this Graphic2d is used with a Scene2d it will be removed from the scene when disposed.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this.OnDisposed.Trigger(this);
            }
            else {
                throw new Error("Cannot dispose graphic more than once.");
            }
        }
    }

}