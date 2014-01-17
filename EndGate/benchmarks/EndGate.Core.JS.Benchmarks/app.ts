/// <reference path="MovingSquare.ts" />

declare var Stats;

class holder extends eg.Graphics.Graphic2d {
    constructor() {
        super(new PIXI.DisplayObjectContainer(),eg.Vector2d.Zero);
    }
}

class foo extends eg.Game {
    private adding: boolean;
    private squares: Array<MovingSquare>;
    private stats;
    private bunnies: HTMLDivElement;
    private container: holder;

    constructor() {
        super(<any>document.getElementById("game"));

        this.stats = new Stats();
        this.container = new holder();

        this.Scene.Add(this.container);
        this.bunnies = <HTMLDivElement>document.getElementById("bunnies");

        document.body.appendChild(this.stats.domElement);
        this.stats.domElement.style.position = "absolute";
        this.stats.domElement.style.top = "0px";

        var w = window.innerWidth / 2 - 800 / 2;
        var h = window.innerHeight / 2 - 600 / 2;

        this.stats.domElement.style.left = w + "px";
        this.stats.domElement.style.top = h + "px";

        this.adding = false,
        this.squares = new Array<MovingSquare>();

        this.Input.Mouse.OnDown.Bind((e) => {
            this.adding = true;
        });

        this.Input.Mouse.OnUp.Bind((e) => {
            this.adding = false;
        });
    }

    public Draw(): void {
        var square: MovingSquare;

        this.stats.begin();

        if (this.adding) {
            for (var i = 0; i < 10; i++) {
                square = new MovingSquare(eg.Vector2d.Zero, new eg.Size2d(this.Scene.DrawArea.width, this.Scene.DrawArea.height));
                this.container.AddChild(square);
                this.squares.push(square);
            }

            this.bunnies.innerHTML = this.squares.length.toString();
        }

        for (var i = 0; i < this.squares.length; i++) {
            this.squares[i].Render();
        }

        super.Draw();

        this.stats.end();
    }
}

var game = new foo();