namespace tracker {
    const bigFontSrc = hex`de19f168250008080108010800200030003100320033003400350036003700380039004100420043004400450046004700480049004a004b004c004d004e004f0050005100520053005400550056005700580059005a0000000000000000007effa1918985ff7e808086ffff808080e2f3919999898f8642c381898989ff760f0f08080808ffff4fcf89898989f9717eff89898989fb7201010101f9f90f0f78fe8f89898ffe7846cf89898989ff7efeff09090909fffeffff89898f8ef8703c7ec3818181c342ffff818181c37e3cffff898989818181ffff0909090101013c7ec3818989fb7affff08080808ffff818181ffff81818160e0808181ff7f01ffff28282f2fe0e0ffff808080808080feff010f0f01fffefeff01ffff80ff7f7eff81818181ff7effff111111111f1f7eff8181b1b1ff7effff29292929efef46cf89898989fb72010101ffff0101017fff80808080ff7f0f7ff08080f07f0f7fff80f8f880ff7fefef28383828efef070f08f8f8080f07f1f1919999898f8f`;
    const smallFontSrc = hex`de19f168290006060106010600200030003100320033003400350036003700380039004100420043004400450046004700480049004a004b004c004d004e004f0050005100520053005400550056005700580059005a0090219121922193210000000000001e3f29253f1e20223f3f2020323b29292f26123321293f1e0f0f08083f3f2f2f293939111e3f29293b12010101393f07183e25253e18123725253f1e3e3f09093f3e3f3f29293f161e3f212133123f3f21213f1e3f3f292921213f3f090901011e3f21293b1a3f3f08083f3f21213f3f2121113121213f1f3f3f141437373f3f202020203e330606333e3f010f3c203f1e3f21213f1e3f3f09090f061e3f21293f1e3f3f19392f26123725253d1801013f3f01011f3f20203f1f071f30301f073f331818333f333b0c0c3b3303073c3c070331392d2d27230c1e3f0c0c0c04063f3f06040c0c0c3f1e0c08183f3f1808`

    export const CHAR_WIDTH = 8;
    export const CHAR_HEIGHT = 8;
    export const SMALL_CHAR_WIDTH = 6;
    export const SMALL_CHAR_HEIGHT = 6;

    export const CHAR_SPACING = 1;

    export class Font {
        drawBuffer: Buffer;

        constructor(
            public src: Buffer
        ) {
            const bitmapLength = src.getNumber(NumberFormat.UInt16LE, 11);
            this.drawBuffer = control.createBuffer(bitmapLength + 8);
            this.drawBuffer[0] = 0x87;      // magic
            this.drawBuffer[1] = 1;         // bpp
            this.drawBuffer[2] = src[6];    // width
            this.drawBuffer[4] = src[7];    // height
        }
    }


    export const smallFont = new Font(smallFontSrc);
    export const bigFont = new Font(bigFontSrc);

    export function printCharacter(char: string, x: number, y: number, color: number, font: Font) {
        const charCode = char.charCodeAt(0);

        const HEADER_SIZE = 13;
        const numGlyphs = font.src.getNumber(NumberFormat.UInt16LE, 4);
        let offset = -1;
        for (let i = 0; i < numGlyphs; i++) {
            if (font.src.getNumber(NumberFormat.UInt16LE, HEADER_SIZE + i * 2) === charCode) {
                offset = i;
                break;
            }
        }

        if (offset === -1) {
            return;
        }

        const bitmapLength = font.src.getNumber(NumberFormat.UInt16LE, 11);

        const bitmapAddr = HEADER_SIZE + numGlyphs * 2 + offset * bitmapLength;
        font.drawBuffer.write(8, font.src.slice(bitmapAddr, bitmapLength))
        getHost().drawIcon(font.drawBuffer, x, y, color);
    }


    export function printText(
        text: string,
        left: number,
        top: number,
        color: number
    ): void {
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
              if (char !== " ") {
                printCharacter(text.charAt(i), left | 0, top, color, smallFont);
                left += SMALL_CHAR_WIDTH + CHAR_SPACING;
            }
            else {
                left += ((SMALL_CHAR_WIDTH >> 1) + 0.5)
            }
        }
    }

    export function printBigText(
        text: string,
        left: number,
        top: number,
        color: number
    ): void {
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            if (char !== " ") {
                printCharacter(text.charAt(i), left, top, color, bigFont);
                left += CHAR_WIDTH + CHAR_SPACING;
            }
            else {
                left += CHAR_WIDTH >> 1
            }
        }
    }

    export function printShadowText(
        text: string,
        left: number,
        top: number,
        color: number,
        shadow: number
    ): void {
        printText(text, left + 1, top + 1, shadow);
        printText(text, left, top, color);
    }
}