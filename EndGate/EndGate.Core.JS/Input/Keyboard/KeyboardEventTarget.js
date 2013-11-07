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
                get: /**
                * Gets the id of the target element.
                */
                function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardEventTarget.prototype, "Classes", {
                get: /**
                * Gets a list of classes on the target element.
                */
                function () {
                    return this._classes;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardEventTarget.prototype, "Element", {
                get: /**
                * Gets the element that caused the keyboard event.
                */
                function () {
                    return this._element;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(KeyboardEventTarget.prototype, "Tag", {
                get: /**
                * Gets the type of tag of the target element.
                */
                function () {
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
