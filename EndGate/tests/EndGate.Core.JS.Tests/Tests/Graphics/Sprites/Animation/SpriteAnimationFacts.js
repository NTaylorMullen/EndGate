(function () {

    QUnit.module("Sprite Animation Facts");

    QUnit.test("Creating a SpriteAnimation with an unloaded image source does not throw.", function () {
        var imageSource = new eg.Graphics.ImageSource("https://www.google.com/images/srpr/logo4w.png"),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 8);

        QUnit.throws(function () {
            animation.Play()
        });
    });

    QUnit.asyncTimeoutTest("Stepping moves forward the current frame.", 10000, function (end, assert, testName) {
        var imageSource = new eg.Graphics.ImageSource("https://www.google.com/images/srpr/logo4w.png", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 8);

        imageSource.OnLoaded.Bind(function () {
            QUnit.equal(animation._currentFrame, 0);

            animation.Step();

            QUnit.equal(animation._currentFrame, 1);

            animation.Step(3);

            QUnit.equal(animation._currentFrame, 4);
            end();
        });

        return function () { };
    });

    QUnit.asyncTimeoutTest("After play image source is updated to match animation frame.", 10000, function (end, assert, testName) {
        var imageSource = new eg.Graphics.ImageSource("https://www.google.com/images/srpr/logo4w.png", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 8);

        imageSource.OnLoaded.Bind(function () {
            var gameTime = {
                Now: new Date()
            };

            QUnit.ok(imageSource.ClipSize.Equivalent(new eg.Size2d(200, 100)));

            animation.Play();

            QUnit.ok(imageSource.ClipSize.Equivalent(new eg.Size2d(50, 50)));

            animation.Update(gameTime);

            QUnit.ok(imageSource.ClipSize.Equivalent(new eg.Size2d(50, 50)));
            QUnit.ok(imageSource.ClipLocation.Equivalent(eg.Vector2d.Zero));

            gameTime.Now = new Date(new Date().getTime() + (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 1);
            QUnit.ok(imageSource.ClipSize.Equivalent(new eg.Size2d(50, 50)));
            QUnit.ok(imageSource.ClipLocation.Equivalent(new eg.Vector2d(50, 0)));

            gameTime.Now = new Date(new Date().getTime() + 6 * (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 6);
            QUnit.ok(imageSource.ClipSize.Equivalent(new eg.Size2d(50, 50)));
            QUnit.ok(imageSource.ClipLocation.Equivalent(new eg.Vector2d(100, 50)));
            end();
        });
    });

    QUnit.asyncTimeoutTest("Animations obey start offsets.", 10000, function (end, assert, testName) {
        var imageSource = new eg.Graphics.ImageSource("https://www.google.com/images/srpr/logo4w.png", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6, new eg.Vector2d(50, 0));

        imageSource.OnLoaded.Bind(function () {
            var gameTime = {
                Now: new Date()
            };

            animation.Play();
            animation.Update(gameTime);

            QUnit.ok(imageSource.ClipSize.Equivalent(new eg.Size2d(50, 50)));
            QUnit.ok(imageSource.ClipLocation.Equivalent(new eg.Vector2d(50, 0)));

            gameTime.Now = new Date(new Date().getTime() + (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 1);
            QUnit.ok(imageSource.ClipSize.Equivalent(new eg.Size2d(50, 50)));
            QUnit.ok(imageSource.ClipLocation.Equivalent(new eg.Vector2d(100, 0)));

            gameTime.Now = new Date(new Date().getTime() + 5 * (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 5);
            QUnit.ok(imageSource.ClipSize.Equivalent(new eg.Size2d(50, 50)));
            QUnit.ok(imageSource.ClipLocation.Equivalent(new eg.Vector2d(150, 50)));
            end();
        });
    });

    QUnit.asyncTimeoutTest("ImageSource is updated according to the fps.", 10000, function (end, assert, testName) {
        var imageSource = new eg.Graphics.ImageSource("https://www.google.com/images/srpr/logo4w.png", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6);

        imageSource.OnLoaded.Bind(function () {
            var gameTime = {
                Now: new Date()
            };

            animation.Play();
            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 0);

            gameTime.Now = new Date(new Date().getTime() + (1000 / 20) - 5);

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 0);

            gameTime.Now = new Date(new Date().getTime() + (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 1);

            animation.Fps = 40;
            gameTime.Now = new Date(gameTime.Now.getTime() + (1000 / 40));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 2);
            end();
        });
    });

    QUnit.asyncTimeoutTest("After play pausing does not allow automatic increase in frame.", 10000, function (end, assert, testName) {
        var imageSource = new eg.Graphics.ImageSource("https://www.google.com/images/srpr/logo4w.png", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6);

        imageSource.OnLoaded.Bind(function () {
            var gameTime = {
                Now: new Date()
            };

            animation.Play();
            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 0);

            gameTime.Now = new Date(new Date().getTime() + (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 1);

            animation.Pause();
            gameTime.Now = new Date(gameTime.Now.getTime() + (1000 / 10));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 1);

            animation.Play();

            gameTime.Now = new Date(new Date().getTime() + (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 2);
            end();
        });
    });

    QUnit.asyncTimeoutTest("If repeating and playing the current frame rolls over the horn.", 10000, function (end, assert, testName) {
        var imageSource = new eg.Graphics.ImageSource("https://www.google.com/images/srpr/logo4w.png", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6);

        imageSource.OnLoaded.Bind(function () {
            var gameTime = {
                Now: new Date()
            };
            animation.Play(true);
            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 0);

            gameTime.Now = new Date(new Date().getTime() + 5 * (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 5);

            gameTime.Now = new Date(gameTime.Now.getTime() + 2 * (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 1);
            end();
        });
    });

    QUnit.asyncTimeoutTest("After animation completes the animation no longer plays.", 10000, function (end, assert, testName) {
        var imageSource = new eg.Graphics.ImageSource("https://www.google.com/images/srpr/logo4w.png", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6);

        imageSource.OnLoaded.Bind(function () {
            var gameTime = {
                Now: new Date()
            };

            animation.Play();
            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 0);

            gameTime.Now = new Date(new Date().getTime() + 5 * (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 5);
            QUnit.ok(animation.IsPlaying());

            gameTime.Now = new Date(gameTime.Now.getTime() + 2 * (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 5);
            QUnit.ok(!animation.IsPlaying());
            end();
        });
    });

    QUnit.asyncTimeoutTest("OnComplete triggers when not repeating and animation finishes.", 10000, function (end, assert, testName) {
        var imageSource = new eg.Graphics.ImageSource("https://www.google.com/images/srpr/logo4w.png", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6),
            triggered = false;

        imageSource.OnLoaded.Bind(function () {
            var gameTime = {
                Now: new Date()
            };

            animation.OnComplete.Bind(function () {
                triggered = true;
            });
            animation.Play();

            gameTime.Now = new Date(new Date().getTime() + 6 * (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 5);
            QUnit.ok(!animation.IsPlaying());
            QUnit.ok(triggered);
            end();
        });
    });

    QUnit.asyncTimeoutTest("Stop prevents automatic updating of frame.", 10000, function (end, assert, testName) {
        var imageSource = new eg.Graphics.ImageSource("https://www.google.com/images/srpr/logo4w.png", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6);

        imageSource.OnLoaded.Bind(function () {
            var gameTime = {
                Now: new Date()
            };

            animation.Play();
            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 0);

            gameTime.Now = new Date(new Date().getTime() + 5 * (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 5);
            QUnit.ok(animation.IsPlaying());
            animation.Stop();
            QUnit.ok(!animation.IsPlaying());
            QUnit.equal(animation._currentFrame, 0);

            gameTime.Now = new Date(gameTime.Now.getTime() + 2 * (1000 / 20));

            animation.Update(gameTime);

            QUnit.equal(animation._currentFrame, 0);
            QUnit.ok(!animation.IsPlaying());
            end();
        });
    });

})();