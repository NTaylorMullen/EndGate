/// <reference path="../Interfaces/ITyped.d.ts" />
/// <reference path="../Rendering/IRenderable.d.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../BoundingObject/IBounds2d.d.ts" />
/// <reference path="Graphic2dState.ts" />

module EndGate.Core.Graphics {

    export class Graphic2d implements ITyped, Rendering.IRenderable, BoundingObject.IBounds2d {
        public _type: string = "Graphic2d";

        public Position: Assets.Vector2d;
        public ZIndex: number;
        public Rotation: number;
        public State: Graphic2dState;

        constructor(bounds: BoundingObject.IBounds2d) {
            // This is the #1 hack of this library. Since currently TypeScript does not support
            // generics yet (0.9 hasn't been released yet) I need replace all of the IBounds2d
            // functions with ones that have been passed through.
            for (var property in bounds) {
                this[property] = bounds[property];
            }

            this.ZIndex = 0;
            this.State = new Graphic2dState();
        }

        public StartDraw(context: CanvasRenderingContext2D): void {
            context.save();
            this.State.SetContextState(context);

            if (this.Rotation !== 0) {
                context.translate(this.Position.X, this.Position.Y);
                context.rotate(this.Rotation);
                context.translate(-this.Position.X, -this.Position.Y);
            }
        }

        public EndDraw(context: CanvasRenderingContext2D): void {
            context.restore();
        }

        public Draw(context: CanvasRenderingContext2D): void {
        }

        // *****        These are all replaced within the constructor by the bounds2d that are passed down to this layer.       *****

        public ContainsPoint(point: Assets.Vector2d): bool {
            throw new Error("This method is abstract!");
        }

        public Intersects(obj: BoundingObject.Bounds2d): bool;
        public Intersects(circle: BoundingObject.BoundingCircle): bool;
        public Intersects(rectangle: BoundingObject.BoundingRectangle): bool;
        public Intersects(obj: any): bool {
            if (obj._type === "BoundingCircle") {
                return this.IntersectsCircle(obj);
            }
            else if (obj._type === "BoundingRectangle") {
                return this.IntersectsRectangle(obj);
            }
            else {
                throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle");
            }
        }

        public IntersectsCircle(circle: BoundingObject.BoundingCircle): bool {
            throw new Error("This method is abstract!");
        }

        public IntersectsRectangle(rectangle: BoundingObject.BoundingRectangle): bool {
            throw new Error("This method is abstract!");
        }

        // *****        These are all replaced within the constructor by the bounds2d that are passed down to this layer.       *****
    }

}