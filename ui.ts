namespace tracker {
    /**
     * ___________________________________
     * | BPM: 120        | INFO           |
     * | PATTERN: 0      | INSTR 01       |
     * | PLAY            | XYLOPHONE      |
     * |                 |________________|
     * |__________________________________|
     * |   | TRACK 1        | TRACK 2     |
     * |___|________________|_____________|
     * |00 |C-5 00 01 02 03 |C-5 00 01 02 |
     * |01 |C-5 00 01 02 03 |C-5 00 01 02 |
     * |___|________________|_____________|
     */
    export const TRACK_COLUMNS = 5;
    export const MAX_SCROLL_OFFSET = 203;

    export class Controller {
        public song: Song;
        public theme: Theme;
        public cursorY = 0;

        public trackRow = 0;
        public trackColumn = 0;
        public trackFocused = true;
        public scroll: ScrollState;
        public fadeStartTime = 0;

        constructor(song: Song, theme: Theme) {
            this.song = song;
            this.theme = theme;
            this.scroll = new ScrollState();

            this.registerButtonEvents();
        }

        registerButtonEvents() {
            const host = getHost();

            host.onButtonEvent(Button.Up, ButtonEvent.Pressed, () => {
                if (this.trackFocused) {
                    this.trackRow = Math.max(0, this.trackRow - 1);
                }
                else if (this.cursorY > 0) {
                    this.cursorY--;
                }
            });

            host.onButtonEvent(Button.Down, ButtonEvent.Pressed, () => {
                if (this.trackFocused) {
                    this.trackRow = Math.min(
                        this.song.tracks[0].sequences[0].rows - 1,
                        this.trackRow + 1
                    );
                }
                else if (this.cursorY < 3) {
                    this.cursorY++;

                    if (this.cursorY === 3) {
                        this.trackFocused = true;
                    }
                }
            });

            host.onButtonEvent(Button.Left, ButtonEvent.Pressed, () => {
                if (this.trackFocused) {
                    this.trackColumn = Math.max(0, this.trackColumn - 1);
                    this.onTrackColumnChanged();
                }
            });

            host.onButtonEvent(Button.Right, ButtonEvent.Pressed, () => {
                if (this.trackFocused) {
                    this.trackColumn = Math.min(
                        (TRACK_COLUMNS * this.song.tracks.length) - 1,
                        this.trackColumn + 1
                    );
                    this.onTrackColumnChanged();
                }
            });
        }

        draw() {
            const host = getHost();
            this.scroll.update();

            // this.scrollOffset = (this.scrollOffset + 1) % MAX_SCROLL_OFFSET;

            const mod = Math.sin((control.millis() - this.fadeStartTime) / 150);

            host.setPaletteColor(
                this.theme.selectionColor,
                crossFadeColor(
                    rgb(209, 212, 76),
                    rgb(255, 255, 255),
                    1 - (Math.clamp(-1, 1, mod * 2) + 1) / 2
                )
            );

            const width = 160;
            const height = 120;

            host.fillRect(0, 0, width, height, this.theme.background1);

            this.drawRectWithText(0, 0, 7, "TRACKER");
            this.drawRectWithText(53, 0, 3, "", this.cursorY === 0);
            this.drawRectWithText(0, 11, 7, "BPM");
            this.drawRectWithText(53, 11, 3, formatNumber(this.song.bpm, 3), this.cursorY === 1);
            this.drawRectWithText(0, 22, 7, "PATTERN");
            this.drawRectWithText(53, 22, 3, formatNumber(this.song.pattern, 3), this.cursorY === 2);

            // info window
            drawBeveledRect(
                79,
                1,
                80,
                32,
                this.theme.bevelDarkColor1,
                this.theme.bevelLightColor1,
                this.theme.background3
            );

            printInfoText(
                this.trackColumn % TRACK_COLUMNS,
                81,
                3,
                0,
                this.theme
            )

            const startRow = Math.max(this.trackRow - 3, 0);
            const endRow = Math.min(this.trackRow + 5, this.song.tracks[0].sequences[0].rows);

            const top = 73 - (this.trackRow - startRow) * (CHAR_HEIGHT + ROW_SPACING);

            // track area background
            fillBox(
                24,
                35,
                157,
                117,
                this.theme.background2,
            );

            host.fillRect(
                2,
                45,
                156,
                73,
                this.theme.background3
            );

            host.fillRect(
                2,
                35,
                156,
                7,
                this.theme.background3
            );

            // edit track background
            host.fillRect(
                23,
                72,
                156,
                CHAR_HEIGHT + 2,
                this.theme.editTrackColor
            );

            if (this.trackFocused) {
                host.fillRect(
                    24 + noteColumnOffset(this.trackColumn % TRACK_COLUMNS) + Math.idiv(this.trackColumn, TRACK_COLUMNS) * 85 - this.scroll.scrollOffset,
                    72,
                    noteColumnWidth(this.trackColumn % TRACK_COLUMNS) + 2,
                    CHAR_HEIGHT + 2,
                    this.theme.selectionColor
                )
            }

            // tracks
            for (let i = 0; i < this.song.tracks.length; i++) {
                const track = this.song.tracks[i];
                const left = 25 + i * 85 - this.scroll.scrollOffset;
                printText(
                    "TRACK " + (i + 1),
                    left,
                    36,
                    this.theme.trackHeaderColor
                );

                drawSequence(
                    track.sequences[0],
                    startRow,
                    endRow,
                    left,
                    top,
                    this.theme
                );

                drawBevelInBox(
                    Math.max(left - 2, 23),
                    34,
                    Math.min(left + 81, 158),
                    42,
                    this.theme.bevelDarkColor2,
                    this.theme.bevelLightColor2
                );

                drawBevelInBox(
                    Math.max(left - 2, 23),
                    44,
                    Math.min(left + 81, 158),
                    118,
                    this.theme.bevelDarkColor2,
                    this.theme.bevelLightColor2
                );

                host.fillRect(
                    Math.min(left + 82, 159),
                    34,
                    1,
                    85,
                    this.theme.background2
                );

            }

            host.fillRect(
                0,
                34,
                23,
                85,
                this.theme.background1
            );

            host.fillRect(
                158,
                34,
                2,
                85,
                this.theme.background1
            );
            drawBevelInBox(
                23,
                34,
                158,
                118,
                this.theme.bevelDarkColor1,
                this.theme.bevelLightColor1,
            );

            // row numbers
            drawBeveledRect(
                1,
                44,
                21,
                75,
                this.theme.bevelDarkColor1,
                this.theme.bevelLightColor1,
                this.theme.background3
            );

            host.fillRect(
                2,
                72,
                19,
                CHAR_HEIGHT + 2,
                this.theme.editTrackColor
            );

            drawRowNumbers(
                startRow,
                endRow,
                3,
                top,
                this.theme
            );

            drawBeveledRect(
                1,
                34,
                21,
                9,
                this.theme.bevelDarkColor1,
                this.theme.bevelLightColor1,
                this.theme.background3
            );

            printText(
                formatNumber(this.song.playHead, 2),
                5,
                36,
                this.theme.columnNoteColor
            );
        }

        protected drawRectWithText(
            left: number,
            top: number,
            characters: number,
            text: string,
            selected = false
        ) {
            const width = characters * (SMALL_CHAR_WIDTH + CHAR_SPACING) - CHAR_SPACING;

            if (selected) {
                drawBeveledRect(left, top, width + 5, SMALL_CHAR_HEIGHT + 5, this.theme.bevelLightColor1, this.theme.bevelDarkColor1, this.theme.selectionColor);
                printShadowText(text, left + 2, top + 2, this.theme.parameterColor, this.theme.parameterShadowColor);
            }
            else {
                drawBeveledRect(left, top, width + 5, SMALL_CHAR_HEIGHT + 5, this.theme.bevelLightColor1, this.theme.bevelDarkColor1, 0);
                printShadowText(text, left + 2, top + 2, this.theme.parameterColor, this.theme.parameterShadowColor);
            }
        }

        protected onTrackColumnChanged() {
            this.fadeStartTime = control.millis();
            const trackIndex = Math.idiv(this.trackColumn, TRACK_COLUMNS);

            if (trackIndex === 0) {
                if (this.scroll.scrollOffset !== 0) {
                    this.scroll.animateToValue(0, 200);
                }
            }
            else {
                const OVERLAP_AMOUNT = 8;
                const TRACK_AREA_WIDTH = 137;
                const trackLeft = 85 * trackIndex - this.scroll.scrollOffset;
                const trackRight = trackLeft + 85;


                if (trackLeft < 0) {
                    this.scroll.animateToValue(85 * trackIndex - OVERLAP_AMOUNT, 200);
                }
                else if (trackRight > TRACK_AREA_WIDTH) {
                    this.scroll.animateToValue(this.scroll.scrollOffset - (TRACK_AREA_WIDTH - trackRight) + OVERLAP_AMOUNT, 200);
                }
            }
        }
    }


    function drawBeveledRect(
        left: number,
        top: number,
        width: number,
        height: number,
        topLeftColor: number,
        bottomRightColor: number,
        interiorColor: number
    ) {
        const host = getHost();

        host.fillRect(left, top, width - 1, 1, topLeftColor);
        host.fillRect(left + 1, top + height - 1, width - 1, 1, bottomRightColor);
        host.fillRect(left, top + 1, 1, height - 2, topLeftColor);
        host.fillRect(left + width - 1, top + 1, 1, height - 2, bottomRightColor);

        if (interiorColor) {
            host.fillRect(left + 1, top + 1, width - 2, height - 2, interiorColor);
        }
    }

    function drawBevelInBox(
        left: number,
        top: number,
        right: number,
        bottom: number,
        topLeftColor: number,
        bottomRightColor: number
    ) {
        const host = getHost();

        const width = right - left + 1;
        const height = bottom - top + 1;

        host.fillRect(left, top, width - 1, 1, topLeftColor);
        host.fillRect(left + 1, top + height - 1, width - 1, 1, bottomRightColor);
        host.fillRect(left, top + 1, 1, height - 2, topLeftColor);
        host.fillRect(left + width - 1, top + 1, 1, height - 2, bottomRightColor);
    }

    function fillBox(
        left: number,
        top: number,
        right: number,
        bottom: number,
        color: number,
    ) {
        const host = getHost();

        host.fillRect(
            left,
            top,
            right - left + 1,
            bottom - top + 1,
            color
        )
    }

    class ScrollState {
        public scrollOffset = 0;
        public animationStartTime = 0;
        public animationDuration = 0;
        public animationStartOffset = 0;
        public animationEndOffset = 0;

        constructor() {

        }

        update() {
            if (this.animationStartTime === 0) {
                return;
            }

            const progress = easeInOutCubic((control.millis() - this.animationStartTime) / this.animationDuration);
            if (progress >= 1) {
                this.scrollOffset = this.animationEndOffset;
                this.animationStartTime = 0;
                return;
            }

            this.scrollOffset = (this.animationStartOffset + (this.animationEndOffset - this.animationStartOffset) * progress) | 0;
        }

        animateToValue(value: number, duration: number) {
            if (this.animationStartTime) {
                this.animationEndOffset = value;
                this.clampAnimationOffset();
                return;
            }

            this.animationStartTime = control.millis();
            this.animationDuration = duration;
            this.animationStartOffset = this.scrollOffset;
            this.animationEndOffset = value;
            this.clampAnimationOffset();
        }

        protected clampAnimationOffset() {
            if (this.animationEndOffset < 0) {
                this.animationEndOffset = 0;
            }
            else if (this.animationEndOffset > MAX_SCROLL_OFFSET) {
                this.animationEndOffset = MAX_SCROLL_OFFSET;
            }
        }
    }

    function easeInOutCubic(x: number): number {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    function printInfoText(
        column: number,
        left: number,
        top: number,
        value: number,
        theme: Theme,
    ) {
        let lines: string[] = [];
        if (column === 0) {
            lines = [
                "NOTE",
                "←→ SEMITONE",
                "↑↓ OCTAVE",
                "A   OFF ON"
            ]
        }
        else if (column === 1) {
            lines = [
                "VELOCITY",
                "THE VOLUME",
                "OF THE NOTE",
                "PLAYED"
            ]
        }
        else if (column === 2) {
            lines = [
                "INSTRUMENT",
                "XYLOPHONE",
                "",
                ""
            ]
        }
        else if (column === 3) {
            lines = [
                "FX TYPE",
                "NONE",
                "",
                ""
            ]
        }
        else if (column === 4) {
            lines = [
                "FX VALUE",
                "DEPENDS",
                "ON THE FX",
                "TYPE"
            ]
        }
        // ↑↓←→

        if (lines.length) {
            printText(
                lines[0],
                left,
                top,
                theme.infoHeaderTextColor
            );
            printText(
                lines[1],
                left,
                top + SMALL_CHAR_HEIGHT + ROW_SPACING,
                theme.infoTextColor
            );
            printText(
                lines[2],
                left,
                top + (SMALL_CHAR_HEIGHT + ROW_SPACING) * 2,
                theme.infoTextColor
            );
            printText(
                lines[3],
                left,
                top + (SMALL_CHAR_HEIGHT + ROW_SPACING) * 3,
                theme.infoTextColor
            );
        }
    }
}