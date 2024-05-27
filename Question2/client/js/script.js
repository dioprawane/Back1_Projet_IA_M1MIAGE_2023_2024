document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêcher le rechargement de la page
    const input = document.getElementById('chat-input');
    console.log('Input:', input.value);
    console.log('hidden:', this.hidden);
    if (input.value.trim() !== '') {
        console.log('Afficher le loader');
        toggleLoader(true); // Affiche le loader
        
        // Simuler l'envoi d'une requête au serveur
        setTimeout(() => {
            console.log('Cacher le loader');
            toggleLoader(false);
            input.value = ''; // Réinitialisation de l'input après envoi
        }, 1000); // Simule un délai de réponse du serveur de 2 secondes
    }
});

// Fonction pour basculer l'état visible du loader
function toggleLoader(show) {
    document.querySelector('.loader').hidden = !show;
    console.log('Loader état:', !show ? 'Caché' : 'Affiché');
}
