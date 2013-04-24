/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="assetsKeyboardInput.ts" />

(function ($, window) {
    var canvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        keyboardMonitor: KeyboardMonitor = null,
        keys: EndGate.Core.Graphics.Text.Text2d[] = [],
        keyY: number = 15,
        bindingText: EndGate.Core.Graphics.Text.Text2d,
        bindKeyboardInput: JQuery = $("#bindKeyboardInput"),
        unbindKeyboardInput: JQuery = $("#unbindKeyboardInput"),
        commandToBind: JQuery = $("#commandToBind"),
        commandResult: JQuery = $("#commandResult"),
        commandList: JQuery = $("#commandList"),
        keyCommandIDs: number = 0,
        keyCommandList: { [id: number]: EndGate.Core.Input.Keyboard.KeyboardCommand; } = <any>{},
        buildModifierAddition = (kce: EndGate.Core.Input.Keyboard.KeyboardCommandEvent): string => {
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

    canvas.width = holder.width();
    canvas.height = holder.height() - 30;

    holder.append(canvas);

    bindingText = new EndGate.Core.Graphics.Text.Text2d(canvas.width / 2, canvas.height / 2, "");
    bindingText.FontSettings.FontSize(40);
    bindingText.FontSettings.FontWeight("bold");

    keyboardMonitor = new KeyboardMonitor(canvas);

    keyboardMonitor.Scene.Add(bindingText);

    for (var i = 0; i < 3; i++) {
        keys.push(new EndGate.Core.Graphics.Text.Text2d(0, keyY, ""));
        keys[i].FontSettings.FontSize(20);
        keys[i].Align("left");
        keyboardMonitor.Scene.Add(keys[i]);
        keyY += 30;
    }

    keyboardMonitor.Input.Keyboard.OnKeyPress.Bind((kce: EndGate.Core.Input.Keyboard.KeyboardCommandEvent) => {
        keys[0].Text("Press: " + buildModifierAddition(kce) + kce.Key);
    });

    keyboardMonitor.Input.Keyboard.OnKeyDown.Bind((kce: EndGate.Core.Input.Keyboard.KeyboardCommandEvent) => {
        keys[1].Text("Down: " + buildModifierAddition(kce) + kce.Key);
    });

    keyboardMonitor.Input.Keyboard.OnKeyUp.Bind((kce: EndGate.Core.Input.Keyboard.KeyboardCommandEvent) => {
        keys[2].Text("Up: " + buildModifierAddition(kce) + kce.Key);
    });

    bindKeyboardInput.click(function () {
        var newText = commandResult.val(),
            commandVal = commandToBind.val(),
            keyCommand = keyboardMonitor.Input.Keyboard.OnCommandUp(commandVal, function () {
                bindingText.Text(newText);
            });

        keyCommandList[keyCommandIDs] = keyCommand;

        commandList.append("<option value='" + (keyCommandIDs++) + "'>" + commandVal + " : " + newText + "</option>");

        commandToBind.val("");
        commandResult.val("");
    });

    unbindKeyboardInput.click(function () {
        var val = commandList.val();

        $('option:selected', commandList).remove();

        keyCommandList[val].Dispose();
        delete keyCommandList[val];
    });
})($, window);