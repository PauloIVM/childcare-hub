# childcare-hub

## Quick Start

```console
yarn
```

Entrar no my-sql e rodar `create database childcare;`.
Alterar senha no "ormconfig.json" para sua senha local (NÃO COMITAR A SENHA Q ESTÁ LÁ).

No server (TODO: Adicionar isso no pipeline pra rodar automaticamente??):
```console
yarn migration:run
```

Na raiz:
```console
yarn dev
```

## Infos

- Para o serviço com email de recuperação de senha, o tabnews usa essa lib aqui: "nodemailer".
- Tutorial para usar gmail no nodemailer: https://miracleio.me/snippets/use-gmail-with-nodemailer
- Como ter um email com domínio próprio do gmail: https://workspace.google.com/intl/pt-BR/pricing.html?gad=1&gclid=CjwKCAjwp8OpBhAFEiwAG7NaEo4RoM6Y9H2OLF7HaDHia6MsorDsKKNKgMAEgy9tY9NDLtcctw_jrxoC0SMQAvD_BwE&gclsrc=aw.ds


- App pela vercel: https://childcare-hub-web.vercel.app/


## Theme (WIP)

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
// #A8DADC
// #FFFFFF
// #3B5998
// linear-gradient(67.58deg, #d2e8fc 22.4%, #b6d9fc 90.14%) (foi na sorte, mas achei até legal)

## Arquitetura

    entities
       |
       V
  repositories
       |
       V
   usecases   <--  services  (pequenas funcionalidades sem acesso ao DB)
       |
       V
  controllers
       |
       V
    routes    <--  middlewares
       |
       V
      app