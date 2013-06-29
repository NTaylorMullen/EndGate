/// <reference path="../Interfaces/ICloneable.ts" />

interface Number extends EndGate.ICloneable {}

Number.prototype.Clone = function (): any { return this; };