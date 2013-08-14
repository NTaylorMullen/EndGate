/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="ColorPicker.ts" />
/// <reference path="CustomSlider.ts" />

(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        game: Shapes.Game,
        // Instantiates all of the sliders
        shapeColorPicker: Shapes.ColorPicker,
        borderColorPicker: Shapes.ColorPicker,
        borderThicknessSlider: Shapes.CustomSlider,
        rotationSlider: Shapes.CustomSlider,
        xPositionSlider: Shapes.CustomSlider,
        yPositionSlider: Shapes.CustomSlider,
        opacitySlider: Shapes.CustomSlider,
        widthSlider: Shapes.CustomSlider,
        heightSlider: Shapes.CustomSlider,
        shadowXSlider: Shapes.CustomSlider,
        shadowYSlider: Shapes.CustomSlider,
        shadowColorPicker: Shapes.ColorPicker,
        shadowBlurSlider: Shapes.CustomSlider;       

    // Setup DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create game
    game = new Shapes.Game(canvas, $(".shapeBuilder"));

    // Wire up all the sliders
    shapeColorPicker = new Shapes.ColorPicker($("#redColorPicker"), $("#greenColorPicker"), $("#blueColorPicker"), [127, 0, 127], (newcolor: eg.Graphics.Color) => {
        game.Shape.Color = newcolor;
    });
    rotationSlider = new Shapes.CustomSlider($("#rotationSlider"), -628, 628, 0, (newrotation: number) => {
        game.Shape.Rotation = newrotation / 100;
    });
    xPositionSlider = new Shapes.CustomSlider($("#positionXSlider"), 0, canvas.width, game.Shape.Position.X, (newX: number) => {
        game.Shape.Position.X = newX;
    });
    yPositionSlider = new Shapes.CustomSlider($("#positionYSlider"), 0, canvas.height, game.Shape.Position.Y, (newY: number) => {
        game.Shape.Position.Y = newY;
    });
    opacitySlider = new Shapes.CustomSlider($("#opacitySlider"), 0, 100, 100, (newAlpha) => {
        game.Shape.Opacity = newAlpha / 100;
    });
    widthSlider = new Shapes.CustomSlider($("#widthSlider"), 0, canvas.width, game.Shape.Size.Width, (newWidth: number) => {
        if (game.Shape._type === "Circle") {
            game.Shape.Radius = newWidth;
        }
        else {
            game.Shape.Size.Width = newWidth;
        }
    });
    heightSlider = new Shapes.CustomSlider($("#heightSlider"), 0, canvas.height, game.Shape.Size.Height, (newHeight: number) => {
        if (game.Shape._type === "Circle") {
            game.Shape.Radius = newHeight;
        }
        else {
            game.Shape.Size.Height = newHeight;
        }
    });
    borderColorPicker = new Shapes.ColorPicker($("#borderRed"), $("#borderGreen"), $("#borderBlue"), [0, 0, 0], (newcolor: eg.Graphics.Color) => {
        game.Shape.BorderColor = newcolor;
    });
    borderThicknessSlider = new Shapes.CustomSlider($("#borderThickness"), 0, 100, 7, (newThickness) => {
        game.Shape.BorderThickness = newThickness;
    });
    shadowXSlider = new Shapes.CustomSlider($("#shadowX"), -30, 30, 20, (newX: number) => {
        game.Shape.ShadowX = newX;
    });
    shadowYSlider = new Shapes.CustomSlider($("#shadowY"), -30, 30, 10, (newY: number) => {
        game.Shape.ShadowY = newY;
    });
    shadowColorPicker = new Shapes.ColorPicker($("#shadowColorRed"), $("#shadowColorGreen"), $("#shadowColorBlue"), [0, 0, 100], (newcolor: eg.Graphics.Color) => {
        game.Shape.ShadowColor = newcolor;
    });
    shadowBlurSlider = new Shapes.CustomSlider($("#shadowBlur"), 0, 300, 55, (newBlur: number) => {
        game.Shape.ShadowBlur = newBlur;
    });

})($, window);