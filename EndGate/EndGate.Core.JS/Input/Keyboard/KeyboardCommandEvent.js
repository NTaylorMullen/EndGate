/// <reference path="KeyboardModifiers.ts" />
/// <reference path="KeyboardCommand.ts" />
/// <reference path="KeyboardEventTarget.ts" />
var EndGate;
(function (EndGate) {
    (function (Input) {
        var shiftValues = {
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
        }, specialKeys = {
            "27": "esc",
            "9": "tab",
            "32": "space",
            "13": "return",
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
        var KeyboardCommandEvent = (function () {
            /**
            * Creates a new instance of the KeyboardCommandEvent object.
            * @param keyEvent The raw key event from the DOM.
            */
            function KeyboardCommandEvent(keyEvent) {
                var code, character;

                this.Modifiers = new EndGate.Input.Assets.KeyboardModifiers(keyEvent.ctrlKey, keyEvent.altKey, keyEvent.shiftKey);

                if (keyEvent.keyCode) {
                    code = keyEvent.keyCode;
                } else if (keyEvent.which) {
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
                this.Target = new EndGate.Input.KeyboardEventTarget(keyEvent.target);
            }
            /**
            * Determines if the KeyboardCommand matches the KeyboardCommandEvent
            * @param command The KeyboardCommand to check.
            */
            KeyboardCommandEvent.prototype.Matches = function (command) {
                return this.Key.toLowerCase() === command.Key.toLowerCase() && command.Modifiers.Equivalent(this.Modifiers);
            };
            return KeyboardCommandEvent;
        })();
        Input.KeyboardCommandEvent = KeyboardCommandEvent;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
