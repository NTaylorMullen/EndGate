var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Bounds/BoundingRectangle.ts" />
    (function (Rendering) {
        /**
        * Defines a camera that is used to define a viewport.  Should be used in conjunction with a Camera2dRenderer to render graphics as if being viewed through a camera.
        */
        var Camera2d = (function (_super) {
            __extends(Camera2d, _super);
            /**
            * Creates a new instance of the Camera2d object.
            * @param position Initial position of the camera.
            * @param size Initial size of the camera.
            */
            function Camera2d(position, size) {
                _super.call(this, position, size);
                this._type = "Camera2d";

                this.Distance = Camera2d.DefaultDistance;
            }
            /**
            * Converts an absolute position (0 to cameras Size) to a camera relative position.  Most useful when used to convert mouse click coordinates to scene coordinates.
            * @param position The absolute position to convert.  0 position represents the top or left hand side of the camera.
            */
            Camera2d.prototype.ToCameraRelative = function (position) {
                var scaledTopLeft = this.Position.Subtract(this.Size.Multiply(this._GetDistanceScale() * .5));
                return scaledTopLeft.Add(position.Multiply(this._GetDistanceScale()));
            };

            Camera2d.prototype._GetInverseDistanceScale = function () {
                return Camera2d.DefaultDistance / this.Distance;
            };

            Camera2d.prototype._GetDistanceScale = function () {
                return this.Distance / Camera2d.DefaultDistance;
            };
            Camera2d.DefaultDistance = 1000;
            return Camera2d;
        })(eg.Bounds.BoundingRectangle);
        Rendering.Camera2d = Camera2d;
    })(eg.Rendering || (eg.Rendering = {}));
    var Rendering = eg.Rendering;
})(eg || (eg = {}));
