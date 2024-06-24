import { IUsersGateway } from "@/application/gateways";
import { IBabiesRepository } from "@/application/repositories";
import { InsertBabyUsecase } from "@/application/usecases";
import {
    IHttpBody,
    IHttpHeaders,
    HttpQuery,
} from "@/interface-adapters/http/dtos";
import { Strategy } from "../strategy";

export class PostBaby implements Strategy {
    private babiesRepository: IBabiesRepository;
    private usersGateway: IUsersGateway;

    async exec(_: HttpQuery, body: IHttpBody, headers: IHttpHeaders): Promise<Record<string, any>> {
        const {
            name,
            gender,
            birthday,
        } = body;
        const token = headers.authorization?.split(' ')?.[1];
        const usecase = new InsertBabyUsecase(
            this.usersGateway,
            this.babiesRepository
        );
        await usecase.exec(token, {
            name,
            gender,
            birthday: new Date(birthday),
            parentIds: []
        });
        return { message: "ok" };
    }

    setup(usersGateway: IUsersGateway, babiesRepository: IBabiesRepository): void {
        this.babiesRepository = babiesRepository;
        this.usersGateway = usersGateway;
    }
}
