var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Input) {
            (function (Controllers) {
                var DirectionalInputController = (function () {
                    function DirectionalInputController(keyboard, onMove, upKeys, rightKeys, downKeys, leftKeys) {
                        if (typeof upKeys === "undefined") { upKeys = [
                            "w", 
                            "Up"
                        ]; }
                        if (typeof rightKeys === "undefined") { rightKeys = [
                            "d", 
                            "Right"
                        ]; }
                        if (typeof downKeys === "undefined") { downKeys = [
                            "s", 
                            "Down"
                        ]; }
                        if (typeof leftKeys === "undefined") { leftKeys = [
                            "a", 
                            "Left"
                        ]; }
                        this._keyboard = keyboard;
                        this._onMove = onMove;
                        this.BindKeys(upKeys, "OnCommandDown", "Up", true);
                        this.BindKeys(rightKeys, "OnCommandDown", "Right", true);
                        this.BindKeys(downKeys, "OnCommandDown", "Down", true);
                        this.BindKeys(leftKeys, "OnCommandDown", "Left", true);
                        this.BindKeys(upKeys, "OnCommandUp", "Up", false);
                        this.BindKeys(rightKeys, "OnCommandUp", "Right", false);
                        this.BindKeys(downKeys, "OnCommandUp", "Down", false);
                        this.BindKeys(leftKeys, "OnCommandUp", "Left", false);
                    }
                    DirectionalInputController.prototype.BindKeys = function (keyList, bindingAction, direction, startMoving) {
                        var _this = this;
                        for(var i = 0; i < keyList.length; i++) {
                            this._keyboard[bindingAction](keyList[i], function () {
                                _this._onMove(direction, startMoving);
                            });
                        }
                    };
                    return DirectionalInputController;
                })();
                Controllers.DirectionalInputController = DirectionalInputController;                
            })(Input.Controllers || (Input.Controllers = {}));
            var Controllers = Input.Controllers;
        })(Core.Input || (Core.Input = {}));
        var Input = Core.Input;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=DirectionalInputController.js.map
