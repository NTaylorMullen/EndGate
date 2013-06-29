var EndGate;
(function (EndGate) {
    /// <reference path="KeyboardCommand.ts" />
    /// <reference path="KeyboardCommandEvent.ts" />
    /// <reference path="../../Utilities/EventHandler1.ts" />
    (function (Input) {
        /**
        * Defines a handler that will check for keyboard commands and execute appropriate functions.
        */
        var KeyboardHandler = (function () {
            /**
            * Creates a new instance of the KeyboardHandler object.
            */
            function KeyboardHandler() {
                this._onPressCommands = ({});
                this._onDownCommands = ({});
                this._onUpCommands = ({});

                this._onKeyPress = new EndGate.EventHandler1();
                this._onKeyDown = new EndGate.EventHandler1();
                this._onKeyUp = new EndGate.EventHandler1();

                this.Wire();
            }
            Object.defineProperty(KeyboardHandler.prototype, "OnKeyPress", {
                get: /**
                * Gets an event that is triggered when any key press occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onKeyPress;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardHandler.prototype, "OnKeyDown", {
                get: /**
                *Gets an event that is triggered when any key goes down.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onKeyDown;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardHandler.prototype, "OnKeyUp", {
                get: /**
                * Gets an event that is triggered when any key comes up.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
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

            KeyboardHandler.prototype.UpdateCache = function (keyCommand, action, store) {
                var command = new Input.Assets.KeyboardCommand(keyCommand, action), commandId = KeyboardHandler._keyboardCommandIds++;

                command.OnDispose.Bind(function () {
                    delete store[commandId];
                });

                store[commandId] = command;

                return command;
            };

            KeyboardHandler.prototype.Wire = function () {
                document.addEventListener("keypress", this.BuildKeyEvent(this._onPressCommands, this.OnKeyPress), false);

                document.addEventListener("keydown", this.BuildKeyEvent(this._onDownCommands, this.OnKeyDown), false);

                document.addEventListener("keyup", this.BuildKeyEvent(this._onUpCommands, this.OnKeyUp), false);
            };

            KeyboardHandler.prototype.FocusingTextArea = function (ke) {
                var element;

                if (ke.target) {
                    element = ke.target;
                } else if (ke.srcElement) {
                    element = ke.srcElement;
                }

                if (element.nodeType === 3) {
                    element = element.parentNode;
                }

                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    return true;
                }

                return false;
            };

            KeyboardHandler.prototype.BuildKeyEvent = function (store, eventHandler) {
                var _this = this;
                return function (ke) {
                    var keyboardCommandEvent, propogate = true;

                    if (_this.FocusingTextArea(ke)) {
                        return;
                    }

                    keyboardCommandEvent = new Input.KeyboardCommandEvent(ke);

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
