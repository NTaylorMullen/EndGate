/// <reference path="KeyboardCommand.ts" />
/// <reference path="KeyboardCommandEvent.ts" />
/// <reference path="../../Utilities/EventHandler.ts" />

module EndGate.Core.Input.Keyboard {

    export class KeyboardHandler {
        private static _keyboardCommandIds: number = 0;
        private _target: HTMLCanvasElement;
        private _onPressCommands: { [id: number]: KeyboardCommand; };
        private _onDownCommands: { [id: number]: KeyboardCommand; };
        private _onUpCommands: { [id: number]: KeyboardCommand; };

        constructor() {
            this._onPressCommands = (<any>{});
            this._onDownCommands = (<any>{});
            this._onUpCommands = (<any>{});

            this.OnKeyPress = new Utilities.EventHandler();
            this.OnKeyDown = new Utilities.EventHandler();
            this.OnKeyUp = new Utilities.EventHandler();

            this.Wire();
        }

        public OnKeyPress: Utilities.EventHandler;
        public OnKeyDown: Utilities.EventHandler;
        public OnKeyUp: Utilities.EventHandler;

        public OnCommandPress(keyCommand: string, action: Function): KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onPressCommands);
        }

        public OnCommandDown(keyCommand: string, action: Function): KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onDownCommands);
        }

        public OnCommandUp(keyCommand: string, action: Function): KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onUpCommands);
        }

        private UpdateCache(keyCommand: string, action: Function, store: { [id: number]: KeyboardCommand; }): KeyboardCommand {
            var command = new KeyboardCommand(keyCommand, action),
                commandId = KeyboardHandler._keyboardCommandIds++;

            command.OnDispose.Bind(() => {
                delete store[commandId];
            });

            store[commandId] = command;

            return command;
        }

        private Wire(): void {
            document.onkeypress = this.BuildKeyEvent(this._onPressCommands, this.OnKeyPress);

            document.onkeydown = this.BuildKeyEvent(this._onDownCommands, this.OnKeyDown);

            document.onkeyup = this.BuildKeyEvent(this._onUpCommands, this.OnKeyUp);
        }

        private FocusingTextArea(ke: KeyboardEvent): bool {
            var element;

            if (ke.target) {
                element = ke.target;
            }
            else if (ke.srcElement) {
                element = ke.srcElement;
            }

            if (element.nodeType === 3) {
                element = element.parentNode;
            }

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                return true;
            }

            return false;
        }

        private BuildKeyEvent(store: { [id: number]: KeyboardCommand; }, eventHandler: Utilities.EventHandler): (ke: KeyboardEvent) => void {
            return (ke: KeyboardEvent) => {
                var keyboardCommandEvent: KeyboardCommandEvent,
                    propogate: bool = true;

                //Don't enable shortcut keys in Input, Text area fields
                if (this.FocusingTextArea(ke)) {
                    return;
                }

                keyboardCommandEvent = new KeyboardCommandEvent(ke);

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
        }
    }

}