// add code here

const host = getHost();


const instruments = host.getInstruments();

const song = new tracker.Song(4, 64);

const ui = new tracker.Controller(song, new tracker.Theme());

host.onDraw(() => {
    ui.draw();
})



// synth params:

// waveform
// volume
// frequency
// pitch bend
// amp envelope
//     attack
//     decay
//     sustain
//     release
// pitch envelope
//     attack
//     decay
//     sustain
//     release
//     depth
// vibrato
//     rate
//     wave
//     depth
// tremolo
//     rate
//     wave
//     depth
// portamento/glissando
//     speed
//
// methods:
//     gateOn()
//     gateOff()
//     gate(time)