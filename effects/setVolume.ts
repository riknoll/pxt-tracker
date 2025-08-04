namespace tracker.effects {
    export class SetVolume extends Effect {
        constructor() {
            super(
                "V",
                "VOLU",
                "SET VOLUME",
                [
                    "SETS THE VOLUME",
                    "OF THIS TRACK"
                ],
                EffectArgumentType.Normal,
                [
                    ["VOLUME", "TRACK LEVEL"]
                ]
            )
        }

        applyEffect(player: Player, track: number, state: EffectState): void {
            player.voices[track].ampEnvelope.amplitude.set(
                state.getArgument(0) / 0xff
            );
        }
    }
}