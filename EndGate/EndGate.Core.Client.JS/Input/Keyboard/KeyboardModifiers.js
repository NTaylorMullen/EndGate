var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Input) {
            (function (Keyboard) {
                var KeyboardModifiers = (function () {
                    function KeyboardModifiers(ctrl, alt, shift) {
                        this.Ctrl = ctrl;
                        this.Alt = alt;
                        this.Shift = shift;
                    }
                    KeyboardModifiers.prototype.Equivalent = function (modifier) {
                        return this.Ctrl === modifier.Ctrl && this.Alt === modifier.Alt && this.Shift === modifier.Shift;
                    };
                    KeyboardModifiers.BuildFromCommandString = function BuildFromCommandString(keyCommand) {
                        var ctrl = (keyCommand.toLowerCase().indexOf("ctrl+") >= 0) ? true : false, alt = (keyCommand.toLowerCase().indexOf("alt+") >= 0) ? true : false, shift = (keyCommand.toLowerCase().indexOf("shift+") >= 0) ? true : false;
                        return new KeyboardModifiers(ctrl, alt, shift);
                    };
                    return KeyboardModifiers;
                })();
                Keyboard.KeyboardModifiers = KeyboardModifiers;                
            })(Input.Keyboard || (Input.Keyboard = {}));
            var Keyboard = Input.Keyboard;
        })(Core.Input || (Core.Input = {}));
        var Input = Core.Input;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=KeyboardModifiers.js.map
