/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var KeyboardInput;
(function (KeyboardInput) {
    var CommandManager = (function () {
        function CommandManager(_keyboard, _commandHolder) {
            this._keyboard = _keyboard;
            this._commandHolder = _commandHolder;
            this._commandIds = 0;
            this._commandList = {};
        }
        CommandManager.prototype.Add = function (command, commandResult, action) {
            // Bind the command
            var keyboardCommand = this._keyboard.OnCommandUp(command, action);

            // Add the select option to the holder
            this._commandHolder.append("<option value='" + (this._commandIds) + "'>" + command + " : " + commandResult + "</option>");

            // Maintain the list of commands so it can be removed later
            this._commandList[this._commandIds++] = keyboardCommand;
        };

        CommandManager.prototype.RemoveSelected = function () {
            var val = this._commandHolder.val();

            // Find the currently selected command option and remove it
            $('option:selected', this._commandHolder).remove();

            // We dispose the KeyboardCommand so that the command does not trigger
            this._commandList[val].Dispose();
            delete this._commandList[val];
        };
        return CommandManager;
    })();
    KeyboardInput.CommandManager = CommandManager;
})(KeyboardInput || (KeyboardInput = {}));
//@ sourceMappingURL=CommandManager.js.map
