namespace tracker {
    export const ROW_SPACING = 1;

    export class Sequence {
        data: Buffer;
        constructor(
            public readonly rows: number,
            public readonly rowBytes: number
        ) {
            this.data = control.createBuffer(rows * rowBytes);

            for (let i = 0; i < this.rows; i++) {
                this.setByte(i, 0, NOTE_EMPTY);
            }
        }

        getByte(row: number, col: number): number {
            return this.data[row * this.rowBytes + col];
        }

        setByte(row: number, col: number, value: number): void {
            this.data[row * this.rowBytes + col] = value;
        }
    }

    export function drawSequence(
        sequence: Sequence,
        startRow: number,
        endRow: number,
        left: number,
        top: number,
        theme: Theme,
    ): void {
        for (let row = startRow; row < endRow; row++) {
            drawNoteEvent(sequence, row, left, top + (row - startRow) * (CHAR_HEIGHT + ROW_SPACING), theme);
        }
    }

    export function drawRowNumbers(
        startRow: number,
        endRow: number,
        left: number,
        top: number,
        theme: Theme,
    ): void {
        for (let row = startRow; row < endRow; row++) {
            printBigText(
                formatNumber(row, 2),
                left,
                top + (row - startRow) * (CHAR_HEIGHT + ROW_SPACING),
                (row % 4 === 0) ? theme.rowNumberColor2 : theme.rowNumberColor1
            )
        }
    }
}