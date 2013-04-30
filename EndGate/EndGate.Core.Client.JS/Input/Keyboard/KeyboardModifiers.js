var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (Assets) {
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
            Assets.KeyboardModifiers = KeyboardModifiers;            
        })(Input.Assets || (Input.Assets = {}));
        var Assets = Input.Assets;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=KeyboardModifiers.js.map
