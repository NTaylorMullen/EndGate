/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Utilities/EventHandler.ts" />

module EndGate.Graphics.Assets {

    export class ImageSource {
        public Loaded: bool;
        public ClipLocation: Vector2d;
        public ClipSize: Size2d;
        public Size: Size2d;
        public Source: HTMLImageElement;

        constructor(imageLocation: string, width: number, height: number);
        constructor(imageLocation: string, width: number, height: number, xClip?: number = 0, yClip?: number = 0, widthClip?: number, heightClip?: number);
        constructor(imageLocation: string, width: number, height: number, xClip?: number = 0, yClip?: number = 0, widthClip?: number = width, heightClip?: number = height) {
            this.Loaded = false;
            this.OnLoaded = new EventHandler();
            this.Size = new Size2d(width, height);

            this.Source = new Image();
            this.Source.onload = () => {
                this.Loaded = true;

                this.OnLoaded.Trigger(this);
            };

            this.Source.src = imageLocation;
            this.ClipLocation = new Vector2d(xClip, yClip);
            this.ClipSize = new Size2d(widthClip, heightClip);
        }

        public OnLoaded: EventHandler;
    }

}