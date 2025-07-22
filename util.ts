namespace tracker {
    export function noteNumberToFrequency(noteNumber: number): number {
        return 440 * Math.pow(2, (noteNumber - 69) / 12);
    }

    export function isSharp(noteNumber: number): boolean {
        switch (noteNumber % 12) {
            case 1: // C#
            case 3: // D#
            case 6: // F#
            case 8: // G#
            case 10: // A#
                return true;
            default:
                return false;
        }
    }

    //% whenUsed
    const letters = "CCDDEFFGGAAB";
    export function noteLetter(noteNumber: number): string {
        return letters.charAt(noteNumber % 12);
    }

    //% whenUsed
    const hexChars = "0123456789ABCDEF";
    export function byteHex(byte: number): string {
        return hexChars.charAt((byte >> 4) & 0x0F) + hexChars.charAt(byte & 0x0F);
    }

    export function formatNumber(num: number, width: number): string {
        let result = num.toString();
        while (result.length < width) {
            result = "0" + result;
        }
        return result;
    }

    export function noteOctave(noteNumber: number): number {
        return Math.idiv(noteNumber, 12) - 1;
    }

    export function rgb(r: number, g: number, b: number): number {
        return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
    }

    function colorR(rgb: number): number {
        return (rgb >> 16) & 0xff;
    }
    function colorG(rgb: number): number {
        return (rgb >> 8) & 0xff;
    }
    function colorB(rgb: number): number {
        return rgb & 0xff;
    }

    export function crossFadeColor(from: number, to: number, amount: number): number {
        const r = colorR(from) + (colorR(to) - colorR(from)) * amount;
        const g = colorG(from) + (colorG(to) - colorG(from)) * amount;
        const b = colorB(from) + (colorB(to) - colorB(from)) * amount;
        return rgb(r, g, b);
    }
}