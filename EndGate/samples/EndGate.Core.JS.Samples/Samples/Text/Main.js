(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), textGame, textColorPicker, borderColorPicker, borderThicknessSlider, rotationSlider, xPositionSlider, yPositionSlider, fontSizeSlider, opacitySlider, shadowXSlider, shadowYSlider, shadowColorPicker, shadowBlurSlider, fontFamilySelect = $("#fontFamilySelect"), fontFamilyTypeSelect = $("#fontFamilyTypeSelect"), fontWeightSelect = $("#fontWeightSelect"), fontStyleSelect = $("#fontStyleSelect"), ensureValue = function (val, min, max) {
        return Math.min(Math.max(val, min), max);
    }, fillSelect = function (select, optionList, onchange) {
        for(var property in optionList) {
            if(property !== "_map") {
                select.append("<option value=\"" + property + "\">" + property + "</option>");
            }
        }
        select.change(onchange);
    }, slidersAnimationMappings = {
        Position: function () {
            xPositionSlider.UpdateSlider(ensureValue(textGame.Text.Position.X, 0, canvas.width / 2));
            yPositionSlider.UpdateSlider(ensureValue(textGame.Text.Position.Y, 0, canvas.height / 2));
        },
        Rotation: function () {
            rotationSlider.UpdateSlider(ensureValue(textGame.Text.Rotation * 100, -628, 628));
        },
        Size: function () {
            fontSizeSlider.UpdateSlider(ensureValue(parseFloat(textGame.Text.FontSettings.FontSize()), 0, 100));
        },
        Opacity: function () {
            opacitySlider.UpdateSlider(ensureValue(textGame.Text.Opacity() * 100, 0, 100));
        }
    }, syncSliders = function (animation) {
        slidersAnimationMappings[animation]();
    };
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    textGame = new TextGame(canvas, $(".textAnimator"), new eg.Vector2d(canvas.width / 2, canvas.height / 2), 0, 1, syncSliders);
    textColorPicker = new ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [
        127, 
        0, 
        127
    ], function (newcolor) {
        textGame.Text.Color(newcolor);
    });
    rotationSlider = new CustomSlider($("#rotationSlider"), -628, 628, 0, function (newrotation) {
        textGame.Text.Rotation = newrotation / 100;
    });
    xPositionSlider = new CustomSlider($("#positionXSlider"), 0, canvas.width, textGame.Text.Position.X, function (newX) {
        textGame.Text.Position.X = newX;
    });
    yPositionSlider = new CustomSlider($("#positionYSlider"), 0, canvas.height, textGame.Text.Position.Y, function (newY) {
        textGame.Text.Position.Y = newY;
    });
    opacitySlider = new CustomSlider($("#opacitySlider"), 0, 100, 100, function (newAlpha) {
        textGame.Text.Opacity(newAlpha / 100);
    });
    fontSizeSlider = new CustomSlider($("#fontSizeSlider"), 0, 100, 20, function (newSize) {
        textGame.Text.FontSettings.FontSize(newSize);
    });
    borderColorPicker = new ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [
        0, 
        0, 
        0
    ], function (newcolor) {
        textGame.Text.BorderColor(newcolor);
    });
    borderThicknessSlider = new CustomSlider($("#borderThickness"), 0, 100, 0, function (newThickness) {
        textGame.Text.BorderThickness(newThickness);
    });
    shadowXSlider = new CustomSlider($("#shadowX"), -30, 30, 20, function (newX) {
        textGame.Text.ShadowX(newX);
    });
    shadowYSlider = new CustomSlider($("#shadowY"), -30, 30, 10, function (newY) {
        textGame.Text.ShadowY(newY);
    });
    shadowColorPicker = new ColorPicker($("#shadowColorRed"), $("#shadowColorGreen"), $("#shadowColorBlue"), [
        0, 
        0, 
        100
    ], function (newcolor) {
        textGame.Text.ShadowColor(newcolor);
    });
    shadowBlurSlider = new CustomSlider($("#shadowBlur"), 0, 300, 55, function (newBlur) {
        textGame.Text.ShadowBlur(newBlur);
    });
    fillSelect(fontFamilySelect, eg.Graphics.Assets.FontFamily, function () {
        textGame.Text.FontSettings.FontFamily(eg.Graphics.Assets.FontFamily[$(this).val()]);
    });
    fillSelect(fontStyleSelect, eg.Graphics.Assets.FontStyle, function () {
        textGame.Text.FontSettings.FontStyle(eg.Graphics.Assets.FontStyle[$(this).val()]);
    });
    fontWeightSelect.change(function () {
        textGame.Text.FontSettings.FontWeight($(this).val());
    });
})($, window);
//@ sourceMappingURL=Main.js.map
