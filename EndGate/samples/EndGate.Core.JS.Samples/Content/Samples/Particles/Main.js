/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />
/// <reference path="CustomSlider.ts" />
(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), game, emissionDirectionMinSlider, emissionDirectionMaxSlider, emissionIntervalMinSlider, emissionIntervalMaxSlider, emissionOutputMinSlider, emissionOutputMaxSlider, particleScaleMinSlider, particleScaleMaxSlider, particleOpacityMinSlider, particleOpacityMaxSlider, particleRotationMinSlider, particleRotationMaxSlider, particleRotationSpeedMinSlider, particleRotationSpeedMaxSlider, particleLifetimeMinSlider, particleLifetimeMaxSlider, particleSpeedMinSlider, particleSpeedMaxSlider, particleFadeInDurationMinSlider, particleFadeInDurationMaxSlider, particleFadeOutDurationMinSlider, particleFadeOutDurationMaxSlider;

    // Setup DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create game
    game = new Particles.Game(canvas, $("#tweenFunction"));

    // Wire up all the sliders
    emissionDirectionMinSlider = new Particles.CustomSlider($("#emissionDirectionMin"), 0, 628, 0, function (newDirectionMin) {
        game.Emitter.EmissionDirection.Min = newDirectionMin / 100;
    });
    emissionDirectionMaxSlider = new Particles.CustomSlider($("#emissionDirectionMax"), 0, 628, 628, function (newDirectionMax) {
        game.Emitter.EmissionDirection.Max = newDirectionMax / 100;
    });
    emissionIntervalMinSlider = new Particles.CustomSlider($("#emissionIntervalMin"), 0, 1000, 30, function (newIntervalMin) {
        game.Emitter.EmissionInterval.Min = eg.TimeSpan.FromMilliseconds(newIntervalMin);
    });
    emissionIntervalMaxSlider = new Particles.CustomSlider($("#emissionIntervalMax"), 0, 1000, 30, function (newIntervalMax) {
        game.Emitter.EmissionInterval.Max = eg.TimeSpan.FromMilliseconds(newIntervalMax);
    });
    emissionOutputMinSlider = new Particles.CustomSlider($("#emissionOutputMin"), 0, 20, 1, function (newOutputMin) {
        game.Emitter.EmissionOutput.Min = newOutputMin;
    });
    emissionOutputMaxSlider = new Particles.CustomSlider($("#emissionOutputMax"), 0, 20, 5, function (newOutputMax) {
        game.Emitter.EmissionOutput.Max = newOutputMax;
    });
    particleScaleMinSlider = new Particles.CustomSlider($("#particleScaleMin"), 0, 500, 75, function (newScaleMin) {
        game.Emitter.ParticleScale.Min = newScaleMin / 100;
    });
    particleScaleMaxSlider = new Particles.CustomSlider($("#particleScaleMax"), 0, 500, 150, function (newScaleMax) {
        game.Emitter.ParticleScale.Max = newScaleMax / 100;
    });
    particleOpacityMinSlider = new Particles.CustomSlider($("#particleOpacityMin"), 0, 100, 100, function (newOpacityMin) {
        game.Emitter.ParticleOpacity.Min = newOpacityMin / 100;
    });
    particleOpacityMaxSlider = new Particles.CustomSlider($("#particleOpacityMax"), 0, 100, 100, function (newOpacityMax) {
        game.Emitter.ParticleOpacity.Max = newOpacityMax / 100;
    });
    particleRotationMinSlider = new Particles.CustomSlider($("#particleRotationMin"), 0, 628, 0, function (newRotationMin) {
        game.Emitter.ParticleRotation.Min = newRotationMin / 100;
    });
    particleRotationMaxSlider = new Particles.CustomSlider($("#particleRotationMax"), 0, 628, 628, function (newRotationMax) {
        game.Emitter.ParticleRotation.Max = newRotationMax / 100;
    });
    particleRotationSpeedMinSlider = new Particles.CustomSlider($("#particleRotationSpeedMin"), 0, 2512, 0, function (newRotationSpeedMin) {
        game.Emitter.ParticleRotationSpeed.Min = newRotationSpeedMin / 100;
    });
    particleRotationSpeedMaxSlider = new Particles.CustomSlider($("#particleRotationSpeedMax"), 0, 2512, 628, function (newRotationSpeedMax) {
        game.Emitter.ParticleRotationSpeed.Max = newRotationSpeedMax / 100;
    });
    particleLifetimeMinSlider = new Particles.CustomSlider($("#particleLifetimeMin"), 0, 10000, 1000, function (newLifetimeMin) {
        game.Emitter.ParticleLifetime.Min = eg.TimeSpan.FromMilliseconds(newLifetimeMin);
    });
    particleLifetimeMaxSlider = new Particles.CustomSlider($("#particleLifetimeMax"), 0, 10000, 3000, function (newLifetimeMax) {
        game.Emitter.ParticleLifetime.Max = eg.TimeSpan.FromMilliseconds(newLifetimeMax);
    });
    particleSpeedMinSlider = new Particles.CustomSlider($("#particleSpeedMin"), 0, 500, 30, function (newSpeedMin) {
        game.Emitter.ParticleSpeed.Min = newSpeedMin;
    });
    particleSpeedMaxSlider = new Particles.CustomSlider($("#particleSpeedMax"), 0, 500, 100, function (newSpeedMax) {
        game.Emitter.ParticleSpeed.Max = newSpeedMax;
    });
    particleFadeInDurationMinSlider = new Particles.CustomSlider($("#particleFadeInDurationMin"), 0, 4000, 500, function (newFadeInMin) {
        game.Emitter.ParticleFadeInDuration.Min = eg.TimeSpan.FromMilliseconds(newFadeInMin);
    });
    particleFadeInDurationMaxSlider = new Particles.CustomSlider($("#particleFadeInDurationMax"), 0, 4000, 500, function (newFadeInMax) {
        game.Emitter.ParticleFadeInDuration.Max = eg.TimeSpan.FromMilliseconds(newFadeInMax);
    });
    particleFadeOutDurationMinSlider = new Particles.CustomSlider($("#particleFadeOutDurationMin"), 0, 4000, 500, function (newFadeOutMin) {
        game.Emitter.ParticleFadeOutDuration.Min = eg.TimeSpan.FromMilliseconds(newFadeOutMin);
    });
    particleFadeOutDurationMaxSlider = new Particles.CustomSlider($("#particleFadeOutDurationMax"), 0, 4000, 500, function (newFadeOutMax) {
        game.Emitter.ParticleFadeOutDuration.Max = eg.TimeSpan.FromMilliseconds(newFadeOutMax);
    });
})($, window);
//# sourceMappingURL=Main.js.map
