var Player = (function () {
    function Player(keyboard, knight) {
        this._controller = new eg.InputControllers.DirectionalInputController(keyboard, function () {
            knight.MovementController.Move.apply(knight.MovementController, arguments);
        });
    }
    return Player;
})();
//@ sourceMappingURL=Player.js.map
