namespace tracker {
    export enum EffectArgumentType {
        Normal,
        Split
    }

    export class Effect {
        constructor(
            public readonly letter: string,
            public readonly shortName: string,
            public readonly name: string,
            public readonly description: string[],
            public readonly argumentType: EffectArgumentType,
            public readonly argumentDescriptions: string[][],
        ) {}

        applyEffect(
            player: Player,
            track: number,
            state: EffectState
        ): void {

        }
    }

    export class EffectState {
        public elapsedTicks = 0;

        constructor(
            public readonly effect: Effect,
            public readonly argument: number,
            public readonly player: Player,
            public readonly track: number,
        ) {}

        public advance() {
            this.elapsedTicks++;

            this.effect.applyEffect(
                this.player,
                this.track,
                this
            );
        }

        getArgument(index: number) {
            if (this.effect.argumentType === EffectArgumentType.Split) {
                if (index === 0) {
                    return this.argument & 0x0f;
                }
                else {
                    return (this.argument >> 4) & 0x0f;
                }
            }
            else {
                return this.argument;
            }
        }
    }
}

/**
 * Effects:
 *
 * Retrigger (RETR)
 *     interval
 *     repeats
 *
 * Cut note (CUT)
 *     ticks
 *
 * Nudge (NUDG)
 *     ticks
 *
 * Set tempo (BPM)
 *     bpm
 *
 * Jump to position (JUMP)
 *     position
 *
 * Loop (LOOP)
 *     repeats
 *
 * Set slide (SLID)
 *     enabled
 *
 * Set volume (VOL)
 *     volume
 *
 * Set pitch bend (BEND)
 *     pitch
 *
 * Set portamento (PORT)
 *     speed
 *
 * Set glissando (GLIS)
 *     speed
 *
 * Set vibrato (VIBR)
 *     rate
 *     depth
 *
 * Set vibrato wave (VIBW)
 *     wave
 *
 * Set tremolo (TREM)
 *     rate
 *     depth
 *
 * Set tremolo wave (TREW)
 *     wave
 *
 * Set waveform (WAVE)
 *     waveform
 *
 * Set attack (ATK)
 *     attack
 *
 * Set decay (DEC)
 *     decay
 *
 * Set sustain (SUS)
 *     sustain
 *
 * Set release (REL)
 *     release
 *
 * Mod attack (ATK*)
 *     delta attack
 *
 * Mod decay (DEC*)
 *     delta decay
 *
 * Mod sustain (SUS*)
 *     delta sustain
 *
 * Mod release (REL*)
 *     delta release
 */