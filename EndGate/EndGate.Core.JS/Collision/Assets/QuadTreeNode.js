/// <reference path="../Collidable.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Collision) {
        (function (Assets) {
            (function (_) {
                var QuadTreeNode = (function (_super) {
                    __extends(QuadTreeNode, _super);
                    function QuadTreeNode(position, size, minNodeSize, parent) {
                        _super.call(this, new EndGate.Bounds.BoundingRectangle(position, size));
                        this._minNodeSize = minNodeSize;
                        this._children = new Array();
                        this.Contents = new Array();
                        this.Parent = parent;
                        this._partitioned = false;
                    }
                    Object.defineProperty(QuadTreeNode.prototype, "Children", {
                        get: function () {
                            return this._children;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(QuadTreeNode.prototype, "TopLeftChild", {
                        get: function () {
                            return this._children[0];
                        },
                        set: function (newChild) {
                            this._children[0] = newChild;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(QuadTreeNode.prototype, "TopRightChild", {
                        get: function () {
                            return this._children[1];
                        },
                        set: function (newChild) {
                            this._children[1] = newChild;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(QuadTreeNode.prototype, "BotLeftChild", {
                        get: function () {
                            return this._children[2];
                        },
                        set: function (newChild) {
                            this._children[2] = newChild;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(QuadTreeNode.prototype, "BotRightChild", {
                        get: function () {
                            return this._children[3];
                        },
                        set: function (newChild) {
                            this._children[3] = newChild;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    QuadTreeNode.prototype.IsPartitioned = function () {
                        return this._partitioned;
                    };

                    QuadTreeNode.prototype.Partition = function () {
                        var partitionedSize = new EndGate.Size2d(Math.round(this.Bounds.Size.Width * .5)), boundsPosition = this.Bounds.Position;

                        this._partitioned = true;

                        if (partitionedSize.Width < this._minNodeSize.Width) {
                            return;
                        }

                        this._children.push(new QuadTreeNode(boundsPosition.Subtract(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
                        this._children.push(new QuadTreeNode(new EndGate.Vector2d(boundsPosition.X + partitionedSize.Width / 2, boundsPosition.Y - partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
                        this._children.push(new QuadTreeNode(new EndGate.Vector2d(boundsPosition.X - partitionedSize.Width / 2, boundsPosition.Y + partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
                        this._children.push(new QuadTreeNode(boundsPosition.Add(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
                    };

                    QuadTreeNode.prototype.Insert = function (obj) {
                        if (!this._partitioned) {
                            this.Partition();
                        }

                        for (var i = 0; i < this._children.length; i++) {
                            if (this._children[i].Bounds.Contains(obj.Bounds)) {
                                return this._children[i].Insert(obj);
                            }
                        }

                        this.Contents.push(obj);

                        return this;
                    };

                    QuadTreeNode.prototype.ReverseInsert = function (obj) {
                        // Check if object has left the bounds of this node then go up another level
                        if (!this.Bounds.Contains(obj.Bounds)) {
                            if (this.Parent != null) {
                                return this.Parent.ReverseInsert(obj);
                            }
                        }

                        return this.Insert(obj);
                    };

                    QuadTreeNode.prototype.Query = function (queryArea) {
                        var results = new Array(), child;

                        for (var i = 0; i < this.Contents.length; i++) {
                            if (queryArea.Intersects(this.Contents[i].Bounds)) {
                                results.push(this.Contents[i]);
                            }
                        }

                        for (var i = 0; i < this._children.length; i++) {
                            child = this._children[i];

                            // If child fully contains the query area then we need to
                            // drill down until we find all of the query items
                            if (child.Bounds.Contains(queryArea)) {
                                results = results.concat(child.Query(queryArea));
                                break;
                            }

                            // If the queryArea fully contains the node then everything
                            // underneath it belongs to the query
                            if (queryArea.Contains(child.Bounds)) {
                                results = results.concat(child.GetSubTreeContents());
                                continue;
                            }

                            // If a sub-node intersects partially with the query then we
                            // need to query its children to find valid nodes
                            if (child.Bounds.Intersects(queryArea)) {
                                results = results.concat(child.Query(queryArea));
                            }
                        }

                        return results;
                    };

                    QuadTreeNode.prototype.Remove = function (obj) {
                        var index = this.Contents.indexOf(obj);

                        if (index >= 0) {
                            this.Contents.splice(index, 1);
                        }
                    };

                    QuadTreeNode.prototype.GetSubTreeContents = function () {
                        var results = new Array();

                        for (var i = 0; i < this._children.length; i++) {
                            results = results.concat(this._children[i].GetSubTreeContents());
                        }

                        results = results.concat(this.Contents);

                        return results;
                    };
                    return QuadTreeNode;
                })(EndGate.Collision.Collidable);
                _.QuadTreeNode = QuadTreeNode;
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Collision.Assets || (Collision.Assets = {}));
        var Assets = Collision.Assets;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));
