namespace arcadeTracker {
    export class Instrument extends tracker.Instrument {
        constructor(name: string, public impl: music.sequencer.Instrument) {
            super(name);
        }
    }

    interface LFO {
        frequency: number;
        amplitude: number;
    }

    interface Envelope {
        attack: number;
        decay: number;
        sustain: number;
        release: number;
        amplitude: number;
    }

    interface InstrumentData {
        waveform: number;
        octave: number;
        ampEnvelope: Envelope;
        pitchEnvelope?: Envelope;
        ampLFO?: LFO;
        pitchLFO?: LFO;
    }

    interface InstrumentDefinition {
        name: string;
        instrument: InstrumentData;
    }

    function definitionToInstrument(def: InstrumentDefinition): Instrument {
        const impl = new music.sequencer.Instrument();
        impl.waveform = def.instrument.waveform;
        impl.octave = def.instrument.octave;
        impl.ampEnvelope.amplitude = def.instrument.ampEnvelope.amplitude;
        impl.ampEnvelope.attack = def.instrument.ampEnvelope.attack;
        impl.ampEnvelope.decay = def.instrument.ampEnvelope.decay;
        impl.ampEnvelope.sustain = def.instrument.ampEnvelope.sustain;
        impl.ampEnvelope.release = def.instrument.ampEnvelope.release;
        if (def.instrument.pitchEnvelope) {
            impl.pitchEnvelope.amplitude = def.instrument.pitchEnvelope.amplitude;
            impl.pitchEnvelope.attack = def.instrument.pitchEnvelope.attack;
            impl.pitchEnvelope.decay = def.instrument.pitchEnvelope.decay;
            impl.pitchEnvelope.sustain = def.instrument.pitchEnvelope.sustain;
            impl.pitchEnvelope.release = def.instrument.pitchEnvelope.release;
        }
        if (def.instrument.ampLFO) {
            impl.ampLFO.frequency = def.instrument.ampLFO.frequency;
            impl.ampLFO.amplitude = def.instrument.ampLFO.amplitude;
        }
        if (def.instrument.pitchLFO) {
            impl.pitchLFO.frequency = def.instrument.pitchLFO.frequency;
            impl.pitchLFO.amplitude = def.instrument.pitchLFO.amplitude;
        }

        return new Instrument(def.name, impl);
    }

    export function getInstruments(): Instrument[] {
        const definitions: InstrumentDefinition[] = [
            {
                name: "Dog",
                instrument: {
                    waveform: 1,
                    octave: 4,
                    ampEnvelope: {
                        attack: 10,
                        decay: 100,
                        sustain: 500,
                        release: 100,
                        amplitude: 1024
                    },
                    pitchLFO: {
                        frequency: 5,
                        amplitude: 0
                    }
                }
            },
            {
                name: "Duck",
                instrument: {
                    waveform: 15,
                    octave: 4,
                    ampEnvelope: {
                        attack: 5,
                        decay: 530,
                        sustain: 705,
                        release: 450,
                        amplitude: 1024
                    },
                    pitchEnvelope: {
                        attack: 5,
                        decay: 40,
                        sustain: 0,
                        release: 100,
                        amplitude: 40
                    },
                    ampLFO: {
                        frequency: 3,
                        amplitude: 20
                    },
                    pitchLFO: {
                        frequency: 6,
                        amplitude: 2
                    }
                }
            },
            {
                name: "Cat",
                instrument: {
                    waveform: 12,
                    octave: 5,
                    ampEnvelope: {
                        attack: 150,
                        decay: 100,
                        sustain: 365,
                        release: 400,
                        amplitude: 1024
                    },
                    pitchEnvelope: {
                        attack: 120,
                        decay: 300,
                        sustain: 0,
                        release: 100,
                        amplitude: 50
                    },
                    pitchLFO: {
                        frequency: 10,
                        amplitude: 6
                    }
                }
            },
            {
                name: "Fish",
                instrument: {
                    waveform: 1,
                    octave: 3,
                    ampEnvelope: {
                        attack: 220,
                        decay: 105,
                        sustain: 1024,
                        release: 350,
                        amplitude: 1024
                    },
                    ampLFO: {
                        frequency: 5,
                        amplitude: 100
                    },
                    pitchLFO: {
                        frequency: 1,
                        amplitude: 4
                    }
                }
            },
            {
                name: "Car",
                instrument: {
                    waveform: 16,
                    octave: 4,
                    ampEnvelope: {
                        attack: 5,
                        decay: 100,
                        sustain: 1024,
                        release: 30,
                        amplitude: 1024
                    },
                    pitchLFO: {
                        frequency: 10,
                        amplitude: 4
                    }
                }
            },
            {
                name: "Computer",
                instrument: {
                    waveform: 15,
                    octave: 2,
                    ampEnvelope: {
                        attack: 10,
                        decay: 100,
                        sustain: 500,
                        release: 10,
                        amplitude: 1024
                    }
                }
            },
            {
                name: "Burger",
                instrument: {
                    waveform: 1,
                    octave: 2,
                    ampEnvelope: {
                        attack: 10,
                        decay: 100,
                        sustain: 500,
                        release: 100,
                        amplitude: 1024
                    }
                }
            },
            {
                name: "Cherry",
                instrument: {
                    waveform: 2,
                    octave: 3,
                    ampEnvelope: {
                        attack: 10,
                        decay: 100,
                        sustain: 500,
                        release: 100,
                        amplitude: 1024
                    }
                }
            },
            {
                name: "Lemon",
                instrument: {
                    waveform: 14,
                    octave: 2,
                    ampEnvelope: {
                        attack: 5,
                        decay: 70,
                        sustain: 870,
                        release: 50,
                        amplitude: 1024
                    },
                    pitchEnvelope: {
                        attack: 10,
                        decay: 45,
                        sustain: 0,
                        release: 100,
                        amplitude: 20
                    },
                    ampLFO: {
                        frequency: 1,
                        amplitude: 50
                    },
                    pitchLFO: {
                        frequency: 2,
                        amplitude: 1
                    }
                }
            }
        ];

        return definitions.map(d => definitionToInstrument(d));
    }
}