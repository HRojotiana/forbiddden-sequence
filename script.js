const form = document.getElementById('inputForm');
const resultContainer = document.getElementById('resultContainer');

let sequenceLength;
let currentIndex = 0;

function startSequence(number) {
    sequenceLength = number;
    currentIndex = 0;
    updateResult();
}

async function updateResult() {
    if (currentIndex >= sequenceLength) {
        return;
    }

    
    try {
        const response = await axios.get('https://api.prod.jcloudify.com/whoami', { withCredentials: true });
        
        if (response.status !== 200 || !response.data.captcha) {
            console.log('Erreur de statut ou pas de captcha détecté');
            return;
        }

        const forbiddenMessage = document.createTextNode(`Forbidden`);
        resultContainer.appendChild(forbiddenMessage);
        resultContainer.appendChild(document.createElement('br'));

        currentIndex++;
        updateResult();
    } catch (error) {
        if (error.response) {
            console.log('Erreur de statut:', error.response.status);
            console.log('Données de l\'erreur:', error.response.data);
        } else if (error.request) {
            console.log('La requête a été envoyée, mais aucune réponse n\'a été reçue');
        } else {
            console.log('Une erreur s\'est produite:', error.message);
        }
    }

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const numberInput = document.getElementById('numberInput');
    const number = parseInt(numberInput.value);

    if (!isNaN(number) && number >= 1 && number <= 1000) {
        startSequence(number);
    } else {
        alert('Please enter a number between 1 and 1000.');
    }
});


resultContainer.style.display = 'none';
}