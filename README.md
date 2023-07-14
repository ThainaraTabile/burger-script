# Burger-Script :hamburger:

Quinto projeto realizado pelo bootcamp @Laboratoria, o projeto Burger Script envolve o desenvolvimento de uma interface de pedidos para um restaurante de hambúrgueres, que deve integrar-se com uma API . O objetivo principal é aprender a construir uma aplicação web utilizando o React. Projeto desenvolvido em parceria com @patriciadania.
<div align="center">
<img width="500" src="https://github.com/patriciadania/burger-script/assets/120285942/2960fb2a-49af-4675-a8ca-3a47ab20a913"/>

</div>

<div align="center">
  <br>

  <br>
  <br>
  <img align="center" alt="git" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"/>
    <img align="center" alt="Rafa-CSS" height="30" width="40" src="https://user-images.githubusercontent.com/120285942/236062287-09f1bc78-7e35-45bc-b420-17b08bd4f81d.svg">
     <img align="center" alt="Rafa-CSS" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg">
  <img align="center" alt="git" height="30" width="40" src="https://camo.githubusercontent.com/900baefb89e187c8b32cdbb3b440d1502fe8f30a1a335cc5dc5868af0142f8b1/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f64657669636f6e732f64657669636f6e2f69636f6e732f6e6f64656a732f6e6f64656a732d6f726967696e616c2e737667" />
  <img align="center" alt="Rafa-Js" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="vscode" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" />
  <img align="center" alt="Figma" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" />
  <br>


  Desenvolvido por <br>
  <br>
    Patricia Adania de Oliveira<br>
  [Linkedin](https://www.linkedin.com/in/patriciadania/) | [Github](https://github.com/patriciadania)
  <br>
  <br>
  Thainara Tabile <br>
  [Linkedin](https://www.linkedin.com/in/thainaratabile/) | [Github](https://github.com/ThainaraTabile) 
  <br>
  <br>
 
  
</div>
 
- [Burger-Script :hamburger:](#burger-script-hamburger)
  - [1. Sobre o projeto](#1-sobre-o-projeto)
  - [2. Funcionalidades](#2-funcionalidades)
      - [Atendimento](#atendimento)
      - [Cozinha](#cozinha)
      - [Administração](#administração)
  - [3. Executar a Aplicação](#3-executar-a-aplicação)
  - [4. Considerações Técnicas:](#4-considerações-técnicas)
      - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [5. Mock da API](#5-mock-da-api)
  - [6. Testes Unitários](#6-testes-unitários)
  - [7. Testes de Usabilidade e Feedback dos Usuários](#7-testes-de-usabilidade-e-feedback-dos-usuários)


## 1. Sobre o projeto


Este projeto consiste em uma interface de usuário desenvolvida com React, com o objetivo de fornecer uma solução completa para gerenciamento do restaurante `Burger Script`, um fast food 24hrs.

A interface visa melhorar a eficiência operacional e facilitar a administração do restaurante Burger Script, oferecendo uma plataforma com funcionalidades que atendem as necessidades de cada área do negócio.

Para que ocorra o recebimento e processamento dos dados enviados pelo cliente, a interface se integra com um `mock de API`.
***

## 2. Funcionalidades

A interface fornece recursos com base nas permissões atribuídas a cada usuário. Após o processo de login, o sistema verifica o cargo do usuário e redireciona automaticamente para as páginas pertinentes ao cargo. Abaixo estão listados os principais recursos disponíveis em cada área:


#### Atendimento
- `Registro de Pedidos`: Usuários com a role `atendimento` têm acesso à funcionalidade de registro de pedidos. A interface exibe dois menus distintos: Café da Manhã e Menu Principal, contendo os respectivos produtos disponíveis. O atendente pode selecionar itens, adicionar ou remover produtos da comanda, bem como, pode  visualizar um resumo completo do pedido, incluindo o cálculo do custo total.

- `Gerenciamento de Pedidos`: Os atendentes têm acesso a uma visualização dos pedidos que foram enviados para a cozinha e aguardam a entrega. Eles podem marcar os pedidos como "entregues" após realizarem a entrega física ao cliente, removendo-os da lista de pedidos pendentes. Além disso, os atendentes também têm a capacidade de visualizar os pedidos que já foram entregues.

#### Cozinha
- `Preparação de Pedidos`: Usuários com a role `cozinha` têm acesso a uma seção específica da interface onde podem visualizar os pedidos recebidos dos atendentes. Essa área permite que os usuários da cozinha saibam quais pedidos devem ser preparados. Ao concluir o processo de preparação de um pedido, o usuário da cozinha pode alterar o status do pedido para "pronto para servir".

- `Pedidos Prontos para Servir`: Os pedidos que possuem este status são automaticamente enviados de volta ao setor de atendimento. Isso permite que os atendentes sejam notificados de que os pedidos estão prontos para serem entregues aos clientes.

#### Administração
- `Gerenciamento de Colaboradores`: Os usuários com permissões administrativas têm acesso a recursos de gerenciamento de colaboradores. Isso inclui listar, adicionar, editar e excluir informações dos colaboradores, como nome, cargo, informações de contato, entre outros.

- `Gerenciamento de Produtos`: Estes usuários têm acesso a recursos de gerenciamento de produtos. Isso permite adicionar, editar e excluir produtos disponíveis no menu do restaurante, fornecendo controle completo sobre as opções oferecidas.
***
## 3. Executar a Aplicação

Não há uma aba específica para cadastro de novos usuários. Isso ocorre porque a responsabilidade de registrar novos usuários é atribuída exclusivamente ao administrador do sistema.

Caso você queira testar a aplicação, pode fazer login utilizando alguma das credenciais abaixo:

email: atendimento@bs.com   | senha:  1234567
 <br>
  <br>
email: cozinha@bs.com   | senha:  1234567
 <br>
  <br>
email: adm@bs.com   | senha:  1234567

Destaco que essas são contas de teste e têm permissões restritas, com base nos perfis de usuário predefinidos.


## 4. Considerações Técnicas:

#### Tecnologias Utilizadas
O projeto foi desenvolvido utilizando várias tecnologias modernas e amplamente adotadas no desenvolvimento de aplicações web. Algumas das principais tecnologias utilizadas incluem:

O projeto foi construído usando o framework `JavaScript React`, que oferece uma abordagem eficiente e reativa para o desenvolvimento de interfaces de usuário interativas e dinâmicas.

A ferramenta Insomnia foi utilizada para testar e simular as requisições da `API`. Com o `Insomnia`, foi possível enviar `requisições HTTP` personalizadas e visualizar as respostas recebidas, garantindo a correta comunicação entre a interface e o `mock da API`.

Além dessas tecnologias mencionadas, também foram utilizadas outras ferramentas e bibliotecas, como gerenciadores de pacotes, sistemas de controle de versão e bibliotecas auxiliares para a construção do projeto. A combinação dessas tecnologias e ferramentas permitiu o desenvolvimento de uma interface de usuário moderna, responsiva e funcional para o gerenciamento eficiente de pedidos em um ambiente de restaurante.
***


## 5. Mock da API
Este projeto utiliza um [`mock de API`](https://burger-queen-api-mock-one.vercel.app/) para o recebimento e processamento dos dados enviados pela interface do cliente.

É importante ressaltar que o `mock de API` não armazena os dados permanentemente, pois não possui um banco de dados real. Isso significa que, ao utilizar a interface, os dados enviados são temporários e não persistem entre sessões. 


Além disso, o `mock de API` simula um tempo de expiração do token de autenticação. Quando o token expira, o processamento dos dados enviados é descartado, pois não há mecanismo de autenticação real para renovar o token. 

***
## 6. Testes Unitários
Foram implementados testes unitários para garantir a qualidade e a estabilidade da aplicação, onde foi possível verificar o comportamento individual de cada componente ou função em isolamento, permitindo a identificação de possíveis erros ou falhas.
Para realizar os testes unitários, foi utilizada uma combinação de ferramentas e bibliotecas, como:

`Jest`: utilizado como base para a criação e execução dos testes unitários. Ele fornece uma estrutura eficiente para escrever testes de forma organizada e automatizada.

A biblioteca `React Testing Library` foi adotada para testar os componentes `React`. Ela oferece uma abordagem centrada no usuário para testes, simulando interações e verificando o comportamento esperado dos componentes.

Os `testes unitários` abrangem diversas áreas da aplicação, desde a validação de dados e lógica de negócios até a interação correta com o `mock da API e a renderização adequada dos componentes.
***
## 7. Testes de Usabilidade e Feedback dos Usuários
Os testes de usabilidade foram conduzidos com uma abordagem centrada no usuário, permitindo que os usuários interajam com a interface e fornecessem comentários, sugestões e observações sobre a usabilidade, a navegabilidade e a eficiência da aplicação. Esses testes proporcionam insights valiosos sobre os pontos fortes e as oportunidades de melhoria da interface.

Essa abordagem ajuda a garantir que a interface seja intuitiva, fácil de usar e forneça uma experiência satisfatória aos usuários finais.

 


