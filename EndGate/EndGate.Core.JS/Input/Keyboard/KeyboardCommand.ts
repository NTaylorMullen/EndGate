/// <reference path="../../Interfaces/IDisposable.ts" />
/// <reference path="../../Utilities/EventHandler.ts" />
/// <reference path="../../Utilities/NoopTripInvoker.ts" />
/// <reference path="KeyboardCommandHelper.ts" />
/// <reference path="KeyboardModifiers.ts" />

module eg.Input.Assets {

    /**
    * Defines a class that is used to represent a keyboard command.
    */
    export class KeyboardCommand implements IDisposable {
        /**
        * Gets or sets the Key that is required to trigger the Action.
        */
        public Key: string;
        /**
        * Gets or sets the Action that is triggered when the KeyboardCommand has been successfully executed.
        */
        public Action: Function;
        /**
        * Gets or sets the Modifiers that are required to trigger the Action.
        */
        public Modifiers: Assets.KeyboardModifiers;

        private _onDisposeInvoker: eg._.Utilities.NoopTripInvoker;
        private _onDisposed: EventHandler;

        /**
        * Creates a new instance of the KeyboardCommand object.
        * @param command Initial command required to trigger the action function.
        * @param action Initial action to be triggered when the command is executed..
        */
        constructor(command: string, action: Function) {
            this.Action = action;
            this.Modifiers = Assets.KeyboardModifiers.BuildFromCommandString(command);
            this.Key = _.KeyboardCommandHelper.ParseKey(command);

            this._onDisposed = new EventHandler();
            this._onDisposeInvoker = new eg._.Utilities.NoopTripInvoker(() => {
                this._onDisposed.Trigger();
            }, true);
        }

        /**
        * Gets an event that is triggered when a KeyboardCommand has been disposed.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDispose(): EventHandler {
            return this._onDisposed;
        }

        /**
        * Triggers the OnDisposed event.  If this KeyboardCommand is used with a KeyboardHandler it will no longer trigger the Action function.
        */
        public Dispose(): void {
            this._onDisposeInvoker.InvokeOnce();
        }
    }

}