/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="CustomSlider.ts" />

(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        game: Particles.Game,
        // Instantiates all of the sliders
        emissionDirectionMinSlider: Particles.CustomSlider,
        emissionDirectionMaxSlider: Particles.CustomSlider,
        emissionIntervalMinSlider: Particles.CustomSlider,
        emissionIntervalMaxSlider: Particles.CustomSlider,
        emissionOutputMinSlider: Particles.CustomSlider,
        emissionOutputMaxSlider: Particles.CustomSlider,
        particleScaleMinSlider: Particles.CustomSlider,
        particleScaleMaxSlider: Particles.CustomSlider,
        particleOpacityMinSlider: Particles.CustomSlider,
        particleOpacityMaxSlider: Particles.CustomSlider,
        particleRotationMinSlider: Particles.CustomSlider,
        particleRotationMaxSlider: Particles.CustomSlider,
        particleRotationSpeedMinSlider: Particles.CustomSlider,
        particleRotationSpeedMaxSlider: Particles.CustomSlider,
        particleLifetimeMinSlider: Particles.CustomSlider,
        particleLifetimeMaxSlider: Particles.CustomSlider,
        particleSpeedMinSlider: Particles.CustomSlider,
        particleSpeedMaxSlider: Particles.CustomSlider,
        particleFadeInDurationMinSlider: Particles.CustomSlider,
        particleFadeInDurationMaxSlider: Particles.CustomSlider,
        particleFadeOutDurationMinSlider: Particles.CustomSlider,
        particleFadeOutDurationMaxSlider: Particles.CustomSlider;

    // Setup DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create game
    game = new Particles.Game(canvas, $("#tweenFunction"));

    // Wire up all the sliders
    emissionDirectionMinSlider = new Particles.CustomSlider($("#emissionDirectionMin"), 0, 628, 0, (newDirectionMin: number) => {
        game.Emitter.EmissionDirection.Min = newDirectionMin / 100;
    });
    emissionDirectionMaxSlider = new Particles.CustomSlider($("#emissionDirectionMax"), 0, 628, 628, (newDirectionMax: number) => {
        game.Emitter.EmissionDirection.Max = newDirectionMax / 100;
    });
    emissionIntervalMinSlider = new Particles.CustomSlider($("#emissionIntervalMin"), 0, 1000, 30, (newIntervalMin: number) => {
        game.Emitter.EmissionInterval.Min = eg.TimeSpan.FromMilliseconds(newIntervalMin);
    });
    emissionIntervalMaxSlider = new Particles.CustomSlider($("#emissionIntervalMax"), 0, 1000, 30, (newIntervalMax: number) => {
        game.Emitter.EmissionInterval.Max = eg.TimeSpan.FromMilliseconds(newIntervalMax);
    });
    emissionOutputMinSlider = new Particles.CustomSlider($("#emissionOutputMin"), 0, 20, 1, (newOutputMin: number) => {
        game.Emitter.EmissionOutput.Min = newOutputMin;
    });
    emissionOutputMaxSlider = new Particles.CustomSlider($("#emissionOutputMax"), 0, 20, 5, (newOutputMax: number) => {
        game.Emitter.EmissionOutput.Max = newOutputMax;
    });
    particleScaleMinSlider = new Particles.CustomSlider($("#particleScaleMin"), 0, 500, 75, (newScaleMin: number) => {
        game.Emitter.ParticleScale.Min = newScaleMin / 100;
    });
    particleScaleMaxSlider = new Particles.CustomSlider($("#particleScaleMax"), 0, 500, 150, (newScaleMax: number) => {
        game.Emitter.ParticleScale.Max = newScaleMax / 100;
    });
    particleOpacityMinSlider = new Particles.CustomSlider($("#particleOpacityMin"), 0, 100, 100, (newOpacityMin: number) => {
        game.Emitter.ParticleOpacity.Min = newOpacityMin / 100;
    });
    particleOpacityMaxSlider = new Particles.CustomSlider($("#particleOpacityMax"), 0, 100, 100, (newOpacityMax: number) => {
        game.Emitter.ParticleOpacity.Max = newOpacityMax / 100;
    });
    particleRotationMinSlider = new Particles.CustomSlider($("#particleRotationMin"), 0, 628, 0, (newRotationMin: number) => {
        game.Emitter.ParticleRotation.Min = newRotationMin / 100;
    });
    particleRotationMaxSlider = new Particles.CustomSlider($("#particleRotationMax"), 0, 628, 628, (newRotationMax: number) => {
        game.Emitter.ParticleRotation.Max = newRotationMax / 100;
    });
    particleRotationSpeedMinSlider = new Particles.CustomSlider($("#particleRotationSpeedMin"), 0, 2512, 0, (newRotationSpeedMin: number) => {
        game.Emitter.ParticleRotationSpeed.Min = newRotationSpeedMin / 100;
    });
    particleRotationSpeedMaxSlider = new Particles.CustomSlider($("#particleRotationSpeedMax"), 0, 2512, 628, (newRotationSpeedMax: number) => {
        game.Emitter.ParticleRotationSpeed.Max = newRotationSpeedMax / 100;
    });
    particleLifetimeMinSlider = new Particles.CustomSlider($("#particleLifetimeMin"), 0, 10000, 1000, (newLifetimeMin: number) => {
        game.Emitter.ParticleLifetime.Min = eg.TimeSpan.FromMilliseconds(newLifetimeMin);
    });
    particleLifetimeMaxSlider = new Particles.CustomSlider($("#particleLifetimeMax"), 0, 10000, 3000, (newLifetimeMax: number) => {
        game.Emitter.ParticleLifetime.Max = eg.TimeSpan.FromMilliseconds(newLifetimeMax);
    });
    particleSpeedMinSlider = new Particles.CustomSlider($("#particleSpeedMin"), 0, 500, 30, (newSpeedMin: number) => {
        game.Emitter.ParticleSpeed.Min = newSpeedMin;
    });
    particleSpeedMaxSlider = new Particles.CustomSlider($("#particleSpeedMax"), 0, 500, 100, (newSpeedMax: number) => {
        game.Emitter.ParticleSpeed.Max = newSpeedMax;
    });
    particleFadeInDurationMinSlider = new Particles.CustomSlider($("#particleFadeInDurationMin"), 0, 4000, 500, (newFadeInMin: number) => {
        game.Emitter.ParticleFadeInDuration.Min = eg.TimeSpan.FromMilliseconds(newFadeInMin);
    });
    particleFadeInDurationMaxSlider = new Particles.CustomSlider($("#particleFadeInDurationMax"), 0, 4000, 500, (newFadeInMax: number) => {
        game.Emitter.ParticleFadeInDuration.Max = eg.TimeSpan.FromMilliseconds(newFadeInMax);
    });
    particleFadeOutDurationMinSlider = new Particles.CustomSlider($("#particleFadeOutDurationMin"), 0, 4000, 500, (newFadeOutMin: number) => {
        game.Emitter.ParticleFadeOutDuration.Min = eg.TimeSpan.FromMilliseconds(newFadeOutMin);
    });
    particleFadeOutDurationMaxSlider = new Particles.CustomSlider($("#particleFadeOutDurationMax"), 0, 4000, 500, (newFadeOutMax: number) => {
        game.Emitter.ParticleFadeOutDuration.Max = eg.TimeSpan.FromMilliseconds(newFadeOutMax);
    });

})($, window);