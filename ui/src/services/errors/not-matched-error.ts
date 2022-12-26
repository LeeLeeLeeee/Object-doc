export class NotMatchedError extends Error {
    private readonly expected: string;

    constructor(expected: string) {
        super(expected);
        this.expected = expected;
    }

    get reason() {
        return `not matched ${this.expected}`;
    }
}
