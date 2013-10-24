/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="../GameTime.ts" />
/// <reference path="../Graphics/Graphic2d.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="Camera/Camera2d.ts" />

module EndGate.Rendering {

    interface IActorMapping {
        Actor: Graphics.Graphic2d;
        Remove: (graphic: Graphics.Graphic2d) => any;
    }

    /**
    * Defines a scene object that is used to maintain a list of renderable objects that are rendered onto a joint game area.
    */
    export class Scene2d implements IDisposable {
        private _actors: Graphics.Graphic2d[];
        private _actorMappings: IActorMapping[];
        private _renderer: _.IRenderer;
        private _onDraw: (context: CanvasRenderingContext2D) => void;
        private _disposed: boolean;
        private _camera: Camera2d;
        private _drawArea: HTMLCanvasElement;

        /**
        * Creates a new instance of the Scene2d object.  The game canvas is created and appended to the HTML body to fill the screen.
        */
        constructor();
        /**
        * Creates a new instance of the Scene2d object.  The game canvas is created and appended to the HTML body to fill the screen.
        * @param onDraw Callback to execute whenever the Scene's draw is triggered.
        */
        constructor(onDraw: (context: CanvasRenderingContext2D) => void );
        /**
        * Creates a new instance of the Scene2d object.
        * @param onDraw Callback to execute whenever the Scene's draw is triggered.
        * @param drawArea The game canvas to draw onto.
        */
        constructor(onDraw: (context: CanvasRenderingContext2D) => void , drawArea: HTMLCanvasElement);
        constructor(onDraw: (context: CanvasRenderingContext2D) => void = _ => { }, drawArea?: HTMLCanvasElement) {
            this._actorMappings = [];
            this._actors = [];

            if (typeof drawArea === "undefined") {
                drawArea = this.CreateDefaultDrawArea();
            }

            this._onDraw = onDraw;

            this._drawArea = drawArea;
            this._camera = new Camera2d(new Vector2d(this._drawArea.width / 2, this._drawArea.height / 2), new Size2d(this._drawArea.width, this._drawArea.height));
            this._renderer = new Camera2dRenderer(this._drawArea, this._camera);
            this._disposed = false;
        }

        /**
        * Gets the canvas that the Scene2d uses as its game area.
        */
        public get DrawArea(): HTMLCanvasElement {
            return this._drawArea;
        }

        /**
        * Gets the game camera.
        */
        public get Camera(): Camera2d {
            return this._camera;
        }

        /**
        * Adds an actor to the scene.  All actors added to the scene have their Draw function called automatically.
        * @param actor The graphic to add to the scene.
        */
        public Add(actor: Graphics.Graphic2d): void {
            var mapping: IActorMapping = {
                Actor: actor,
                Remove: (graphic: Graphics.Graphic2d) => {
                    this.Remove(graphic);
                }
            };

            actor.OnDisposed.Bind(mapping.Remove);

            this._actorMappings.push(mapping);
            this._actors.push(actor);
        }

        /**
        * Removes an actor from the scene.  The actor will no longer have its Draw called.
        * @param actor The graphic to remove from the scene.
        */
        public Remove(actor: Graphics.Graphic2d): void {
            for (var i = 0; i < this._actors.length; i++) {
                if (this._actors[i] === actor) {
                    this._actors[i].OnDisposed.Unbind(this._actorMappings[i].Remove);
                    this._actors.splice(i, 1);
                    this._actorMappings.splice(i, 1);
                    return;
                }
            }
        }

        /**
        * Draws all actors within the Scene and triggers the Scene2d's onDraw callback.
        */
        public Draw(): void {
            this._onDraw(this._renderer.Render(this._actors));
        }

        /**
        * Destroys the game canvas and clears the Scene2d's actors.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                
                for (var i = 0; i < this._actors.length; i++) {
                    this.Remove(this._actors[i]);
                }

                this._actors = [];
                this._actorMappings = [];
                this._renderer.Dispose();
            }
            else {
                throw new Error("Scene2d cannot be disposed more than once");
            }
        }

        private CreateDefaultDrawArea(): HTMLCanvasElement {
            var drawArea = <HTMLCanvasElement>document.createElement("canvas"),
                body: HTMLElement = <HTMLElement>document.getElementsByTagName('body')[0];

            drawArea.width = document.documentElement.clientWidth;
            drawArea.height = document.documentElement.clientHeight - 5;

            body.appendChild(drawArea);
            body.style.margin = "0px";
            body.style.padding = "0px";

            return drawArea;
        }
    }

}