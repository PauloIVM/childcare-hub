# Utilizar o padrão de API RESTful para HTTP servers

## Status: Proposto

## Contexto
Atualmente ainda não foi especificado um padrão para as rotas HTTP e organização dos recursos disponíveis destas rotas. O que pode causar confusão durante a implementação de um novo recurso ou na utilização dos recursos externos.

## Decisão
Utilizar e seguir o padrão RESTful. Referência e tópicos importantes:
- [Documentação do padrão RESTful](https://restfulapi.net/)
- [Métodos HTTP](https://restfulapi.net/http-methods/)
- [Nomeclatura dos recursos/rotas](https://restfulapi.net/resource-naming/)

Segue-se um resumo da semântica de cada método HTTP segundo as docs referenciadas:

#### 1. HTTP GET
Este tipo de request deve ser utilizada quando se deseja buscar informações ou recursos, sendo que esta rota não modifica nenhum estado no server; o que chamamos de **safe method**.

Além disso, uma request do tipo GET deve ser **idepotênte**. Ou seja, múltiplas requests devem produzir sempre o mesmo resultado até que outra request (POST, PUT, DELETE ou PATCH) altere o estado de um recurso do servidor.

#### 2. HTTP POST
Esta request deve ser utilizada para criar um novo recurso. Por exemplo, pode ser utilizada para usecases que inserem determinado registro no banco e etc. Note que este método cria um registro por completo e o persiste; não se deve utilizar este method para atualizações de recursos.

As respostas deste método não devem ser cacheadas, a menos que incluam no header os campos `Cache-Control` ou `Expires` devidamente.

Note também que este método não é nem um **safe method** e nem **idepotênte**.

#### 3. HTTP PUT
Este método deve ser utilizado para atualizar um recurso existente. Caso esse recurso não exista, a API pode decidir se deve ou não criar um novo recurso.

Além disso, é esperado que o PUT faça um update completo do recurso, e não apenas parcial. Ou seja, todos os campos do recurso devem ser fornecidos na requisição.

#### 4. HTTP DELETE
Este método deve ser utilizado para se remover recursos.

#### 5. HTTP PATCH
O PATCH deve ser utilizado para se altera um recurso já existente, semelhantemente ao PUT. Contudo, use o PATCH quando a alteração for parcial; ou seja, em apenas alguns campos do recurso.

## Consequências

Melhor organização dos recursos disponíveis nas APIs, funcionando também como um guia para implementações futuras.