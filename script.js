const cepForm = document.getElementById('cepForm');
const enderecoResultado = document.getElementById('enderecoResultado');

cepForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio do formulário e recarregamento da página

    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
        getEndereco(cep);
    } else {
        enderecoResultado.innerHTML = '<p>CEP inválido. Insira um CEP com 8 dígitos.</p>';
    }
});

async function getEndereco(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        const response = await fetch(url); // Faz a requisição à API ViaCEP
        if (!response.ok) {
            throw new Error('Erro ao buscar o CEP.');
        }

        const data = await response.json();

        if (data.erro) {
            enderecoResultado.innerHTML = '<p>CEP não encontrado.</p>';
        } else {
            displayEndereco(data); // Exibe o resultado
        }
    } catch (error) {
        enderecoResultado.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayEndereco(data) {
    enderecoResultado.innerHTML = `
        <h2>Endereço Encontrado</h2>
        <p><strong>Logradouro:</strong> ${data.logradouro}</p>
        <p><strong>Bairro:</strong> ${data.bairro}</p>
        <p><strong>Cidade:</strong> ${data.localidade}</p>
        <p><strong>Estado:</strong> ${data.uf}</p>
        <p><strong>CEP:</strong> ${data.cep}</p>
    `;
}