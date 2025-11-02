# pgats-automacao-web

Projeto de automação (trabalho final individual) criado para a aplicação fictícia "Automation Exercise" usando Cypress seguindo as instruções guiadas professor Samuel:

Trabalho Final individual.
Usando a aplicação fictícia Automation Exercise, crie um projeto que implementa os casos descritos na página "Test Cases":
1, 2, 3, 4, 5, 6, 8, 9, 10 e 15

Formato de Entrega do Trabalho Final @everyone 

O entregável deverá ser o upload do projeto com a URL para o Github, com atenção para os seguintes pontos:

- 1 - Execução via Github Actions
- 2 - Execução sem quebras
- 3 - Uso adequado de seletores e padrões
- 4 - Atenção a boas práticas
- 5 - Relatórios


## Visão geral

Este repositório contém testes E2E implementados com Cypress que cobrem os casos de teste da lista do curso: 1, 2, 3, 4, 5, 6, 8, 9, 10 e 15. Os testes foram organizados em módulos reutilizáveis sob `cypress/modules` e usam dados de fixtures em `cypress/fixtures`.

Resumo dos objetivos:
- Validar cadastro, login, logout e cenários de erro.
- Enviar formulário de contato com upload.
- Navegar pelas páginas de produtos, pesquisar e verificar detalhes.
- Testar subscription, adicionar ao carrinho e checkout.

## Pré-requisitos

- Node.js (recomendado 16+)
- npm (ou yarn)

## Instalação

No diretório do projeto, instale as dependências:

```bash
npm install
```

## Como executar os testes

Abrir a interface do Cypress (modo interativo):

```bash
npx cypress open
```

Executar todos os testes em modo headless (linha de comando):

```bash
npx cypress run --spec "cypress/e2e/**/*.cy.js"
```

Observações:
- O `cypress.config.js` já está configurado para usar o reporter `cypress-mochawesome-reporter`. Os relatórios gerados (HTML/JSON) ficam em `cypress/reports`.
- Os testes definem viewport em `beforeEach` para `iphone-xr`. Ajuste conforme necessidade.

## Estrutura do repositório (relevante)

- `cypress/e2e/` — arquivos de teste (ex.: `automation-exercise-modules.cy.js`)
- `cypress/modules/` — módulos que encapsulam ações (login, menu, cadastro, produto, carrinho, contato)
- `cypress/fixtures/` — dados de teste (ex.: `dadosUsuario.json`)
- `cypress/reports/` — relatórios gerados pelo reporter mochawesome
- `cypress/downloads/` — arquivos usados em testes (ex.: `downloads.html`)
- `cypress/config.js` / `cypress.config.js` — configuração do Cypress (reporter, retries, node events)
- `package.json` — dependências e scripts do projeto

## Testes implementados

Casos implementados (conforme enunciado):
- 1 - Cadastrar um usuário
- 2 - Login com credenciais corretas
- 3 - Login com credenciais incorretas
- 4 - Logout
- 5 - Cadastro com e-mail existente
- 6 - Contact us com upload de arquivo
- 8 - Verificar páginas "All Products" e detalhes do produto
- 9 - Busca de produto
- 10 - Validar Subscription
- 15 - Registrar usuário, adicionar produto ao carrinho e checkout

## Relatórios e evidências

Após executar `npx cypress run` (headless), o reporter `cypress-mochawesome-reporter` gera artefatos em `cypress/reports` — arquivos `.html` e `.json`. Screenshots e vídeos (se ativados) ficam em `cypress/screenshots` e `cypress/videos`.

## Integração CI (GitHub Actions)

O enunciado exige execução via GitHub Actions. Para rodar os testes no CI, adicione um workflow que execute:

- `npm ci`
- `npx cypress run --spec "cypress/e2e/**/*.cy.js"`

Exemplo básico de job (resumo): instalar dependências e executar `npx cypress run`. Se quiser, posso adicionar um `workflow` de exemplo neste repositório.

## Boas práticas e observações

- Os módulos em `cypress/modules` permitem reaproveitamento e melhor manutenção dos seletores.
- Prefira seletores estáveis (data-qa / data-testid) quando disponíveis.
- Configure variáveis de ambiente para credenciais sensíveis em vez de hardcode.

## Como contribuir / próximos passos

- Padronizar `package.json` com scripts úteis (ex.: `test:headless`, `test:open`, `report:generate`).
- Adicionar workflow do GitHub Actions para execução automática e upload dos relatórios.
- Incluir testes adicionais e casos de borda (p.ex. campos vazios, limites de upload).
