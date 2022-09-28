const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Compilando o sass, adicionando autoprefixer e dando refrash na pagina
function compilaSaas() {
    // Mostramos qual pasta deve pegar
    return gulp.src('scss/*.scss')
    // Compilou todos os arquivos dentro da pasta demonstrada e mencionamos que de forma comprimida deve aplicar no local mencionado abaixo
    .pipe(sass({outputStyle : 'compressed'}))
    // o autoprefixer aplica a compilação de CSS os webkits para fazer com que funcione em diferentes navegadores
    .pipe(autoprefixer({
        overrideBrowsersList: ['last 2 versions'],
        cascade: false
    }))
    // Mostramos o local que deve ser jogado os dados compilados e comprimidos (se não existir o arquivo ele criará automáticamente)
    .pipe(gulp.dest('css/'))
    // Vai injetar css na pagina no browserSync sem precisar atualizar a pagina toda, resumindo, vai atualizar as modificações que ocorrerem
    .pipe(browserSync.stream())
}

// Compila, concatena e minifica os arquivos dentro de css/lib informados no src da função pluginsCSS( ), para o arquivo plugins.css dentro da pasta CSS;
function pluginsCSS() {
    return gulp
    // Mencionamos quais arquivos devem ser concatenados, neste caso todos os com a extensão .css dentro de css/lib
    .src('css/lib/*.css')
    // Criamos o arquivo com os dois concatenados
    .pipe(concat('plugins.css'))
    // Salvamos o arquivo já com os concatenados minificados dentro na pasta css
    .pipe(gulp.dest('css/'))
}

// Criamos a tarefa para minificar o CSS
gulp.task('plugincss', pluginsCSS);

// Função que concatena o JS em um arquivo só
function gulpJs() {
    // Aqui mencionamos quais os arquivos que devem ser juntados em um só, neste caso mencionamos todos os que estiverem dentro da pasta com extensão .js
    return gulp.src('js/scripts/*.js')
    // Aqui mencionamos para qual arquivo criado ou não, devemos aplicar dentro as informações concatenadas, sendo assim, criará um arquivo chamado all.js com todo o JS dentro
    .pipe(concat('all.js'))
    // Aqui aplicamos logo depois do all.js, a compilação para o babel, que permite funcionar em navegadores mais antigos
    .pipe(babel({
        presets: ['@babel/env']
    }))
    // Aqui aplicamos o uglify, para minificar nosso arquivo JS antes de criar
    .pipe(uglify())
    // Aqui mencionamos onde o arquivo all.js deve ser criado
    .pipe(gulp.dest('js/'))
    // Aplicado aqui o browserSync.stream(), fazendo com que injete JS no arquivo quando tiver qualquer alteração
    .pipe(browserSync.stream())
}

// Criada função para aplicar ao projeto de forma também automátizada bibliotecas como o AOS e SWIPER
function pluginsJs() {
    return gulp
    // Mencionamos quais arquivos devem ser concatenados
    .src(['./js/lib/aos.min.js' , './js/lib/swiper.min.js'])
    // Mencionamos para onde a concatenação deve ir
    .pipe(concat('plugins.js'))
    // Mencionamos onde deve criar o arquivo plugins.js
    .pipe(gulp.dest('js/'))
    // Mencionamos que todo o arquivo novo que adicionarmos, a pagina de um reload
    .pipe(browserSync.stream())
}

gulp.task('pluginjs', pluginsJs);

// Aplicada aqui para a execução da tarefa gulpJs
gulp.task('alljs', gulpJs);


// Aplicado aqui para execução da tarefa do sass
gulp.task('sass', compilaSaas);


// Função do browserSync, aplicado aqui para a criação de um servidor estilo liveserver;
function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

// Tarefa do browserSync, execução do browser que é um servidor estilo liveserver;
gulp.task('browserSync', browser);

// Função do watch para alterações em scss e html
function watch() {
    // Aplicado automação para que o gulp fique esperando alguma alteração nos arquivos mencionados em gulp.watch('scss/*.scss',  e quando ela acontecer deverá rodar a função , compilaSaas)
    gulp.watch('scss/*.scss', compilaSaas);
    // Com este, fizemos o gulp ficar olhando para os arquivos *css, e quando tiver alteração roda o pluginsCSS, gerando assim o arquivo plugins.css novamente
    gulp.watch('css/lib/*.css', pluginsCSS);
    // Com este, fizemos com que ao alterar qualquer coisa no HTML, a pagina seja atualizada, muito parecido com o que fazemos no css com o ".pipe(browserSync.stream())" que apenas injeta o css, aqui o reload realmente atualiza a pagina toda
    gulp.watch('*.html').on('change', browserSync.reload);
    // Com este, fizemos o gulp ficar olhando para os arquivos *js, e quando tiver alteração roda o gulpJs, gerando assim o arquivo JS novamente
    gulp.watch('js/scripts/*js', gulpJs);
     // Com este, fizemos o gulp ficar olhando para os arquivos *.js da pasta lib, e quando tiver alteração roda o pluginJs, gerando assim o arquivo plugins.js novamente
    gulp.watch('js/lib/*.js', pluginsJs);
}

// Tarefa do watch
gulp.task('watch', watch);

// Tarefas default que executa o watch e o browserSync
gulp.task('default', gulp.parallel('watch', 'browserSync', 'sass', 'plugincss', 'alljs', 'pluginjs',));