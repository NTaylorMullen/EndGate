/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />

module EndGate.Rendering {

    export class Camera2d extends Bounds.BoundingRectangle {
        public static DefaultDistance: number = 1000;
        public _type: string = "Camera2d";

        public Distance: number;

        constructor(position: Vector2d, size: Size2d) {
            super(position, size);

            this.Distance = Camera2d.DefaultDistance;
        }

        public GetDistanceScale(): number {
            return this.Distance / Camera2d.DefaultDistance;
        }

        public ToCameraRelative(position: Vector2d): Vector2d {
            var scaledTopLeft = this.Position.Subtract(this.Size.Multiply(this.GetDistanceScale()* .5));
            return scaledTopLeft.Add(position.Multiply(this.GetDistanceScale()));
        }

        public GetInverseDistanceScale(): number {
            return Camera2d.DefaultDistance / this.Distance;
        }
    }

}