const project = require('./index');
const argParse = require('subheaven-arg');

project.addParams([
    { name: 'PYTHON_PATH', description: 'Caminho de instalação do python', required: true, sample: 'C:\\\\iacon\\\\python3\\\\python3.exe' },
    { name: 'HOST', description: 'Nome ou IP do computador na rede', required: true, sample: '127.0.0.1' },
    { name: 'SERVIDOR', description: 'Nome do servidor Sybase na rede', required: true, sample: 'srvnome' },
    { name: 'BANCO', description: 'Nome do banco de dados', required: true, sample: 'bancodedados' },
    { name: 'UID', description: 'Usuário', required: true, sample: 'usuario' },
    { name: 'PWD', description: 'Senha', required: true, sample: 'senha' }
]);
project.config();

argParse.init("subheaven-env", "Cumprimenta alguém");
argParse.positional("name", "Nome a ser cumprimentado", { required: false, default: "SubHeaven", sample: "SubHeaven" });
(async() => {
    if (argParse.validate()) {
        await project.hello(`Hello ${params.name}!`);
    }
})();