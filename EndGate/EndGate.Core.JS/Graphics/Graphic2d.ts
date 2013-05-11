/// <reference path="../Interfaces/ITyped.d.ts" />
/// <reference path="../Interfaces/IMoveable.d.ts" />
/// <reference path="../Rendering/IRenderable.d.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Bounds/Bounds2d.ts" />
/// <reference path="Graphic2dState.ts" />

module EndGate.Graphics.Abstractions {

    export class Graphic2d implements _.ITyped, Rendering.IRenderable, IMoveable {
        public _type: string = "Graphic2d";

        public ZIndex: number;
        public Position: Vector2d;
        public Rotation: number;
        public State: Assets.Graphic2dState;

        private static _zindexSort: (a: Graphic2d, b: Graphic2d) => number = (a: Graphic2d, b: Graphic2d) => { return a.ZIndex - b.ZIndex; };

        private _children: Graphic2d[];

        constructor(position: Vector2d) {
            this.Position = position;
            this.Rotation = 0;
            this.ZIndex = 0;
            this.State = new Assets.Graphic2dState();
            this._children = [];
        }

        public AddChild(graphic: Graphic2d): void {
            this._children.push(graphic);
            this._children.sort(Graphic2d._zindexSort);
        }

        public RemoveChild(graphic: Graphic2d): bool {
            var index = this._children.indexOf(graphic);

            if (index >= 0) {
                this._children.splice(index, 1);
                return true;
            }

            return false;
        }

        public Children(): Graphic2d[]{
            return this._children;
        }

        public StartDraw(context: CanvasRenderingContext2D): void {
            context.save();
            this.State.SetContextState(context);

            context.translate(this.Position.X, this.Position.Y);

            if (this.Rotation !== 0) {
                context.rotate(this.Rotation);
            }
        }

        public EndDraw(context: CanvasRenderingContext2D): void {
            for (var i = 0; i < this._children.length; i++) {
                this._children[i].Draw(context);
            }

            context.restore();
        }

        public Draw(context: CanvasRenderingContext2D): void {
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            throw new Error("GetDrawBounds is abstract, it must be implemented.");
        }
    }

}