var CommandManager = (function () {
    function CommandManager(_keyboard, _commandHolder) {
        this._keyboard = _keyboard;
        this._commandHolder = _commandHolder;
        this._commandIds = 0;
        this._commandList = {
        };
    }
    CommandManager.prototype.Add = function (command, commandResult, action) {
        var keyboardCommand = this._keyboard.OnCommandUp(command, action);
        this._commandHolder.append("<option value='" + (this._commandIds) + "'>" + command + " : " + commandResult + "</option>");
        this._commandList[this._commandIds++] = keyboardCommand;
    };
    CommandManager.prototype.RemoveSelected = function () {
        var val = this._commandHolder.val();
        $('option:selected', this._commandHolder).remove();
        this._commandList[val].Dispose();
        delete this._commandList[val];
    };
    return CommandManager;
})();
//@ sourceMappingURL=CommandManager.js.map
