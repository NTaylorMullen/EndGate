/// <reference path="KeyboardModifiers.ts" />
/// <reference path="KeyboardCommand.ts" />

module EndGate.Input {
    var shiftValues: { [unmodified: string]: string; } = {
        "~": "`",
        "!": "1",
        "@": "2",
        "#": "3",
        "$": "4",
        "%": "5",
        "^": "6",
        "&": "7",
        "*": "8",
        "(": "9",
        ")": "0",
        "_": "-",
        "+": "=",
        ":": ";",
        "\"": "'",
        "<": ",",
        ">": ".",
        "?": "/",
        "|": "\\"
    },
        specialKeys: { [name: string]: string; } = {
            "27": "esc",
            "27": "escape",
            "9": "tab",
            "32": "space",
            "13": "return",
            "13": "enter",
            "8": "backspace",
            "45": "insert",
            "36": "home",
            "46": "delete",
            "35": "end",
            "37": "left",
            "38": "up",
            "39": "right",
            "40": "down",
            "112": "f1",
            "113": "f2",
            "114": "f3",
            "115": "f4",
            "116": "f5",
            "117": "f6",
            "118": "f7",
            "119": "f8",
            "120": "f9",
            "121": "f10",
            "122": "f11",
            "123": "f12"
        };

    /**
    * Defines a KeyboardCommandEvent object that represents when a command has been attempted.
    */
    export class KeyboardCommandEvent {
        /**
        * The key that was hit.
        */
        public Key: string;
        /**
        * The modifier status.
        */
        public Modifiers: Assets.KeyboardModifiers;

        /**
        * Creates a new instance of the KeyboardCommandEvent object.
        * @param keyEvent The raw key event from the DOM.
        */
        constructor(keyEvent: KeyboardEvent) {
            var code,
                character;

            this.Modifiers = new Assets.KeyboardModifiers(keyEvent.ctrlKey, keyEvent.altKey, keyEvent.shiftKey);

            if (keyEvent.keyCode) {
                code = keyEvent.keyCode;
            }
            else if (keyEvent.which) {
                code = keyEvent.which;
            }

            if (!((character = String.fromCharCode(keyEvent.keyCode)) === keyEvent.key)) {
                if (!(character = specialKeys[code])) {
                    character = String.fromCharCode(code).toLowerCase();

                    if (this.Modifiers.Shift && shiftValues[character]) {
                        character = shiftValues[character];
                    }
                }
            }

            this.Key = character;
        }

        /**
        * Determines if the KeyboardCommand matches the KeyboardCommandEvent
        * @command The KeyboardCommand to check.
        */
        public Matches(command: Assets.KeyboardCommand): bool {
            return this.Key.toLowerCase() === command.Key.toLowerCase() && command.Modifiers.Equivalent(this.Modifiers);
        }
    }

}