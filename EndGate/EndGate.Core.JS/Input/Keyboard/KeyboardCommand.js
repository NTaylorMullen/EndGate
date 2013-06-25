var eg;
(function (eg) {
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

                    this._onDisposed = new eg.EventHandler();
                    this._onDisposeInvoker = new eg._.Utilities.NoopTripInvoker(function () {
                        _this._onDisposed.Trigger();
                    }, true);
                }
                Object.defineProperty(KeyboardCommand.prototype, "OnDispose", {
                    get: /**
                    * Gets an event that is triggered when a KeyboardCommand has been disposed.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.  Functions can be bound or unbound to this event to be executed when the event triggers.
                    */
                    function () {
                        return this._onDisposed;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Triggers the OnDisposed event.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.
                */
                KeyboardCommand.prototype.Dispose = function () {
                    this._onDisposeInvoker.InvokeOnce();
                };
                return KeyboardCommand;
            })();
            Assets.KeyboardCommand = KeyboardCommand;
        })(Input.Assets || (Input.Assets = {}));
        var Assets = Input.Assets;
    })(eg.Input || (eg.Input = {}));
    var Input = eg.Input;
})(eg || (eg = {}));
