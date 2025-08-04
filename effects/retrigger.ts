namespace tracker.effects {
    export class RetriggerEffect extends Effect {
        constructor() {
            super(
                "R",
                "RETR",
                "RETRIGGER",
                [
                    "CAUSES NOTE TO REPEAT",
                    "AT GIVEN INTERVAL"
                ],
                EffectArgumentType.Split,
                [
                    ["INTERVAL", "TICKS BETWEEN REPEATS"],
                    ["REPEATS", "TIMES TO REPEAT NOTE"]
                ]
            )
        }

        applyEffect(player: Player, track: number, state: EffectState): void {
            const interval = state.getArgument(0);
            const repeats = state.getArgument(1);

            if (state.elapsedTicks % interval === 0 && Math.idiv(state.elapsedTicks, interval) <= repeats) {
                player.voices[track].gate.set(1);
            }
        }
    }
}