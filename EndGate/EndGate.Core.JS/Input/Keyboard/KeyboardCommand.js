var EndGate;
(function (EndGate) {
    (function (Input) {
        /// <reference path="../../Interfaces/IDisposable.ts" />
        /// <reference path="../../Utilities/EventHandler.ts" />
        /// <reference path="../../Utilities/NoopTripInvoker.ts" />
        /// <reference path="KeyboardCommandHelper.ts" />
        /// <reference path="KeyboardModifiers.ts" />
        (function (Assets) {
            /**
            * Defines a class that is used to represent a keyboard command.
            */
            var KeyboardCommand = (function () {
                /**
                * Creates a new instance of the KeyboardCommand object.
                * @param command Initial command required to trigger the action function.
                * @param action Initial action to be triggered when the command is executed..
                */
                function KeyboardCommand(command, action) {
                    var _this = this;
                    this.Action = action;
                    this.Modifiers = Input.Assets.KeyboardModifiers.BuildFromCommandString(command);
                    this.Key = Input._.KeyboardCommandHelper.ParseKey(command);
                    this.OnDispose = new EndGate.EventHandler();
                    this._onDisposeInvoker = new EndGate._.Utilities.NoopTripInvoker(function () {
                        _this.OnDispose.Trigger();
                    }, true);
                }
                KeyboardCommand.prototype.Dispose = /**
                * Triggers the OnDisposed event.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.
                */
                function () {
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
