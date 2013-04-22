var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Input) {
            (function (Keyboard) {
                var KeyboardHandler = (function () {
                    function KeyboardHandler() {
                        this._onPressCommands = ({
                        });
                        this._onDownCommands = ({
                        });
                        this._onUpCommands = ({
                        });
                        this.OnKeyPress = new Core.Utilities.EventHandler();
                        this.OnKeyDown = new Core.Utilities.EventHandler();
                        this.OnKeyUp = new Core.Utilities.EventHandler();
                        this.Wire();
                    }
                    KeyboardHandler._keyboardCommandIds = 0;
                    KeyboardHandler.prototype.OnCommandPress = function (keyCommand, action) {
                        return this.UpdateCache(keyCommand, action, this._onPressCommands);
                    };
                    KeyboardHandler.prototype.OnCommandDown = function (keyCommand, action) {
                        return this.UpdateCache(keyCommand, action, this._onDownCommands);
                    };
                    KeyboardHandler.prototype.OnCommandUp = function (keyCommand, action) {
                        return this.UpdateCache(keyCommand, action, this._onUpCommands);
                    };
                    KeyboardHandler.prototype.UpdateCache = function (keyCommand, action, store) {
                        var command = new Keyboard.KeyboardCommand(keyCommand, action), commandId = KeyboardHandler._keyboardCommandIds++;
                        command.OnDispose.Bind(function () {
                            delete store[commandId];
                        });
                        store[commandId] = command;
                        return command;
                    };
                    KeyboardHandler.prototype.Wire = function () {
                        document.onkeypress = this.BuildKeyEvent(this._onPressCommands, this.OnKeyPress);
                        document.onkeydown = this.BuildKeyEvent(this._onDownCommands, this.OnKeyDown);
                        document.onkeyup = this.BuildKeyEvent(this._onUpCommands, this.OnKeyUp);
                    };
                    KeyboardHandler.prototype.FocusingTextArea = function (ke) {
                        var element;
                        if(ke.target) {
                            element = ke.target;
                        } else if(ke.srcElement) {
                            element = ke.srcElement;
                        }
                        if(element.nodeType === 3) {
                            element = element.parentNode;
                        }
                        if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                            return true;
                        }
                        return false;
                    };
                    KeyboardHandler.prototype.BuildKeyEvent = function (store, eventHandler) {
                        var _this = this;
                        return function (ke) {
                            var keyboardCommandEvent, propogate = true;
                            if(_this.FocusingTextArea(ke)) {
                                return;
                            }
                            keyboardCommandEvent = new Keyboard.KeyboardCommandEvent(ke);
                            eventHandler.Trigger(keyboardCommandEvent);
                            for(var keyboardCommandId in store) {
                                if(keyboardCommandEvent.Matches(store[keyboardCommandId])) {
                                    store[keyboardCommandId].Action();
                                    ke.preventDefault();
                                    propogate = false;
                                }
                            }
                            return propogate;
                        };
                    };
                    return KeyboardHandler;
                })();
                Keyboard.KeyboardHandler = KeyboardHandler;                
            })(Input.Keyboard || (Input.Keyboard = {}));
            var Keyboard = Input.Keyboard;
        })(Core.Input || (Core.Input = {}));
        var Input = Core.Input;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=KeyboardHandler.js.map
