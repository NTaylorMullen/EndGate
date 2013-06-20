(function () {

    QUnit.module("Sprite Animation Facts");

    QUnit.test("Stepping moves forward the current frame.", function () {
        var imageSource = new eg.Graphics.Assets.ImageSource("foo", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 8);

        QUnit.equal(animation._currentFrame, 0);

        animation.Step();

        QUnit.equal(animation._currentFrame, 1);

        animation.Step(3);

        QUnit.equal(animation._currentFrame, 4);
    });

    QUnit.test("After play image source is updated to match animation frame.", function () {
        var imageSource = new eg.Graphics.Assets.ImageSource("foo", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 8),
            gameTime = {
                Now: new Date()
            };

        QUnit.ok(imageSource.ClipSize.Equivalent(new eg.Size2d(200, 100)));

        animation.Play();

        QUnit.ok(imageSource.ClipSize.Equivalent(new eg.Size2d(50, 50)));

        animation.Update(gameTime);

        QUnit.ok(imageSource.ClipSize.Equivalent(new eg.Size2d(50, 50)));
        QUnit.ok(imageSource.ClipLocation.Equivalent(eg.Vector2d.Zero()));

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
    });
    
    QUnit.test("Animations obey start offsets.", function () {
        var imageSource = new eg.Graphics.Assets.ImageSource("foo", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6, new eg.Vector2d(50,0)),
            gameTime = {
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
    });
    
    QUnit.test("ImageSource is updated according to the fps.", function () {
        var imageSource = new eg.Graphics.Assets.ImageSource("foo", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6),
            gameTime = {
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

        animation.Fps(40);
        gameTime.Now = new Date(gameTime.Now.getTime() + (1000/40));

        animation.Update(gameTime);

        QUnit.equal(animation._currentFrame, 2);
    });
    
    QUnit.test("After play pausing does not allow automatic increase in frame.", function () {
        var imageSource = new eg.Graphics.Assets.ImageSource("foo", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6),
            gameTime = {
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
    });
    
    QUnit.test("If repeating and playing the current frame rolls over the horn.", function () {
        var imageSource = new eg.Graphics.Assets.ImageSource("foo", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6),
            gameTime = {
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
    });
    
    QUnit.test("After animation completes the animation no longer plays.", function () {
        var imageSource = new eg.Graphics.Assets.ImageSource("foo", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6),
            gameTime = {
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
    });
    
    QUnit.test("OnComplete triggers when not repeating and animation finishes.", function () {
        var imageSource = new eg.Graphics.Assets.ImageSource("foo", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6),
            gameTime = {
                Now: new Date()
            },
            triggered = false;

        animation.OnComplete.Bind(function () {
            triggered = true;
        });
        animation.Play();

        gameTime.Now = new Date(new Date().getTime() + 6 * (1000 / 20));

        animation.Update(gameTime);

        QUnit.equal(animation._currentFrame, 5);
        QUnit.ok(!animation.IsPlaying());
        QUnit.ok(triggered);
    });       
    
    QUnit.test("Stop prevents automatic updating of frame.", function () {
        var imageSource = new eg.Graphics.Assets.ImageSource("foo", 200, 100),
            animation = new eg.Graphics.SpriteAnimation(imageSource, 20, new eg.Size2d(50, 50), 6),
            gameTime = {
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
    });

})();