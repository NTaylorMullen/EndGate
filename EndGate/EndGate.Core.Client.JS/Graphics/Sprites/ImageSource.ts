/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Utilities/EventHandler.ts" />

module EndGate.Core.Graphics.Sprites {

    export class ImageSource {
        public Loaded: bool;
        public ClipLocation: Assets.Vector2d;
        public ClipSize: Assets.Size2d;
        public Size: Assets.Size2d;
        public Source: HTMLImageElement;

        constructor(imageLocation: string, width: number, height: number);
        constructor(imageLocation: string, width: number, height: number, xClip: number = 0, yClip: number = 0);
        constructor(imageLocation: string, width: number, height: number, xClip: number = 0, yClip: number = 0, widthClip?: number = width, heightClip?: number = height) {
            this.Loaded = false;
            this.OnLoaded = new Utilities.EventHandler();
            this.Size = new Assets.Size2d(width, height);

            this.Source = new Image();
            this.Source.onload = () => {
                this.Loaded = true;

                this.OnLoaded.Trigger(this);
            };

            this.Source.src = imageLocation;
            this.ClipLocation = new Assets.Vector2d(xClip, yClip);
            this.ClipSize = new Assets.Size2d(widthClip, heightClip);
        }

        public OnLoaded: Utilities.EventHandler;
    }

}