// Wrap in module to keep code out of global scope
var Camera;
(function (Camera) {
    var MovingDirection = (function () {
        function MovingDirection() {
            this.Up = false;
            this.Right = false;
            this.Down = false;
            this.Left = false;
            this.ZoomingIn = false;
            this.ZoomingOut = false;
        }
        return MovingDirection;
    })();
    Camera.MovingDirection = MovingDirection;
})(Camera || (Camera = {}));
//@ sourceMappingURL=MovingDirection.js.map
