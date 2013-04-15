/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/jqueryui.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class ShapeBuilder extends EndGate.Core.Game {
    public Shape: EndGate.Core.Graphics.Shapes.Shape;

    constructor(private _canvas: HTMLCanvasElement, targetBuilders: JQuery) {
        super(_canvas);
        var that = this,
            builderClicked = function () {
                targetBuilders.removeClass("disabled");
                $(this).addClass("disabled");
                that.BuildShape($(this)[0]);
            };

        $.each(targetBuilders, function (index, val) {
            $(val).click(builderClicked);
        });

        $(targetBuilders[0]).click();
    }

    private BuildShape(builder: HTMLElement): void {
        var shapeType = EndGate.Core.Graphics.Shapes[$(builder).attr("shape")],
            newShape: EndGate.Core.Graphics.Shapes.Shape;

        // If there is no current shape
        if (!this.Shape) {
            newShape = new shapeType(this._canvas.width / 2, this._canvas.height / 2, 200, 200);
        }
        else {
            newShape = new shapeType(this.Shape.Position.X, this.Shape.Position.Y, this.Shape.Size.Width, this.Shape.Size.Height);
            newShape.Color(this.Shape.Color());
            newShape.BorderColor(this.Shape.BorderColor());
            newShape.BorderThickness(this.Shape.BorderThickness());
            newShape.Opacity(this.Shape.Opacity());
            newShape.Rotation = this.Shape.Rotation;
            this.Scene.Remove(this.Shape);
        }
        
        this.Shape = newShape;
        this.Scene.Add(this.Shape);
    }
}

class ColorPicker {
    private sliders: any[];

    constructor(private red: any, private green: any, private blue: any, defaultColor: number[], private oncolorchange: Function) {
        var updateGraphic = () => {
            this.UpdateColor();
        };

        this.sliders = [this.red, this.green, this.blue];

        for (var i = 0; i < 3; i++) {
            this.sliders[i].slider({
                orientation: "horizontal",
                range: "min",
                max: 255,
                value: defaultColor[i],
                animate: true,
                slide: updateGraphic,
                change: updateGraphic
            });
        }

        this.UpdateColor();
    }

    private UpdateColor(): void {
        var red = this.red.slider("value"),
            green = this.green.slider("value"),
            blue = this.blue.slider("value");

        this.oncolorchange("rgb(" + red + ", " + green + ", " + blue + ")")
    }
}

class CustomSlider {

    constructor(private _target: any, private _min: number, private _max: number, private _defaultValue: number, private onsliderchange: Function) {
        var sliderChange = () => {
            this.SliderChange();
        };

        this._target.slider({
            orientation: "horizontal",
            range: "min",
            min: this._min,
            max: this._max,
            value: this._defaultValue,
            animate: true,
            slide: sliderChange,
            change: sliderChange
        });

        this.SliderChange();
    }

    private SliderChange(): void {
        this.onsliderchange(parseInt(this._target.slider("value")));
    }
}