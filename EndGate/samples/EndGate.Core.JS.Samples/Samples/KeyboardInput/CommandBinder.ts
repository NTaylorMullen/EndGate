/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="CommandManager.ts" />

class CommandBinder {
    private _bindingTextViewer: eg.Graphics.Text2d;
    private _fontSize: number = 20;
    private _fontWeight: string = "bold";
    private _commandManager: CommandManager;

    constructor(keyboard: eg.Input.KeyboardHandler, bindPostion: eg.Vector2d, gameScene: eg.Rendering.Scene2d, bindButton: JQuery, unbindButton: JQuery, bindingCommandInput: JQuery, bindingResultInput: JQuery, commandHolder: JQuery) {
        this._bindingTextViewer = new eg.Graphics.Text2d(bindPostion.X, bindPostion.Y, "");
        this._bindingTextViewer.FontSettings.FontSize(this._fontSize);
        this._bindingTextViewer.FontSettings.FontWeight(this._fontWeight);
        gameScene.Add(this._bindingTextViewer);

        this._commandManager = new CommandManager(keyboard, commandHolder);
        this.Wire(bindButton, unbindButton, bindingCommandInput, bindingResultInput);
    }

    private Wire(bindButton: JQuery, unbindButton: JQuery, bindingCommandInput: JQuery, bindingResultInput: JQuery): void {
        var that = this;

        bindButton.click(() => {            
            var commandResult = bindingResultInput.val();

            this._commandManager.Add(bindingCommandInput.val(), commandResult, () => {
                that._bindingTextViewer.Text(commandResult);
            });

            bindingCommandInput.val("");
            bindingResultInput.val("");
        });

        unbindButton.click(() => {
            that._commandManager.RemoveSelected();
        });
    }
}