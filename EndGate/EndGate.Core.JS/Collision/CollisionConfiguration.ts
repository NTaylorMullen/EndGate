/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Utilities/EventHandler.ts" />

module EndGate.Collision {

    /**
    * Defines a CollisionConfiguration object that is used to configure and optimize the collision manager.
    */
    export class CollisionConfiguration {
        public static _DefaultMinQuadTreeNodeSize: Size2d = new Size2d(32);

        private _minQuadTreeNodeSize: Size2d;
        private _initialQuadTreeSize: Size2d;

        constructor(initialQuadTreeSize: Size2d) {
            this._initialQuadTreeSize = initialQuadTreeSize;
            this._minQuadTreeNodeSize = CollisionConfiguration._DefaultMinQuadTreeNodeSize;
            this._OnChange = new EventHandler();
        }

        public _OnChange: EventHandler;

        /**
        * Gets or sets the minimum quad tree node size.  For best performance this value should be equivalent to the smallest collidable object that will be monitored by the CollisionManager.  Changing this value re-creates the collision manager.  Values must represent a square.
        */
        public get MinQuadTreeNodeSize(): Size2d {
            return this._minQuadTreeNodeSize.Clone();
        }
        public set MinQuadTreeNodeSize(newSize: Size2d) {
            if (newSize.Width !== newSize.Height) {
                throw new Error("MinQuadTreeNodeSize must be a square.  Width and height must be identical.");
            }

            this._minQuadTreeNodeSize = newSize;
            this._OnChange.Trigger();
        }

        /**
        * Gets or sets the initial quad tree size.  The quad tree used for collision detection will dynamically grow in size if items drift outside of its boundaries.  If this property is set it will re-instantiate a new quad tree.  Values must be divisible by the MinQuadTreeNodeSize and must represent a square.
        */
        public get InitialQuadTreeSize(): Size2d {
            return this._initialQuadTreeSize;
        }
        public set InitialQuadTreeSize(newSize: Size2d) {
            if (newSize.Width !== newSize.Height) {
                throw new Error("InitialQuadTreeSize must be a square.  Width and height must be identical.");
            }
            else if (newSize.Width % this._minQuadTreeNodeSize.Width !== 0) {
                throw new Error("InitialQuadTreeSize must be divisible by the MinQuadTreeNodeSize.");
            }

            this._initialQuadTreeSize = newSize;
            this._OnChange.Trigger();
        }
    }

}