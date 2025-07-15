document.addEventListener('DOMContentLoaded', () => {

    // Lista de todas nuestras pistas (imagen y audio)
    const tracks = [
        { image: 'images/paisaje1.png', audioId: 'audio1' },
        { image: 'images/paisaje2.png', audioId: 'audio2' },
        { image: 'images/paisaje3.png', audioId: 'audio3' }
    ];

    // Variable para saber qué pista está sonando
    let currentIndex = 0;

    const nextBtn = document.getElementById('nextBtn');
    const body = document.body;

    // Función principal para reproducir una pista
    function playTrack(index) {
        // Detener todos los audios por si acaso
        tracks.forEach(track => {
            const audio = document.getElementById(track.audioId);
            audio.pause();
            audio.currentTime = 0;
        });

        // Obtener la pista actual
        const track = tracks[index];
        const currentAudio = document.getElementById(track.audioId);

        // Cambiar la imagen de fondo
        body.style.backgroundImage = `url('${track.image}')`;
        
        // Reproducir el audio
        // El .catch() es para evitar errores en consola si el navegador bloquea el autoplay
        currentAudio.play().catch(error => console.log("La reproducción automática fue bloqueada por el navegador. Se necesita interacción del usuario.", error));
    }

    // Función para pasar a la siguiente pista
    function nextTrack() {
        // Avanza al siguiente índice y usa el módulo (%) para volver al inicio (0)
        currentIndex = (currentIndex + 1) % tracks.length;
        playTrack(currentIndex);
    }

    // --- LÓGICA DE REPRODUCCIÓN ---

    // 1. Asignar el evento 'ended' a cada audio para que llame a nextTrack() cuando termine
    tracks.forEach(track => {
        const audio = document.getElementById(track.audioId);
        audio.addEventListener('ended', nextTrack);
    });

    // 2. Asignar el evento 'click' al botón para pasar de pista manualmente
    nextBtn.addEventListener('click', nextTrack);

    // 3. Iniciar la primera pista por defecto al cargar la página
    playTrack(currentIndex);

});