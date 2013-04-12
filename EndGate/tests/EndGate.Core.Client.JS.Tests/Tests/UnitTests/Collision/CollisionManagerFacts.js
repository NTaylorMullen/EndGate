/// <reference path="../../Assets.ts" />

(function (window, collision, assets, bo) {

    QUnit.module("Collision Manager Facts");

    QUnit.test("Collision manager detects collisions.", function () {
        var cm = new collision.CollisionManager(),
            rect = new collision.Collidable(new bo.BoundingRectangle(new assets.Size2d(30, 50))),
            circle = new collision.Collidable(new bo.BoundingCircle(10)),
            rectCollisionTriggered = false,
            circleCollisionTriggered = false,
            managerCollisionTriggered = false;

        cm.Monitor(rect);
        cm.Monitor(circle);

        rect.OnCollision.Bind(function(collisionData) {
            QUnit.ok(rect.Bounds.Position.Equivalent(collisionData.At));
            QUnit.ok(circle === collisionData.With);
            rectCollisionTriggered = true;
        });

        circle.OnCollision.Bind(function(collisionData) {
            QUnit.ok(circle.Bounds.Position.Equivalent(collisionData.At));
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

    QUnit.asyncTimeoutTest("Collision manager works within game.", testUtilities.defaultTestTimeout, function (end, assert, testName) {
        var rect = new collision.Collidable(new bo.BoundingRectangle(new assets.Size2d(30, 50))),
            circle = new collision.Collidable(new bo.BoundingCircle(10)),
            game = new CollisionManagerGame(),
            rectCollisionTriggered = 0,
            circleCollisionTriggered = 0,
            managerCollisionTriggered = 0;

        game.MonitorCollision(rect);
        game.MonitorCollision(circle);        

        rect.OnCollision.Bind(function(collisionData){
            assert.ok(rect.Bounds.Position.Equivalent(collisionData.At));
            assert.deepEqual(circle, collisionData.With);
            rectCollisionTriggered++;
        });

        circle.OnCollision.Bind(function(collisionData) {
            assert.ok(circle.Bounds.Position.Equivalent(collisionData.At));
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
        };
    });

})(window, EndGate.Core.Collision, EndGate.Core.Assets, EndGate.Core.BoundingObject);