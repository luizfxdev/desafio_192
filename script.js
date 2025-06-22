// Função principal que encontra números na mesma posição em ordenações crescente e decrescente
function findSpecialNumbers(input) {
  try {
    // Verificar se a entrada contém apenas números e vírgulas
    if (!/^[\d\s,]+$/.test(input)) {
      throw new Error('Entrada deve conter apenas números separados por vírgula');
    }

    // Converter entrada para array de números
    const original = input
      .split(',')
      .map(num => parseInt(num.trim(), 10))
      .filter(num => !isNaN(num));

    if (original.length === 0) throw new Error('Entrada inválida');

    // Criar ordenações
    const ascending = [...original].sort((a, b) => a - b);
    const descending = [...original].sort((a, b) => b - a);

    // Encontrar números que mantêm a mesma posição nas duas ordenações
    const specialNumbers = [];
    const foundPositions = []; // Para rastrear posições já encontradas

    for (let i = 0; i < original.length; i++) {
      // Verificar se o elemento na posição i é o mesmo nas duas ordenações
      if (ascending[i] === descending[i]) {
        // Evitar duplicatas verificando se já foi adicionado
        if (!specialNumbers.includes(ascending[i])) {
          specialNumbers.push(ascending[i]);
          foundPositions.push(i);
        }
      }
    }

    return {
      result: specialNumbers.length > 0 ? `[${specialNumbers.join(', ')}]` : 'Nenhum número especial encontrado',
      calculation: generateCalculation(original, ascending, descending, specialNumbers, foundPositions)
    };
  } catch (error) {
    return {
      result: 'Entrada inválida',
      calculation: 'Por favor, insira apenas números separados por vírgula (ex: 3, 1, 4, 1, 5, 9)'
    };
  }
}

// Gerar detalhes do cálculo
function generateCalculation(original, ascending, descending, specialNumbers, foundPositions) {
  let output = `Lista Original: [${original.join(', ')}]\n\n`;
  output += `Ordenação Crescente: [${ascending.join(', ')}]\n\n`;
  output += `Ordenação Decrescente: [${descending.join(', ')}]\n\n`;

  output += `Análise por posição:\n`;
  for (let i = 0; i < original.length; i++) {
    output += `Posição ${i}: ${ascending[i]} (crescente) vs ${descending[i]} (decrescente)`;
    if (ascending[i] === descending[i]) {
      output += ` ✓ IGUAL\n`;
    } else {
      output += ` ✗ Diferente\n`;
    }
  }
  output += `\n`;

  if (specialNumbers.length > 0) {
    output += `🎯 Número(s) especial(is) encontrado(s): [${specialNumbers.join(', ')}]\n\n`;
    output += `Explicação:\n`;
    foundPositions.forEach((pos, index) => {
      output += `- O número ${specialNumbers[index]} mantém a posição ${pos} em ambas as ordenações\n`;
    });
  } else {
    output += `❌ Nenhum número especial encontrado.\n`;
    output += `(Um número especial deve aparecer na mesma posição tanto na ordenação crescente quanto na decrescente)`;
  }

  return output;
}

// Manipuladores de eventos
function handleDiscover() {
  const input = document.getElementById('numbers').value;
  const { result, calculation } = findSpecialNumbers(input);

  document.getElementById('result').textContent = result;
  document.getElementById('calculation').textContent = calculation;
}

function handleReturn() {
  document.getElementById('numbers').value = '';
  document.getElementById('result').textContent = '';
  document.getElementById('calculation').textContent = '';
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('discover').addEventListener('click', handleDiscover);
  document.getElementById('return').addEventListener('click', handleReturn);

  // Permitir submit com Enter
  document.getElementById('numbers').addEventListener('keypress', e => {
    if (e.key === 'Enter') handleDiscover();
  });
});
