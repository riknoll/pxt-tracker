enum Button {
    Up,
    Down,
    Left,
    Right,
    A,
    B,
    Menu,
}

enum ButtonEvent {
    Pressed,
    Released
}

class Host {
    constructor() {
    }

    setPixel(x: number, y: number, color: number): void {
    }

    fillRect(x: number, y: number, width: number, height: number, color: number): void {
    }

    onDraw(callback: () => void) {
    }

    drawIcon(bitmap: Buffer, x: number, y: number, color: number): void {
    }

    getInstruments(): tracker.Instrument[] {
        return [];
    }

    playNote(channel: number, time: number, instrument: tracker.Instrument, note: number, velocity: number, gateLength: number): void {
    }

    setPaletteColor(index: number, color: number) {
    }

    onButtonEvent(button: Button, event: ButtonEvent, callback: () => void): void {
    }
}

let getHost: () => Host;