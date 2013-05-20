(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), shapeGame, shapeColorPicker, borderColorPicker, borderThicknessSlider, rotationSlider, xPositionSlider, yPositionSlider, opacitySlider, widthSlider, heightSlider, shadowXSlider, shadowYSlider, shadowColorPicker, shadowBlurSlider, ensureValue = function (val, min, max) {
        return Math.min(Math.max(val, min), max);
    }, slidersAnimationMappings = {
        Position: function () {
            xPositionSlider.UpdateSlider(ensureValue(shapeGame.Shape.Position.X, 0, canvas.width / 2));
            yPositionSlider.UpdateSlider(ensureValue(shapeGame.Shape.Position.Y, 0, canvas.height / 2));
        },
        Rotation: function () {
            rotationSlider.UpdateSlider(ensureValue(shapeGame.Shape.Rotation * 100, -628, 628));
        },
        Size: function () {
            var newWidth, newHeight;
            if(shapeGame.Shape._type === "Circle") {
                newWidth = shapeGame.Shape.Radius;
                newHeight = shapeGame.Shape.Radius;
            } else {
                newWidth = shapeGame.Shape.Size.Width;
                newHeight = shapeGame.Shape.Size.Height;
            }
            widthSlider.UpdateSlider(ensureValue(newWidth, 0, canvas.width));
            heightSlider.UpdateSlider(ensureValue(newHeight, 0, canvas.height));
        },
        Opacity: function () {
            opacitySlider.UpdateSlider(ensureValue(shapeGame.Shape.Opacity() * 100, 0, 100));
        }
    }, syncSliders = function (animation) {
        slidersAnimationMappings[animation]();
    };
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    shapeGame = new ShapeGame(canvas, $(".shapeBuilder"), $(".shapeAnimator"), new eg.Vector2d(canvas.width / 2, canvas.height / 2), new eg.Size2d(100, 100), 0, 1, syncSliders);
    shapeColorPicker = new ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [
        127, 
        0, 
        127
    ], function (newcolor) {
        shapeGame.Shape.Color(newcolor);
    });
    rotationSlider = new CustomSlider($("#rotationSlider"), -628, 628, 0, function (newrotation) {
        shapeGame.Shape.Rotation = newrotation / 100;
    });
    xPositionSlider = new CustomSlider($("#positionXSlider"), 0, canvas.width, shapeGame.Shape.Position.X, function (newX) {
        shapeGame.Shape.Position.X = newX;
    });
    yPositionSlider = new CustomSlider($("#positionYSlider"), 0, canvas.height, shapeGame.Shape.Position.Y, function (newY) {
        shapeGame.Shape.Position.Y = newY;
    });
    opacitySlider = new CustomSlider($("#opacitySlider"), 0, 100, 100, function (newAlpha) {
        shapeGame.Shape.Opacity(newAlpha / 100);
    });
    widthSlider = new CustomSlider($("#widthSlider"), 0, canvas.width, shapeGame.Shape.Size.Width, function (newWidth) {
        if(shapeGame.Shape._type === "Circle") {
            shapeGame.Shape.Radius = newWidth;
        } else {
            shapeGame.Shape.Size.Width = newWidth;
        }
    });
    heightSlider = new CustomSlider($("#heightSlider"), 0, canvas.height, shapeGame.Shape.Size.Height, function (newHeight) {
        if(shapeGame.Shape._type === "Circle") {
            shapeGame.Shape.Radius = newHeight;
        } else {
            shapeGame.Shape.Size.Height = newHeight;
        }
    });
    borderColorPicker = new ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [
        0, 
        0, 
        0
    ], function (newcolor) {
        shapeGame.Shape.BorderColor(newcolor);
    });
    borderThicknessSlider = new CustomSlider($("#borderThickness"), 0, 100, 7, function (newThickness) {
        shapeGame.Shape.BorderThickness(newThickness);
    });
    shadowXSlider = new CustomSlider($("#shadowX"), -30, 30, 20, function (newX) {
        shapeGame.Shape.ShadowX(newX);
    });
    shadowYSlider = new CustomSlider($("#shadowY"), -30, 30, 10, function (newY) {
        shapeGame.Shape.ShadowY(newY);
    });
    shadowColorPicker = new ColorPicker($("#shadowColorRed"), $("#shadowColorGreen"), $("#shadowColorBlue"), [
        0, 
        0, 
        100
    ], function (newcolor) {
        shapeGame.Shape.ShadowColor(newcolor);
    });
    shadowBlurSlider = new CustomSlider($("#shadowBlur"), 0, 300, 55, function (newBlur) {
        shapeGame.Shape.ShadowBlur(newBlur);
    });
})($, window);
//@ sourceMappingURL=Main.js.map
