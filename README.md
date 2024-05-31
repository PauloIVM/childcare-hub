# childcare-hub

## Quick Start

Requirements: OS linux, NodeJS, docker.

Instale as dependências:
```console
yarn
```

Em seguida, você precisará baixar as imagens docker para todos os serviços (dbs, filas e etc) que são usados no projeto. Tendo o docker instalado na sua máquina, e adicionado seu user no docker group (me refiro ao comando para conseguir utilizar o docker sem ter que passar o "sudo", tendo dúvidas pesquise pelo comando `sudo usermod -aG docker $USER`), basta que você rode o comando a seguir; ele irá baixar todas as imagens e iniciar cada serviço; assim que baixar todas as imagens você pode matar o processo, pois os containers sempre são inicializados juntamente com a aplicação.

```console
yarn docker:services
```

Para conferir se o pull foi feito corretamente, tente utilizar um dos serviços; por exemplo, você pode tentar acessar no navegador `http://localhost:15672/` e conferir se irá abrir o painel do RabbitMQ. Se estiver tudo ok, de um `ctrl C` para encerrar o processo rodando os containers.

Agora, para rodar todo o sistema, basta executar:

```console
yarn dev
```

Caso queira, ao invés de rodar o `yarn docker:services`, você pode instalar os serviços manualmente na sua máquina, e então execute apenas os pacotes desejados do workspace.

Caso queira debugar, você pode executar o script desejado do launch.json se estiver usando o vscode. Apenas uma observação, esses scripts não inicializam os services containerizados como o `yarn dev` faz. Portanto, rode em um terminal à parte o comando `yarn docker:services` e depois inicialize o script de depuração desejado.

Caso queira utilizar alguma ferramenta para trabalhar com algum dos serviços containerizados, você pode fazer isso sem problemas. Por exemplo, você pode utilizar o `MySQL Workbench` para conectar com o container MySQL fornecido pela aplicação. Os dados dos serviços serão persistidos na sua máquina host, então não se preocupe pois não perderá nenhuma informação por encerrar os container e startá-los novamente cada vez que iniciar a aplicação.


## Theme (WIP)

``` js
// INFO: Cores legais pra começar um theme:
// #2E3B4F      // main
// #3F3F3F      // dark (cor mais escura para fonte)
// #DEDBD5      // gray (talvez usar essa cor como background do site inteiro??)
// #565656      // cor suave para fonte
// #F44336      // vermelho forte... usado no avatar do user
// #F7EFDA      // amarelo suave (cor da logo).
// #E1E9F0      // azul cinza claro
// #C0C7CF      // azul cinza escuro
// #D2E8FC      // azul claro
// #ED6C02      // laranja
// #A8DADC
// #FFFFFF
// #3B5998
// linear-gradient(67.58deg, #d2e8fc 22.4%, #b6d9fc 90.14%) (foi na sorte, mas achei até legal)
```

## Arquitetura

Arquitetura inspirada no Clean Architecture. Portanto, siga sempre a `Regra da Dependência`, que estabelece que um módulo interno não pode conhecer (importar) nada de um módulo externo. Ou seja, o módulo `domain` não deve importar nenhuma classe, função, interface ou o que quer que seja de `application` ou `infra`, `application` pode importar de `domain`, mas não de `infra`, e assim por diante.

Libs podem ser importadas no `domain`, mas use isso com cautela para não condicionar demais o funcionamento do código à dependências terceiras.

```
    .....................................................
    . index.ts                                          .
    .   .............................................   .
    .   .  infra (dbs, repositories, servers, etc)  .   .
    .   .   .....................................   .   .
    .   .   .       application (usecases)      .   .   .
    .   .   .   .............................   .   .   .
    .   .   .   .         domain            .   .   .   .
    .   .   .   .............................   .   .   .
    .   .   .....................................   .   .
    .   .............................................   .
    .....................................................
```

## TODOs

- BUG: Ao criar a conta pela primeira vez, eu inicio a navegação e vou para as ferramentas. Parece que gera um bug como se eu não estivesse logado. Talvez eu precise fazer um redirect ou refrash.
- BUG: Nos records, ao criar apenas records com o tempo em aberto, quando eu vou apagando eles, a contagem fica toda bugada.
- BUG: Parece que o JWT está expirando com coisa de 1 dia apenas. Conferir o motivo.

- Lib para criar o sistema de postagens: https://github.com/niuware/mui-rte. A demo dessa lib me fez refletir que talvez eu esteja estilizando as coisas erradas com o MUI. Talvez eu devesse focar em criar um theme e estilizar cada componente via theme. Parece q nesse docs tem um pallete generator e alguns tutoriais interessantes https://mui.com/material-ui/customization/theming/; acho q vai valer um esforço nesse sentido mesmo.
- Implementar cache do ioredis no mysql. Parece que é bem dizer uma config no orm e o setup do banco... eu apaguei a config pq não tinha feito o setup do banco.