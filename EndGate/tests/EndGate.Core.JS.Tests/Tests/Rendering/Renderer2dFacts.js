(function () {

    QUnit.module("Renderer2d Facts");

    QUnit.test("Renderer draws all items passed to render.", function () {
        var holder = document.createElement("div"),
            drawArea = document.createElement("canvas"),
            renderer2d = new eg.Rendering.Renderer2d(drawArea),
            draws1 = 0,
            draws2 = 0,
            renderable1 = {
                Draw: function (context) {
                    draws1++;
                }
            },
            renderable2 = {
                Draw: function (context) {
                    draws2++;
                }
            },
            renderables = [renderable1, renderable2];

        holder.appendChild(drawArea);

        renderer2d.Render(renderables);

        QUnit.equal(draws1, 1);
        QUnit.equal(draws1, draws2);
        QUnit.equal(holder.children.length, 1);

        renderer2d.Render(renderables);
        renderer2d.Render(renderables);

        QUnit.equal(draws1, 3);
        QUnit.equal(draws1, draws2);
        QUnit.equal(holder.children.length, 1);

        renderer2d.Dispose();

        QUnit.equal(holder.children.length, 0);
    });

    QUnit.test("Renderer updates buffer size when draw area resized.", function () {
        var holder = document.createElement("div"),
            drawArea = document.createElement("canvas"),
            renderer2d,
            draws1 = 0,
            draws2 = 0,
            renderable1 = {
                Draw: function (context) {
                    draws1++;
                }
            },
            renderable2 = {
                Draw: function (context) {
                    draws2++;
                }
            },
            renderables = [renderable1, renderable2];

        drawArea.width = 100;
        drawArea.height = 125;

        renderer2d = new eg.Rendering.Renderer2d(drawArea)

        QUnit.equal(renderer2d._BufferCanvas.width, drawArea.width);
        QUnit.equal(renderer2d._BufferCanvas.height, drawArea.height);

        holder.appendChild(drawArea);

        renderer2d.Render(renderables);

        QUnit.equal(draws1, 1);
        QUnit.equal(draws1, draws2);
        QUnit.equal(holder.children.length, 1);

        drawArea.width = 400;
        drawArea.height = 500;

        QUnit.notEqual(renderer2d._BufferCanvas.width, drawArea.width);
        QUnit.notEqual(renderer2d._BufferCanvas.height, drawArea.height);

        renderer2d.Render(renderables);

        QUnit.equal(renderer2d._BufferCanvas.width, drawArea.width);
        QUnit.equal(renderer2d._BufferCanvas.height, drawArea.height);

        renderer2d.Dispose();

        QUnit.equal(holder.children.length, 0);
    });

    QUnit.test("Renderer draws items in the order of their ZIndexes.", function () {
        var holder = document.createElement("div"),
            drawArea = document.createElement("canvas"),
            renderer2d = new eg.Rendering.Renderer2d(drawArea),
            draws1At = null,
            draws2At = null,
            renderable1 = {
                ZIndex: -1,
                Draw: function (context) {
                    draws1At = new Date().getTime();

                    var sum;
                    for (var i = 0; i < 1000000; i++) {
                        sum += i / Math.PI
                    }
                }
            },
            renderable2 = {
                ZIndex: 0,
                Draw: function (context) {
                    draws2At = new Date().getTime();

                    var sum;
                    for (var i = 0; i < 1000000; i++) {
                        sum += i / Math.PI
                    }
                }
            },
            renderables = [renderable1, renderable2];

        holder.appendChild(drawArea);

        renderer2d.Render(renderables);

        // Smaller millisecond times mean further in the past
        QUnit.ok(draws2At > draws1At);

        renderable1.ZIndex = 1;

        renderer2d.Render(renderables);

        QUnit.ok(draws2At < draws1At);

        renderer2d.Dispose();
    });

})();
