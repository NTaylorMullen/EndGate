/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="../GameTime.ts" />
/// <reference path="../Graphics/Graphic2d.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="Camera/Camera2d.ts" />
/// <reference path="IRenderer.ts" />
/// <reference path="Camera/Camera2dRenderer.ts" />

module EndGate.Rendering {

    /**
    * Defines a scene object that is used to maintain a list of renderable objects that are rendered onto a joint game area.
    */
    export class Scene2d implements IDisposable {
        /**
        * The canvas that the Scene2d uses as its game area.
        */
        public DrawArea: HTMLCanvasElement;
        /**
        * The game camera.
        */
        public Camera: Camera2d;

        private _actors: Graphics.Abstractions.Graphic2d[];
        private _renderer: _.IRenderer;
        private _onDraw: (context: CanvasRenderingContext2D) => void;
        private _disposed: bool;

        /**
        * Creates a new instance of the Scene2d object.  The game canvas is created and appended to the HTML body to fill the screen.
        */
        constructor();
        /**
        * Creates a new instance of the Scene2d object.  The game canvas is created and appended to the HTML body to fill the screen.
        * @param onDraw Callback to execute whenever the Scene's draw is triggered.
        */
        constructor(onDraw: (context: CanvasRenderingContext2D) => void);
        /**
        * Creates a new instance of the Scene2d object.
        * @param onDraw Callback to execute whenever the Scene's draw is triggered.
        * @param drawArea The game canvas to draw onto.
        */
        constructor(onDraw: (context: CanvasRenderingContext2D) => void , drawArea: HTMLCanvasElement);
        constructor(onDraw: (context: CanvasRenderingContext2D) => void = _ => { }, drawArea?: HTMLCanvasElement) {
            this._actors = [];

            if (typeof drawArea === "undefined") {
                drawArea = this.CreateDefaultDrawArea();
            }

            this._onDraw = onDraw;

            this.ApplyStyles(drawArea);

            this.DrawArea = drawArea;
            this.Camera = new Camera2d(new Vector2d(this.DrawArea.width / 2, this.DrawArea.height / 2), new Size2d(this.DrawArea.width, this.DrawArea.height));
            this._renderer = new Camera2dRenderer(this.DrawArea, this.Camera);
            this._disposed = false;
        }

        /**
        * Adds an actor to the scene.  All actors added to the scene have their Draw function called automatically.
        * @param actor The graphic to add to the scene.
        */
        public Add(actor: Graphics.Abstractions.Graphic2d): void {
            this._actors.push(actor);
        }

        /**
        * Removes an actor from the scene.  The actor will no longer have its Draw called.
        * @param actor The graphic to remove from the scene.
        */
        public Remove(actor: Graphics.Abstractions.Graphic2d): void {
            for (var i = 0; i < this._actors.length; i++) {
                if (this._actors[i] === actor) {
                    this._actors.splice(i, 1);
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
                this._actors = [];
                this._renderer.Dispose();
            }
            else {
                throw new Error("Scene2d cannot be disposed more than once");
            }
        }

        private ApplyStyles(drawArea: HTMLCanvasElement): void {
            drawArea.style.position = "absolute";
            drawArea.style.zIndex = "2"
            drawArea.parentElement.style.position = "relative";
        }

        private CreateDefaultDrawArea(): HTMLCanvasElement {
            var drawArea = <HTMLCanvasElement>document.createElement("canvas"),
                body: HTMLElement = <HTMLElement>document.getElementsByTagName('body')[0];

            drawArea.width = window.innerWidth;
            drawArea.height = window.innerHeight;            

            body.appendChild(drawArea);
            body.style.margin = "0px";
            body.style.padding = "0px";

            return drawArea;
        }
    }

}