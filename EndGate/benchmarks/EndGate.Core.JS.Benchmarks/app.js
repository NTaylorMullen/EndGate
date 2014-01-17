/// <reference path="MovingSquare.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var holder = (function (_super) {
    __extends(holder, _super);
    function holder() {
        _super.call(this, new PIXI.DisplayObjectContainer(), eg.Vector2d.Zero);
    }
    return holder;
})(eg.Graphics.Graphic2d);

var foo = (function (_super) {
    __extends(foo, _super);
    function foo() {
        var _this = this;
        _super.call(this, document.getElementById("game"));

        this.stats = new Stats();
        this.container = new holder();

        this.Scene.Add(this.container);
        this.bunnies = document.getElementById("bunnies");

        document.body.appendChild(this.stats.domElement);
        this.stats.domElement.style.position = "absolute";
        this.stats.domElement.style.top = "0px";

        var w = window.innerWidth / 2 - 800 / 2;
        var h = window.innerHeight / 2 - 600 / 2;

        this.stats.domElement.style.left = w + "px";
        this.stats.domElement.style.top = h + "px";

        this.adding = false, this.squares = new Array();

        this.Input.Mouse.OnDown.Bind(function (e) {
            _this.adding = true;
        });

        this.Input.Mouse.OnUp.Bind(function (e) {
            _this.adding = false;
        });
    }
    foo.prototype.Draw = function () {
        var square;

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

        _super.prototype.Draw.call(this);

        this.stats.end();
    };
    return foo;
})(eg.Game);

var game = new foo();
//# sourceMappingURL=app.js.map
