/// <reference path="../Interfaces/ICloneable.ts" />

interface Number extends EndGate.ICloneable {
    Clone: () => Number;
}

Number.prototype.Clone = function (): Number { return this; };