const readline = require('readline-sync');

class Produto {
  constructor(nome, quantidade, preco) {
    this.nome = nome;
    this.quantidade = quantidade;
    this.preco = preco;
  }
}

class Mercado {
  constructor() {
    this.produtos = [];
  }

  adicionarProduto() {
    const nome = readline.question('Informe o nome do produto: ');
    const quantidade = parseFloat(readline.question('Informe a quantidade do produto: '));
    const preco = parseFloat(readline.question('Informe o preço do produto: '));

    const produto = new Produto(nome, quantidade, preco);
    this.produtos.push(produto);

    console.log(`Produto adicionado ao estoque: ${quantidade} unidades de ${nome}`);
  }

  venderProduto(nome, quantidadeVendida) {
    const produto = this.produtos.find(p => p.nome === nome);

    if (produto) {
      if (produto.quantidade >= quantidadeVendida) {
        produto.quantidade -= quantidadeVendida;
        console.log(`Foram vendidas ${quantidadeVendida} unidades de ${nome}.`);
      } else {
        console.log(`Estoque insuficiente para a venda de ${quantidadeVendida} unidades de ${nome}.`);
      }
    } else {
      console.log(`Produto ${nome} não encontrado no estoque.`);
    }
  }

  visualizarEstoque() {
    if (this.produtos.length === 0) {
      console.log('O estoque está vazio.');
    } else {
      console.log('Produtos disponíveis no estoque:');
      this.produtos.forEach(produto => {
        console.log(`${produto.nome} - Quantidade: ${produto.quantidade} - Preço: R$ ${produto.preco.toFixed(2)}`);
      });
    }
  }
}

const mercado = new Mercado();

while (true) {
  console.log('\n===== Sistema de Mercado =====');
  console.log('1. Adicionar Produto ao Estoque');
  console.log('2. Vender Produto');
  console.log('3. Visualizar Estoque');
  console.log('0. Sair');

  const opcao = readline.questionInt('Escolha uma opção: ');

  switch (opcao) {
    case 1:
      mercado.adicionarProduto();
      break;
    case 2:
      const nomeVenda = readline.question('Nome do produto a vender: ');
      const qtdVenda = parseFloat(readline.question('Quantidade a vender: '));
      mercado.venderProduto(nomeVenda, qtdVenda);
      break;
    case 3:
      mercado.visualizarEstoque();
      break;
    case 0:
      console.log('Saindo do sistema. Até mais!');
      process.exit(0);
    default:
      console.log('Opção inválida. Por favor, escolha uma opção válida.');
  }
}
