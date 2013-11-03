/// <reference path="Range.ts" />
/// <reference path="Particle.ts" />
/// <reference path="../Graphics/Graphic2d.ts" />
/// <reference path="../Assets/TimeSpan.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Extensions/MathExtensions.ts" />
/// <reference path="../Interfaces/IUpdateable.ts" />
/// <reference path="../Interfaces/ICloneable.ts" />
/// <reference path="../Tweening/Functions/ITweeningFunction.ts" />

module EndGate.Particles {

    /**
    * Defines a particle emitter that can emit particles based on various configurations.
    */
    export class Emitter extends Graphics.Graphic2d implements IUpdateable {
        private _texturePool: Array<Graphics.Graphic2d>;
        private _particlePool: { [particleId: number]: Particle };
        private _particleId: number;
        private _lastEmit: number;
        private _emitting: boolean;
        private _particleRemover: (particle: Particle) => void;

        /**
        * Gets or sets the EmissionFunction.  The EmissionFunction is used to control how emitted particles move once emitted.
        */
        public EmissionFunction: Tweening.Functions.ITweeningFunction;
        /**
        * Gets or sets the EmissionInterval.  The EmissionInterval is used to control how often particles are emitted.
        */
        public EmissionInterval: Range<TimeSpan> = new Range<TimeSpan>(TimeSpan.FromMilliseconds(30));
        /**
        * Gets or sets the EmissionDirection.  The EmissionDirection is used to control the angle of particle emissions.  This angle value should be in radians.
        */
        public EmissionDirection: Range<number> = new Range<number>(0, Math.PI * 2);
        /**
        * Gets or sets the EmissionOutput.  The EmissionOutput is used to control how many particles should be emitted per emission.
        */
        public EmissionOutput: Range<number> = new Range<number>(1);
        /**
        * Gets or sets the ParticleLifetime.  The ParticleLifetime is used to control how long particles live before dying out.
        */
        public ParticleLifetime: Range<TimeSpan> = new Range<TimeSpan>(TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(3));
        /**
        * Gets or sets the ParticleSpeed.  The ParticleSpeed is used to control the average speed that emitted particles will move at during their lifetime.
        */
        public ParticleSpeed: Range<number> = new Range<number>(30, 100);
        /**
        * Gets or sets the ParticleScale.  The ParticleScale is used to control each particles size.  Values are percentages of particles base sizes.
        */
        public ParticleScale: Range<number> = new Range<number>(.75, 1.5);
        /**
        * Gets or sets the ParticleRotation.  The ParticleRotation is used to control the initial rotation of emitted particles.
        */
        public ParticleRotation: Range<number> = new Range<number>(0, Math.PI * 2);
        /**
        * Gets or sets the ParticleRotationSpeed.  The ParticleRotationSpeed is used to control how quickly emitted particles rotate.  Values should indicate X number of radians per second.
        */
        public ParticleRotationSpeed: Range<number> = new Range<number>(0, Math.PI);
        /**
        * Gets or sets the ParticleOpacity.  The ParticleOpacity is used to control emitted particles opacity.  Values should be between 0 and 1.
        */
        public ParticleOpacity: Range<number> = new Range<number>(1);
        /**
        * Gets or sets the ParticleFadeInDuration.  The ParticleFadeInDuration is used to control how long particles take to fade in.
        */
        public ParticleFadeInDuration: Range<TimeSpan> = new Range<TimeSpan>(TimeSpan.FromSeconds(.5));
        /**
        * Gets or sets the ParticleFadeOutDuration.  The ParticleFadeOutDuration is used to control how long particles take to fade out.
        */
        public ParticleFadeOutDuration: Range<TimeSpan> = new Range<TimeSpan>(TimeSpan.FromSeconds(.5), TimeSpan.FromSeconds(1));

        /**
        * Creates a new instance of the Emitter object.
        * @param x The initial horizontal location of the Emitter.
        * @param y The initial vertical location of the Emitter.
        * @param emissionFunction The initial EmissionFunction to use for particle control.
        */
        constructor(x: number, y: number, emissionFunction: Tweening.Functions.ITweeningFunction) {
            super(new PIXI.DisplayObjectContainer(), new Vector2d(x, y));

            this._texturePool = new Array<Graphics.Graphic2d>()
            this._particlePool = {};
            this._particleId = 0;
            this._emitting = false;
            this._particleRemover = (particle: Particle) => {
                this.RemoveChild(particle.Texture);
                delete this._particlePool[particle._id];
            };

            this.EmissionFunction = emissionFunction;
        }

        /**
        * Determines if the Emitter is emitting particles.
        */
        public IsEmitting(): boolean {
            return this._emitting;
        }

        /**
        * Starts the Emitter.  Update must be called once started to begin auto-emission of particles.
        */
        public Start(): void {
            if (this._texturePool.length === 0) {
                throw new Error("Cannot start Emitter without any textures added to it.");
            }

            this._emitting = true;
            this._lastEmit = new Date().getTime();
        }

        /**
        * Stops the Emitter, no particles will be emitted while stopped.
        */
        public Stop(): void {
            this._emitting = false;
        }

