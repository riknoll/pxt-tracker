namespace tracker {
    export class Track {
        public sequences: Sequence[];

        constructor(public channel: number, sequenceLength?: number) {
            this.sequences = [ new Sequence(sequenceLength, 5) ];
        }
    }
}