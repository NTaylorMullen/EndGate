// Helper class, this could technically be a typescript interface but I prefer creating
// Wrap in module to keep code out of global scope
var MapCreator;
(function (MapCreator) {
    // the class via new GridEntry(row, column)
    var GridEntry = (function () {
        function GridEntry(row, column) {
            this.Row = row;
            this.Column = column;
        }
        return GridEntry;
    })();
    MapCreator.GridEntry = GridEntry;    
})(MapCreator || (MapCreator = {}));
//@ sourceMappingURL=GridEntry.js.map
