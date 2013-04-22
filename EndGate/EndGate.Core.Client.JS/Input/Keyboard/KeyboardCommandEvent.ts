/// <reference path="KeyboardModifiers.ts" />
/// <reference path="KeyboardCommand.ts" />

module EndGate.Core.Input.Keyboard {
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

    export class KeyboardCommandEvent {
        public Key: string;
        public Modifiers: KeyboardModifiers;

        constructor(keyEvent: KeyboardEvent) {
            var code,
                character;

            this.Modifiers = new KeyboardModifiers(keyEvent.ctrlKey, keyEvent.altKey, keyEvent.shiftKey);

            if (keyEvent.keyCode) {
                code = keyEvent.keyCode;
            }
            else if (keyEvent.which) {
                code = keyEvent.which;
            }

            if (!(character = specialKeys[code])) {
                character = String.fromCharCode(code).toLowerCase();

                if (this.Modifiers.Shift && shiftValues[character]) {
                    character = shiftValues[character];
                }
            }

            this.Key = character;
        }

        public Matches(command: KeyboardCommand): bool {
            return this.Key.toLowerCase() === command.Key.toLowerCase() && command.Modifiers.Equivalent(this.Modifiers);
        }
    }

}