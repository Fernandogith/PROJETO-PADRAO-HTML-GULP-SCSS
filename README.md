# PROJETO-PADRAO-HTML-GULP-SCSS

- Padrão para projetos de desenvolvimento sem framework

https://standing-nephew-02c.notion.site/Padr-es-DEV-aace63f853ba496b8da074feeed22363

O Gulp: 

Podemos entender que ele é utilizado para automatizar tarefas, aqui criamos um projeto padrão que:

- Compila, concatena e minifica os arquivos dentro de js/scripts que tenham extensão .js para o arquivo all.js dentro da pasta JS;
- Compila, concatena e minifica os arquivos dentro de js/lib informados no src da função pluginsJs( ), para o arquivo plugins.js dentro da pasta JS;
- Compila e minifica o arquivo main.scss para o arquivo main.css dentro da pasta css;
- Compila, concatena e minifica os arquivos dentro de css/lib informados no src da função pluginsCSS( ), para o arquivo plugins.css dentro da pasta CSS;
- No watch tem uma tarefa que fica olhando para o HTML e quando algo for alterado, atualiza a tela, isso tanto para o HTML, quanto CSS, quanto JS, funciona como um liveserver;
- Temos o Uglify que é utilizado para minificar os arquivos JS;
- Temos o Babel que faz com que funcione em navegadores mais antigos;
- Temos a instalação do proprio sass com a extensão para gulp
- Temos o autoprefixer que aplica a compilação de CSS os webkits para fazer com que funcione em diferentes navegadores (Chrome, mozila…);
- Temos já preparadas as bibliotecas AOS e SWIPER.
