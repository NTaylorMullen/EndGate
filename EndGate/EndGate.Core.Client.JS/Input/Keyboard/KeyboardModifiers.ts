/// <reference path="KeyboardCommand.ts" />

module EndGate.Core.Input.Keyboard {

    export class KeyboardModifiers {
        public Ctrl: bool;
        public Alt: bool;
        public Shift: bool;

        constructor(ctrl: bool, alt: bool, shift: bool) {
            this.Ctrl = ctrl;
            this.Alt = alt;
            this.Shift = shift;
        }

        public Equivalent(modifier: KeyboardModifiers): bool {
            return this.Ctrl === modifier.Ctrl && this.Alt === modifier.Alt && this.Shift === modifier.Shift;
        }

        public static BuildFromCommandString(keyCommand: string): KeyboardModifiers {
            var ctrl = (keyCommand.toLowerCase().indexOf("ctrl+") >= 0) ? true : false,
                alt = (keyCommand.toLowerCase().indexOf("alt+") >= 0) ? true : false,
                shift = (keyCommand.toLowerCase().indexOf("shift+") >= 0) ? true : false;

            return new KeyboardModifiers(ctrl, alt, shift);
        }
    }

}