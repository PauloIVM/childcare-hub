import { HttpQuery, IHttpBody, IHttpHeaders } from "@/interface-adapters/http/dtos";
import { HeadersValidator } from "./headers-validator";
import { BodyValidator } from "./body-validator";
import { QueryValidator } from "./query-validator";

export class HttpValidator {
    private bodyValidator: BodyValidator;
    private queryValidator: QueryValidator;
    private headersValidator: HeadersValidator;

    constructor() {
        this.bodyValidator = new BodyValidator();
        this.queryValidator = new QueryValidator();
        this.headersValidator = new HeadersValidator();
    }

    exec(query: HttpQuery, body: IHttpBody, headers: IHttpHeaders) {
        this.bodyValidator.exec(body);
        this.queryValidator.exec(query);
        this.headersValidator.exec(headers);
    }

    setBodyFieldValidator(
        field: Parameters<BodyValidator["setupRecordFieldValidator"]>[0]
    ): this {
        this.bodyValidator.setupRecordFieldValidator(field);
        return this;
    }

    setBodyDeniedFieldValidator(
        field: Parameters<BodyValidator["setupDeniedRecordFieldValidator"]>[0]
    ): this {
        this.bodyValidator.setupDeniedRecordFieldValidator(field);
        return this;
    }

    setBodyRecordDTOValidator(): this {
        this.bodyValidator.setupPartialRecordDTOValidator();
        return this;
    }

    setQueryPaginationValidator(maxLimit?: number): this {
        this.queryValidator.setupPaginationValidator(maxLimit);
        return this;
    }

    setQueryBabyIdValidator(): this {
        this.queryValidator.setupBabyIdValidator();
        return this;
    }

    setQueryRecordIdValidator(): this {
        this.queryValidator.setupRecordIdValidator();
        return this;
    }

    setHeaderTokenValidator(): this {
        this.headersValidator.setupBearerTokenValidator();
        return this;
    }
}
