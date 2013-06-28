/// <reference path="../Interfaces/ICloneable.ts" />

interface Number extends eg.ICloneable {}

Number.prototype.Clone = function (): any { return this; };