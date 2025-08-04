namespace tracker {
    export class Track {
        public sequences: Sequence[];

        constructor(public channel: number, sequenceLength?: number) {
            this.sequences = [ new Sequence(sequenceLength, 5) ];
        }
    }

    export class TrackState {
        public currentInstrument: number = 0;
        public playHead: number = 0;

        constructor(
            public track: Track,
            public sequenceIndex: number = 0,
        ) {}
    }
}