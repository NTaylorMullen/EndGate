var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Input) {
            (function (Keyboard) {
                var KeyboardCommand = (function () {
                    function KeyboardCommand(command, action) {
                        var _this = this;
                        this.Action = action;
                        this.Modifiers = Keyboard.KeyboardModifiers.BuildFromCommandString(command);
                        this.Key = Keyboard.KeyboardCommandHelper.ParseKey(command);
                        this.OnDispose = new Core.Utilities.EventHandler();
                        this._onDisposeInvoker = new Core.Utilities.NoopTripInvoker(function () {
                            _this.OnDispose.Trigger();
                        }, true);
                    }
                    KeyboardCommand.prototype.Dispose = function () {
                        this._onDisposeInvoker.InvokeOnce();
                    };
                    return KeyboardCommand;
                })();
                Keyboard.KeyboardCommand = KeyboardCommand;                
            })(Input.Keyboard || (Input.Keyboard = {}));
            var Keyboard = Input.Keyboard;
        })(Core.Input || (Core.Input = {}));
        var Input = Core.Input;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=KeyboardCommand.js.map
