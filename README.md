# 📝 Lista de Tarefas 

Este é um projeto de lista de tarefas (To-Do List) desenvolvido em React. O objetivo deste projeto é permitir que os usuários adicionem, removam e marquem tarefas como concluídas. O projeto também utiliza o Context API para gerenciar o estado global das tarefas.

## ✨ Funcionalidades

- Adicionar novas tarefas
- Remover tarefas existentes
- Marcar tarefas como concluídas
- Exibir estatísticas de tarefas (total, pendentes e concluídas)
- Salvar o nome do usuário e as tarefas no `localStorage`
- Interface responsiva

## 🛠️ Tecnologias Utilizadas

- React
- TypeScript
- Context API
- SCSS

## 📂 Estrutura de pastas

- **/src**: Contém todo o código-fonte do projeto.
  - **/components**: Contém os componentes React utilizados na aplicação (header, statsCard, tasks).
  - **/context**: Pasta dentro de components que contém o contexto utilizado para gerenciar o estado global das tarefas.
  - **/styles**: Contém o arquivo de estilo Global da aplicação.
  - **App.tsx**: Componente principal da aplicação.

  #### Observação

  Cada componente possui seu próprio estilo modular, com arquivos SASS dedicados.
---


## ⚙️ Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/MonicaAlvesP/ToDo-List.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd ToDo-List
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## 🚀 Uso

1. Abra o navegador e acesse `http://localhost:3000`.
2. Adicione novas tarefas usando o campo de entrada e o botão "Adicionar".
3. Marque tarefas como concluídas clicando na caixa de seleção ao lado de cada tarefa.
4. Remova tarefas clicando no botão "Remover".
5. Veja as estatísticas das tarefas no cabeçalho.
6. Mude o nome do usuário clicando no botão "Mudar Nome" e inserindo um novo nome.

## 📸 Demonstração

Veja abaixo uma imagem do projeto em funcionamento:

| ![To-Do List em funcionamento](/src/assets/Macbook-Air-localhost.png) | ![To-Do List em funcionamento](/src/assets/Xiaomi-Mi-11i-localhost.png) |
|:---------------------------------------------------------------------:|:------------------------------------------------------------------------:|
| Desktop                                                               | Mobile                                                                   |


## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.


Feito com ❤️ por [MA](https://github.com/MonicaAlvesP).


