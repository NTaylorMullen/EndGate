var eg;
(function (eg) {
    /// <reference path="../Interfaces/IDisposable.ts" />
    /// <reference path="../Interfaces/ITyped.ts" />
    /// <reference path="../GameTime.ts" />
    /// <reference path="../Graphics/Graphic2d.ts" />
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="Camera/Camera2d.ts" />
    /// <reference path="IRenderer.ts" />
    /// <reference path="Camera/Camera2dRenderer.ts" />
    (function (Rendering) {
        /**
        * Defines a scene object that is used to maintain a list of renderable objects that are rendered onto a joint game area.
        */
        var Scene2d = (function () {
            function Scene2d(onDraw, drawArea) {
                if (typeof onDraw === "undefined") { onDraw = function (_) {
                }; }
                this._actors = [];

                if (typeof drawArea === "undefined") {
                    drawArea = this.CreateDefaultDrawArea();
                }

                this._onDraw = onDraw;

                this.ApplyStyles(drawArea);

                this.DrawArea = drawArea;
                this.Camera = new Rendering.Camera2d(new eg.Vector2d(this.DrawArea.width / 2, this.DrawArea.height / 2), new eg.Size2d(this.DrawArea.width, this.DrawArea.height));
                this._renderer = new Rendering.Camera2dRenderer(this.DrawArea, this.Camera);
                this._disposed = false;
            }
            /**
            * Adds an actor to the scene.  All actors added to the scene have their Draw function called automatically.
            * @param actor The graphic to add to the scene.
            */
            Scene2d.prototype.Add = function (actor) {
                this._actors.push(actor);
            };

            /**
            * Removes an actor from the scene.  The actor will no longer have its Draw called.
            * @param actor The graphic to remove from the scene.
            */
            Scene2d.prototype.Remove = function (actor) {
                for (var i = 0; i < this._actors.length; i++) {
                    if (this._actors[i] === actor) {
                        this._actors.splice(i, 1);
                        return;
                    }
                }
            };

            /**
            * Draws all actors within the Scene and triggers the Scene2d's onDraw callback.
            */
            Scene2d.prototype.Draw = function () {
                this._onDraw(this._renderer.Render(this._actors));
            };

            /**
            * Destroys the game canvas and clears the Scene2d's actors.
            */
            Scene2d.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;
                    this._actors = [];
                    this._renderer.Dispose();
                } else {
                    throw new Error("Scene2d cannot be disposed more than once");
                }
            };

            Scene2d.prototype.ApplyStyles = function (drawArea) {
                drawArea.style.position = "absolute";
                drawArea.style.zIndex = "2";
                drawArea.parentElement.style.position = "relative";
            };

            Scene2d.prototype.CreateDefaultDrawArea = function () {
                var drawArea = document.createElement("canvas"), body = document.getElementsByTagName('body')[0];

                drawArea.width = window.innerWidth;
                drawArea.height = window.innerHeight;

                body.appendChild(drawArea);
                body.style.margin = "0px";
                body.style.padding = "0px";

                return drawArea;
            };
            return Scene2d;
        })();
        Rendering.Scene2d = Scene2d;
    })(eg.Rendering || (eg.Rendering = {}));
    var Rendering = eg.Rendering;
})(eg || (eg = {}));
