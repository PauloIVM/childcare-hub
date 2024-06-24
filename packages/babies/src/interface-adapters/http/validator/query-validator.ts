import { BaseError } from "@/domain";
import { HttpQuery } from "@/interface-adapters/http/dtos";

type Params = (keyof HttpQuery)[];

export class QueryValidator {
    private required: Params;
    private optional: Params;
    private maxLimit: number;

    constructor () {
        this.required = [];
        this.optional = [];
    }

    setupPaginationValidator(maxLimit = 100): this {
        this.maxLimit = maxLimit;
        this.required.push(HttpQuery.limit);
        this.optional.push(HttpQuery.skip);
        return this;
    }

    setupBabyIdValidator(): this {
        this.required.push(HttpQuery.babyId);
        return this;
    }

    setupRecordIdValidator(): this {
        this.required.push(HttpQuery.recordId);
        return this;
    }

    exec(query: HttpQuery) {
        const validatorMap = {
            [HttpQuery.skip]: this.validateSkip.bind(this),
            [HttpQuery.limit]: this.validateLimit.bind(this),
            [HttpQuery.babyId]: this.validateBabyId.bind(this),
            [HttpQuery.recordId]: this.validateRecordId.bind(this),
        }
        for (const param of this.required) {
            if (query[param]) {
                validatorMap[param](query[param]);
                continue;
            };
            throw new BaseError({
                message: `Missing required '${param}' param.`,
                clientMessage: `O parâmetro '${param}' é obrigatório.`
            });
        }
        for (const param of this.optional) {
            if (!query[param]) continue;
            validatorMap[param](query[param]);
        }
    }

    // TODO: Adicionar validação de tipagem... o express mesmo tem aquela parada de transformar
    //       query-params duplicados em um array.
    private validateSkip(value: string) {
        this.validateNumberCast(value);
    }

    private validateLimit(value: string) {
        this.validateNumberCast(value);
        if (Number(value) > this.maxLimit) {
            throw new BaseError({
                message: `Records are limited by ${this.maxLimit} elements per request.`,
                clientMessage: `Você não pode puxar mais de ${this.maxLimit} records de uma vez.`
            });
        }
    }

    private validateBabyId(value: string) {}

    private validateRecordId(value: string) {}

    private validateNumberCast(value: string) {
        if (isNaN(Number(value))) {
            throw new BaseError({
                message: `Bad ${value} param`,
                clientMessage: `Parâmetro ${value} inválido.`
            });
        }
    }
}
