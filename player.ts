namespace tracker {
    export class Player {
        public bpm = 120;
        public pattern = 0;
        public nextPattern = -1;
        public playhead = 0;

        public currentlyPlaying: Song;
        public trackStates: TrackState[] = [];
        public ppqn = 24;

        public instruments: Instrument[];
        public voices: MonoSynth[] = [];

        constructor() {
            this.instruments = getHost().getInstruments();
            for (let i = 0; i < 4; i++) {
                this.voices.push(new MonoSynth(i));
            }
        }

        public millisPerBeat(): number {
            return 60000 / this.bpm;
        }

        public millisPerTick(): number {
            return this.millisPerBeat() / this.ppqn;
        }

        public playNote(track: number, note: number) {
            const instrument = this.instruments[this.trackStates[track].currentInstrument];

            if (instrument) {

            }
        }
    }
}