function asyncLoop(action: (next: () => void, index: number) => void, count: number, onComplete?: ()=> void) {
    (function loop(index) {
        if (index < count) {
            action(function () {
                loop(index + 1);
            }, index);
        }
        else if(onComplete) {
            onComplete();
        }
    } (0));
}