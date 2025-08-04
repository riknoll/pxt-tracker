class ArcadeHost extends Host {
    static instance: ArcadeHost;

    static getInstance(): ArcadeHost {
        if (!ArcadeHost.instance) {
            ArcadeHost.instance = new ArcadeHost();
        }
        return ArcadeHost.instance;
    }

    protected constructor() {
        super();
    }

    setPixel(x: number, y: number, color: number): void {
        screen.setPixel(x, y, color);
    }

    fillRect(x: number, y: number, width: number, height: number, color: number): void {
        screen.fillRect(x, y, width, height, color);
    }

    onDraw(callback: () => void) {
        scene.createRenderable(0, callback);
    }

    drawIcon(bitmap: Buffer, x: number, y: number, color: number): void {
        screen.drawIcon(bitmap, x, y, color);
    }

    getInstruments(): tracker.Instrument[] {
        return arcadeTracker.getInstruments();
    }

    playNote(channel: number, time: number, instrument: tracker.Instrument, note: number, velocity: number, gateLength: number): void {
        const instr = instrument as arcadeTracker.Instrument;

        const buf = music.sequencer.renderInstrument(
            instr.impl,
            note,
            gateLength,
            (velocity / 0xff) * 1024
        );

        music.playInstructions(time, buf);
    }

    setPaletteColor(index: number, pColor: number): void {
        color.setColor(index, pColor);
    }

    onButtonEvent(button: Button, event: ButtonEvent, callback: () => void): void {
        let impl: controller.Button;

        switch (button) {
            case Button.Up:
                impl = controller.up;
                break;
            case Button.Down:
                impl = controller.down;
                break;
            case Button.Left:
                impl = controller.left;
                break;
            case Button.Right:
                impl = controller.right;
                break;
            case Button.A:
                impl = controller.A;
                break;
            case Button.B:
                impl = controller.B;
                break;
            case Button.Menu:
                impl = controller.menu;
                break;
        }

        impl.onEvent(event === ButtonEvent.Pressed ? ControllerButtonEvent.Pressed : ControllerButtonEvent.Released, callback);
    }

    sendVoiceMessage(channel: number, message: Buffer): void {
        music.sendMonoSynthMessage(channel, message);
    }
}

getHost = () => ArcadeHost.getInstance();

namespace music {
    //% shim=music::sendMonoSynthMessage
    export function sendMonoSynthMessage(
        channel: number,
        message: Buffer
    ) {
    }
}