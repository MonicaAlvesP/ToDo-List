# 🛒 Lista de Compras

Este é um projeto de **Lista de Compras** desenvolvido em React. O objetivo deste projeto é permitir que os usuários adicionem, removam e marquem itens como comprados. O projeto utiliza Context API para gerenciar o estado global dos itens e oferece uma interface moderna e responsiva.

## ✨ Funcionalidades

- Adicionar novos itens à lista de compras.
- Remover itens existentes.
- Marcar itens como comprados.
- Exportar a lista de compras para um arquivo CSV.
- Exibir estatísticas da lista (total de itens, pendentes e comprados).
- Interface responsiva para dispositivos móveis e desktops.

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **Context API**: Gerenciamento de estado global.
- **SCSS**: Estilização modular e reutilizável.

## 📂 Estrutura de Pastas

- **/src**: Contém todo o código-fonte do projeto.
  - **/components**: Componentes React utilizados na aplicação (header, statsCard, tasks).
  - **/context**: Contexto utilizado para gerenciar o estado global dos itens.
  - **/styles**: Estilos globais e modulares da aplicação.
  - **App.tsx**: Componente principal da aplicação.

Cada componente possui seu próprio estilo modular, com arquivos SCSS dedicados.

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
2. Adicione novos itens à lista usando o campo de entrada e o botão "Adicionar".
3. Marque itens como comprados clicando na caixa de seleção ao lado de cada item.
4. Remova itens clicando no botão "Remover".
5. Exporte a lista para um arquivo CSV clicando no botão "Exportar para CSV".
6. Veja as estatísticas da lista no cabeçalho.

## 📸 Demonstração

Veja abaixo uma imagem do projeto em funcionamento:

| ![Lista de Compras em funcionamento](/src/assets/Macbook-Air-localhost.png) | ![Lista de Compras em funcionamento](/src/assets/Xiaomi-Mi-11i-localhost.png) |
|:---------------------------------------------------------------------------:|:----------------------------------------------------------------------------:|
| Desktop                                                                     | Mobile                                                                      |

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

---

Feito com ❤️ por [MA](https://github.com/MonicaAlvesP).