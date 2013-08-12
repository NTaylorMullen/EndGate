/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="CustomSlider.ts" />

(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        game: Sprites.Game,
        // Instantiates all of the sliders
        rotationSlider: Sprites.CustomSlider,
        xPositionSlider: Sprites.CustomSlider,
        yPositionSlider: Sprites.CustomSlider,
        opacitySlider: Sprites.CustomSlider,
        widthSlider: Sprites.CustomSlider,
        heightSlider: Sprites.CustomSlider;

    // Setup DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create game
    game = new Sprites.Game(canvas);

    // Wire up all the sliders
    rotationSlider = new Sprites.CustomSlider($("#rotationSlider"), -628, 628, 0, (newrotation: number) => {
        game.Sprite.Rotation = newrotation / 100;
    });
    xPositionSlider = new Sprites.CustomSlider($("#positionXSlider"), 0, canvas.width, game.Sprite.Position.X, (newX: number) => {
        game.Sprite.Position.X = newX;
    });
    yPositionSlider = new Sprites.CustomSlider($("#positionYSlider"), 0, canvas.height, game.Sprite.Position.Y, (newY: number) => {
        game.Sprite.Position.Y = newY;
    });
    opacitySlider = new Sprites.CustomSlider($("#opacitySlider"), 0, 100, 100, (newAlpha) => {
        game.Sprite.Opacity = newAlpha / 100;
    });
    widthSlider = new Sprites.CustomSlider($("#widthSlider"), 0, canvas.width, game.Sprite.Size.Width, (newWidth: number) => {
        game.Sprite.Size.Width = newWidth;
    });
    heightSlider = new Sprites.CustomSlider($("#heightSlider"), 0, canvas.height, game.Sprite.Size.Height, (newHeight: number) => {
        game.Sprite.Size.Height = newHeight;
    });

})($, window);