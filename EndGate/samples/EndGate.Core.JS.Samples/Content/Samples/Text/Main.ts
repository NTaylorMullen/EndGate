/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="ColorPicker.ts" />
/// <reference path="CustomSlider.ts" />

(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        game: Texts.Game,
        // Instantiates all of the sliders
        textColorPicker: Texts.ColorPicker,
        borderColorPicker: Texts.ColorPicker,
        borderThicknessSlider: Texts.CustomSlider,
        rotationSlider: Texts.CustomSlider,
        xPositionSlider: Texts.CustomSlider,
        yPositionSlider: Texts.CustomSlider,
        fontSizeSlider: Texts.CustomSlider,
        opacitySlider: Texts.CustomSlider,
        shadowXSlider: Texts.CustomSlider,
        shadowYSlider: Texts.CustomSlider,
        shadowColorPicker: Texts.ColorPicker,
        shadowBlurSlider: Texts.CustomSlider,
        fontFamilySelect: JQuery = $("#fontFamilySelect"),
        fontFamilyTypeSelect: JQuery = $("#fontFamilyTypeSelect"),
        fontWeightSelect: JQuery = $("#fontWeightSelect"),
        fontStyleSelect: JQuery = $("#fontStyleSelect"),
        // These functions are used to sync the shapes positions with the sliders
        fillSelect = function (select: JQuery, optionList: any, onchange: Function) {
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
    textColorPicker = new Texts.ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [127, 0, 127], (newcolor: eg.Graphics.Color) => {
        game.Text.Color = newcolor;
    });
    rotationSlider = new Texts.CustomSlider($("#rotationSlider"), -628, 628, 0, (newrotation: number) => {
        game.Text.Rotation = newrotation / 100;
    });
    xPositionSlider = new Texts.CustomSlider($("#positionXSlider"), 0, canvas.width, game.Text.Position.X, (newX: number) => {
        game.Text.Position.X = newX;
    });
    yPositionSlider = new Texts.CustomSlider($("#positionYSlider"), 0, canvas.height, game.Text.Position.Y, (newY: number) => {
        game.Text.Position.Y = newY;
    });
    opacitySlider = new Texts.CustomSlider($("#opacitySlider"), 0, 100, 100, (newAlpha) => {
        game.Text.Opacity = newAlpha / 100;
    });
    fontSizeSlider = new Texts.CustomSlider($("#fontSizeSlider"), 0, 100, 20, (newSize) => {
        game.Text.FontSettings.FontSize = newSize + "pt";
    });
    borderColorPicker = new Texts.ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [0, 0, 0], (newcolor: eg.Graphics.Color) => {
        game.Text.BorderColor = newcolor;
    });
    borderThicknessSlider = new Texts.CustomSlider($("#borderThickness"), 0, 100, 0, (newThickness) => {
        game.Text.BorderThickness = newThickness;
    });
    shadowXSlider = new Texts.CustomSlider($("#shadowX"), -30, 30, 20, (newX: number) => {
        //game.Text.ShadowX = newX;
    });
    shadowYSlider = new Texts.CustomSlider($("#shadowY"), -30, 30, 10, (newY: number) => {
        //game.Text.ShadowY = newY;
    });
    shadowColorPicker = new Texts.ColorPicker($("#shadowColorRed"), $("#shadowColorGreen"), $("#shadowColorBlue"), [0, 0, 100], (newcolor: eg.Graphics.Color) => {
        //game.Text.ShadowColor = newcolor;
    });
    shadowBlurSlider = new Texts.CustomSlider($("#shadowBlur"), 0, 300, 55, (newBlur: number) => {
        //game.Text.ShadowBlur = newBlur;
    });

    // Wire up text selections
    fillSelect(fontFamilySelect, eg.Graphics.Assets.FontFamily, function () {
        game.Text.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily[<string>$(this).val()];
    });

    fillSelect(fontStyleSelect, eg.Graphics.Assets.FontStyle, function () {
        game.Text.FontSettings.FontStyle = eg.Graphics.Assets.FontStyle[<string>$(this).val()];
    });

    fontWeightSelect.change(function () {
        game.Text.FontSettings.FontWeight = $(this).val();
    });

})($, window);