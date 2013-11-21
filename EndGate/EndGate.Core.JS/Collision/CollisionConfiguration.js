/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Utilities/EventHandler.ts" />
var EndGate;
(function (EndGate) {
    (function (Collision) {
        /**
        * Defines a CollisionConfiguration object that is used to configure and optimize the collision manager.
        */
        var CollisionConfiguration = (function () {
            function CollisionConfiguration(initialQuadTreeSize) {
                this._initialQuadTreeSize = initialQuadTreeSize;
                this._minQuadTreeNodeSize = CollisionConfiguration._DefaultMinQuadTreeNodeSize;
                this._OnChange = new EndGate.EventHandler();
            }
            Object.defineProperty(CollisionConfiguration.prototype, "MinQuadTreeNodeSize", {
                /**
                * Gets or sets the minimum quad tree node size.  For best performance this value should be equivalent to the smallest collidable object that will be monitored by the CollisionManager.  Changing this value re-creates the collision manager.  Values must represent a square.
                */
                get: function () {
                    return this._minQuadTreeNodeSize.Clone();
                },
                set: function (newSize) {
                    if (newSize.Width !== newSize.Height) {
                        throw new Error("MinQuadTreeNodeSize must be a square.  Width and height must be identical.");
                    }

                    this._minQuadTreeNodeSize = newSize;
                    this._OnChange.Trigger();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CollisionConfiguration.prototype, "InitialQuadTreeSize", {
                /**
                * Gets or sets the initial quad tree size.  The quad tree used for collision detection will dynamically grow in size if items drift outside of its boundaries.  If this property is set it will re-instantiate a new quad tree.  Values must be divisible by the MinQuadTreeNodeSize and must represent a square.
                */
                get: function () {
                    return this._initialQuadTreeSize;
                },
                set: function (newSize) {
                    if (newSize.Width !== newSize.Height) {
                        throw new Error("InitialQuadTreeSize must be a square.  Width and height must be identical.");
                    } else if (newSize.Width % this._minQuadTreeNodeSize.Width !== 0) {
                        throw new Error("InitialQuadTreeSize must be divisible by the MinQuadTreeNodeSize.");
                    }

                    this._initialQuadTreeSize = newSize;
                    this._OnChange.Trigger();
                },
                enumerable: true,
                configurable: true
            });
            CollisionConfiguration._DefaultMinQuadTreeNodeSize = new EndGate.Size2d(32);
            return CollisionConfiguration;
        })();
        Collision.CollisionConfiguration = CollisionConfiguration;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));
