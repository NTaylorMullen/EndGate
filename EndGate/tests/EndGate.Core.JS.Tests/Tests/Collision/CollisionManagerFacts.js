/// <reference path="../../Assets.ts" />

(function () {

    QUnit.module("Collision Manager Facts");

    QUnit.test("Collision manager unmonitors its collidables on dispose.", function () {
        var cm = new eg.Collision.CollisionManager(new eg.Collision.CollisionConfiguration(new eg.Size2d(700, 700))),
            rect = new eg.Collision.Collidable(new eg.Bounds.BoundingRectangle(eg.Vector2d.Zero, new eg.Size2d(30, 50)));

        QUnit.ok(!rect.OnDisposed.HasBindings());

        cm.Monitor(rect);

        QUnit.ok(rect.OnDisposed.HasBindings());

        cm.Dispose();

        QUnit.ok(!rect.OnDisposed.HasBindings());
    });

    QUnit.test("Collision manager detects collisions.", function () {
        var cm = new eg.Collision.CollisionManager(new eg.Collision.CollisionConfiguration(new eg.Size2d(700,700))),
            rect = new eg.Collision.Collidable(new eg.Bounds.BoundingRectangle(eg.Vector2d.Zero, new eg.Size2d(30, 50))),
            circle = new eg.Collision.Collidable(new eg.Bounds.BoundingCircle(eg.Vector2d.Zero, 10)),
            rectCollisionTriggered = false,
            circleCollisionTriggered = false,
            managerCollisionTriggered = false;

        cm.Monitor(rect);
        cm.Monitor(circle);

        rect.OnCollision.Bind(function(collisionData) {
            QUnit.ok(circle === collisionData.With);
            rectCollisionTriggered = true;
        });

        circle.OnCollision.Bind(function(collisionData) {
            QUnit.deepEqual(rect, collisionData.With);
            circleCollisionTriggered = true;
        });
        
        cm.OnCollision.Bind(function (first, second) {
            QUnit.isSet(first);
            QUnit.isSet(second);
            QUnit.deepEqual(first, rect);
            QUnit.deepEqual(second, circle);
            managerCollisionTriggered = true;
        });       

        cm.Update(null);

        QUnit.ok(rectCollisionTriggered);
        QUnit.ok(circleCollisionTriggered);
        QUnit.ok(managerCollisionTriggered);

        rectCollisionTriggered = false;
        circleCollisionTriggered = false;
        managerCollisionTriggered = false;

        cm.Unmonitor(circle);
        cm.Update(null);

        QUnit.ok(!rectCollisionTriggered);
        QUnit.ok(!circleCollisionTriggered);
        QUnit.ok(!managerCollisionTriggered);

        cm.Monitor(circle);
        cm.Update(null);

        QUnit.ok(rectCollisionTriggered);
        QUnit.ok(circleCollisionTriggered);
        QUnit.ok(managerCollisionTriggered);

        rectCollisionTriggered = false;
        circleCollisionTriggered = false;
        managerCollisionTriggered = false;

        circle.Dispose();

        cm.Update(null);

        QUnit.ok(!rectCollisionTriggered);
        QUnit.ok(!circleCollisionTriggered);
        QUnit.ok(!managerCollisionTriggered);
    });

    QUnit.asyncTimeoutTest("Collision manager works within game.", 10000, function (end, assert, testName) {
        var rect = new eg.Collision.Collidable(new eg.Bounds.BoundingRectangle(eg.Vector2d.Zero, new eg.Size2d(30, 50))),
            circle = new eg.Collision.Collidable(new eg.Bounds.BoundingCircle(eg.Vector2d.Zero, 10)),
            game = new CollisionManagerGame(),
            rectCollisionTriggered = 0,
            circleCollisionTriggered = 0,
            managerCollisionTriggered = 0;

        game.MonitorCollision(rect);
        game.MonitorCollision(circle);        

        rect.OnCollision.Bind(function(collisionData){
            assert.deepEqual(circle, collisionData.With);
            rectCollisionTriggered++;
        });

        circle.OnCollision.Bind(function(collisionData) {
            assert.deepEqual(rect, collisionData.With);
            circleCollisionTriggered++;
        });

        game.RegisterCollisionEvent(function(first, second) {
            assert.isSet(first);
            assert.isSet(second);
            assert.deepEqual(first, rect);
            assert.deepEqual(second, circle);
            managerCollisionTriggered++;
        });

        window.setTimeout(function () {
            var savedRectCollisions,
                savedCircleCollisions,
                savedmanagerCollisions;

            assert.ok(rectCollisionTriggered > 10);
            assert.ok(circleCollisionTriggered > 10);
            assert.ok(managerCollisionTriggered > 10);

            rect.Dispose();
            savedRectCollisions = rectCollisionTriggered;
            savedCircleCollisions = circleCollisionTriggered;
            savedmanagerCollisions = managerCollisionTriggered;

            window.setTimeout(function () {
                assert.deepEqual(savedRectCollisions, rectCollisionTriggered);
                assert.deepEqual(savedCircleCollisions, circleCollisionTriggered);
                assert.deepEqual(savedmanagerCollisions, managerCollisionTriggered);
                end();
            }, 1000);
        }, 1000);

        return function () {
            game.Dispose();
        };
    });

})();