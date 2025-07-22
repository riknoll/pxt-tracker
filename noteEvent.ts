namespace tracker {
    export const NOTE_MIN = 0;
    export const NOTE_MAX = 127;
    export const NOTE_OFF = 128;
    export const NOTE_EMPTY = 129;

    export const WIDTH_NOTE_EVENT = CHAR_WIDTH * 9 + CHAR_SPACING * 8;

    export function drawNoteEvent(sequence: Sequence, row: number, left: number, top: number, theme: Theme) {
        drawNote(sequence.getByte(row, 0), left, top, theme.columnNoteColor);
        left += (CHAR_WIDTH * 3 + CHAR_SPACING * 3);

        drawHexNumber(sequence.getByte(row, 1), left, top, theme.columnVelocityColor);
        left += (CHAR_WIDTH * 2 + CHAR_SPACING * 2);

        drawLetterNumber(sequence.getByte(row, 2), left, top, theme.columnInstrumentColor);
        left += (CHAR_WIDTH + CHAR_SPACING);

        drawLetterNumber(sequence.getByte(row, 3), left, top, theme.columnEffectColor);
        left += (CHAR_WIDTH + CHAR_SPACING);

        drawHexNumber(sequence.getByte(row, 4), left, top, theme.columnEffectValueColor);
    }

    export function drawNote(
        note: number,
        left: number,
        top: number,
        color: number
    ): void {
        if (note === NOTE_EMPTY) {
            const host = getHost();
            for (let i = 0; i < 3; i++) {
                host.fillRect(
                    left + (CHAR_WIDTH >> 1) - 1,
                    top + (CHAR_HEIGHT >> 1) - 1,
                    2,
                    2,
                    color
                );
                left += CHAR_WIDTH + CHAR_SPACING;
            }
            return;
        }
        else if (note === NOTE_OFF) {
            printCharacter("O", left, top, color, bigFont);
            left += CHAR_WIDTH + CHAR_SPACING;
            printCharacter("F", left, top, color, bigFont);
            left += CHAR_WIDTH + CHAR_SPACING;
            printCharacter("F", left, top, color, bigFont);
        }
        else if (note >= NOTE_MIN && note <= NOTE_MAX) {
            printCharacter(noteLetter(note), left, top, color, bigFont);
            left += CHAR_WIDTH + CHAR_SPACING;

            if (isSharp(note)) {
                drawSharp(left, top, color);
            }
            else {
                host.fillRect(
                    left,
                    top + CHAR_HEIGHT - 1,
                    CHAR_WIDTH,
                    1,
                    color
                );
            }


            left += CHAR_WIDTH + CHAR_SPACING;
            const octave = noteOctave(note);
            if (octave < 0 || octave > 9) {
                return;
            }
            printCharacter(octave + "", left, top, color, bigFont);
        }
    }

    function drawSharp(left: number, top: number, color: number): void {
        const SIDE_LENGTH = Math.min(CHAR_WIDTH, CHAR_HEIGHT) - 2;

        const host = getHost();
        host.fillRect(
            left + 1,
            top,
            1,
            SIDE_LENGTH,
            color
        );

        host.fillRect(
            left + SIDE_LENGTH - 2,
            top,
            1,
            SIDE_LENGTH,
            color
        );

        host.fillRect(
            left,
            top + 1,
            SIDE_LENGTH,
            1,
            color
        );

        host.fillRect(
            left,
            top + SIDE_LENGTH - 2,
            SIDE_LENGTH,
            1,
            color
        );
    }

    function drawHexNumber(
        value: number,
        left: number,
        top: number,
        color: number
    ): void {
        printBigText(byteHex(value), left, top, color);
    }

    const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    function drawLetterNumber(
        value: number,
        left: number,
        top: number,
        color: number
    ): void {
        printBigText(letters.charAt(value), left, top, color);
    }

    export function noteColumnOffset(column: number): number {
        switch (column) {
            case 0: return 0; // Note
            case 1: return CHAR_WIDTH * 3 + CHAR_SPACING * 3; // Velocity
            case 2: return CHAR_WIDTH * 5 + CHAR_SPACING * 5; // Instrument
            case 3: return CHAR_WIDTH * 6 + CHAR_SPACING * 6; // Effect
            case 4: return CHAR_WIDTH * 7 + CHAR_SPACING * 7; // Effect Value
            default: return -1;
        }
    }

    export function noteColumnWidth(column: number): number {
        switch (column) {
            case 0: return CHAR_WIDTH * 3 + CHAR_SPACING * 2; // Note
            case 1: return CHAR_WIDTH * 2 + CHAR_SPACING; // Velocity
            case 2: return CHAR_WIDTH; // Instrument
            case 3: return CHAR_WIDTH; // Effect
            case 4: return CHAR_WIDTH * 2 + CHAR_SPACING; // Effect Value
            default: return -1;
        }
    }
}