const endpointURL = 'http://localhost:3001/chat';

window.onload = init;

function init() {
    // Ecouteur sur le bouton
    const buttonElement = document.querySelector('button');
    buttonElement.onclick = sendRequest;
}

// Envoi d'une requête POST à l'API de notre serveur
async function sendRequest() {

    // On récupère le contenu du prompt
    /*const temperature = document.querySelector('input#temperature').value;
    const maxTokens = document.querySelector('input#max_tokens').value;

    // On envoie le contenu du prompt dans un FormData (eq. formulaires multipart)
    promptData.append('temperature', temperature);
    promptData.append('max_tokens', maxTokens);

    // On récupère la valeur du prompt
    const inputElement = document.querySelector('input');

    const prompt = inputElement.value;
    // si le prompt est vide on quitte la fonction
    if (prompt === '') return;

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

    const data = await response.json();*/

    // On récupère la valeur du prompt
    const inputElement = document.querySelector('input');
    const prompt = inputElement.value;

    // Si le prompt est vide on quitte la fonction
    if (prompt === '') return;

    // Initialisation de FormData
    const promptData = new FormData();
    promptData.append('prompt', prompt);

    // On récupère le contenu des sliders
    const temperature = document.querySelector('input#temperature').value;
    const maxTokens = document.querySelector('input#max_tokens').value;

    // Ajout de temperature et max_tokens à FormData
    promptData.append('temperature', temperature);
    promptData.append('max_tokens', maxTokens);

    // Envoi de la requête POST par fetch, avec le FormData dans la propriété body
    const response = await fetch(endpointURL, {
        method: 'POST',
        body: promptData
    });

    const data = await response.json();

    // Affiche la réponse dans la console
    console.log(data);
    
     // Div output pour afficher les résultats
    const outputElement = document.querySelector('#output');

    // affiche le resultat dans le div output
    const pElement = document.createElement('p');
    // On récupère le choix de l'IA (regarder la console ou la réponse dans le debugger du navigateur)
    pElement.textContent = data.choices[0].message.content;
    outputElement.append(pElement);

    // On remet à zéro le champ input
    inputElement.value = '';
}