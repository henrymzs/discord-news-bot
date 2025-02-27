# Projeto Bot discord 

Este projeto tem como finalidade a criação de um bot no discord que será responsavel por buscar noticias relacionadas a tecnologia e mandar em servidores que ele estiver presente.

Ao longo do projeto irei colocar aqui oque aprendi e as ideias que tive durante a construção desse projeto e ao final irei organizar tudo e compilar meus conhecimentos adquiridos e ideias que tive a partir desse projeto de forma que possa ajudar outros desenvolvedores e permitir que possíveis recrutadores compreendam os conceitos que aprendi ao longo do projeto. 

 Optional Chaining ```(?.)``` é um operador do JavaScript introduzido no ES2020 que permite acessar propriedades de objetos aninhados sem precisar verificar manualmente se cada nível existe. Isso evita erros do tipo "Cannot read property of undefined" e torna o código mais limpo e seguro.

# Como funciona?
Quando você tenta acessar uma propriedade que não existe, o optional chaining ```(?.)``` retorna undefined em vez de gerar erro.

Exemplo sem Optional Chaining ```(?.)```
```
const usuario = {}; 

console.log(usuario.endereco.rua); // ❌ Erro: Não é possível ler propriedades de undefined
```
O erro acontece porque usuario.endereco não existe.

Exemplo com Optional Chaining ```(?.)```
```
const usuario = {}; 

console.log(usuario.endereco?.rua); // ✅ undefined (sem erro)
```

Aqui, o ```(?.)``` verifica se endereco existe antes de tentar acessar ```rua```.
Se ```endereco``` for ```undefined``` ou ```null```, a expressão simplesmente retorna ```undefined``` sem quebrar o código.

# Aplicações Práticas
Acessando propriedades de objetos aninhados
```
const usuario = {
  nome: "Lucas",
  endereco: {
    cidade: "São Paulo"
  }
};

console.log(usuario.endereco?.cidade); // ✅ "São Paulo"
console.log(usuario.endereco?.rua);    // ✅ undefined (sem erro)
```

Chamando métodos de um objeto opcionalmente
Se um objeto pode ou não ter um método, o optional chaining evita erros ao chamá-lo.
```
const usuario = {
  nome: "Ana",
  falar: () => "Olá!",
};

console.log(usuario.falar?.()); // ✅ "Olá!"
console.log(usuario.comer?.()); // ✅ undefined (sem erro)
```

Se ```comer``` não existir, o ```(?.)``` impede que o código quebre.

Acessando elementos de um array opcionalmente

Se a variável pode ser ```null``` ou ```undefined```, podemos usar o ```?```. ao acessar elementos do array.
``````
const lista = null;

console.log(lista?.[0]); // ✅ undefined (sem erro)
``````

Usando Optional Chaining com Nullish Coalescing (```??```)

Podemos combinar com o operador ```??``` para definir valores padrão quando o resultado for ```undefined``` ou ```null```:
```
const usuario = {};

console.log(usuario.endereco?.rua ?? "Endereço não informado"); // ✅ "Endereço não informado"
```

# Aspas Simples ou Aspas Dupla?
Depende do projeto, não há certo ou errado, o importante é ser consistente dentro do projeto. Porém dados alguns exemplos pode se dizer que aspas simples se torna mais recomendado, por exemplo:

Melhor compatilidade com linguagem SQL

Linguagem SQL costuma usar aspas simples como padrão. Então se você escreve muitas Queries SQL no código, fica mais natural:
```
const query = 'SELECT * FROM usuarios';
```

```
const query = "SELECT * FROM usuarios";
```

Mas novamente vai depender muito do projeto onde vai estar inserido, criando o padrão, vai evitar que isso aconteça:

```
const nome = "Heny";
const sobrenome = 'Kauã';
```
Com ESLint configurado para aspas simples, ele padroniza para:

```
const nome = 'Henry';
const sobrenome = 'Kauã';
```


# O que é uma "Yoda Condition"?
É quando a ordem dos elementos em uma comparação é invertida, ou seja, o valor literal aparece antes da variável.
```
// Exemplo de Yoda Condition ❌ (Evitar)
if (5 === x) { 
	console.log('Yoda Condition');
}
```

Em vez disso, o código deveria ser escrito de forma natural:
```
// Correto ✅
if (x === 5) { 
	console.log('Padrão normal');
}
```


# Qual a diferença?
```module.exports = pool```
Retorna um pool de conexões em callbacks.
Quando você executa uma query, precisa usar callbacks para capturar resultados.
Exemplos de uso de callbacks:

```
const pool = require('./database');

pool.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    console.log(results);
});
```
Desvantagem:
Callbacks tornam o código menos organizado e mais difícil de lidar, especialmente quando há múltiplas quries encadeadas.


```module.exports = pool.promise()```
Retorna um pool de conexões baseado em Promises
Permite usar async/await, oque deixa o código mais organizado e moderno
Exemplo de uso de async/await
const pool = require('./database');
```
async function getUsers() {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        console.log(rows);
    } catch (error) {
        console.error(error);
    }
}

getUsers();
```
Vantagens:
Código mais limpo e organizado usando async/await
Melhor tratamento de erros usando try/catch
Facilidade para encadear consultas sem 'callback hell'