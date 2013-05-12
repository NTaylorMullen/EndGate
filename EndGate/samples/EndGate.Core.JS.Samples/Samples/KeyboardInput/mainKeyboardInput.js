(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), keyboardMonitor = null, keys = [], keyY = 15, bindingText, bindKeyboardInput = $("#bindKeyboardInput"), unbindKeyboardInput = $("#unbindKeyboardInput"), commandToBind = $("#commandToBind"), commandResult = $("#commandResult"), commandList = $("#commandList"), keyCommandIDs = 0, keyCommandList = {
    }, buildModifierAddition = function (kce) {
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
    canvas.width = holder.width();
    canvas.height = holder.height() - 30;
    holder.append(canvas);
    bindingText = new eg.Graphics.Text2d(canvas.width / 2, canvas.height / 2, "");
    bindingText.FontSettings.FontSize(40);
    bindingText.FontSettings.FontWeight("bold");
    keyboardMonitor = new KeyboardMonitor(canvas);
    keyboardMonitor.Scene.Add(bindingText);
    for(var i = 0; i < 3; i++) {
        keys.push(new eg.Graphics.Text2d(0, keyY, ""));
        keys[i].FontSettings.FontSize(20);
        keys[i].Align("left");
        keyboardMonitor.Scene.Add(keys[i]);
        keyY += 30;
    }
    keyboardMonitor.Input.Keyboard.OnKeyPress.Bind(function (kce) {
        keys[0].Text("Press: " + buildModifierAddition(kce) + kce.Key);
    });
    keyboardMonitor.Input.Keyboard.OnKeyDown.Bind(function (kce) {
        keys[1].Text("Down: " + buildModifierAddition(kce) + kce.Key);
    });
    keyboardMonitor.Input.Keyboard.OnKeyUp.Bind(function (kce) {
        keys[2].Text("Up: " + buildModifierAddition(kce) + kce.Key);
    });
    bindKeyboardInput.click(function () {
        var newText = commandResult.val(), commandVal = commandToBind.val(), keyCommand = keyboardMonitor.Input.Keyboard.OnCommandUp(commandVal, function () {
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
//@ sourceMappingURL=mainKeyboardInput.js.map
