// API key is not uploaded onto GitHub
// Get your API key from: https://platform.openai.com/docs/api-reference/authentication

const API_KEY = 'xx-xxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
const submitButton = document.querySelector('#submit');
const outputElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const buttonElement = document.querySelector('button');

function changeInput(value) {
    const inputElement = document.querySelector('input');
    inputElement.value = value;
}

async function getMessage() {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-16k",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens: 100
        })
    }

    try {
        const responce = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await responce.json()
        outputElement.textContent = data.choices[0].message.content

        if(data.choices[0].message.content && inputElement.value){
            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value;
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }

    } catch (error) {
            console.log(error)
        
    }
}

submitButton.addEventListener('click', getMessage);

function clearInput () {
    inputElement.value = '';
}

buttonElement.addEventListener('click', clearInput);