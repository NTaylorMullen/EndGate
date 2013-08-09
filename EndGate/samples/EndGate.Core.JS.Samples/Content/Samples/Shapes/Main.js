/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="ColorPicker.ts" />
/// <reference path="CustomSlider.ts" />
(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), game, shapeColorPicker, borderColorPicker, borderThicknessSlider, rotationSlider, xPositionSlider, yPositionSlider, opacitySlider, widthSlider, heightSlider, shadowXSlider, shadowYSlider, shadowColorPicker, shadowBlurSlider, ensureValue = function (val, min, max) {
        return Math.min(Math.max(val, min), max);
    }, slidersAnimationMappings = {
        Position: function () {
            xPositionSlider.UpdateSlider(ensureValue(game.Shape.Position.X, 0, canvas.width / 2));
            yPositionSlider.UpdateSlider(ensureValue(game.Shape.Position.Y, 0, canvas.height / 2));
        },
        Rotation: function () {
            rotationSlider.UpdateSlider(ensureValue(game.Shape.Rotation * 100, -628, 628));
        },
        Size: function () {
            var newWidth, newHeight;

            if (game.Shape._type === "Circle") {
                newWidth = game.Shape.Radius;
                newHeight = game.Shape.Radius;
            } else {
                newWidth = game.Shape.Size.Width;
                newHeight = game.Shape.Size.Height;
            }

            widthSlider.UpdateSlider(ensureValue(newWidth, 0, canvas.width));
            heightSlider.UpdateSlider(ensureValue(newHeight, 0, canvas.height));
        },
        Opacity: function () {
            opacitySlider.UpdateSlider(ensureValue(game.Shape.Opacity * 100, 0, 100));
        }
    }, syncSliders = function (animation) {
        slidersAnimationMappings[animation]();
    };

    // Setup DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create game
    game = new Shapes.Game(canvas, $(".shapeBuilder"), $(".shapeAnimator"), new eg.Vector2d(canvas.width / 2, canvas.height / 2), new eg.Size2d(100, 100), 0, 1, syncSliders);

    // Wire up all the sliders
    shapeColorPicker = new Shapes.ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [127, 0, 127], function (newcolor) {
        game.Shape.Color = newcolor;
    });
    rotationSlider = new Shapes.CustomSlider($("#rotationSlider"), -628, 628, 0, function (newrotation) {
        game.Shape.Rotation = newrotation / 100;
    });
    xPositionSlider = new Shapes.CustomSlider($("#positionXSlider"), 0, canvas.width, game.Shape.Position.X, function (newX) {
        game.Shape.Position.X = newX;
    });
    yPositionSlider = new Shapes.CustomSlider($("#positionYSlider"), 0, canvas.height, game.Shape.Position.Y, function (newY) {
        game.Shape.Position.Y = newY;
    });
    opacitySlider = new Shapes.CustomSlider($("#opacitySlider"), 0, 100, 100, function (newAlpha) {
        game.Shape.Opacity = newAlpha / 100;
    });
    widthSlider = new Shapes.CustomSlider($("#widthSlider"), 0, canvas.width, game.Shape.Size.Width, function (newWidth) {
        if (game.Shape._type === "Circle") {
            game.Shape.Radius = newWidth;
        } else {
            game.Shape.Size.Width = newWidth;
        }
    });
    heightSlider = new Shapes.CustomSlider($("#heightSlider"), 0, canvas.height, game.Shape.Size.Height, function (newHeight) {
        if (game.Shape._type === "Circle") {
            game.Shape.Radius = newHeight;
        } else {
            game.Shape.Size.Height = newHeight;
        }
    });
    borderColorPicker = new Shapes.ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [0, 0, 0], function (newcolor) {
        game.Shape.BorderColor = newcolor;
    });
    borderThicknessSlider = new Shapes.CustomSlider($("#borderThickness"), 0, 100, 7, function (newThickness) {
        game.Shape.BorderThickness = newThickness;
    });
    shadowXSlider = new Shapes.CustomSlider($("#shadowX"), -30, 30, 20, function (newX) {
        game.Shape.ShadowX = newX;
    });
    shadowYSlider = new Shapes.CustomSlider($("#shadowY"), -30, 30, 10, function (newY) {
        game.Shape.ShadowY = newY;
    });
    shadowColorPicker = new Shapes.ColorPicker($("#shadowColorRed"), $("#shadowColorGreen"), $("#shadowColorBlue"), [0, 0, 100], function (newcolor) {
        game.Shape.ShadowColor = newcolor;
    });
    shadowBlurSlider = new Shapes.CustomSlider($("#shadowBlur"), 0, 300, 55, function (newBlur) {
        game.Shape.ShadowBlur = newBlur;
    });
})($, window);
//# sourceMappingURL=Main.js.map
