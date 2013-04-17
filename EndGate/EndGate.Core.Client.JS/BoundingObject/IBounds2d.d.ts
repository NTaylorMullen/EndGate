/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference  path="BoundingRectangle.ts" />
/// <reference  path="BoundingCircle.ts" />

module EndGate.Core.BoundingObject {

    export interface IBounds2d {

        Position: Assets.Vector2d;
        Rotation: number;        

        ContainsPoint(point: Assets.Vector2d): bool;

        Intersects(obj: Bounds2d): bool;
        Intersects(circle: BoundingCircle): bool;
        Intersects(rectangle: BoundingRectangle): bool;
        Intersects(obj: any): bool;

        IntersectsCircle(circle: BoundingCircle): bool;

        IntersectsRectangle(rectangle: BoundingRectangle): bool;
    }

}