        /**
        * Adds a texture to the Emitters texture pool.
        * @param texture The texture to add to the pool.
        */
        public AddTexture(texture: Graphics.Graphic2d): void;
        /**
        * Adds a texture to the Emitters texture pool with the provided weight.
        * @param texture The texture to add to the pool.
        * @param weight The weight of the provided texture. A texture with weight 2 will be emitted two times more than a texture with weight 1.
        */
        public AddTexture(texture: Graphics.Graphic2d, weight: number): void;
        public AddTexture(texture: Graphics.Graphic2d, weight: number = 1): void {
            for (var i = 0; i < weight; i++) {
                this._texturePool.push(texture);
            }
        }

        /**
        * Removes the provided texture from the texture pool.
        * @param texture The texture to remove from the pool.
        */
        public RemoveTexture(texture: Graphics.Graphic2d): void {
            for (var i = 0; i < this._texturePool.length; i++) {
                if (this._texturePool[i] === texture) {
                    this._texturePool.splice(i--, 1);
                }
            }
        }

        /**
        * Emits particles based on the Emitters configuration.  Does not abide by the EmissionInterval.
        * To allow for complex particle manipulation this method can be overridden by derived Emitter classes.
        */
        public Emit(): Array<Particle> {
            var particleCount: number = Range.RandomNumber(this.EmissionOutput),
                endLocation: Vector2d,
                emissionDirection: number,
                particleSpeed: number,
                particleLifeTime: TimeSpan,
                particle: Particle,
                particles: Array<Particle> = new Array<Particle>();

            for (var i = 0; i < particleCount; i++) {
                particleLifeTime = Range.RandomTimeSpan(this.ParticleLifetime);
                particleSpeed = Range.RandomNumber(this.ParticleSpeed);
                emissionDirection = Range.RandomNumber(this.EmissionDirection);
                endLocation = new Vector2d(particleLifeTime.Seconds * particleSpeed, 0).RotateAround(Vector2d.Zero, emissionDirection);

                particle = new Particle(
                    this.BuildTextureFromPool(),
                    Vector2d.Zero,
                    endLocation,
                    Range.RandomNumber(this.ParticleScale),
                    Range.RandomNumber(this.ParticleOpacity),
                    Range.RandomNumber(this.ParticleRotation),
                    Range.RandomNumber(this.ParticleRotationSpeed),
                    particleLifeTime,
                    Range.RandomTimeSpan(this.ParticleFadeInDuration),
                    Range.RandomTimeSpan(this.ParticleFadeOutDuration),
                    this.EmissionFunction
                    );

                particle._id = this._particleId++;

                this._particlePool[particle._id] = particle;

                this.AddChild(particle.Texture);
                particle.OnDeath.Bind(this._particleRemover);

                particles.push(particle);
            }

            return particles;
        }

        /**
        * Scale is not implemented.
        * @param scale The value to multiply the graphic's size by.
        */
        public Scale(scale: number): void {
            throw new Error("Scale is not implemented for the Emitter class.");
        }

        /**
        * Attempts to emit particles if the configured EmisisonInterval has passed since the last Emission.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            var timeSinceEmit: number,
                emitCount: number,
                emissionRate: number;

            if (this._emitting) {
                emissionRate = Range.RandomTimeSpan(this.EmissionInterval).Milliseconds;
                if (emissionRate > 0) {
                    timeSinceEmit = gameTime.Now.getTime() - this._lastEmit;
                    emitCount = Math.floor(timeSinceEmit / emissionRate);

                    if (emitCount > 0) {
                        this._lastEmit = gameTime.Now.getTime();

                        for (var i = 0; i < emitCount; i++) {
                            this.Emit();
                        }
                    }
                }

                for (var particleId in this._particlePool) {
                    this._particlePool[particleId].Update(gameTime);
                }
            }
        }

        /**
        * The bounding area that represents where the Emitter will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = new Bounds.BoundingCircle(this.Position, this.ParticleSpeed.Max * this.ParticleLifetime.Max.Seconds);

            return bounds;
        }

        /**
        * Returns a nearly identical copy of this Emitter.  The cloned Emitter will be stopped.  If this Emitter belongs to a parent, the cloned Emitter will not. The cloned Emitter will not have the same event bindings as this one does.
        */
        public Clone(): Emitter {
            var clone = new Emitter(this.Position.X, this.Position.Y, this.EmissionFunction);

            for (var i = 0; i < this._texturePool.length; i++) {
                clone.AddTexture(this._texturePool[i]);
            }

            clone.EmissionInterval = this.EmissionInterval.Clone();
            clone.EmissionDirection = this.EmissionDirection.Clone();
            clone.EmissionOutput = this.EmissionOutput.Clone();
            clone.ParticleLifetime = this.ParticleLifetime.Clone();
            clone.ParticleSpeed = this.ParticleSpeed.Clone();
            clone.ParticleRotation = this.ParticleRotation.Clone();
            clone.ParticleRotationSpeed = this.ParticleRotationSpeed.Clone();
            clone.ParticleFadeInDuration = this.ParticleFadeInDuration.Clone();
            clone.ParticleFadeOutDuration = this.ParticleFadeOutDuration.Clone();
            clone.ParticleScale = this.ParticleScale.Clone();
            clone.ParticleOpacity = this.ParticleOpacity.Clone();

            clone.Opacity = this.Opacity;
            clone.Rotation = this.Rotation;
            clone.Visible = this.Visible;
            clone.ZIndex = this.ZIndex;

            return clone;
        }

        private BuildTextureFromPool(): Graphics.Graphic2d {
            var textureIndex = Math.floor(Math.random() * this._texturePool.length);

            return this._texturePool[textureIndex].Clone();
        }
    }

}