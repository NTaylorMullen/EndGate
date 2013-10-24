/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="../Interfaces/IMoveable.ts" />
/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ICloneable.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Bounds/Bounds2d.ts" />
/// <reference path="../Utilities/EventHandler1.ts" />
/// <reference path="Graphic2dState.ts" />

module EndGate.Graphics {

    /**
    * Abstract drawable graphic type that is used create the base for graphics.
    */
    export class Graphic2d implements _.ITyped, Rendering.IRenderable, IMoveable, IDisposable, ICloneable {
        public _type: string = "Graphic2d";

        /**
        * Gets or sets the ZIndex of the Graphic2d.  The ZIndex is used to control draw order.  Higher ZIndexes appear above lower ZIndexed graphics.
        */
        public ZIndex: number;

        /**
        * Gets or sets the Visible property.  The Visible property determines whether the renderable will be drawn to the game screen.
        */
        public Visible: boolean;

        /**
        * Gets or sets the Position of the Graphic2d.  The Position determines where the graphic will be drawn on the screen.
        */
        public Position: Vector2d;
        /**
        * Gets or sets the Rotation of the Graphic2d..
        */
        public Rotation: number;

        /**
        * Gets the parent of the Graphic2d.  Value is null if no parent exists.
        */
        public Parent: Graphic2d;

        public _State: Assets._.Graphic2dState;

        public static _zindexSort: (a: Graphic2d, b: Graphic2d) => number = (a: Graphic2d, b: Graphic2d) => { return a.ZIndex - b.ZIndex; };

        private _children: Graphic2d[];
        private _childrenRemovalBindings: Array<(graphic: Graphic2d) => void >;
        private _onDisposed: EventHandler1<Graphic2d>;
        private _disposed: boolean;

        /**
        * Creates a new instance of the Graphic2d object.  Should only ever be called by a derived class.
        * @param position The initial position of the Graphic2d
        */
        constructor(position: Vector2d) {
            this.Position = position;
            this.Rotation = 0;
            this.ZIndex = 0;
            this.Visible = true;
            this._State = new Assets._.Graphic2dState();
            this.Opacity = 1;
            this._children = [];
            this._childrenRemovalBindings = [];
            this.Parent = null;
            this._disposed = false;
            this._onDisposed = new EventHandler1<Graphic2d>();
        }

        /**
        * Gets the absolute position of the Graphic2d.  This is used to calculate absolute positions when graphic's have parents.
        */
        public get AbsolutePosition(): Vector2d {
            var position = this.Position,
                node = this;

            // Iterate up the parent tree until we're at the root parent
            while (node = node.Parent) {
                position = position.Add(node.Position);
            }

            return position;
        }

        /**
        * Gets an event that is triggered when the Graphic2d has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDisposed(): EventHandler1<Graphic2d> {
            return this._onDisposed;
        }

        /**
        * Gets or sets the current opacity.  Value is between 0 and 1.
        */
        public get Opacity(): number {
            return this._State.GlobalAlpha;
        }
        public set Opacity(alpha: number) {
            this._State.GlobalAlpha = alpha;
        }

        /**
        * Returns the list of children for the current Graphic2d.
        */
        public GetChildren(): Graphic2d[] {
            return this._children.slice(0);
        }

        /**
        * Adds a child to the Graphic2d.  Children are drawn with relative positions to the parent Graphic2d.  Children
        * of a Graphic2d should not be added to the Scene, parent Graphic2d's are responsible for drawing their children.
        * @param graphic Child to add.
        */
        public AddChild(graphic: Graphic2d): void {
            var removalBinding: (graphic: Graphic2d) => void;

            if (graphic.Parent !== null) {
                throw new Error("Graphic already has parent, cannot add it as a child.");
            }

            removalBinding = (graphic: Graphic2d) => {
                this.RemoveChild(graphic);
            };

            graphic.Parent = this;
            graphic.OnDisposed.Bind(removalBinding);

            this._children.push(graphic);
            this._childrenRemovalBindings.push(removalBinding);
            this._children.sort(Graphic2d._zindexSort);
        }

        /**
        * Removes a child from the Graphic2d.  Returns a Boolean value indicating whether or not the child was able to be removed.
        * @param graphic Child to remove.
        */
        public RemoveChild(graphic: Graphic2d): boolean {
            var index = this._children.indexOf(graphic);

            if (index >= 0) {
                this._children[index].Parent = null;
                this._children[index].OnDisposed.Unbind(this._childrenRemovalBindings[index]);
                this._children.splice(index, 1);
                this._childrenRemovalBindings.splice(index, 1);
                return true;
            }

            return false;
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
                if (this._children[i].Visible) {
                    this._children[i].Draw(context);
                }
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
        public GetDrawBounds(): Bounds.Bounds2d {
            throw new Error("GetDrawBounds is abstract, it must be implemented.");
        }

        /**
        * Abstract: Should be overridden to scale the size of the Graphic2d.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void{
            throw new Error("Scale is abstract, it must be implemented.");
        }

        /**
        * Abstract: Returns a nearly identical copy of this Graphic2d.  If this Graphic2d belongs to a parent, the cloned Graphic2d will not. If this Graphic2d has children, all children will be cloned as well.  Lastly, the cloned Graphic2d will not have the same event bindings as this one does.
        */
        public Clone(): Graphic2d {
            throw new Error("Clone is abstract, it must be implemented.");
        }

        // Used by derived Graphic2d's to centralize logic
        public _Clone(graphic: Graphic2d): void {
            for (var i = 0; i < this._children.length; i++){
                graphic.AddChild(this._children[i].Clone());
            }

            graphic.Opacity = this.Opacity;
            graphic.Rotation = this.Rotation;
            graphic.Visible = this.Visible;
            graphic.ZIndex = this.ZIndex;
        }

        /**
        * Triggers the OnDisposed event.  If this Graphic2d is used with a Scene2d it will be removed from the scene when disposed.
        */
        public Dispose(): void {
            var childrenClone;

            if (!this._disposed) {
                this._disposed = true;

                childrenClone = this._children.slice(0);

                // Dispose all children to ensure that there's no dangling references.
                for (var i = 0; i < childrenClone.length; i++) {
                    childrenClone[i].Dispose();
                }

                this._children = null;
                this.OnDisposed.Trigger(this);
                this.OnDisposed.Dispose();
            }
            else {
                throw new Error("Cannot dispose graphic more than once.");
            }
        }
    }

}