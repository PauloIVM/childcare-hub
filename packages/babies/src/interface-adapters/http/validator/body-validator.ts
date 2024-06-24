import { BaseError } from "@/domain";
import { IHttpBody } from "@/interface-adapters/http/dtos";

type Params = (keyof IHttpBody)[];

export class BodyValidator {
    private required: Params;
    private optional: Params;
    private denied: Params;

    constructor () {
        this.required = [];
        this.optional = [];
        this.denied = [];
    }

    setupRecordFieldValidator(field: keyof IHttpBody): this {
        this.required.push(field);
        return this;
    }

    setupDeniedRecordFieldValidator(field: keyof IHttpBody): this {
        this.denied.push(field);
        return this;
    }

    setupPartialRecordDTOValidator(): this {
        this.optional.push(
            "recordId",
            "babyId",
            "observations",
            "actionName",
            "init",
            "end",
            "temperature",
            "height",
            "weight",
            "sleepQuality",
            "breastfeedingType",
            "breastfeedingAmount",
        );
        return this;
    }

    exec(body: IHttpBody) {
        const validatorMap: Record<keyof IHttpBody, Function> = {
            recordId: this.validateRecordId.bind(this),
            babyId: this.validateBabyId.bind(this),
            observations: this.validateObservations.bind(this),
            actionName: this.validateActionName.bind(this),
            init: this.validateInit.bind(this),
            end: this.validateEnd.bind(this),
            temperature: this.validateTemperature.bind(this),
            height: this.validateHeight.bind(this),
            weight: this.validateWeight.bind(this),
            sleepQuality: this.validateSleepQuality.bind(this),
            breastfeedingType: this.validateBreastfeedingType.bind(this),
            breastfeedingAmount: this.validateBreastfeedingAmount.bind(this),
            name: this.validateName.bind(this),
            gender: this.validateGender.bind(this),
            birthday: this.validateBirthday.bind(this)
        };
        for (const param of this.required) {
            if (body[param]) {
                validatorMap[param](body[param]);
                continue;
            };
            throw new BaseError({
                message: `Missing required '${param}' param.`,
                clientMessage: `O parâmetro '${param}' é obrigatório.`
            });
        }
        for (const param of this.optional) {
            if (!body[param]) continue;
            validatorMap[param](body[param]);
        }
        for (const param of this.denied) {
            if (!body[param]) continue;
            throw new BaseError({
                message: `Not allowed change '${param}' field`,
                clientMessage: `Not allowed change '${param}' field`,
            });
        }
    }

    private validateRecordId(value: string) {
        if (typeof value !== "string") this.throwTypeError(value);
    }

    private validateBabyId(value: string) {
        if (typeof value !== "string") this.throwTypeError(value);
    }

    private validateObservations(value: string) {
        if (typeof value !== "string") this.throwTypeError(value);
    }

    private validateActionName(value: string) {
        if (typeof value !== "string") this.throwTypeError(value);
    }

    private validateInit(value: string) {
        if (typeof value !== "string") this.throwTypeError(value);
        if (!this.isValidDate(new Date(value))) this.throwInvalidDate(value);
    }

    private validateEnd(value: string) {
        if (typeof value !== "string") this.throwTypeError(value);
        if (!this.isValidDate(new Date(value))) this.throwInvalidDate(value);
    }

    private validateTemperature(value: number) {
        if (typeof value !== "number") this.throwTypeError(value);
    }

    private validateHeight(value: number) {
        if (typeof value !== "number") this.throwTypeError(value);
    }

    private validateWeight(value: number) {
        if (typeof value !== "number") this.throwTypeError(value);
    }

    private validateSleepQuality(value: string) {
        if (typeof value !== "string") this.throwTypeError(value);
    }

    private validateBreastfeedingType(value: string) {
        if (typeof value !== "string") this.throwTypeError(value);
    }

    private validateBreastfeedingAmount(value: number) {
        if (typeof value !== "number") this.throwTypeError(value);
    }

    private validateName(value: number) {
        if (typeof value !== "string") this.throwTypeError(value);
    }

    private validateGender(value: number) {
        if (typeof value !== "string") this.throwTypeError(value);
    }

    private validateBirthday(value: string) {
        if (typeof value !== "string") this.throwTypeError(value);
        if (!this.isValidDate(new Date(value))) this.throwInvalidDate(value);
    }

    private isValidDate(d: Date): boolean {
        return d instanceof Date && !isNaN(d.getDate());
    }

    private throwTypeError<T>(value: T) {
        throw new BaseError({
            message: `Bad '${value}' type.`,
            clientMessage: `O valor '${value}' é inválido.`
        });
    }

    private throwInvalidDate(value: string) {
        throw new BaseError({
            message: `Invalid date: '${value}'.`,
            clientMessage: `Data inválida: '${value}'.`
        });
    }
}
