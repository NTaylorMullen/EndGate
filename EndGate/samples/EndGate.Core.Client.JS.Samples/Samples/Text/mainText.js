(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), textBuilder, textColorPicker, borderColorPicker, borderThicknessSlider, rotationSlider, xPositionSlider, yPositionSlider, fontSizeSlider, opacitySlider, shadowXSlider, shadowYSlider, shadowColorPicker, shadowBlurSlider, syncSliders, fontFamilySelect = $("#fontFamilySelect"), fontFamilyTypeSelect = $("#fontFamilyTypeSelect"), fontWeightSelect = $("#fontWeightSelect"), fontStyleSelect = $("#fontStyleSelect"), ensureValue = function (val, min, max) {
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
            xPositionSlider.UpdateSlider(ensureValue(textBuilder.Text.Position.X, 0, canvas.width / 2));
            yPositionSlider.UpdateSlider(ensureValue(textBuilder.Text.Position.Y, 0, canvas.height / 2));
        },
        Rotation: function () {
            rotationSlider.UpdateSlider(ensureValue(textBuilder.Text.Rotation * 100, -628, 628));
        },
        Size: function () {
            fontSizeSlider.UpdateSlider(ensureValue(parseFloat(textBuilder.Text.FontSettings.FontSize()), 0, 100));
        },
        Opacity: function () {
            opacitySlider.UpdateSlider(ensureValue(textBuilder.Text.Opacity() * 100, 0, 100));
        }
    };
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    syncSliders = function (animation) {
        slidersAnimationMappings[animation]();
    };
    textBuilder = new TextBuilder(canvas, $(".textAnimator"), new EndGate.Core.Assets.Vector2d(canvas.width / 2, canvas.height / 2), 0, 1, syncSliders);
    textColorPicker = new ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [
        127, 
        0, 
        127
    ], function (newcolor) {
        textBuilder.Text.Color(newcolor);
    });
    rotationSlider = new CustomSlider($("#rotationSlider"), -628, 628, 0, function (newrotation) {
        textBuilder.Text.Rotation = newrotation / 100;
    });
    xPositionSlider = new CustomSlider($("#positionXSlider"), 0, canvas.width, textBuilder.Text.Position.X, function (newX) {
        textBuilder.Text.Position.X = newX;
    });
    yPositionSlider = new CustomSlider($("#positionYSlider"), 0, canvas.height, textBuilder.Text.Position.Y, function (newY) {
        textBuilder.Text.Position.Y = newY;
    });
    opacitySlider = new CustomSlider($("#opacitySlider"), 0, 100, 100, function (newAlpha) {
        textBuilder.Text.Opacity(newAlpha / 100);
    });
    fontSizeSlider = new CustomSlider($("#fontSizeSlider"), 0, 100, 20, function (newSize) {
        textBuilder.Text.FontSettings.FontSize(newSize);
    });
    borderColorPicker = new ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [
        0, 
        0, 
        0
    ], function (newcolor) {
        textBuilder.Text.BorderColor(newcolor);
    });
    borderThicknessSlider = new CustomSlider($("#borderThickness"), 0, 100, 0, function (newThickness) {
        textBuilder.Text.BorderThickness(newThickness);
    });
    shadowXSlider = new CustomSlider($("#shadowX"), -30, 30, 20, function (newX) {
        textBuilder.Text.ShadowX(newX);
    });
    shadowYSlider = new CustomSlider($("#shadowY"), -30, 30, 10, function (newY) {
        textBuilder.Text.ShadowY(newY);
    });
    shadowColorPicker = new ColorPicker($("#shadowColorRed"), $("#shadowColorGreen"), $("#shadowColorBlue"), [
        0, 
        0, 
        100
    ], function (newcolor) {
        textBuilder.Text.ShadowColor(newcolor);
    });
    shadowBlurSlider = new CustomSlider($("#shadowBlur"), 0, 300, 55, function (newBlur) {
        textBuilder.Text.ShadowBlur(newBlur);
    });
    fillSelect(fontFamilySelect, EndGate.Core.Graphics.Text.FontFamily, function () {
        textBuilder.Text.FontSettings.FontFamily(EndGate.Core.Graphics.Text.FontFamily[$(this).val()]);
    });
    fillSelect(fontStyleSelect, EndGate.Core.Graphics.Text.FontStyle, function () {
        textBuilder.Text.FontSettings.FontStyle(EndGate.Core.Graphics.Text.FontStyle[$(this).val()]);
    });
    fontWeightSelect.change(function () {
        textBuilder.Text.FontSettings.FontWeight($(this).val());
    });
})($, window);
//@ sourceMappingURL=mainText.js.map
