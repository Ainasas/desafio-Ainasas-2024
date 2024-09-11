class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: ['savana'], tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: ['floresta'], tamanho: 5, animais: [] },
        { numero: 3, bioma: ['savana', 'rio'], tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: ['rio'], tamanho: 8, animais: [] },
        { numero: 5, bioma: ['savana'], tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] },
      ];
  
      this.animais = {
        LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
      };
    }
  
    analisaRecintos(animal, quantidade) {
      if (!this.animais[animal]) {
        return { erro: "Animal inválido", recintosViaveis: null };
      }
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: "Quantidade inválida", recintosViaveis: null };
      }
  
      const animalInfo = this.animais[animal];
      const tamanhoAnimal = animalInfo.tamanho * quantidade;
      const recintosViaveis = [];
  
      this.recintos.forEach((recinto) => {
        // Calcular o espaço ocupado atualmente no recinto
        const espacoOcupado = recinto.animais.reduce((total, animalExistente) => {
          const tamanhoAnimalExistente = this.animais[animalExistente.especie].tamanho * animalExistente.quantidade;
          return total + tamanhoAnimalExistente;
        }, 0);
  
        // Calcular o espaço disponível no recinto
        const espacoDisponivel = recinto.tamanho - espacoOcupado;
  
        // Verificar se o recinto tem o bioma compatível
        const biomaCompativel = animalInfo.biomas.some(bioma => recinto.bioma.includes(bioma));
        const espacoSuficiente = espacoDisponivel >= tamanhoAnimal;
  
        // Verificar compatibilidade entre os animais existentes e os novos
        let compatibilidadeAnimais = true;
        if (animalInfo.carnivoro) {
          compatibilidadeAnimais = recinto.animais.every(animalExistente => animalExistente.especie === animal);
        }
  
        // Especificidade para HIPOPOTAMO e MACACO
        if (animal === 'HIPOPOTAMO' && recinto.animais.length > 0 && !recinto.bioma.includes('rio')) {
          compatibilidadeAnimais = false;
        }
        if (animal === 'MACACO' && quantidade === 1 && recinto.animais.length === 0) {
          compatibilidadeAnimais = true; 
        }
  
        // Adicionar recinto à lista de viáveis se todas as condições forem satisfeitas
        if (biomaCompativel && espacoSuficiente && compatibilidadeAnimais) {
          const espacoLivre = recinto.tamanho - (espacoOcupado + tamanhoAnimal);
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`);
        }
      });
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável", recintosViaveis: null };
      }
  
      return { erro: null, recintosViaveis: recintosViaveis.sort() };
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  