/// <reference path="KeyboardCommand.ts" />
/// <reference path="KeyboardCommandEvent.ts" />
/// <reference path="../../Interfaces/IDisposable.ts" />
/// <reference path="../../Utilities/EventHandler1.ts" />
var EndGate;
(function (EndGate) {
    (function (Input) {
        /**
        * Defines a handler that will check for keyboard commands and execute appropriate functions.
        */
        var KeyboardHandler = (function () {
            /**
            * Creates a new instance of the KeyboardHandler object.
            */
            function KeyboardHandler() {
                this._onPressCommands = {};
                this._onDownCommands = {};
                this._onUpCommands = {};

                this._onKeyPress = new EndGate.EventHandler1();
                this._onKeyDown = new EndGate.EventHandler1();
                this._onKeyUp = new EndGate.EventHandler1();

                this._disposed = false;

                this.Wire();
            }
            Object.defineProperty(KeyboardHandler.prototype, "OnKeyPress", {
                /**
                * Gets an event that is triggered when any key press occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                get: function () {
                    return this._onKeyPress;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardHandler.prototype, "OnKeyDown", {
                /**
                *Gets an event that is triggered when any key goes down.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                get: function () {
                    return this._onKeyDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardHandler.prototype, "OnKeyUp", {
                /**
                * Gets an event that is triggered when any key comes up.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                get: function () {
                    return this._onKeyUp;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Binds function to be called when the keyCommand is pressed.  To unbind the function, dispose of the returned KeyboardCommand.
            * @param keyCommand The command string required to execute the action.
            * @param action The action to execute when the keyCommand has been pressed.
            */
            KeyboardHandler.prototype.OnCommandPress = function (keyCommand, action) {
                return this.UpdateCache(keyCommand, action, this._onPressCommands);
            };

            /**
            * Binds function to be called when the keyCommand goes down.  To unbind the function, dispose of the returned KeyboardCommand.
            * @param keyCommand The command string required to execute the action.
            * @param action The action to execute when the keyCommand has is down.
            */
            KeyboardHandler.prototype.OnCommandDown = function (keyCommand, action) {
                return this.UpdateCache(keyCommand, action, this._onDownCommands);
            };

            /**
            * Binds function to be called when the keyCommand comes up.  To unbind the function, dispose of the returned KeyboardCommand.
            * @param keyCommand The command string required to execute the action.
            * @param action The action to execute when the keyCommand comes up.
            */
            KeyboardHandler.prototype.OnCommandUp = function (keyCommand, action) {
                return this.UpdateCache(keyCommand, action, this._onUpCommands);
            };

            /**
            * Disposes the KeyboardHandler and unbinds all bound events.
            */
            KeyboardHandler.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    this._onKeyDown.Dispose();
                    this._onKeyPress.Dispose();
                    this._onKeyUp.Dispose();

                    for (var command in this._onDownCommands) {
                        this._onDownCommands[command].Dispose();
                    }

                    this._onDownCommands = null;

                    for (var command in this._onUpCommands) {
                        this._onUpCommands[command].Dispose();
                    }

                    this._onUpCommands = null;

                    for (var command in this._onPressCommands) {
                        this._onPressCommands[command].Dispose();
                    }

                    this._onPressCommands = null;

                    this.Unwire();
                } else {
                    throw new Error("KeyboardHandler cannot be disposed more than once");
                }
            };

            KeyboardHandler.prototype.UpdateCache = function (keyCommand, action, store) {
                var command = new EndGate.Input.Assets.KeyboardCommand(keyCommand, action), commandId = KeyboardHandler._keyboardCommandIds++;

                command.OnDispose.Bind(function () {
                    delete store[commandId];
                });

                store[commandId] = command;

                return command;
            };

            KeyboardHandler.prototype.Wire = function () {
                this._keyPressWire = this.BuildKeyEvent(this._onPressCommands, this.OnKeyPress);
                this._keyDownWire = this.BuildKeyEvent(this._onDownCommands, this.OnKeyDown);
                this._keyUpWire = this.BuildKeyEvent(this._onUpCommands, this.OnKeyUp);

                document.addEventListener("keypress", this._keyPressWire, false);

                document.addEventListener("keydown", this._keyDownWire, false);

                document.addEventListener("keyup", this._keyUpWire, false);
            };

            KeyboardHandler.prototype.Unwire = function () {
                document.removeEventListener("keypress", this._keyPressWire, false);
                document.removeEventListener("keydown", this._keyDownWire, false);
                document.removeEventListener("keyup", this._keyUpWire, false);
            };

            KeyboardHandler.prototype.BuildKeyEvent = function (store, eventHandler) {
                return function (ke) {
                    var keyboardCommandEvent, propogate = true;

                    keyboardCommandEvent = new EndGate.Input.KeyboardCommandEvent(ke);

                    eventHandler.Trigger(keyboardCommandEvent);

                    for (var keyboardCommandId in store) {
                        if (keyboardCommandEvent.Matches(store[keyboardCommandId])) {
                            store[keyboardCommandId].Action();
                            ke.preventDefault();
                            propogate = false;
                        }
                    }

                    return propogate;
                };
            };
            KeyboardHandler._keyboardCommandIds = 0;
            return KeyboardHandler;
        })();
        Input.KeyboardHandler = KeyboardHandler;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
