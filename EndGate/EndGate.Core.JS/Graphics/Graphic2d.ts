/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="../Interfaces/IMoveable.ts" />
/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ICloneable.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Bounds/Bounds2d.ts" />
/// <reference path="../Utilities/EventHandler1.ts" />
/// <reference path="../Scripts/typings/pixi/pixi.d.ts" />

module EndGate.Graphics {

    interface IRemovalBinding {
        For: Graphic2d;
        DisposedWire: (graphic: Graphic2d) => void;
        ZIndexChangedWire: (zIndex: number) => void;
    }

    /**
    * Abstract drawable graphic type that is used create the base for graphics.
    */
    export class Graphic2d implements _.ITyped, IMoveable, IDisposable, ICloneable {
        public _type: string = "Graphic2d";

        /**
        * Gets the parent of the Graphic2d.  Value is null if no parent exists.
        */
        public Parent: Graphic2d;

        /**
        * Gets or sets the PIXIBase object that is used to render the Graphic2d.
        */
        public PixiBase: PIXI.DisplayObjectContainer;

        /**
        * Gets or sets the Position of the Graphic2d.  The Position determines where the graphic will be drawn on the screen.
        */
        public Position: Vector2d;

        public static _zindexSort: (a: Graphic2d, b: Graphic2d) => number = (a: Graphic2d, b: Graphic2d) => { return a.ZIndex - b.ZIndex; };

        private _zIndex: number;
        private _children: Graphic2d[];
        private _childrenRemovalBindings: Array<IRemovalBinding>;
        private _onDisposed: EventHandler1<Graphic2d>;
        private _onZIndexChange: EventHandler1<number>;
        private _disposed: boolean;

        /**
        * Creates a new instance of the Graphic2d object.  Should only ever be called by a derived class.
        * @param pixiBase The underlying PIXI object to use for rendering.
        * @param position The initial position of the Graphic2d.
        */
        constructor(pixiBase: PIXI.DisplayObjectContainer, position: Vector2d) {
            this.PixiBase = pixiBase;
            this.Position = position;
            this.Rotation = 0;
            this.Opacity = 1;
            this._zIndex = 0;
            this._children = [];
            this._childrenRemovalBindings = [];
            this.Parent = null;
            this._disposed = false;
            this._onDisposed = new EventHandler1<Graphic2d>();
            this._onZIndexChange = new EventHandler1<number>();

            this._MonitorProperty(this.PixiBase.position, "x", () => {
                return this.Position.X;
            }, (newX: number) => {
                    this.Position.X = newX;
                });

            this._MonitorProperty(this.PixiBase.position, "y", () => {
                return this.Position.Y;
            }, (newY: number) => {
                    this.Position.Y = newY;
                });
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
        * Gets or sets the Visible property.  The Visible property determines whether the Graphic2d will be drawn to the game screen.
        */
        public get Visible(): boolean {
            return this.PixiBase.visible;
        }
        public set Visible(visible: boolean) {
            this.PixiBase.visible = visible;
        }

        /**
        * Gets or sets the Visible property.  The Visible property determines whether the Graphic2d will be drawn to the game screen.
        */
        public get ZIndex(): number {
            return this._zIndex;
        }
        public set ZIndex(zIndex: number) {
            this._zIndex = zIndex;
            this.OnZIndexChange.Trigger(zIndex);
        }

        /**
        * Gets or sets the Rotation of the Graphic2d.
        */
        public get Rotation(): number {
            return this.PixiBase.rotation;
        }
        public set Rotation(rotation: number) {
            this.PixiBase.rotation = rotation;
        }

        /**
        * Gets an event that is triggered when the Graphic2d has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDisposed(): EventHandler1<Graphic2d> {
            return this._onDisposed;
        }

        /**
        * Gets an event that is triggered when the Graphic2d's ZIndex changes.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnZIndexChange(): EventHandler1<number> {
            return this._onZIndexChange;
        }

        /**
        * Gets or sets the current opacity.  Value is between 0 and 1.
        */
        public get Opacity(): number {
            return this.PixiBase.alpha;
        }
        public set Opacity(alpha: number) {
            this.PixiBase.alpha = alpha;
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
            var removalBinding: IRemovalBinding;

            if (graphic.Parent !== null) {
                throw new Error("Graphic already has parent, cannot add it as a child.");
            }

            removalBinding = {
                For: graphic,
                DisposedWire: (graphic: Graphic2d) => {
                    this.RemoveChild(graphic);
                },
                ZIndexChangedWire: (zIndex: number) => {
                    this._children.sort(Graphic2d._zindexSort);

                    this.PixiBase.removeChild(graphic.PixiBase);
                    this.PixiBase.addChildAt(graphic.PixiBase, this._children.indexOf(graphic));
                }
            };

            graphic.Parent = this;
            graphic.OnDisposed.Bind(removalBinding.DisposedWire);
            graphic.OnZIndexChange.Bind(removalBinding.ZIndexChangedWire);

            this._children.push(graphic);
            this._childrenRemovalBindings.push(removalBinding);
            this._children.sort(Graphic2d._zindexSort);

            this.PixiBase.addChildAt(graphic.PixiBase, this._children.indexOf(graphic));
        }

        /**
        * Removes a child from the Graphic2d.  Returns a Boolean value indicating whether or not the child was able to be removed.
        * @param graphic Child to remove.
        */
        public RemoveChild(graphic: Graphic2d): boolean {
            var index = this._children.indexOf(graphic),
                removalBinding: IRemovalBinding;

            for (var i = 0; i < this._childrenRemovalBindings.length; i++) {
                if (this._childrenRemovalBindings[i].For === graphic) {
                    removalBinding = this._childrenRemovalBindings[i];
                    this._childrenRemovalBindings.splice(i, 1);
                    break;
                }
            }

            if (index >= 0) {
                this.PixiBase.removeChild(graphic.PixiBase);
                this._children[index].Parent = null;
                this._children[index].OnDisposed.Unbind(removalBinding.DisposedWire);
                this._children[index].OnZIndexChange.Unbind(removalBinding.ZIndexChangedWire);
                this._children.splice(index, 1);
                return true;
            }

            return false;
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
        public Scale(scale: number): void {
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
            for (var i = 0; i < this._children.length; i++) {
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

                // Set the position to be a new Vector2d so it unbinds all monitors to the existing position object
                this.Position = null;
                this._childrenRemovalBindings = null;
                this.OnZIndexChange.Dispose();
                this.OnDisposed.Trigger(this);
                this.OnDisposed.Dispose();
            }
            else {
                throw new Error("Cannot dispose graphic more than once.");
            }
        }

        public _MonitorProperty(obj: any, property: string, getFn: () => any, setFn: (value: any) => void): void {
            Object.defineProperty(obj, property, {
                get: getFn,
                set: setFn,
                enumerable: true,
                configurable: true
            });
        }
    }

}