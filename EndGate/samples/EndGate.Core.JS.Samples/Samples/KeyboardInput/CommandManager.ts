/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.ts" />

class CommandManager {
    private _commandIds: number;
    private _commandList: { [id: number]: eg.Input.Assets.KeyboardCommand; };

    constructor(private _keyboard: eg.Input.KeyboardHandler, private _commandHolder: JQuery) {
        this._commandIds = 0;
        this._commandList = <any>{};
    }

    public Add(command: string, commandResult: string, action: Function): void {
        // Bind the command
        var keyboardCommand = this._keyboard.OnCommandUp(command, action);

        // Add the select option to the holder
        this._commandHolder.append("<option value='" + (this._commandIds) + "'>" + command + " : " + commandResult + "</option>");
        // Maintain the list of commands so it can be removed later
        this._commandList[this._commandIds++] = keyboardCommand;
    }

    public RemoveSelected(): void {
        var val = this._commandHolder.val();

        // Find the currently selected command option and remove it
        $('option:selected', this._commandHolder).remove();

        // We dispose the KeyboardCommand so that the command does not trigger
        this._commandList[val].Dispose();
        delete this._commandList[val];
    }
}