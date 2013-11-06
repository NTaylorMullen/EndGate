/// <reference path="KeyboardCommand.ts" />
/// <reference path="KeyboardCommandEvent.ts" />
/// <reference path="../../Interfaces/IDisposable.ts" />
/// <reference path="../../Utilities/EventHandler1.ts" />

module EndGate.Input {

    /**
    * Defines a handler that will check for keyboard commands and execute appropriate functions.
    */
    export class KeyboardHandler implements IDisposable {
        private static _keyboardCommandIds: number = 0;
        private _target: HTMLCanvasElement;
        private _onPressCommands: { [id: number]: Assets.KeyboardCommand; };
        private _onDownCommands: { [id: number]: Assets.KeyboardCommand; };
        private _onUpCommands: { [id: number]: Assets.KeyboardCommand; };

        private _onKeyPress: EventHandler1<KeyboardCommandEvent>;
        private _onKeyDown: EventHandler1<KeyboardCommandEvent>;
        private _onKeyUp: EventHandler1<KeyboardCommandEvent>;

        // For Disposing purposes
        private _keyDownWire: (ke: KeyboardEvent) => void;
        private _keyUpWire: (ke: KeyboardEvent) => void;
        private _keyPressWire: (ke: KeyboardEvent) => void;
        private _disposed: boolean;

        /**
        * Creates a new instance of the KeyboardHandler object.
        */
        constructor() {
            this._onPressCommands = (<any>{});
            this._onDownCommands = (<any>{});
            this._onUpCommands = (<any>{});

            this._onKeyPress = new EventHandler1<KeyboardCommandEvent>();
            this._onKeyDown = new EventHandler1<KeyboardCommandEvent>();
            this._onKeyUp = new EventHandler1<KeyboardCommandEvent>();

            this._disposed = false;

            this.Wire();
        }

        /**
        * Gets an event that is triggered when any key press occurs.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnKeyPress(): EventHandler1<KeyboardCommandEvent> {
            return this._onKeyPress;
        }

        /**
        *Gets an event that is triggered when any key goes down.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnKeyDown(): EventHandler1<KeyboardCommandEvent> {
            return this._onKeyDown;
        }

        /**
        * Gets an event that is triggered when any key comes up.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnKeyUp(): EventHandler1<KeyboardCommandEvent> {
            return this._onKeyUp;
        }

        /**
        * Binds function to be called when the keyCommand is pressed.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has been pressed.
        */
        public OnCommandPress(keyCommand: string, action: Function): Assets.KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onPressCommands);
        }

        /**
        * Binds function to be called when the keyCommand goes down.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand has is down.
        */
        public OnCommandDown(keyCommand: string, action: Function): Assets.KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onDownCommands);
        }

        /**
        * Binds function to be called when the keyCommand comes up.  To unbind the function, dispose of the returned KeyboardCommand.
        * @param keyCommand The command string required to execute the action.
        * @param action The action to execute when the keyCommand comes up.
        */
        public OnCommandUp(keyCommand: string, action: Function): Assets.KeyboardCommand {
            return this.UpdateCache(keyCommand, action, this._onUpCommands);
        }

        /**
        * Disposes the KeyboardHandler and unbinds all bound events.
        */
        public Dispose(): void {
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
            }
            else {
                throw new Error("KeyboardHandler cannot be disposed more than once");
            }
        }

        private UpdateCache(keyCommand: string, action: Function, store: { [id: number]: Assets.KeyboardCommand; }): Assets.KeyboardCommand {
            var command = new Assets.KeyboardCommand(keyCommand, action),
                commandId = KeyboardHandler._keyboardCommandIds++;

            command.OnDispose.Bind(() => {
                delete store[commandId];
            });

            store[commandId] = command;

            return command;
        }

        private Wire(): void {
            this._keyPressWire = this.BuildKeyEvent(this._onPressCommands, this.OnKeyPress);
            this._keyDownWire = this.BuildKeyEvent(this._onDownCommands, this.OnKeyDown);
            this._keyUpWire = this.BuildKeyEvent(this._onUpCommands, this.OnKeyUp);

            document.addEventListener("keypress", this._keyPressWire, false);

            document.addEventListener("keydown", this._keyDownWire, false);

            document.addEventListener("keyup", this._keyUpWire, false);
        }

        private Unwire(): void {
            document.removeEventListener("keypress", this._keyPressWire, false);
            document.removeEventListener("keydown", this._keyDownWire, false);
            document.removeEventListener("keyup", this._keyUpWire, false);
        }

        private BuildKeyEvent(store: { [id: number]: Assets.KeyboardCommand; }, eventHandler: EventHandler1<KeyboardCommandEvent>): (ke: KeyboardEvent) => void {
            return (ke: KeyboardEvent) => {
                var keyboardCommandEvent: KeyboardCommandEvent,
                    propogate: boolean = true;

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