/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="TextGame.ts" />
/// <reference path="ColorPicker.ts" />
/// <reference path="CustomSlider.ts" />

(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        textGame: TextGame,
        // Instantiates all of the sliders
        textColorPicker: ColorPicker,
        borderColorPicker: ColorPicker,
        borderThicknessSlider: CustomSlider,
        rotationSlider: CustomSlider,
        xPositionSlider: CustomSlider,
        yPositionSlider: CustomSlider,
        fontSizeSlider: CustomSlider,
        opacitySlider: CustomSlider,
        shadowXSlider: CustomSlider,
        shadowYSlider: CustomSlider,
        shadowColorPicker: ColorPicker,
        shadowBlurSlider: CustomSlider,
        fontFamilySelect: JQuery = $("#fontFamilySelect"),
        fontFamilyTypeSelect: JQuery = $("#fontFamilyTypeSelect"),
        fontWeightSelect: JQuery = $("#fontWeightSelect"),
        fontStyleSelect: JQuery = $("#fontStyleSelect"),
        // Return value that is closest to provided value but still within min-max range
        ensureValue = function (val, min, max) {
            return Math.min(Math.max(val, min), max);
        },
        // These functions are used to sync the shapes positions with the sliders
        fillSelect = function (select: JQuery, optionList: any, onchange: Function) {
            for (var property in optionList) {
                if (property !== "_map") {
                    select.append("<option value=\"" + property + "\">" + property + "</option>");
                }
            }

            select.change(onchange);
        },
        slidersAnimationMappings = {
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
        },
        // Sync sliders is used to make sure that all sliders are showing the correct values
        syncSliders: Function = function (animation) {
            slidersAnimationMappings[animation]();
        };

    // Setup DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create game
    textGame = new TextGame(canvas, $(".textAnimator"), new eg.Vector2d(canvas.width / 2, canvas.height / 2), 0, 1, syncSliders);

    // Wire up all the sliders
    textColorPicker = new ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [127, 0, 127], (newcolor: string) => {
        textGame.Text.Color(newcolor);
    });
    rotationSlider = new CustomSlider($("#rotationSlider"), -628, 628, 0, (newrotation: number) => {
        textGame.Text.Rotation = newrotation / 100;
    });
    xPositionSlider = new CustomSlider($("#positionXSlider"), 0, canvas.width, textGame.Text.Position.X, (newX: number) => {
        textGame.Text.Position.X = newX;
    });
    yPositionSlider = new CustomSlider($("#positionYSlider"), 0, canvas.height, textGame.Text.Position.Y, (newY: number) => {
        textGame.Text.Position.Y = newY;
    });
    opacitySlider = new CustomSlider($("#opacitySlider"), 0, 100, 100, (newAlpha) => {
        textGame.Text.Opacity(newAlpha / 100);
    });
    fontSizeSlider = new CustomSlider($("#fontSizeSlider"), 0, 100, 20, (newSize) => {
        textGame.Text.FontSettings.FontSize(newSize);
    });
    borderColorPicker = new ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [0, 0, 0], (newcolor: string) => {
        textGame.Text.BorderColor(newcolor);
    });
    borderThicknessSlider = new CustomSlider($("#borderThickness"), 0, 100, 0, (newThickness) => {
        textGame.Text.BorderThickness(newThickness);
    });
    shadowXSlider = new CustomSlider($("#shadowX"), -30, 30, 20, (newX: number) => {
        textGame.Text.ShadowX(newX);
    });
    shadowYSlider = new CustomSlider($("#shadowY"), -30, 30, 10, (newY: number) => {
        textGame.Text.ShadowY(newY);
    });
    shadowColorPicker = new ColorPicker($("#shadowColorRed"), $("#shadowColorGreen"), $("#shadowColorBlue"), [0, 0, 100], (newcolor: string) => {
        textGame.Text.ShadowColor(newcolor);
    });
    shadowBlurSlider = new CustomSlider($("#shadowBlur"), 0, 300, 55, (newBlur: number) => {
        textGame.Text.ShadowBlur(newBlur);
    });

    // Wire up text selections
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