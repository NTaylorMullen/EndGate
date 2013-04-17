(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), shapeBuilder = null, shapeColorPicker, borderColorPicker, borderThicknessSlider, rotationSlider, xPositionSlider, yPositionSlider, opacitySlider, widthSlider, heightSlider, shadowXSlider, shadowYSlider, shadowColorPicker, shadowBlurSlider, syncSliders, ensureValue = function (val, min, max) {
        return Math.min(Math.max(val, min), max);
    }, slidersAnimationMappings = {
        Position: function () {
            xPositionSlider.UpdateSlider(ensureValue(shapeBuilder.Shape.Position.X, 0, canvas.width / 2));
            yPositionSlider.UpdateSlider(ensureValue(shapeBuilder.Shape.Position.Y, 0, canvas.height / 2));
        },
        Rotation: function () {
            rotationSlider.UpdateSlider(ensureValue(shapeBuilder.Shape.Rotation * 100, -628, 628));
        },
        Size: function () {
            var newWidth, newHeight;
            if(shapeBuilder.Shape._type === "Circle") {
                newWidth = shapeBuilder.Shape.Radius;
                newHeight = shapeBuilder.Shape.Radius;
            } else {
                newWidth = shapeBuilder.Shape.Size.Width;
                newHeight = shapeBuilder.Shape.Size.Height;
            }
            widthSlider.UpdateSlider(ensureValue(newWidth, 0, canvas.width));
            heightSlider.UpdateSlider(ensureValue(newHeight, 0, canvas.height));
        },
        Opacity: function () {
            opacitySlider.UpdateSlider(ensureValue(shapeBuilder.Shape.Opacity() * 100, 0, 100));
        }
    };
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    syncSliders = function (animation) {
        slidersAnimationMappings[animation]();
    };
    shapeBuilder = new ShapeBuilder(canvas, $(".shapeBuilder"), $(".shapeAnimator"), new EndGate.Core.Assets.Vector2d(canvas.width / 2, canvas.height / 2), new EndGate.Core.Assets.Size2d(100, 100), 0, 1, syncSliders);
    shapeColorPicker = new ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [
        127, 
        0, 
        127
    ], function (newcolor) {
        shapeBuilder.Shape.Color(newcolor);
    });
    rotationSlider = new CustomSlider($("#rotationSlider"), -628, 628, 0, function (newrotation) {
        shapeBuilder.Shape.Rotation = newrotation / 100;
    });
    xPositionSlider = new CustomSlider($("#positionXSlider"), 0, canvas.width, shapeBuilder.Shape.Position.X, function (newX) {
        shapeBuilder.Shape.Position.X = newX;
    });
    yPositionSlider = new CustomSlider($("#positionYSlider"), 0, canvas.height, shapeBuilder.Shape.Position.Y, function (newY) {
        shapeBuilder.Shape.Position.Y = newY;
    });
    opacitySlider = new CustomSlider($("#opacitySlider"), 0, 100, 100, function (newAlpha) {
        shapeBuilder.Shape.Opacity(newAlpha / 100);
    });
    widthSlider = new CustomSlider($("#widthSlider"), 0, canvas.width, shapeBuilder.Shape.Size.Width, function (newWidth) {
        if(shapeBuilder.Shape._type === "Circle") {
            shapeBuilder.Shape.Radius = newWidth;
        } else {
            shapeBuilder.Shape.Size.Width = newWidth;
        }
    });
    heightSlider = new CustomSlider($("#heightSlider"), 0, canvas.height, shapeBuilder.Shape.Size.Height, function (newHeight) {
        if(shapeBuilder.Shape._type === "Circle") {
            shapeBuilder.Shape.Radius = newHeight;
        } else {
            shapeBuilder.Shape.Size.Height = newHeight;
        }
    });
    borderColorPicker = new ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [
        0, 
        0, 
        0
    ], function (newcolor) {
        shapeBuilder.Shape.BorderColor(newcolor);
    });
    borderThicknessSlider = new CustomSlider($("#borderThickness"), 0, 100, 7, function (newThickness) {
        shapeBuilder.Shape.BorderThickness(newThickness);
    });
    shadowXSlider = new CustomSlider($("#shadowX"), -30, 30, 20, function (newX) {
        shapeBuilder.Shape.ShadowX(newX);
    });
    shadowYSlider = new CustomSlider($("#shadowY"), -30, 30, 10, function (newY) {
        shapeBuilder.Shape.ShadowY(newY);
    });
    shadowColorPicker = new ColorPicker($("#shadowColorRed"), $("#shadowColorGreen"), $("#shadowColorBlue"), [
        0, 
        0, 
        100
    ], function (newcolor) {
        shapeBuilder.Shape.ShadowColor(newcolor);
    });
    shadowBlurSlider = new CustomSlider($("#shadowBlur"), 0, 300, 55, function (newBlur) {
        shapeBuilder.Shape.ShadowBlur(newBlur);
    });
})($, window);
//@ sourceMappingURL=mainShapes.js.map
