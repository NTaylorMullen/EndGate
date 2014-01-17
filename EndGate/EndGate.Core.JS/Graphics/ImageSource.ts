/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ICloneable.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Utilities/EventHandler1.ts" />
/// <reference path="../Utilities/UtilityFunctions.ts" />

module EndGate.Graphics {

    /**
    * Defines an image resource that can be used within Sprite's, SpriteAnimation's and other drawable graphics.
    */
    export class ImageSource implements IDisposable, ICloneable {
        /**
        * Gets or sets the ClipLocation.  Represents where the image clip is within the base image.
        */
        public ClipLocation: Vector2d;
        /**
        * Gets or sets the ClipSize.  Represents how large the image clip is within the base image.
        */
        public ClipSize: Size2d;        
        /**
        * Gets or sets the Size of the image source.
        */
        public Size: Size2d;

        private _source: PIXI.BaseTexture;
        private _loaded: boolean;
        private _onLoaded: EventHandler1<ImageSource>;
        private _loadWire: (e: PIXI.IEvent) => void;

        /**
        * Creates a new instance of the ImageSource object with a pre-loaded image object.
        * @param image Image object to use as the source.
        */
        constructor(image: PIXI.BaseTexture);
        /**
        * Creates a new instance of the ImageSource object.
        * @param imageLocation Image source url (this cannot change after construction). 
        */
        constructor(imageLocation: string);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height.  ClipSize defaults to the full size and the ClipLocation defaults to (0,0). If width and height are not equal to the actual width and height of the image source the image will be stretched
        * @param imageLocation Image source url (this cannot change after construction).
        * @param width The width of the base image (this cannot change after construction).
        * @param height The height of the base image (this cannot change after construction).
        */
        constructor(imageLocation: string, width: number, height: number);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height and a clip location.  If width and height are smaller than the actual width and height of the image source the image will be stretched
        * @param image Image object to use as the source.
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.  Ultimately this width is the width that is drawn to the screen.
        * @param clipHeight The height of the clip.  Ultimately this height is the height that is drawn to the screen.
        */
        constructor(image: PIXI.BaseTexture, clipX: number, clipY: number, clipWidth: number, clipHeight: number);
        /**
        * Creates a new instance of the ImageSource object with a specified width and height and a clip location.  If width and height are smaller than the actual width and height of the image source the image will be stretched
        * @param imageLocation Image source url (this cannot change after construction).
        * @param width The width of the base image (this cannot change after construction).
        * @param height The height of the base image (this cannot change after construction).
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.  Ultimately this width is the width that is drawn to the screen.
        * @param clipHeight The height of the clip.  Ultimately this height is the height that is drawn to the screen.
        */
        constructor(imageLocation: string, width: number, height: number, clipX: number, clipY: number, clipWidth: number, clipHeight: number);
        constructor(image: any, width?: number, height?: number, clipX: number = 0, clipY: number = 0, clipWidth: number = width, clipHeight: number = height) {
            var sizeDefined: boolean = typeof width !== "undefined", imageLocation: string;

            this._onLoaded = new EventHandler1<ImageSource>();

            if (typeof image === "string") {
                imageLocation = image;
                this._loaded = false;
                this._source = PIXI.BaseTexture.fromImage(imageLocation);

                this._loadWire = (e: PIXI.IEvent) => {
                    this._loaded = true;

                    if (!sizeDefined) {
                        this.Size = new Size2d(this._source.width, this._source.height);
                        this.ClipLocation = Vector2d.Zero;
                        this.ClipSize = this.Size.Clone();
                    }

                    this._onLoaded.Trigger(this);
                    _.Utilities.UtilityFunctions.MapToPixiSize(this, "Size", this._source);
                };

                if (sizeDefined) {
                    this.Size = new Size2d(width, height);
                    this.ClipLocation = new Vector2d(clipX, clipY);
                    this.ClipSize = new Size2d(clipWidth, clipHeight);
                }
                else {
                    this.ClipSize = null; // Waiting for the image source OnLoad to set it
                }
            } else {
                clipWidth = clipX;
                clipHeight = clipY;
                clipX = width;
                clipY = height;

                this._source = image;

                this._loaded = false;

                if ((<any>this._source).hasLoaded) {
                    this._loadWire = (e: PIXI.IEvent) => {
                        this._loaded = true;

                        this._onLoaded.Trigger(this);
                        _.Utilities.UtilityFunctions.MapToPixiSize(this, "Size", this._source);
                    };

                    this.Size = new Size2d(image.width, image.height);
                } else {
                    this._loadWire = (e: PIXI.IEvent) => {
                        this._loaded = true;

                        this._onLoaded.Trigger(this);
                        this.Size = new Size2d(image.width, image.height);
                        _.Utilities.UtilityFunctions.MapToPixiSize(this, "Size", this._source);
                    };
                }

                this.ClipLocation = new Vector2d(clipX, clipY);
                this.ClipSize = new Size2d(clipWidth, clipHeight);
            }
                
            if (!(<any>this._source).hasLoaded) {// 
                this._source.addEventListener("loaded", this._loadWire);
            } else {
                setTimeout(this._loadWire, 0);
            }
        }

