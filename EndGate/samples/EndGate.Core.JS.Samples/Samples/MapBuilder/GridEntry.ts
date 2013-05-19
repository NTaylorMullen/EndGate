// Helper class, this could technically be a typescript interface but I prefer creating
// the class via new GridEntry(row, column)
class GridEntry {
    public Row: number;
    public Column: number;

    constructor(row: number, column: number) {
        this.Row = row;
        this.Column = column;
    }
}