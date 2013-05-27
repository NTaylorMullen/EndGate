/// <reference path="../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var KeyboardInput;
(function (KeyboardInput) {
    var KeyboardStatusUpdater = (function () {
        function KeyboardStatusUpdater(gameScene, keyboard) {
            this._fontSeperation = 30;
            this._fontSize = 20;
            this._fontAlignment = "left";
            var textOffset = 15;
            this._keyDownStatus = this.BuildKeyStatusViewer(gameScene, 0, textOffset);
            this._keyUpStatus = this.BuildKeyStatusViewer(gameScene, 0, textOffset += this._fontSeperation);
            this._keyPressStatus = this.BuildKeyStatusViewer(gameScene, 0, textOffset += this._fontSeperation);
            this.Wire(keyboard);
        }
        KeyboardStatusUpdater.prototype.BuildKeyStatusViewer = function (gameScene, xOffset, yOffset) {
            var keyStatus = new eg.Graphics.Text2d(xOffset, yOffset, "");
            // Apply default font settings
            keyStatus.FontSettings().FontSize(this._fontSize);
            keyStatus.Align(this._fontAlignment);
            // Add to game scene so the text is drawn
            gameScene.Add(keyStatus);
            return keyStatus;
        };
        KeyboardStatusUpdater.prototype.Wire = function (keyboard) {
            var _this = this;
            // This is used to textually show what modifiers are being pressed down
            var buildModifierAddition = function (kce) {
                var addition = "";
                if(kce.Modifiers.Ctrl) {
                    addition += "ctrl+";
                }
                if(kce.Modifiers.Alt) {
                    addition += "alt+";
                }
                if(kce.Modifiers.Shift) {
                    addition += "shift+";
                }
                return addition;
            };
            // Bind the key handling events so that when we hit keys on the keyboard it updates the status viewers accordingly
            keyboard.OnKeyDown.Bind(function (kce) {
                _this._keyDownStatus.Text("Down: " + buildModifierAddition(kce) + kce.Key);
            });
            keyboard.OnKeyUp.Bind(function (kce) {
                _this._keyUpStatus.Text("Up: " + buildModifierAddition(kce) + kce.Key);
            });
            keyboard.OnKeyPress.Bind(function (kce) {
                _this._keyPressStatus.Text("Press: " + buildModifierAddition(kce) + kce.Key);
            });
        };
        return KeyboardStatusUpdater;
    })();
    KeyboardInput.KeyboardStatusUpdater = KeyboardStatusUpdater;    
})(KeyboardInput || (KeyboardInput = {}));
//@ sourceMappingURL=KeyboardStatusUpdater.js.map
