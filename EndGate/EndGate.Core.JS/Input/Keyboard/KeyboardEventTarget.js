var EndGate;
(function (EndGate) {
    (function (Input) {
        /**
        * HtmlElement that triggered a KeyboardEvent.
        */
        var KeyboardEventTarget = (function () {
            function KeyboardEventTarget(target) {
                this._element = target;
                this._id = this._element.id;
                this._classes = Array.prototype.slice.call(this._element.classList);
                this._tag = this._element.tagName;
            }
            Object.defineProperty(KeyboardEventTarget.prototype, "Id", {
                /**
                * Gets the id of the target element.
                */
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardEventTarget.prototype, "Classes", {
                /**
                * Gets a list of classes on the target element.
                */
                get: function () {
                    return this._classes;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardEventTarget.prototype, "Element", {
                /**
                * Gets the element that caused the keyboard event.
                */
                get: function () {
                    return this._element;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardEventTarget.prototype, "Tag", {
                /**
                * Gets the type of tag of the target element.
                */
                get: function () {
                    return this._tag;
                },
                enumerable: true,
                configurable: true
            });
            return KeyboardEventTarget;
        })();
        Input.KeyboardEventTarget = KeyboardEventTarget;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
