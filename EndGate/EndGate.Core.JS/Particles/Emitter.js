/// <reference path="Range.ts" />
/// <reference path="Particle.ts" />
/// <reference path="../Graphics/Graphic2d.ts" />
/// <reference path="../Assets/TimeSpan.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Extensions/MathExtensions.ts" />
/// <reference path="../Interfaces/IUpdateable.ts" />
/// <reference path="../Interfaces/ICloneable.ts" />
/// <reference path="../Tweening/Functions/ITweeningFunction.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Particles) {
        /**
        * Defines a particle emitter that can emit particles based on various configurations.
        */
        var Emitter = (function (_super) {
            __extends(Emitter, _super);
            /**
            * Creates a new instance of the Emitter object.
            * @param x The initial horizontal location of the Emitter.
            * @param y The initial vertical location of the Emitter.
            * @param emissionFunction The initial EmissionFunction to use for particle control.
            */
            function Emitter(x, y, emissionFunction) {
                var _this = this;
                _super.call(this, new PIXI.DisplayObjectContainer(), new EndGate.Vector2d(x, y));
                /**
                * Gets or sets the EmissionInterval.  The EmissionInterval is used to control how often particles are emitted.
                */
                this.EmissionInterval = new EndGate.Particles.Range(EndGate.TimeSpan.FromMilliseconds(30));
                /**
                * Gets or sets the EmissionDirection.  The EmissionDirection is used to control the angle of particle emissions.  This angle value should be in radians.
                */
                this.EmissionDirection = new EndGate.Particles.Range(0, Math.PI * 2);
                /**
                * Gets or sets the EmissionOutput.  The EmissionOutput is used to control how many particles should be emitted per emission.
                */
                this.EmissionOutput = new EndGate.Particles.Range(1);
                /**
                * Gets or sets the ParticleLifetime.  The ParticleLifetime is used to control how long particles live before dying out.
                */
                this.ParticleLifetime = new EndGate.Particles.Range(EndGate.TimeSpan.FromSeconds(1), EndGate.TimeSpan.FromSeconds(3));
                /**
                * Gets or sets the ParticleSpeed.  The ParticleSpeed is used to control the average speed that emitted particles will move at during their lifetime.
                */
                this.ParticleSpeed = new EndGate.Particles.Range(30, 100);
                /**
                * Gets or sets the ParticleScale.  The ParticleScale is used to control each particles size.  Values are percentages of particles base sizes.
                */
                this.ParticleScale = new EndGate.Particles.Range(.75, 1.5);
                /**
                * Gets or sets the ParticleRotation.  The ParticleRotation is used to control the initial rotation of emitted particles.
                */
                this.ParticleRotation = new EndGate.Particles.Range(0, Math.PI * 2);
                /**
                * Gets or sets the ParticleRotationSpeed.  The ParticleRotationSpeed is used to control how quickly emitted particles rotate.  Values should indicate X number of radians per second.
                */
                this.ParticleRotationSpeed = new EndGate.Particles.Range(0, Math.PI);
                /**
                * Gets or sets the ParticleOpacity.  The ParticleOpacity is used to control emitted particles opacity.  Values should be between 0 and 1.
                */
                this.ParticleOpacity = new EndGate.Particles.Range(1);
                /**
                * Gets or sets the ParticleFadeInDuration.  The ParticleFadeInDuration is used to control how long particles take to fade in.
                */
                this.ParticleFadeInDuration = new EndGate.Particles.Range(EndGate.TimeSpan.FromSeconds(.5));
                /**
                * Gets or sets the ParticleFadeOutDuration.  The ParticleFadeOutDuration is used to control how long particles take to fade out.
                */
                this.ParticleFadeOutDuration = new EndGate.Particles.Range(EndGate.TimeSpan.FromSeconds(.5), EndGate.TimeSpan.FromSeconds(1));

                this._texturePool = new Array();
                this._particlePool = {};
                this._particleId = 0;
                this._emitting = false;
                this._particleRemover = function (particle) {
                    _this.RemoveChild(particle.Texture);
                    delete _this._particlePool[particle._id];
                };

                this.EmissionFunction = emissionFunction;
            }
            /**
            * Determines if the Emitter is emitting particles.
            */
            Emitter.prototype.IsEmitting = function () {
                return this._emitting;
            };

            /**
            * Starts the Emitter.  Update must be called once started to begin auto-emission of particles.
            */
            Emitter.prototype.Start = function () {
                if (this._texturePool.length === 0) {
                    throw new Error("Cannot start Emitter without any textures added to it.");
                }

                this._emitting = true;
                this._lastEmit = new Date().getTime();
            };

            /**
            * Stops the Emitter, no particles will be emitted while stopped.
            */
            Emitter.prototype.Stop = function () {
                this._emitting = false;
            };

            Emitter.prototype.AddTexture = function (texture, weight) {
                if (typeof weight === "undefined") { weight = 1; }
                for (var i = 0; i < weight; i++) {
                    this._texturePool.push(texture);
                }
            };

            /**
            * Removes the provided texture from the texture pool.
            * @param texture The texture to remove from the pool.
            */
            Emitter.prototype.RemoveTexture = function (texture) {
                for (var i = 0; i < this._texturePool.length; i++) {
                    if (this._texturePool[i] === texture) {
                        this._texturePool.splice(i--, 1);
                    }
                }
            };

            /**
            * Emits particles based on the Emitters configuration.  Does not abide by the EmissionInterval.
            * To allow for complex particle manipulation this method can be overridden by derived Emitter classes.
            */
            Emitter.prototype.Emit = function () {
                var particleCount = EndGate.Particles.Range.RandomNumber(this.EmissionOutput), endLocation, emissionDirection, particleSpeed, particleLifeTime, particle, particles = new Array();

                for (var i = 0; i < particleCount; i++) {
                    particleLifeTime = EndGate.Particles.Range.RandomTimeSpan(this.ParticleLifetime);
                    particleSpeed = EndGate.Particles.Range.RandomNumber(this.ParticleSpeed);
                    emissionDirection = EndGate.Particles.Range.RandomNumber(this.EmissionDirection);
                    endLocation = new EndGate.Vector2d(particleLifeTime.Seconds * particleSpeed, 0).RotateAround(EndGate.Vector2d.Zero, emissionDirection);

                    particle = new EndGate.Particles.Particle(this.BuildTextureFromPool(), EndGate.Vector2d.Zero, endLocation, EndGate.Particles.Range.RandomNumber(this.ParticleScale), EndGate.Particles.Range.RandomNumber(this.ParticleOpacity), EndGate.Particles.Range.RandomNumber(this.ParticleRotation), EndGate.Particles.Range.RandomNumber(this.ParticleRotationSpeed), particleLifeTime, EndGate.Particles.Range.RandomTimeSpan(this.ParticleFadeInDuration), EndGate.Particles.Range.RandomTimeSpan(this.ParticleFadeOutDuration), this.EmissionFunction);

                    particle._id = this._particleId++;

                    this._particlePool[particle._id] = particle;

                    this.AddChild(particle.Texture);
                    particle.OnDeath.Bind(this._particleRemover);

                    particles.push(particle);
                }

                return particles;
            };

            /**
            * Scale is not implemented.
            * @param scale The value to multiply the graphic's size by.
            */
            Emitter.prototype.Scale = function (scale) {
                throw new Error("Scale is not implemented for the Emitter class.");
            };

            /**
            * Attempts to emit particles if the configured EmisisonInterval has passed since the last Emission.
            * @param gameTime The current game time object.
            */
            Emitter.prototype.Update = function (gameTime) {
                var timeSinceEmit, emitCount, emissionRate;

                if (this._emitting) {
                    emissionRate = EndGate.Particles.Range.RandomTimeSpan(this.EmissionInterval).Milliseconds;
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
            };

            /**
            * The bounding area that represents where the Emitter will draw.
            */
            Emitter.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingCircle(this.Position, this.ParticleSpeed.Max * this.ParticleLifetime.Max.Seconds);

                return bounds;
            };

            /**
            * Returns a nearly identical copy of this Emitter.  The cloned Emitter will be stopped.  If this Emitter belongs to a parent, the cloned Emitter will not. The cloned Emitter will not have the same event bindings as this one does.
            */
            Emitter.prototype.Clone = function () {
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
            };

            Emitter.prototype.BuildTextureFromPool = function () {
                var textureIndex = Math.floor(Math.random() * this._texturePool.length);

                return this._texturePool[textureIndex].Clone();
            };
            return Emitter;
        })(EndGate.Graphics.Graphic2d);
        Particles.Emitter = Emitter;
    })(EndGate.Particles || (EndGate.Particles = {}));
    var Particles = EndGate.Particles;
})(EndGate || (EndGate = {}));
