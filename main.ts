// add code here

const host = getHost();


const instruments = host.getInstruments();

const song = new tracker.Song(4, 64);

const ui = new tracker.Controller(song, new tracker.Theme());

host.onDraw(() => {
    ui.draw();
})