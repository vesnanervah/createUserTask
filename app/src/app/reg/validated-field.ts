import { ElementRef } from "@angular/core"

type ValidatedField = {
    name: string,
    ref: ElementRef<HTMLElement> | undefined,
    value: string,
    valid: boolean,
    errorMsg: string,
    placeholder: string,
    inputType: string,
};

type ValidatedFields = {
    [index: string] : ValidatedField
}

export { ValidatedField, ValidatedFields };