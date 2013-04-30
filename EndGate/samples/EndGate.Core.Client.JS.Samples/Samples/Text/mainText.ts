/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="assetsText.ts" />

(function ($, window) {

    var canvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        textBuilder: TextBuilder,
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
        syncSliders: Function,
        fontFamilySelect: JQuery = $("#fontFamilySelect"),
        fontFamilyTypeSelect: JQuery = $("#fontFamilyTypeSelect"),
        fontWeightSelect: JQuery = $("#fontWeightSelect"),
        fontStyleSelect: JQuery = $("#fontStyleSelect"),
        ensureValue = function (val, min, max) {
            return Math.min(Math.max(val, min), max);
        },
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

    textBuilder = new TextBuilder(canvas, $(".textAnimator"), new eg.Vector2d(canvas.width / 2, canvas.height / 2), 0, 1, syncSliders);

    textColorPicker = new ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [127, 0, 127], (newcolor: string) => {
        textBuilder.Text.Color(newcolor);
    });
    rotationSlider = new CustomSlider($("#rotationSlider"), -628, 628, 0, (newrotation: number) => {
        textBuilder.Text.Rotation = newrotation / 100;
    });
    xPositionSlider = new CustomSlider($("#positionXSlider"), 0, canvas.width, textBuilder.Text.Position.X, (newX: number) => {
        textBuilder.Text.Position.X = newX;
    });
    yPositionSlider = new CustomSlider($("#positionYSlider"), 0, canvas.height, textBuilder.Text.Position.Y, (newY: number) => {
        textBuilder.Text.Position.Y = newY;
    });
    opacitySlider = new CustomSlider($("#opacitySlider"), 0, 100, 100, (newAlpha) => {
        textBuilder.Text.Opacity(newAlpha / 100);
    });
    fontSizeSlider = new CustomSlider($("#fontSizeSlider"), 0, 100, 20, (newSize) => {
        textBuilder.Text.FontSettings.FontSize(newSize);
    });
    borderColorPicker = new ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [0, 0, 0], (newcolor: string) => {
        textBuilder.Text.BorderColor(newcolor);
    });
    borderThicknessSlider = new CustomSlider($("#borderThickness"), 0, 100, 0, (newThickness) => {
        textBuilder.Text.BorderThickness(newThickness);
    });
    shadowXSlider = new CustomSlider($("#shadowX"), -30, 30, 20, (newX: number) => {
        textBuilder.Text.ShadowX(newX);
    });
    shadowYSlider = new CustomSlider($("#shadowY"), -30, 30, 10, (newY: number) => {
        textBuilder.Text.ShadowY(newY);
    });
    shadowColorPicker = new ColorPicker($("#shadowColorRed"), $("#shadowColorGreen"), $("#shadowColorBlue"), [0, 0, 100], (newcolor: string) => {
        textBuilder.Text.ShadowColor(newcolor);
    });
    shadowBlurSlider = new CustomSlider($("#shadowBlur"), 0, 300, 55, (newBlur: number) => {
        textBuilder.Text.ShadowBlur(newBlur);
    });

    fillSelect(fontFamilySelect, eg.Graphics.Assets.FontFamily, function () {
        textBuilder.Text.FontSettings.FontFamily(eg.Graphics.Assets.FontFamily[$(this).val()]);
    });

    fillSelect(fontStyleSelect, eg.Graphics.Assets.FontStyle, function () {
        textBuilder.Text.FontSettings.FontStyle(eg.Graphics.Assets.FontStyle[$(this).val()]);
    });

    fontWeightSelect.change(function () {
        textBuilder.Text.FontSettings.FontWeight($(this).val());
    });
    
})($, window);