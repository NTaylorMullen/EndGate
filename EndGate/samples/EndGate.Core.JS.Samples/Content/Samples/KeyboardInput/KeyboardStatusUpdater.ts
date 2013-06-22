/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module KeyboardInput {

    export class KeyboardStatusUpdater {
        private _fontSeperation: number = 30;
        private _fontSize: number = 20;
        private _fontAlignment: string = "left";
        private _keyDownStatus: eg.Graphics.Text2d;
        private _keyUpStatus: eg.Graphics.Text2d;
        private _keyPressStatus: eg.Graphics.Text2d;

        constructor(gameScene: eg.Rendering.Scene2d, keyboard: eg.Input.KeyboardHandler) {
            var textOffset = 15;

            this._keyDownStatus = this.BuildKeyStatusViewer(gameScene, 0, textOffset);
            this._keyUpStatus = this.BuildKeyStatusViewer(gameScene, 0, textOffset += this._fontSeperation);
            this._keyPressStatus = this.BuildKeyStatusViewer(gameScene, 0, textOffset += this._fontSeperation);

            this.Wire(keyboard);
        }

        private BuildKeyStatusViewer(gameScene: eg.Rendering.Scene2d, xOffset: number, yOffset: number): eg.Graphics.Text2d {
            var keyStatus = new eg.Graphics.Text2d(xOffset, yOffset, "");

            // Apply default font settings
            keyStatus.FontSettings.FontSize = this._fontSize + "pt";
            keyStatus.Align = this._fontAlignment;

            // Add to game scene so the text is drawn
            gameScene.Add(keyStatus);

            return keyStatus;
        }

        private Wire(keyboard: eg.Input.KeyboardHandler): void {
            // This is used to textually show what modifiers are being pressed down
            var buildModifierAddition = (kce: eg.Input.KeyboardCommandEvent): string => {
                var addition = "";

                if (kce.Modifiers.Ctrl) {
                    addition += "ctrl+";
                }
                if (kce.Modifiers.Alt) {
                    addition += "alt+";
                }
                if (kce.Modifiers.Shift) {
                    addition += "shift+";
                }

                return addition;
            };

            // Bind the key handling events so that when we hit keys on the keyboard it updates the status viewers accordingly
            keyboard.OnKeyDown.Bind((kce: eg.Input.KeyboardCommandEvent) => {
                this._keyDownStatus.Text = "Down: " + buildModifierAddition(kce) + kce.Key;
            });

            keyboard.OnKeyUp.Bind((kce: eg.Input.KeyboardCommandEvent) => {
                this._keyUpStatus.Text = "Up: " + buildModifierAddition(kce) + kce.Key;
            });

            keyboard.OnKeyPress.Bind((kce: eg.Input.KeyboardCommandEvent) => {
                this._keyPressStatus.Text = "Press: " + buildModifierAddition(kce) + kce.Key;
            });
        }
    }

}