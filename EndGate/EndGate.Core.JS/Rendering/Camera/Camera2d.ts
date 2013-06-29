/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />

module EndGate.Rendering {

    /**
    * Defines a camera that is used to define a viewport.  Should be used in conjunction with a Camera2dRenderer to render graphics as if being viewed through a camera.
    */
    export class Camera2d extends Bounds.BoundingRectangle {
        /**
        *  The distance in which the Camera2d will default to and the distance that defines the 100% scale value.
        */
        public static DefaultDistance: number = 1000;
        public _type: string = "Camera2d";

        /**
        * Gets or sets the camera distance.  This represents how far away the Camera is from the game canvas.  0 is directly on top of the canvas while DefaultDistance represents 100% scale.
        */
        public Distance: number;

        /**
        * Creates a new instance of the Camera2d object.
        * @param position Initial position of the camera.
        * @param size Initial size of the camera.
        */
        constructor(position: Vector2d, size: Size2d) {
            super(position, size);

            this.Distance = Camera2d.DefaultDistance;
        }        

        /**
        * Converts an absolute position (0 to cameras Size) to a camera relative position.  Most useful when used to convert mouse click coordinates to scene coordinates.
        * @param position The absolute position to convert.  0 position represents the top or left hand side of the camera.
        */
        public ToCameraRelative(position: Vector2d): Vector2d {
            var scaledTopLeft = this.Position.Subtract(this.Size.Multiply(this._GetDistanceScale()* .5));
            return scaledTopLeft.Add(position.Multiply(this._GetDistanceScale()));
        }

        public _GetInverseDistanceScale(): number {
            return Camera2d.DefaultDistance / this.Distance;
        }

        public _GetDistanceScale(): number {
            return this.Distance / Camera2d.DefaultDistance;
        }
    }

}