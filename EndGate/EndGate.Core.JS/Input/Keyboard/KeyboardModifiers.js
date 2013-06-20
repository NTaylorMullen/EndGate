var eg;
(function (eg) {
    (function (Input) {
        /// <reference path="KeyboardCommand.ts" />
        (function (Assets) {
            /**
            * Defines an object that is used to represent a keyboard modifier state to determine if Ctrl, Alt, or Shift is being pressed.
            */
            var KeyboardModifiers = (function () {
                /**
                * Creates a new instance of the KeyboardModifiers object.
                * @param ctrl The initial value of the Ctrl component.
                * @param alt The initial value of the Alt component.
                * @param shift The initial value of the Shift component.
                */
                function KeyboardModifiers(ctrl, alt, shift) {
                    this.Ctrl = ctrl;
                    this.Alt = alt;
                    this.Shift = shift;
                }
                /**
                * Determines whether this KeyboardModifiers object has the same ctrl, alt, and shift states as the provided KeyboardModifiers.
                * @param modifier The KeyboardModifiers to compare the current modifiers to.
                */
                KeyboardModifiers.prototype.Equivalent = function (modifier) {
                    return this.Ctrl === modifier.Ctrl && this.Alt === modifier.Alt && this.Shift === modifier.Shift;
                };

                KeyboardModifiers.BuildFromCommandString = /**
                * Builds a KeyboardModifiers object to represent the state of an expected keyCommand
                * @param keyCommand The command to analyze.
                */
                function (keyCommand) {
                    var ctrl = (keyCommand.toLowerCase().indexOf("ctrl+") >= 0) ? true : false, alt = (keyCommand.toLowerCase().indexOf("alt+") >= 0) ? true : false, shift = (keyCommand.toLowerCase().indexOf("shift+") >= 0) ? true : false;

                    return new KeyboardModifiers(ctrl, alt, shift);
                };
                return KeyboardModifiers;
            })();
            Assets.KeyboardModifiers = KeyboardModifiers;
        })(Input.Assets || (Input.Assets = {}));
        var Assets = Input.Assets;
    })(eg.Input || (eg.Input = {}));
    var Input = eg.Input;
})(eg || (eg = {}));
