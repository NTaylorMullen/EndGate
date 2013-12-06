Math.roundTo = function (val, decimals) {
    var multiplier = Math.pow(10, decimals);

    return Math.round(val * multiplier) / multiplier;
};

Math.twoPI = Math.PI * 2;
