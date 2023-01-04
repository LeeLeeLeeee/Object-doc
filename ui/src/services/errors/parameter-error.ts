export class ParameterError extends Error {
    private readonly parameterName: string;

    constructor(parameterName: string) {
        super(parameterName);
        this.parameterName = parameterName;
    }

    get reason() {
        return `${this.parameterName} parameter doesn't be expected`;
    }
}
