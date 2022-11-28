## Sobre o TrybeTunes

O TrybeTunes é uma aplicação capaz de buscar e reproduzir o preview de músicas de diferentes bandas e artistas, criar uma lista de músicas favoritas e editar o perfil da pessoa usuária logada. Essa aplicação será capaz de:

  - Fazer login;
  - Pesquisar por uma banda ou artista;
  - Listar os álbuns disponíveis dessa banda ou artista;
  - Visualizar as músicas de um álbum selecionado;
  - Reproduzir uma prévia das músicas deste álbum;
  - Favoritar e desfavoritar músicas;
  - Ver a lista de músicas favoritas;
  - Ver o perfil da pessoa logada;
  - Editar o perfil da pessoa logada;

## Execute na sua máquina

*Clone o repositório
    * `git clone git@github.com:otavioadias/trybetunes.git`
* Entre na pasta:
    * `cd trybetunes`
* Instale as dependências:
    * `npm install`
* Inicialize o projeto:
    * `npm start`

## Habilidades

  * Fazer requisições e consumir dados vindos de uma `API`;
    * `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`
    * `https://itunes.apple.com/lookup?id=${id}&entity=song`

  * Utilizar os ciclos de vida de um componente React;

  * Utilizar a função `setState` de forma a garantir que um determinado código só é executado após o estado ser atualizado
  
  * Utilizar o componente `BrowserRouter` corretamente;

  * Criar rotas, mapeando o caminho da URL com o componente correspondente, via `Route`;

  * Utilizar o `Switch` do `React Router`

  * Usar o componente `Redirect` pra redirecionar para uma rota específica;

  * Criar links de navegação na aplicação com o componente `Link`;

