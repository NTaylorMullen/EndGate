function asyncLoop(action, count, onComplete) {
    (function loop(index) {
        if (index < count) {
            action(function () {
                loop(index + 1);
            }, index);
        } else if (onComplete) {
            onComplete();
        }
    }(0));
}
