/// <reference path="../Collidable.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />

module EndGate.Collision.Assets._ {

    export class QuadTreeNode extends Collidable {
        public Contents: Array<Collidable>;
        public Parent: QuadTreeNode;

        private _minNodeSize: Size2d;
        private _children: Array<QuadTreeNode>;
        private _partitioned: boolean;

        constructor(position: Vector2d, size: Size2d, minNodeSize: Size2d, parent: QuadTreeNode) {
            super(new Bounds.BoundingRectangle(position, size));
            this._minNodeSize = minNodeSize;
            this._children = new Array<QuadTreeNode>();
            this.Contents = new Array<Collidable>();
            this.Parent = parent;
            this._partitioned = false;
        }

        public get Children(): Array<QuadTreeNode> {
            return this._children;
        }

        public get TopLeftChild(): QuadTreeNode {
            return this._children[0];
        }
        public set TopLeftChild(newChild: QuadTreeNode) {
            this._children[0] = newChild;
        }

        public get TopRightChild(): QuadTreeNode {
            return this._children[1];
        }
        public set TopRightChild(newChild: QuadTreeNode) {
            this._children[1] = newChild;
        }

        public get BotLeftChild(): QuadTreeNode {
            return this._children[2];
        }
        public set BotLeftChild(newChild: QuadTreeNode) {
            this._children[2] = newChild;
        }

        public get BotRightChild(): QuadTreeNode {
            return this._children[3];
        }
        public set BotRightChild(newChild: QuadTreeNode) {
            this._children[3] = newChild;
        }

        public IsPartitioned(): boolean {
            return this._partitioned;
        }

        public Partition(): void {
            var partitionedSize = new Size2d(Math.round((<Bounds.BoundingRectangle>this.Bounds).Size.Width * .5)),
                boundsPosition = this.Bounds.Position;

            this._partitioned = true;

            if (partitionedSize.Width < this._minNodeSize.Width)
            {
                return;
            }

            this._children.push(new QuadTreeNode(boundsPosition.Subtract(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
            this._children.push(new QuadTreeNode(new Vector2d(boundsPosition.X + partitionedSize.Width / 2, boundsPosition.Y - partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
            this._children.push(new QuadTreeNode(new Vector2d(boundsPosition.X - partitionedSize.Width / 2, boundsPosition.Y + partitionedSize.Height / 2), partitionedSize, this._minNodeSize, this));
            this._children.push(new QuadTreeNode(boundsPosition.Add(partitionedSize.Multiply(.5)), partitionedSize, this._minNodeSize, this));
        }

        public Insert(obj: Collidable): QuadTreeNode {
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
        }

        public ReverseInsert(obj: Collidable): QuadTreeNode {
            // Check if object has left the bounds of this node then go up another level
            if (!this.Bounds.Contains(obj.Bounds))
            {
                if (this.Parent != null)
                {
                    return this.Parent.ReverseInsert(obj);
                }
            }
            
            return this.Insert(obj);
        }

        public Query(queryArea: Bounds.BoundingRectangle): Array<Collidable> {
            var results = new Array<Collidable>(),
                child: QuadTreeNode;

            // Check if some of the items in this quadrant are partially contained within the query area
            for (var i = 0; i < this.Contents.length; i++) {
                if (queryArea.Intersects(this.Contents[i].Bounds)) {
                    results.push(this.Contents[i]);
                }
            }

            for (var i = 0; i < this._children.length; i++) {
                child = this._children[i];

                // If child fully contains the query area then we need to
                // drill down until we find all of the query items
                if (child.Bounds.Contains(queryArea))
                {
                    results = results.concat(child.Query(queryArea));
                    break;
                }
                
                // If the queryArea fully contains the node then everything
                // underneath it belongs to the query
                if (queryArea.Contains(child.Bounds))
                {
                    results = results.concat(child.GetSubTreeContents());
                    continue;
                }

                // If a sub-node intersects partially with the query then we
                // need to query its children to find valid nodes
                if (child.Bounds.Intersects(queryArea))
                {
                    results = results.concat(child.Query(queryArea));
                }
            }

            return results;
        }

        public Remove(obj: Collidable): void {
            var index = this.Contents.indexOf(obj);

            if (index >= 0) {
                this.Contents.splice(index, 1);
            }
        }

        public GetSubTreeContents(): Array<Collidable> {
            var results = new Array<Collidable>();

            for (var i = 0; i < this._children.length; i++) {
                results = results.concat(this._children[i].GetSubTreeContents());
            }

            results = results.concat(this.Contents);

            return results;
        }
    }

}