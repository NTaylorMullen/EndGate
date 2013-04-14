interface Math {
    roundTo(val?: number, decimals?: number): number;
    twoPI: number;
}

Math.roundTo = function (val?: number, decimals?: number): number {
    var multiplier = Math.pow(10, decimals);

    return Math.round(val * multiplier) / multiplier;
};

Math.twoPI = Math.PI * 2;