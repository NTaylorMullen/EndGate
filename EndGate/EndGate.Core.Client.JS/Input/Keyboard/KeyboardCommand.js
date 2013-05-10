var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (Assets) {
            var KeyboardCommand = (function () {
                function KeyboardCommand(command, action) {
                    var _this = this;
                    this.Action = action;
                    this.Modifiers = Assets.KeyboardModifiers.BuildFromCommandString(command);
                    this.Key = Input._.KeyboardCommandHelper.ParseKey(command);
                    this.OnDispose = new EndGate.EventHandler();
                    this._onDisposeInvoker = new EndGate._.Utilities.NoopTripInvoker(function () {
                        _this.OnDispose.Trigger();
                    }, true);
                }
                KeyboardCommand.prototype.Dispose = function () {
                    this._onDisposeInvoker.InvokeOnce();
                };
                return KeyboardCommand;
            })();
            Assets.KeyboardCommand = KeyboardCommand;            
        })(Input.Assets || (Input.Assets = {}));
        var Assets = Input.Assets;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=KeyboardCommand.js.map
