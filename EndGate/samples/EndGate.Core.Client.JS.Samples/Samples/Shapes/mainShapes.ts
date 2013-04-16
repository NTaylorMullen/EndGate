/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/jqueryui.d.ts" />
/// <reference path="assetsShapes.ts" />

(function ($, window) {

    var canvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        shapeBuilder: ShapeBuilder = null,
        shapeColorPicker: ColorPicker,
        borderColorPicker: ColorPicker,
        borderThicknessSlider: CustomSlider,
        rotationSlider: CustomSlider,
        xPositionSlider: CustomSlider,
        yPositionSlider: CustomSlider,
        opacitySlider: CustomSlider,
        widthSlider: CustomSlider,
        heightSlider: CustomSlider,
        shadowXSlider: CustomSlider,
        shadowYSlider: CustomSlider,
        shadowColorPicker: ColorPicker,
        shadowBlurSlider: CustomSlider;

    canvas.width = holder.width();
    canvas.height = holder.height();

    holder.append(canvas);

    shapeBuilder = new ShapeBuilder(canvas, $(".shapeBuilder"));
    shapeColorPicker = new ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [127, 0, 127], (newcolor: string) => {
        shapeBuilder.Shape.Color(newcolor);
    });
    rotationSlider = new CustomSlider($("#rotationSlider"), -628, 628, 0, (newrotation: number) => {
        shapeBuilder.Shape.Rotation = newrotation / 100;
    });
    xPositionSlider = new CustomSlider($("#positionXSlider"), 0, canvas.width, shapeBuilder.Shape.Position.X, (newX: number) => {
        shapeBuilder.Shape.Position.X = newX;
    });
    yPositionSlider = new CustomSlider($("#positionYSlider"), 0, canvas.height, shapeBuilder.Shape.Position.Y, (newY: number) => {
        shapeBuilder.Shape.Position.Y = newY;
    });
    opacitySlider = new CustomSlider($("#opacitySlider"), 0, 100, 100, (newAlpha) => {
        shapeBuilder.Shape.Opacity(newAlpha / 100);
    });
    widthSlider = new CustomSlider($("#widthSlider"), 0, canvas.width, shapeBuilder.Shape.Size.Width, (newWidth: number) => {
        shapeBuilder.Shape.Size.Width = newWidth;
    });
    heightSlider = new CustomSlider($("#heightSlider"), 0, canvas.height, shapeBuilder.Shape.Size.Height, (newHeight: number) => {
        shapeBuilder.Shape.Size.Height = newHeight;
    });
    borderColorPicker = new ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [0, 0, 0], (newcolor: string) => {
        shapeBuilder.Shape.BorderColor(newcolor);
    });
    borderThicknessSlider = new CustomSlider($("#borderThickness"), 0, 100, 7, (newThickness) => {
        shapeBuilder.Shape.BorderThickness(newThickness);
    });
    shadowXSlider = new CustomSlider($("#shadowX"), -30, 30, 20, (newX: number) => {
        shapeBuilder.Shape.ShadowX(newX);
    });
    shadowYSlider = new CustomSlider($("#shadowY"), -30, 30, 10, (newY: number) => {
        shapeBuilder.Shape.ShadowY(newY);
    });
    shadowColorPicker = new ColorPicker($("#shadowColorRed"), $("#shadowColorGreen"), $("#shadowColorBlue"), [0, 0, 100], (newcolor: string) => {
        shapeBuilder.Shape.ShadowColor(newcolor);
    });
    shadowBlurSlider = new CustomSlider($("#shadowBlur"), 0, 300, 55, (newBlur: number) => {
        shapeBuilder.Shape.ShadowBlur(newBlur);
    });

})($, window);