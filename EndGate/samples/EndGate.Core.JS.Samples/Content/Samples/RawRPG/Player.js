/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Knight.ts" />
// Wrap in module to keep code out of global scope
var RawRPG;
(function (RawRPG) {
    var Player = (function () {
        function Player(keyboard, knight) {
            // Use a DirectionalInputController to handle keyboard input
            // First parameter is the keyboard handler for the game and the second is the OnMove event
            // The OnMove event is triggered when the DirectionalInputController detects that the user
            // is trying to move in a given direction
            this._controller = new eg.InputControllers.DirectionalInputController(keyboard, function (direction, startMoving) {
                knight.MovementController.Move(direction, startMoving);
            });
        }
        return Player;
    })();
    RawRPG.Player = Player;
})(RawRPG || (RawRPG = {}));
//# sourceMappingURL=Player.js.map
