const endpointURL = 'http://localhost:3001/chat';

let outputElement, submitButton, inputElement, historyElement, butonElement;

let loader ;


window.onload = init;

function init() {
    outputElement = document.querySelector('#output');
    submitButton = document.querySelector('#submit');
    submitButton.onclick = getMessage;

    inputElement = document.querySelector('input');
    historyElement = document.querySelector('.history');
    butonElement = document.querySelector('button');
    butonElement.onclick = clearInput;

    loader = document.querySelector('.loader');
}

function clearInput() {
    inputElement.value = '';
}

async function getMessage() {
    /*let prompt = inputElement.value.trim();
    //let prompt = inputElement.value;
    // on met le prompt en minuscules
    prompt = prompt.toLowerCase();

    // si le champ est vide on fait return
    if (prompt === '') return;

    // TODO : si le prompt commence par "/image" alors
    // on appelle getImageFromDallE(prompt (sans le "/image" et l'espace))

    // Détection des commandes spécifiques
    if (prompt.startsWith('/image ')) {
        console.log("Je génère une image Dall-E avec comme demande", prompt.substring(7));
    } else if (prompt.startsWith('/song ')) {
        console.log("Je demande une chanson avec comme sujet", prompt.substring(6));
    } else {
        // Appel à GPT-3 pour les autres cas
        getResponseFromServer(prompt);
    }:*/
    let prompt = inputElement.value.trim();
    prompt = prompt.toLowerCase();
    if (prompt === '') return;

    loader.style.display="block"; // Afficher le loader ici

    if (prompt.startsWith('/image ')) {
        console.log("Je génère une image Dall-E avec comme demande", prompt.substring(7));
        // Simulez le traitement ici, puis cachez le loader
    } else if (prompt.startsWith('/song ')) {
        console.log("Je demande une chanson avec comme sujet", prompt.substring(6));
        // Simulez le traitement ici, puis cachez le loader
    } else {
        // Appel à GPT-3 pour les autres cas
        await getResponseFromServer(prompt); // Assurez-vous que cette fonction gère correctement le loader
    }

    // sinon on appelle getResponseFromServer(prompt) pour obtenir une réponse de gpt3.5
    //getResponseFromServer(prompt);

    // on vide l'input
    inputElement.value = '';
}

async function getResponseFromServer(prompt) {
    try {
        // On envoie le contenu du prompt dans un FormData (eq. formulaires multipart)
        const promptData = new FormData();
        promptData.append('prompt', prompt);

        // Envoi de la requête POST par fetch, avec le FormData dans la propriété body
        // côté serveur on récupèrera dans req.body.prompt la valeur du prompt,
        // avec nodeJS on utilisera le module multer pour récupérer les donénes 
        // multer gère les données multipart/form-data
        const response = await fetch(endpointURL, {
            method: 'POST',
            body: promptData
        });

        const data = await response.json();

        console.log(data);
        const chatGptReponseTxt = data.choices[0].message.content;
        // On cree un element p pour la réponse
        const pElementChat = document.createElement('p');
        pElementChat.textContent = chatGptReponseTxt;
        // On ajoute la réponse dans le div output
        outputElement.append(pElementChat);

        // Ajout dans l'historique sur la gauche
        if (data.choices[0].message.content) {
            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value;
            pElement.onclick = () => {
                inputElement.value = pElement.textContent;
            };
            historyElement.append(pElement);
        }
    } catch (error) {
        console.log(error);
    } finally {
       loader.style.display = "none"; // S'assurer de cacher le loader ici
    }
    
}

/*inputElement.addEventListener('keypress', function(e) {
    if (e.key === 'submit') {
        getMessage();
    }
});*/
