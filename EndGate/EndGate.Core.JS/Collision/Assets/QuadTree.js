/// <reference path="../../Interfaces/IDisposable.ts" />
/// <reference path="../../Interfaces/IUpdateable.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../GameTime.ts" />
/// <reference path="../CollisionConfiguration.ts" />
/// <reference path="QuadTreeNode.ts" />
var EndGate;
(function (EndGate) {
    (function (Collision) {
        (function (Assets) {
            (function (_) {
                var QuadTree = (function () {
                    function QuadTree(configuration) {
                        this._disposed = false;
                        this._minNodeSize = configuration.MinQuadTreeNodeSize;
                        this._collidableMap = {};
                        this._updateableCollidableMap = {};

                        this._root = new EndGate.Collision.Assets._.QuadTreeNode(new EndGate.Vector2d(configuration.InitialQuadTreeSize.HalfWidth, configuration.InitialQuadTreeSize.HalfHeight), configuration.InitialQuadTreeSize, configuration.MinQuadTreeNodeSize, null);
                    }
                    QuadTree.prototype.Insert = function (obj, staticPosition) {
                        if (typeof staticPosition === "undefined") { staticPosition = false; }
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
                    };

                    QuadTree.prototype.Remove = function (obj) {
                        var node = this._collidableMap[obj._id].Node;

                        delete this._collidableMap[obj._id];
                        delete this._updateableCollidableMap[obj._id];

                        node.Remove(obj);
                    };

                    QuadTree.prototype.CollisionCandidates = function (obj) {
                        var node = this._collidableMap[obj._id].Node, results = node.GetSubTreeContents();

                        while (node.Parent !== null) {
                            results = results.concat(node.Parent.Contents);

                            node = node.Parent;
                        }

                        return results;
                    };

                    QuadTree.prototype.Query = function (queryArea) {
                        return this._root.Query(queryArea);
                    };

                    QuadTree.prototype.Expand = function (cause) {
                        var rootBounds = this._root.Bounds, topLeftDistance = rootBounds.TopLeft.Distance(cause.Bounds.Position).Length(), topRightDistance = rootBounds.TopRight.Distance(cause.Bounds.Position).Length(), botLeftDistance = rootBounds.BotLeft.Distance(cause.Bounds.Position).Length(), botRightDistance = rootBounds.BotRight.Distance(cause.Bounds.Position).Length(), closestCornerDistance = Math.min(topLeftDistance, topRightDistance, botLeftDistance, botRightDistance), newSize = rootBounds.Size.Multiply(2), newRoot;

                        if (closestCornerDistance === topLeftDistance) {
                            newRoot = new EndGate.Collision.Assets._.QuadTreeNode(rootBounds.TopLeft, newSize, this._minNodeSize, null);
                            newRoot.Partition();
                            newRoot.BotRightChild = this._root;
                        } else if (closestCornerDistance === topRightDistance) {
                            newRoot = new EndGate.Collision.Assets._.QuadTreeNode(rootBounds.TopRight, newSize, this._minNodeSize, null);
                            newRoot.Partition();
                            newRoot.BotLeftChild = this._root;
                        } else if (closestCornerDistance === botLeftDistance) {
                            newRoot = new EndGate.Collision.Assets._.QuadTreeNode(rootBounds.BotLeft, newSize, this._minNodeSize, null);
                            newRoot.Partition();
                            newRoot.TopRightChild = this._root;
                        } else if (closestCornerDistance === botRightDistance) {
                            newRoot = new EndGate.Collision.Assets._.QuadTreeNode(rootBounds.BotRight, newSize, this._minNodeSize, null);
                            newRoot.Partition();
                            newRoot.TopLeftChild = this._root;
                        }

                        this._root.Parent = newRoot;
                        this._root = newRoot;
                    };

                    QuadTree.prototype.Update = function (gameTime) {
                        var node, lookup, collidable, newNode;

                        for (var id in this._updateableCollidableMap) {
                            lookup = this._updateableCollidableMap[id];
                            node = lookup.Node;
                            collidable = lookup.Collidable;

                            node.Remove(collidable);

                            // If one of the collidables has drifted outside the root bounds, expand the quad tree
                            if (!this._root.Bounds.Contains(collidable.Bounds)) {
                                this.Expand(collidable);
                                newNode = this._root.Insert(collidable);
                            } else {
                                // Check if object has left the bounds of this node and is not root
                                if (!node.Bounds.Contains(collidable.Bounds) && node.Parent != null) {
                                    // We now belong to a parent
                                    newNode = node.Parent.ReverseInsert(collidable);
                                } else {
                                    newNode = node.Insert(collidable);
                                }
                            }

                            // This will update the _collidableMap as well since its referencing the same object.
                            this._updateableCollidableMap[id].Node = newNode;
                        }
                    };

                    QuadTree.prototype.Dispose = function () {
                        if (!this._disposed) {
                            this._disposed = true;
                        } else {
                            throw new Error("Cannot dispose collidable more than once.");
                        }
                    };
                    return QuadTree;
                })();
                _.QuadTree = QuadTree;
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Collision.Assets || (Collision.Assets = {}));
        var Assets = Collision.Assets;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));
