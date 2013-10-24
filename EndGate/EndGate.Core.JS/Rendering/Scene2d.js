var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/IDisposable.ts" />
    /// <reference path="../Interfaces/ITyped.ts" />
    /// <reference path="../GameTime.ts" />
    /// <reference path="../Graphics/Graphic2d.ts" />
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="Camera/Camera2d.ts" />
    (function (Rendering) {
        /**
        * Defines a scene object that is used to maintain a list of renderable objects that are rendered onto a joint game area.
        */
        var Scene2d = (function () {
            function Scene2d(onDraw, drawArea) {
                if (typeof onDraw === "undefined") { onDraw = function (_) {
                }; }
                this._actorMappings = [];
                this._actors = [];

                if (typeof drawArea === "undefined") {
                    drawArea = this.CreateDefaultDrawArea();
                }

                this._onDraw = onDraw;

                this._drawArea = drawArea;
                this._camera = new Rendering.Camera2d(new EndGate.Vector2d(this._drawArea.width / 2, this._drawArea.height / 2), new EndGate.Size2d(this._drawArea.width, this._drawArea.height));
                this._renderer = new Rendering.Camera2dRenderer(this._drawArea, this._camera);
                this._disposed = false;
            }
            Object.defineProperty(Scene2d.prototype, "DrawArea", {
                get: /**
                * Gets the canvas that the Scene2d uses as its game area.
                */
                function () {
                    return this._drawArea;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Scene2d.prototype, "Camera", {
                get: /**
                * Gets the game camera.
                */
                function () {
                    return this._camera;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Adds an actor to the scene.  All actors added to the scene have their Draw function called automatically.
            * @param actor The graphic to add to the scene.
            */
            Scene2d.prototype.Add = function (actor) {
                var _this = this;
                var mapping = {
                    Actor: actor,
                    Remove: function (graphic) {
                        _this.Remove(graphic);
                    }
                };

                actor.OnDisposed.Bind(mapping.Remove);

                this._actorMappings.push(mapping);
                this._actors.push(actor);
            };

            /**
            * Removes an actor from the scene.  The actor will no longer have its Draw called.
            * @param actor The graphic to remove from the scene.
            */
            Scene2d.prototype.Remove = function (actor) {
                for (var i = 0; i < this._actors.length; i++) {
                    if (this._actors[i] === actor) {
                        this._actors[i].OnDisposed.Unbind(this._actorMappings[i].Remove);
                        this._actors.splice(i, 1);
                        this._actorMappings.splice(i, 1);
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

                    for (var i = 0; i < this._actors.length; i++) {
                        this.Remove(this._actors[i]);
                    }

                    this._actors = [];
                    this._actorMappings = [];
                    this._renderer.Dispose();
                } else {
                    throw new Error("Scene2d cannot be disposed more than once");
                }
            };

            Scene2d.prototype.CreateDefaultDrawArea = function () {
                var drawArea = document.createElement("canvas"), body = document.getElementsByTagName('body')[0];

                drawArea.width = document.documentElement.clientWidth;
                drawArea.height = document.documentElement.clientHeight - 5;

                body.appendChild(drawArea);
                body.style.margin = "0px";
                body.style.padding = "0px";

                return drawArea;
            };
            return Scene2d;
        })();
        Rendering.Scene2d = Scene2d;
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
