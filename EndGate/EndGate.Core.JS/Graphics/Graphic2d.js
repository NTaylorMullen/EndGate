var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/ITyped.ts" />
    /// <reference path="../Interfaces/IMoveable.ts" />
    /// <reference path="../Interfaces/IDisposable.ts" />
    /// <reference path="../Interfaces/ICloneable.ts" />
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../Bounds/Bounds2d.ts" />
    /// <reference path="../Utilities/EventHandler1.ts" />
    /// <reference path="../Scripts/typings/pixi/pixi.d.ts" />
    (function (Graphics) {
        /**
        * Abstract drawable graphic type that is used create the base for graphics.
        */
        var Graphic2d = (function () {
            /**
            * Creates a new instance of the Graphic2d object.  Should only ever be called by a derived class.
            * @param pixiBase The underlying PIXI object to use for rendering.
            * @param position The initial position of the Graphic2d.
            */
            function Graphic2d(pixiBase, position) {
                var _this = this;
                this._type = "Graphic2d";
                this.PixiBase = pixiBase;
                this.Position = position;
                this.Rotation = 0;
                this.Opacity = 1;
                this._zIndex = 0;
                this._children = [];
                this._childrenRemovalBindings = [];
                this.Parent = null;
                this._disposed = false;
                this._onDisposed = new EndGate.EventHandler1();
                this._onZIndexChange = new EndGate.EventHandler1();

                this._MonitorProperty(this.PixiBase.position, "x", function () {
                    return _this.Position.X;
                }, function (newX) {
                    _this.Position.X = newX;
                });

                this._MonitorProperty(this.PixiBase.position, "y", function () {
                    return _this.Position.Y;
                }, function (newY) {
                    _this.Position.Y = newY;
                });
            }
            Object.defineProperty(Graphic2d.prototype, "AbsolutePosition", {
                get: /**
                * Gets the absolute position of the Graphic2d.  This is used to calculate absolute positions when graphic's have parents.
                */
                function () {
                    var position = this.Position, node = this;

                    while (node = node.Parent) {
                        position = position.Add(node.Position);
                    }

                    return position;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Graphic2d.prototype, "Visible", {
                get: /**
                * Gets or sets the Visible property.  The Visible property determines whether the Graphic2d will be drawn to the game screen.
                */
                function () {
                    return this.PixiBase.visible;
                },
                set: function (visible) {
                    this.PixiBase.visible = visible;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Graphic2d.prototype, "ZIndex", {
                get: /**
                * Gets or sets the Visible property.  The Visible property determines whether the Graphic2d will be drawn to the game screen.
                */
                function () {
                    return this._zIndex;
                },
                set: function (zIndex) {
                    this._zIndex = zIndex;
                    this.OnZIndexChange.Trigger(zIndex);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Graphic2d.prototype, "Rotation", {
                get: /**
                * Gets or sets the Rotation of the Graphic2d.
                */
                function () {
                    return this.PixiBase.rotation;
                },
                set: function (rotation) {
                    this.PixiBase.rotation = rotation;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Graphic2d.prototype, "OnDisposed", {
                get: /**
                * Gets an event that is triggered when the Graphic2d has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onDisposed;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Graphic2d.prototype, "OnZIndexChange", {
                get: /**
                * Gets an event that is triggered when the Graphic2d's ZIndex changes.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onZIndexChange;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Graphic2d.prototype, "Opacity", {
                get: /**
                * Gets or sets the current opacity.  Value is between 0 and 1.
                */
                function () {
                    return this.PixiBase.alpha;
                },
                set: function (alpha) {
                    this.PixiBase.alpha = alpha;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Returns the list of children for the current Graphic2d.
            */
            Graphic2d.prototype.GetChildren = function () {
                return this._children.slice(0);
            };

            /**
            * Adds a child to the Graphic2d.  Children are drawn with relative positions to the parent Graphic2d.  Children
            * of a Graphic2d should not be added to the Scene, parent Graphic2d's are responsible for drawing their children.
            * @param graphic Child to add.
            */
            Graphic2d.prototype.AddChild = function (graphic) {
                var _this = this;
                var removalBinding;

                if (graphic.Parent !== null) {
                    throw new Error("Graphic already has parent, cannot add it as a child.");
                }

                removalBinding = {
                    For: graphic,
                    DisposedWire: function (graphic) {
                        _this.RemoveChild(graphic);
                    },
                    ZIndexChangedWire: function (zIndex) {
                        _this._children.sort(Graphic2d._zindexSort);

                        _this.PixiBase.removeChild(graphic.PixiBase);
                        _this.PixiBase.addChildAt(graphic.PixiBase, _this._children.indexOf(graphic));
                    }
                };

                graphic.Parent = this;
                graphic.OnDisposed.Bind(removalBinding.DisposedWire);
                graphic.OnZIndexChange.Bind(removalBinding.ZIndexChangedWire);

                this._children.push(graphic);
                this._childrenRemovalBindings.push(removalBinding);
                this._children.sort(Graphic2d._zindexSort);

                this.PixiBase.addChildAt(graphic.PixiBase, this._children.indexOf(graphic));
            };

            /**
            * Removes a child from the Graphic2d.  Returns a Boolean value indicating whether or not the child was able to be removed.
            * @param graphic Child to remove.
            */
            Graphic2d.prototype.RemoveChild = function (graphic) {
                var index = this._children.indexOf(graphic), removalBinding;

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
            };

            /**
            * Abstract: Should be overridden to return the bounding area that represents where the graphic will draw.
            */
            Graphic2d.prototype.GetDrawBounds = function () {
                throw new Error("GetDrawBounds is abstract, it must be implemented.");
            };

            /**
            * Abstract: Should be overridden to scale the size of the Graphic2d.
            * @param scale The value to multiply the graphic's size by.
            */
            Graphic2d.prototype.Scale = function (scale) {
                throw new Error("Scale is abstract, it must be implemented.");
            };

            /**
            * Abstract: Returns a nearly identical copy of this Graphic2d.  If this Graphic2d belongs to a parent, the cloned Graphic2d will not. If this Graphic2d has children, all children will be cloned as well.  Lastly, the cloned Graphic2d will not have the same event bindings as this one does.
            */
            Graphic2d.prototype.Clone = function () {
                throw new Error("Clone is abstract, it must be implemented.");
            };

            // Used by derived Graphic2d's to centralize logic
            Graphic2d.prototype._Clone = function (graphic) {
                for (var i = 0; i < this._children.length; i++) {
                    graphic.AddChild(this._children[i].Clone());
                }

                graphic.Opacity = this.Opacity;
                graphic.Rotation = this.Rotation;
                graphic.Visible = this.Visible;
                graphic.ZIndex = this.ZIndex;
            };

            /**
            * Triggers the OnDisposed event.  If this Graphic2d is used with a Scene2d it will be removed from the scene when disposed.
            */
            Graphic2d.prototype.Dispose = function () {
                var childrenClone;

                if (!this._disposed) {
                    this._disposed = true;

                    childrenClone = this._children.slice(0);

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
                } else {
                    throw new Error("Cannot dispose graphic more than once.");
                }
            };

            Graphic2d.prototype._MonitorProperty = function (obj, property, getFn, setFn) {
                Object.defineProperty(obj, property, {
                    get: getFn,
                    set: setFn,
                    enumerable: true,
                    configurable: true
                });
            };
            Graphic2d._zindexSort = function (a, b) {
                return a.ZIndex - b.ZIndex;
            };
            return Graphic2d;
        })();
        Graphics.Graphic2d = Graphic2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
