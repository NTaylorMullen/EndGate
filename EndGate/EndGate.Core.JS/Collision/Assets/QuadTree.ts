/// <reference path="../../Interfaces/IDisposable.ts" />
/// <reference path="../../Interfaces/IUpdateable.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../GameTime.ts" />
/// <reference path="../CollisionConfiguration.ts" />
/// <reference path="QuadTreeNode.ts" />

module EndGate.Collision.Assets._ {

    export interface ICollidableMap {
        Node: QuadTreeNode;
        Collidable: Collidable;
        StaticPosition: boolean;
    }

    export class QuadTree implements IDisposable, IUpdateable {
        private _disposed: boolean;
        private _minNodeSize: Size2d;
        private _root: QuadTreeNode;
        private _collidableMap: { [id: number]: ICollidableMap };
        private _updateableCollidableMap: { [id: number]: ICollidableMap };

        constructor(configuration: CollisionConfiguration) {
            this._disposed = false;
            this._minNodeSize = configuration.MinQuadTreeNodeSize;
            this._collidableMap = {};
            this._updateableCollidableMap = {};

            this._root = new QuadTreeNode(new Vector2d(configuration.InitialQuadTreeSize.HalfWidth, configuration.InitialQuadTreeSize.HalfHeight), configuration.InitialQuadTreeSize, configuration.MinQuadTreeNodeSize, null);
        }

        public Insert(obj: Collidable, staticPosition: boolean = false): void {
            if (!this._root.Bounds.Contains(obj.Bounds)) {
                this.Expand(obj);
            }

            this._collidableMap[obj._id] = {
                Node: this._root.Insert(obj),
                Collidable: obj,
                StaticPosition: staticPosition
            };

            if (!staticPosition) {
                this._updateableCollidableMap[obj._id] = this._collidableMap[obj._id];
            }
        }

        public Remove(obj: Collidable): void {
            var node = this._collidableMap[obj._id].Node;

            delete this._collidableMap[obj._id];
            delete this._updateableCollidableMap[obj._id];

            node.Remove(obj);
        }

        public CollisionCandidates(obj: Collidable): Array<Collidable> {
            var node: QuadTreeNode = this._collidableMap[obj._id].Node,
                results: Array<Collidable> = node.GetSubTreeContents();

            // Collect parent contents
            while (node.Parent !== null) {
                results = results.concat(node.Parent.Contents);

                node = node.Parent;
            }

            return results;
        }

        public Query(queryArea: Bounds.BoundingRectangle): Array<Collidable> {
            return this._root.Query(queryArea);
        }

        public Expand(cause: Collidable): void {
            var rootBounds: Bounds.BoundingRectangle = (<Bounds.BoundingRectangle>this._root.Bounds),
                topLeftDistance = rootBounds.TopLeft.Distance(cause.Bounds.Position).Length(),
                topRightDistance = rootBounds.TopRight.Distance(cause.Bounds.Position).Length(),
                botLeftDistance = rootBounds.BotLeft.Distance(cause.Bounds.Position).Length(),
                botRightDistance = rootBounds.BotRight.Distance(cause.Bounds.Position).Length(),
                closestCornerDistance = Math.min(topLeftDistance, topRightDistance, botLeftDistance, botRightDistance),
                newSize = rootBounds.Size.Multiply(2),
                newRoot: QuadTreeNode;

            if (closestCornerDistance === topLeftDistance) { // Current root will be bottom right of expanded quad tree because we need to expand to the top left
                newRoot = new QuadTreeNode(rootBounds.TopLeft, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.BotRightChild = this._root;
            }
            else if (closestCornerDistance === topRightDistance) { // Current root will be bottom left of expanded quad tree because we need to expand to the top right
                newRoot = new QuadTreeNode(rootBounds.TopRight, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.BotLeftChild = this._root;
            }
            else if (closestCornerDistance === botLeftDistance) { // Current root will be top right of expanded quad tree because we need to expand to the bottom left
                newRoot = new QuadTreeNode(rootBounds.BotLeft, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.TopRightChild = this._root;
            }
            else if (closestCornerDistance === botRightDistance) { // Current root will be top left of expanded quad tree because we need to expand to the bottom right
                newRoot = new QuadTreeNode(rootBounds.BotRight, newSize, this._minNodeSize, null);
                newRoot.Partition();
                newRoot.TopLeftChild = this._root;
            }

            this._root.Parent = newRoot;
            this._root = newRoot;
        }

        public Update(gameTime: GameTime): void {
            var node: QuadTreeNode, lookup: ICollidableMap, collidable: Collidable, newNode: QuadTreeNode;

            for (var id in this._updateableCollidableMap) {
                lookup = this._updateableCollidableMap[id];
                node = lookup.Node;
                collidable = lookup.Collidable;

                node.Remove(collidable);

                // If one of the collidables has drifted outside the root bounds, expand the quad tree
                if (!this._root.Bounds.Contains(collidable.Bounds)) {
                    this.Expand(collidable);
                    newNode = this._root.Insert(collidable);
                }
                else {
                    // Check if object has left the bounds of this node and is not root
                    if (!node.Bounds.Contains(collidable.Bounds) && node.Parent != null)
                    {
                        // We now belong to a parent
                        newNode = node.Parent.ReverseInsert(collidable);
                    }
                    else // We're within the same node, but could be in children, must insert
                    {
                        newNode = node.Insert(collidable);
                    }
                }

                // This will update the _collidableMap as well since its referencing the same object.
                this._updateableCollidableMap[id].Node = newNode;
            }
        }

        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
            }
            else {
                throw new Error("Cannot dispose collidable more than once.");
            }
        }
    }

}