/// <reference path="../Interfaces/IUpdateable.ts" />
/// <reference path="../Graphics/Graphic2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Assets/TimeSpan.ts" />
/// <reference path="../Tweening/Functions/ITweeningFunction.ts" />
/// <reference path="../Tweening/Functions/Linear.ts" />
/// <reference path="../Tweening/Vector2dTween.ts" />
/// <reference path="../Tweening/NumberTween.ts" />
/// <reference path="../Utilities/EventHandler1.ts" />
/// <reference path="../GameTime.ts" />
var EndGate;
(function (EndGate) {
    (function (Particles) {
        /**
        * Defines a particle that abides by several configured values.
        */
        var Particle = (function () {
            /**
            * Creates a new instance of the Particle object.
            * @param texture The texture for the particle.
            * @param fromLocation The from location of the Particle.
            * @param toLocation The end location of the Particle.
            * @param scale How large the Particles Texture should be.  Value will multiply the size of the provided texture.
            * @param opacity The particles opacity.  Value should be between 0 and 1.
            * @param rotation The particles initial rotation.  Value should be in radians.
            * @param rotationSpeed How fast the particle should rotate.  Value should be X radians per second.
            * @param lifetime How long the particle should live before dying.
            * @param fadeInDuration How long the particle should take to fade in.
            * @param fadeOutDuration How long the particle should take to fade out.
            * @param movementFunction The function to use to move from the 'fromLocation' to the 'toLocation'.
            */
            function Particle(texture, fromLocation, toLocation, scale, opacity, rotation, rotationSpeed, lifetime, fadeInDuration, fadeOutDuration, movementFunction) {
                texture.Position = fromLocation;
                texture.Scale(scale);
                texture.Rotation = rotation;
                texture.Opacity = 0;

                this._texture = texture;
                this._rotationSpeed = rotationSpeed;
                this._alive = true;
                this._fadingOut = false;
                this._lifetime = lifetime;
                this._createdAt = new Date().getTime();
                this._onDeath = new EndGate.EventHandler1();
                this._fadeOutDuration = fadeOutDuration;
                this._fadeOutAt = lifetime.Milliseconds - fadeOutDuration.Milliseconds;
                this._locationTween = new EndGate.Tweening.Vector2dTween(texture.Position, toLocation, lifetime, movementFunction);
                this._fadeTween = new EndGate.Tweening.NumberTween(0, opacity * 100, fadeInDuration, EndGate.Tweening.Functions.Linear.EaseNone);

                this._locationTween.Play();
                this._fadeTween.Play();
            }
            Object.defineProperty(Particle.prototype, "Texture", {
                /**
                * Gets the particles texture.
                */
                get: function () {
                    return this._texture;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Particle.prototype, "OnDeath", {
                /**
                * Gets an event that is triggered when the particle dies.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                get: function () {
                    return this._onDeath;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Determines if the particle is alive.
            */
            Particle.prototype.IsAlive = function () {
                return this._alive;
            };

            /**
            * Makes the particle move, fade, and even die if needed.
            * @param gameTime The current game time object.
            */
            Particle.prototype.Update = function (gameTime) {
                var aliveFor;

                if (this._alive) {
                    aliveFor = gameTime.Now.getTime() - this._createdAt;

                    if (aliveFor > this._lifetime.Milliseconds) {
                        this._alive = false;
                        this._onDeath.Trigger(this);
                    } else {
                        if (!this._fadingOut && aliveFor >= this._fadeOutAt) {
                            this._fadingOut = true;
                            this._fadeTween.From = this._texture.Opacity * 100;
                            this._fadeTween.To = 0;
                            this._fadeTween.Duration = this._fadeOutDuration;
                            this._fadeTween.Restart();
                        }

                        this._locationTween.Update(gameTime);
                        this._fadeTween.Update(gameTime);

                        this._texture.Rotation += gameTime.Elapsed.Seconds * this._rotationSpeed;
                        this._texture.Position = this._locationTween.Current;
                        this._texture.Opacity = this._fadeTween.Current / 100;
                    }
                }
            };
            return Particle;
        })();
        Particles.Particle = Particle;
    })(EndGate.Particles || (EndGate.Particles = {}));
    var Particles = EndGate.Particles;
})(EndGate || (EndGate = {}));
