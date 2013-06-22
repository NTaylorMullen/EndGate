/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="CustomSlider.ts" />
/// <reference path="SpriteAnimator.ts" />
(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), game, rotationSlider, xPositionSlider, yPositionSlider, opacitySlider, widthSlider, heightSlider, ensureValue = function (val, min, max) {
        return Math.min(Math.max(val, min), max);
    }, slidersAnimationMappings = {
        Position: function () {
            xPositionSlider.UpdateSlider(ensureValue(game.Sprite.Position.X, 0, canvas.width / 2));
            yPositionSlider.UpdateSlider(ensureValue(game.Sprite.Position.Y, 0, canvas.height / 2));
        },
        Rotation: function () {
            rotationSlider.UpdateSlider(ensureValue(game.Sprite.Rotation * 100, -628, 628));
        },
        Size: function () {
            var newWidth, newHeight;

            newWidth = game.Sprite.Size.Width;
            newHeight = game.Sprite.Size.Height;

            widthSlider.UpdateSlider(ensureValue(newWidth, 0, canvas.width));
            heightSlider.UpdateSlider(ensureValue(newHeight, 0, canvas.height));
        },
        Opacity: function () {
            opacitySlider.UpdateSlider(ensureValue(game.Sprite.Opacity * 100, 0, 100));
        }
    }, syncSliders = function (animation) {
        slidersAnimationMappings[animation]();
    };

    // Setup DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create game
    game = new Sprites.Game(canvas, $(".spriteAnimator"), new eg.Vector2d(canvas.width / 2, canvas.height / 2), new eg.Size2d(100, 100), 0, 1, syncSliders);

    // Wire up all the sliders
    rotationSlider = new Sprites.CustomSlider($("#rotationSlider"), -628, 628, 0, function (newrotation) {
        game.Sprite.Rotation = newrotation / 100;
    });
    xPositionSlider = new Sprites.CustomSlider($("#positionXSlider"), 0, canvas.width, game.Sprite.Position.X, function (newX) {
        game.Sprite.Position.X = newX;
    });
    yPositionSlider = new Sprites.CustomSlider($("#positionYSlider"), 0, canvas.height, game.Sprite.Position.Y, function (newY) {
        game.Sprite.Position.Y = newY;
    });
    opacitySlider = new Sprites.CustomSlider($("#opacitySlider"), 0, 100, 100, function (newAlpha) {
        game.Sprite.Opacity = newAlpha / 100;
    });
    widthSlider = new Sprites.CustomSlider($("#widthSlider"), 0, canvas.width, game.Sprite.Size.Width, function (newWidth) {
        game.Sprite.Size.Width = newWidth;
    });
    heightSlider = new Sprites.CustomSlider($("#heightSlider"), 0, canvas.height, game.Sprite.Size.Height, function (newHeight) {
        game.Sprite.Size.Height = newHeight;
    });
})($, window);
//@ sourceMappingURL=Main.js.map
