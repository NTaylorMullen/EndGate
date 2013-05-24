// Helper class, this could technically be a typescript interface but I prefer creating

// Wrap in module to keep code out of global scope
module MapCreator {

    // the class via new GridEntry(row, column)
    export class GridEntry {
        public Row: number;
        public Column: number;

        constructor(row: number, column: number) {
            this.Row = row;
            this.Column = column;
        }
    }

}