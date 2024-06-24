import { IUsersGateway } from "@/application/gateways";
import { IBabiesRepository } from "@/application/repositories";
import { GetBabiesUsecase } from "@/application/usecases";
import {
    IHttpBody,
    IHttpHeaders,
    HttpQuery,
} from "@/interface-adapters/http/dtos";
import { Strategy } from "../strategy";

export class GetBaby implements Strategy {
    private babiesRepository: IBabiesRepository;
    private usersGateway: IUsersGateway;

    async exec(_: HttpQuery, body: IHttpBody, headers: IHttpHeaders): Promise<Record<string, any>> {
        const token = headers.authorization?.split(' ')?.[1];
        const usecase = new GetBabiesUsecase(
            this.usersGateway,
            this.babiesRepository
        );
        const result = await usecase.exec(token);
        return { babies: result.map((r) => ({
            id: r.id,
            name: r.name,
            gender: r.gender,
            birthday: r.birthday
        }))};
    }

    setup(usersGateway: IUsersGateway, babiesRepository: IBabiesRepository): void {
        this.babiesRepository = babiesRepository;
        this.usersGateway = usersGateway;
    }
}
