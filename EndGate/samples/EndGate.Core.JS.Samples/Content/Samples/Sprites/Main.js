/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="CustomSlider.ts" />
(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), game, rotationSlider, xPositionSlider, yPositionSlider, opacitySlider, widthSlider, heightSlider;

    // Setup DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create game
    game = new Sprites.Game(canvas);

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
//# sourceMappingURL=Main.js.map
