var Player = (function () {
    function Player(keyboard, knight) {
        this._controller = new eg.InputControllers.DirectionalInputController(keyboard, function (direction, startMoving) {
            knight.MovementController.Move(direction, startMoving);
        });
    }
    return Player;
})();
//@ sourceMappingURL=Player.js.map
