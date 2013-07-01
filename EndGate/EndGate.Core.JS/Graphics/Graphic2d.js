var EndGate;
(function (EndGate) {
    (function (Graphics) {
        /// <reference path="../Interfaces/ITyped.ts" />
        /// <reference path="../Interfaces/IMoveable.ts" />
        /// <reference path="../Rendering/IRenderable.ts" />
        /// <reference path="../Assets/Sizes/Size2d.ts" />
        /// <reference path="../Assets/Vectors/Vector2d.ts" />
        /// <reference path="../Bounds/Bounds2d.ts" />
        /// <reference path="Graphic2dState.ts" />
        (function (Abstractions) {
            /**
            * Abstract drawable graphic type that is used create the base for graphics.
            */
            var Graphic2d = (function () {
                function Graphic2d(position) {
                    this._type = "Graphic2d";
                    this.Position = position;
                    this.Rotation = 0;
                    this.ZIndex = 0;
                    this.Visible = true;
                    this._State = new Graphics.Assets._.Graphic2dState();
                    this._children = [];
                    this._disposed = false;
                }
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

                /**
                * Adds a child to the Graphic2d.  Children are drawn with relative positions to the parent Graphic2d.  Children
                * of a Graphic2d should not be added to the Scene, parent Graphic2d's are responsible for drawing their children.
                * @param graphic Child to add.
                */
                Graphic2d.prototype.AddChild = function (graphic) {
                    this._children.push(graphic);
                    this._children.sort(Graphic2d._zindexSort);
                };

                /**
                * Removes a child from the Graphic2d.  Returns a Boolean value indicating whether or not the child was able to be removed.
                * @param graphic Child to remove.
                */
                Graphic2d.prototype.RemoveChild = function (graphic) {
                    var index = this._children.indexOf(graphic);

                    if (index >= 0) {
                        this._children.splice(index, 1);
                        return true;
                    }

                    return false;
                };

                /**
                * Returns the list of children for the current Graphic2d.
                */
                Graphic2d.prototype.Children = function () {
                    return this._children;
                };

                Graphic2d.prototype._StartDraw = function (context) {
                    context.save();
                    this._State.SetContextState(context);

                    context.translate(this.Position.X, this.Position.Y);

                    if (this.Rotation !== 0) {
                        context.rotate(this.Rotation);
                    }
                };

                Graphic2d.prototype._EndDraw = function (context) {
                    for (var i = 0; i < this._children.length; i++) {
                        this._children[i].Draw(context);
                    }

                    context.restore();
                };

                /**
                * Abstract: Should be overridden to draw the derived class onto the context.  If this graphic is part of a scene the Draw function will be called automatically.
                * @param context The canvas context to draw the graphic onto.
                */
                Graphic2d.prototype.Draw = function (context) {
                    throw new Error("The Draw method is abstract on Graphic2d and should not be called.");
                };

                /**
                * Abstract: Should be overridden to return the bounding area that represents where the graphic will draw.
                */
                Graphic2d.prototype.GetDrawBounds = function () {
                    throw new Error("GetDrawBounds is abstract, it must be implemented.");
                };

                /**
                * Triggers the OnDisposed event.  If this Graphic2d is used with a Scene2d it will be removed from the scene when disposed.
                */
                Graphic2d.prototype.Dispose = function () {
                    if (!this._disposed) {
                        this._disposed = true;
                        this.OnDisposed.Trigger(this);
                    } else {
                        throw new Error("Cannot dispose graphic more than once.");
                    }
                };
                Graphic2d._zindexSort = function (a, b) {
                    return a.ZIndex - b.ZIndex;
                };
                return Graphic2d;
            })();
            Abstractions.Graphic2d = Graphic2d;
        })(Graphics.Abstractions || (Graphics.Abstractions = {}));
        var Abstractions = Graphics.Abstractions;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
