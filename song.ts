namespace tracker {
    export class Song {
        public tracks: Track[];
        public bpm = 120;
        public pattern = 0;
        public playHead = 0;

        constructor(tracks: number, trackLength: number) {
            this.tracks = [];
            for (let i = 0; i < tracks; i++) {
                this.tracks.push(new Track(i, trackLength));
            }
        }
    }
}