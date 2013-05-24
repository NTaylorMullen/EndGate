/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.d.ts" />
/// <reference path="CommandManager.ts" />
// Wrap in module to keep code out of global scope
var KeyboardInput;
(function (KeyboardInput) {
    var CommandBinder = (function () {
        function CommandBinder(keyboard, bindPostion, gameScene, bindButton, unbindButton, bindingCommandInput, bindingResultInput, commandHolder) {
            this._fontSize = 20;
            this._fontWeight = "bold";
            this._bindingTextViewer = new eg.Graphics.Text2d(bindPostion.X, bindPostion.Y, "");
            this._bindingTextViewer.FontSettings.FontSize(this._fontSize);
            this._bindingTextViewer.FontSettings.FontWeight(this._fontWeight);
            gameScene.Add(this._bindingTextViewer);
            this._commandManager = new KeyboardInput.CommandManager(keyboard, commandHolder);
            this.Wire(bindButton, unbindButton, bindingCommandInput, bindingResultInput);
        }
        CommandBinder.prototype.Wire = function (bindButton, unbindButton, bindingCommandInput, bindingResultInput) {
            var _this = this;
            var that = this;
            bindButton.click(function () {
                var commandResult = bindingResultInput.val();
                _this._commandManager.Add(bindingCommandInput.val(), commandResult, function () {
                    that._bindingTextViewer.Text(commandResult);
                });
                bindingCommandInput.val("");
                bindingResultInput.val("");
            });
            unbindButton.click(function () {
                that._commandManager.RemoveSelected();
            });
        };
        return CommandBinder;
    })();
    KeyboardInput.CommandBinder = CommandBinder;    
})(KeyboardInput || (KeyboardInput = {}));
//@ sourceMappingURL=CommandBinder.js.map
