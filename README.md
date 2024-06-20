# Childcare Hub

### Sumário:
- [1 - Introdução](#1---introdução)
- [2 - Quick Start](#2---quick-start)
- [3 - Arquitetura](#3---arquitetura)

## 1 - Introdução

Este é um projeto para fins educacionais. Basicamente é servido um site para dar suporte a pais na criação de filhos, com ferramentas úteis para isso. Como o trabalho ainda está em progresso, muitas das telas no front ainda estão totalmente mockadas. As telas funcionais são:
- http://localhost:3000/tools/baby-record
- http://localhost:3000/sign-in
- http://localhost:3000/sign-up
- http://localhost:3000/recover-request

As motivações para boa parte das decisões de arquitetura ou tecnologias podem parecer bastante esdrúxulas, e de fato as são. Na realidade, o meu objetivo é mais encontrar um pretexto para aplicar boas práticas e tecnologias que venho estudando.

## 2 - Quick Start

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

## 3 - Arquitetura

### 3.1 - O sistema

No pé em que está, o projeto se baseia em um site que se alimenta de microserviços. Dentro da pasta `packages` você poderá encontrar cada um dos microserviços já implementados, bem como o pacote `web`, reponsável por prover o site em si, que se alimenta dos demais pacotes.

Eu queria encontrar um pretexto para lidar com algum tipo de assíncronismo. Então eu pensei no seguinte cenário: imagine um grande sistema, que possui vários subsistemas, ou, microserviços. Cada um desses microserviços lida com um domínio extremamente distinto, motivo para serem serviços separados; salvo por um ponto em comum: todos eles dependem de uma autenticação de usuário e do id deste.

Por exemplo, na página `http://localhost:3000/tools/baby-record` já temos implementado um serviço para que o pai registre os principais acontecimentos com seu bebê ao longo do dia. Um outro serviço, que eu ainda não implementei, mas está em progresso, é o serviço de postagens. A tela desse serviço de postagens pode ser vista de forma mockada na página inicial `http://localhost:3000/`. Perceba então que, o serviço para adicionar informações referentes ao bebê e o serviço para fazer uma postagem nada têm em comum, exceto o fato de que ambos precisam de um user autenticado e logado.

Sendo serviços distintos, os problemas de consistência começam a aparecer: E quando um user for adicionado ou removido? Por exemplo: um usuário fez várias postagens; ao deletar sua conta, suas postagens devem ser apagadas? Os `records` adicionados devem ser apagados? Provavelmente sim para ambos. E como fazer isso? Se solucionarmos esse problema de forma síncrona, ou seja, através de um web-hook http do serviço de `users` que se comunica com os demais quando um user é apagado ou removido, teremos errors se um desses serviços estiver indisponível, seja por um deploy ou por uma queda mesmo.

Então começa a ficar interessante o uso de um sistema de mensageria para tornar essa comunicação assíncrona. Se está confuso até aqui, creio que o GIF a seguir pode ajudar:

![Design sem nome](https://github.com/PauloIVM/childcare-hub/assets/59659732/61bd2baa-268f-4c04-b02e-cb85017c6229)


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


