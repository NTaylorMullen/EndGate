(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), shapeBuilder = null, shapeColorPicker, borderColorPicker, borderThicknessSlider, rotationSlider, xPositionSlider, yPositionSlider, opacitySlider, widthSlider, heightSlider;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    shapeBuilder = new ShapeBuilder(canvas, $(".shapeBuilder"));
    shapeColorPicker = new ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [
        127, 
        0, 
        127
    ], function (newcolor) {
        ShapeBuilder.Shape.Color(newcolor);
    });
    rotationSlider = new CustomSlider($("#rotationSlider"), -628, 628, 0, function (newrotation) {
        ShapeBuilder.Shape.Rotation = newrotation / 100;
    });
    xPositionSlider = new CustomSlider($("#positionXSlider"), 0, canvas.width, ShapeBuilder.Shape.Position.X, function (newX) {
        ShapeBuilder.Shape.Position.X = newX;
    });
    yPositionSlider = new CustomSlider($("#positionYSlider"), 0, canvas.height, ShapeBuilder.Shape.Position.Y, function (newY) {
        ShapeBuilder.Shape.Position.Y = newY;
    });
    opacitySlider = new CustomSlider($("#opacitySlider"), 0, 100, 100, function (newAlpha) {
        ShapeBuilder.Shape.Opacity(newAlpha / 100);
    });
    widthSlider = new CustomSlider($("#widthSlider"), 0, canvas.width, ShapeBuilder.Shape.Size.Width, function (newWidth) {
        ShapeBuilder.Shape.Size.Width = newWidth;
    });
    heightSlider = new CustomSlider($("#heightSlider"), 0, canvas.height, ShapeBuilder.Shape.Size.Height, function (newHeight) {
        ShapeBuilder.Shape.Size.Height = newHeight;
    });
    borderColorPicker = new ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [
        0, 
        0, 
        0
    ], function (newcolor) {
        ShapeBuilder.Shape.BorderColor(newcolor);
    });
    borderThicknessSlider = new CustomSlider($("#borderThickness"), 0, 100, 7, function (newThickness) {
        ShapeBuilder.Shape.BorderThickness(newThickness);
    });
    shapeBuilder.Scene.Add(ShapeBuilder.Shape);
})($, window);
//@ sourceMappingURL=mainShapes.js.map
