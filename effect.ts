namespace tracker {
    export class Effect {
        constructor(
            public readonly letter: string,
            public readonly name: string,
            public readonly description: string,
            public readonly valueMin = 0,
            public readonly valueMax = 255,
        ) {}
    }
}