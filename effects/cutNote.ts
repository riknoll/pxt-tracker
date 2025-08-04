namespace tracker.effects {
    export class CutNoteEffect extends Effect {
        constructor() {
            super(
                "C",
                "CUT",
                "CUT NOTE",
                [
                    "CUTS NOTE SHORT",
                    "AFTER GIVEN TICKS"
                ],
                EffectArgumentType.Normal,
                [
                    ["TICKS", "TICKS UNTIL NOTE END"],
                ]
            )
        }

        applyEffect(player: Player, track: number, state: EffectState): void {
            const ticks = state.getArgument(0);

            if (state.elapsedTicks === ticks) {
                player.voices[track].gate.set(0);
            }
        }
    }
}