        /**
        * Gets the base image source.  Should not be modified once the ImageSource has been constructed
        */
        public get Source(): PIXI.BaseTexture {
            return this._source;
        }

        /**
        * Gets an event that is triggered when the base image is finished loading.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnLoaded(): EventHandler1<ImageSource> {
            return this._onLoaded;
        }

        /**
        * Determines if the ImageSource has been loaded.
        */
        public IsLoaded(): boolean {
            return this._loaded;
        }

        /**
        * Returns an ImageSource that is extracted from the current ImageSource based on the provided clip location and clip size.
        * @param clipX The horizontal location of the clip.
        * @param clipY The vertical location of the clip.
        * @param clipWidth The width of the clip.
        * @param clipHeight The height of the clip.
        */
        public Extract(clipX: number, clipY: number, clipWidth: number, clipHeight: number): ImageSource {
            return new ImageSource(this._source, clipX, clipY, clipWidth, clipHeight);
        }

        /**
        * Disposes the image source and unbinds all bound events.
        */
        public Dispose(): void {
            this._source.removeEventListener("load", this._loadWire);
            this._source = null;
            this._onLoaded.Dispose();
        }

        /**
        * Returns an identical copy of this image source.  Uses existing base image source.
        */
        public Clone(): ImageSource {
            if (this._loaded) {
                if (this.ClipSize) {
                    return new ImageSource(this._source, this.ClipLocation.X, this.ClipLocation.Y, this.ClipSize.Width, this.ClipSize.Height);
                } else {
                    return new ImageSource(this._source);
                }
            } else {
                if (this.Size) {
                    if (this.ClipSize) {
                        return new ImageSource((<any>this._source.source).href, this.Size.Width, this.Size.Height, this.ClipLocation.X, this.ClipLocation.Y, this.ClipSize.Width, this.ClipSize.Height);
                    } else {
                        return new ImageSource((<any>this._source.source).href, this.Size.Width, this.Size.Height);
                    }
                } else {
                    return new ImageSource((<any>this._source.source).href);
                }
            }
        }

        /**
        * Returns a Pixi texture object with the ImageSource's specified frame.
        */
        public ToTexture(): PIXI.Texture {
            var texture: PIXI.Texture;

            if (this._loaded) {
                texture = new PIXI.Texture(this._source, new PIXI.Rectangle(this.ClipLocation.X, this.ClipLocation.Y, this.ClipSize.Width, this.ClipSize.Height));
            } else {
                if (this.Size) {
                    this._source.width = this.Size.Width;
                    this._source.height = this.Size.Height;

                    texture = new PIXI.Texture(this._source, new PIXI.Rectangle(this.ClipLocation.X, this.ClipLocation.Y, this.ClipSize.Width, this.ClipSize.Height));
                } else {
                    throw new Error("Cannot convert to Texture, image has not finished loading, in order to turn the image into a texture pre-load specify a size");
                }
            }

            _.Utilities.UtilityFunctions.MapToPixiVector(this, "ClipLocation", texture.frame);
            _.Utilities.UtilityFunctions.MapToPixiSize(this, "ClipSize", texture.frame);

            return texture;
        }
    }

}