import * as Usecases from "@/application/usecases";
import * as Repositories from "@/application/repositories";
import { IQueue } from "@/interface-adapters/ports/queue";

export class QueueController {
	constructor (
        queue: IQueue,
        babiesRepository: Repositories.IBabiesRepository,
    ) {
        queue.on("babies.users_created", async (body) => {
            const { userId } = body;
            const usecase = new Usecases.InternalInsertBabyUsecase(babiesRepository);
            // INFO: Aqui a entity n aceita o nome nulo... daí quebra o usecase. Tratar isso. Além
            //       disso, aqui é um ponto interessante para eu tratar a tolerância à falhas. Quando
            //       der um error, seria interessante eu alimentar uma outra fila, enviando os dados
            //       do user que teve esse error, pra q eu possa posteriormente corrigir.
            await usecase.exec({
                name: "name",
                gender: "male",
                birthday: new Date(),
                parentIds: [userId]
            })

        });
	}
}
