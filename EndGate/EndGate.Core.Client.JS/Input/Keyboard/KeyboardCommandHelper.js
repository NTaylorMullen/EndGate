var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Input) {
            (function (Keyboard) {
                var KeyboardCommandHelper = (function () {
                    function KeyboardCommandHelper() { }
                    KeyboardCommandHelper.ParseKey = function ParseKey(command) {
                        var arr = command.split("+");
                        if(arr.length > 1) {
                            return arr[arr.length - 1];
                        }
                        return arr[0];
                    };
                    return KeyboardCommandHelper;
                })();
                Keyboard.KeyboardCommandHelper = KeyboardCommandHelper;                
            })(Input.Keyboard || (Input.Keyboard = {}));
            var Keyboard = Input.Keyboard;
        })(Core.Input || (Core.Input = {}));
        var Input = Core.Input;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=KeyboardCommandHelper.js.map
