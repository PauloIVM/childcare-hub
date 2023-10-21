/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { InjectorFactory, Declare } from "../utils";
import Session from "../entities/session-entity";

@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {
    public getCustomRepository() {
        return getCustomRepository(SessionRepository);
    }
}

export const sessionRepositoryFactory = new InjectorFactory(SessionRepository);

// TODO: Documentar todas essas descobertas abaixo, acredito que a melhor
// abordagem vá ser a que o pessoal vinha implementando mesmo.

// TODO: Eu preciso mesmo dessa func getSessionRepository? Em tese, os dois
// caras abaixo são a mesma coisa... conferir e manter o mais simples:
//      const a = getCustomRepository(SessionRepository);
//      const b = new SessionRepository();
// INFO: Conferi que no código do MC a classe não é importada em lugar nenhum.
// Pode ser que o typeorm precise que exporte a classe... sei lá. Mas enfim, se
// der pra usar a classe sem essa func, acho que vai ser mais direto.

// INFO: Resposta do chatGPT:
//      A principal diferença é que getCustomRepository fornece um repositório
//      personalizado que está totalmente integrado com o TypeORM, enquanto a
//      criação direta com new cria uma instância independente que não possui
//      essas funcionalidades. Em geral, a recomendação é usar getCustomRepository
//      para obter repositórios personalizados quando estiver trabalhando com o
//      TypeORM, pois isso garante a funcionalidade completa do framework.

// TODO: Uma última dúvida pra eu testar, faz diferença eu exportar uma instância
// única? Ou é melhor eu exportar a func mesmo? Será se pode gerar algum problema
// de concorrência??? Aparentemente sim, "trasanções compartilhadas".

// export const sessionRepository = getCustomRepository(SessionRepository);
