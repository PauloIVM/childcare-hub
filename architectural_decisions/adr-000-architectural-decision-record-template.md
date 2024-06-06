# Titulo da Decisão Arquitetural

O objetivo do Architectural Decision Record ou ADR é o de registrar decisões sobre a arquitetura de um projeto de longa vida, usando o próprio versionamento do código como versionamento dos documentos de decisão.

Para se criar novas decisões, basta escrever um documento a partir deste template e criar um Pull Request (PR) para que a mesma seja trazida ao time e revisada. O documento serve como ferramenta de alinhamento de decisões, além de mecanismo pelo qual desenvolvedores podem propor mudanças e ter elas revisadas (por meio de um PR).

Links Úteis:
- [Blog Spotify](https://engineering.atspotify.com/2020/04/14/when-should-i-write-an-architecture-decision-record/)
- [Palestra do Youtube](https://www.youtube.com/watch?v=rwfXkSjFhzc)

## Status: Aceito
O status descreve qual o estado atual do documento, aqui se deve escrever uma única palavra para descrever qual o estado do documento: [proposto, aceito, rejeitado, depreciado, sobreposto].

O status proposto pode ser usado quando uma decisão é proposta mas ainda não está refinada e receberá PR's do próprio time para ser finalizada, no caso deste documento o arquivo já é definido como aceito porque no momento que o PR for aceito a documentação foi concluida (não existem outras discussões pertinentes).

Uma decisão pode ser rejeitada caso no futuro se mostre que ela não é viável para o negócio ou o time de tecnologia, além disso uma nova decisão pode sobrepor esta, sendo importante marcar isso no status do documento.

Nenhum destes status é uma regra, podem ser adicionados outros, bastando editar este mesmo documento adicionando o status e a explicação do mesmo.

## Contexto
No contexto devemos esclarecer alguns pontos:

* Qual o problema inspirou essa decisão?
* Porque é importante agir neste caso?

Ex: "Queremos mudar do padrão monolito para microsserviços porque isso irá facilitar o desenvolvimento e criar potencial de crescimento exponencial para a empresa."

## Decisão
Na "Decisão" se desenvolve o que está sendo proposto, no caso desse documento está sendo proposta a utilização dos ADR's no projeto regional_providers_platform do Backoffice.

Também é válido explicar nesse ponto qual o estado da decisão: Essa decisão é algo completamente novo que irá mudar como escrevemos código ou simplesmente é uma versão escrita do que já é visto no código e queremos manter?

## Consequências
Aqui devem se fazer as considerações de trade-offs causados por essa decisão, se uma certa hierarquia de classes é usada num projeto, que tipo de features isso vai facilitar? e quais tipos de features vão ficar mais dificeis por isso?

Basicamente, se deve trazer uma visão do futuro que pode ser causado por essa decisão, tanto positiva quanto negativa.