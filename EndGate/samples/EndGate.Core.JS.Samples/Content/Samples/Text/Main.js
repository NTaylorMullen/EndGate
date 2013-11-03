/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="ColorPicker.ts" />
/// <reference path="CustomSlider.ts" />
(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), game, textColorPicker, borderColorPicker, borderThicknessSlider, rotationSlider, xPositionSlider, yPositionSlider, fontSizeSlider, opacitySlider, shadowXSlider, shadowYSlider, shadowColorPicker, shadowBlurSlider, fontFamilySelect = $("#fontFamilySelect"), fontFamilyTypeSelect = $("#fontFamilyTypeSelect"), fontWeightSelect = $("#fontWeightSelect"), fontStyleSelect = $("#fontStyleSelect"), fillSelect = function (select, optionList, onchange) {
        var i = 0;

        while (optionList[i]) {
            select.append("<option value=\"" + optionList[i] + "\">" + optionList[i] + "</option>");
            i++;
        }

        select.change(onchange);
    };

    // Setup DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create game
    game = new Texts.Game(canvas);

    // Wire up all the sliders
    textColorPicker = new Texts.ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [127, 0, 127], function (newcolor) {
        game.Text.Color = newcolor;
    });
    rotationSlider = new Texts.CustomSlider($("#rotationSlider"), -628, 628, 0, function (newrotation) {
        game.Text.Rotation = newrotation / 100;
    });
    xPositionSlider = new Texts.CustomSlider($("#positionXSlider"), 0, canvas.width, game.Text.Position.X, function (newX) {
        game.Text.Position.X = newX;
    });
    yPositionSlider = new Texts.CustomSlider($("#positionYSlider"), 0, canvas.height, game.Text.Position.Y, function (newY) {
        game.Text.Position.Y = newY;
    });
    opacitySlider = new Texts.CustomSlider($("#opacitySlider"), 0, 100, 100, function (newAlpha) {
        game.Text.Opacity = newAlpha / 100;
    });
    fontSizeSlider = new Texts.CustomSlider($("#fontSizeSlider"), 0, 100, 20, function (newSize) {
        game.Text.FontSettings.FontSize = newSize + "pt";
    });
    borderColorPicker = new Texts.ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [0, 0, 0], function (newcolor) {
        game.Text.BorderColor = newcolor;
    });
    borderThicknessSlider = new Texts.CustomSlider($("#borderThickness"), 0, 100, 0, function (newThickness) {
        game.Text.BorderThickness = newThickness;
    });
    shadowXSlider = new Texts.CustomSlider($("#shadowX"), -30, 30, 20, function (newX) {
        //game.Text.ShadowX = newX;
    });
    shadowYSlider = new Texts.CustomSlider($("#shadowY"), -30, 30, 10, function (newY) {
        //game.Text.ShadowY = newY;
    });
    shadowColorPicker = new Texts.ColorPicker($("#shadowColorRed"), $("#shadowColorGreen"), $("#shadowColorBlue"), [0, 0, 100], function (newcolor) {
        //game.Text.ShadowColor = newcolor;
    });
    shadowBlurSlider = new Texts.CustomSlider($("#shadowBlur"), 0, 300, 55, function (newBlur) {
        //game.Text.ShadowBlur = newBlur;
    });

    // Wire up text selections
    fillSelect(fontFamilySelect, eg.Graphics.Assets.FontFamily, function () {
        game.Text.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily[$(this).val()];
    });

    fillSelect(fontStyleSelect, eg.Graphics.Assets.FontStyle, function () {
        game.Text.FontSettings.FontStyle = eg.Graphics.Assets.FontStyle[$(this).val()];
    });

    fontWeightSelect.change(function () {
        game.Text.FontSettings.FontWeight = $(this).val();
    });
})($, window);
//# sourceMappingURL=Main.js.map
