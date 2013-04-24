/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../BoundingObject/BoundingRectangle.ts" />

module EndGate.Core.Rendering.Camera {

    export class Camera2d extends BoundingObject.BoundingRectangle {
        public static DefaultDistance: number = 1000;
        public _type: string = "Camera2d";

        public Distance: number;

        constructor(position: Assets.Vector2d, size: Assets.Size2d) {
            super(position, size);

            this.Distance = Camera2d.DefaultDistance;
        }

        public GetDistanceScale(): number{
            return this.Distance / Camera2d.DefaultDistance;
        }

        public GetInverseDistanceScale(): number {
            return Camera2d.DefaultDistance / this.Distance;
        }
    }

}