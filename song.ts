namespace tracker {
    export class Song {
        public tracks: Track[];

        constructor(tracks: number, trackLength: number) {
            this.tracks = [];
            for (let i = 0; i < tracks; i++) {
                this.tracks.push(new Track(i, trackLength));
            }
        }
    }
}