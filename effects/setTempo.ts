namespace tracker.effects {
    export class SetTempo extends Effect {
        constructor() {
            super(
                "T",
                "BPM",
                "SET TEMPO",
                [
                    "SETS THE BPM",
                    "OF PLAYBACK FOR",
                    "ALL TRACKS"
                ],
                EffectArgumentType.Normal,
                [
                    ["BPM", "BEATS PER MINUTE"]
                ]
            )
        }

        applyEffect(player: Player, track: number, state: EffectState): void {
            player.bpm = state.getArgument(0);
        }
    }
}