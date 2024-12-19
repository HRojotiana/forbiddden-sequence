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

    const response = await axios.get('https://api.prod.jcloudify.com/whoami', { withCredentials: true });
    
    if (response.status === 200 && response.data.captcha) {
        console.log("Captcha detected...");
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        const forbiddenMessage = document.createTextNode(`Forbidden`);
        resultContainer.appendChild(forbiddenMessage);
        resultContainer.appendChild(document.createElement('br'));

    currentIndex++;
    updateResult();
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