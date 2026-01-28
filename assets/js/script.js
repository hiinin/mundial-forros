// Atualizar ano no footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Inicialização do Google Maps
function initMap() {
    // Coordenadas da Rua Campos Sales, 1660, Maringá - PR
    const location = { lat: -23.4205, lng: -51.9334 };
    
    // Criar o mapa
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
    });

    // Criar marcador personalizado
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Mundial Forros - Rua Campos Sales, 1660, Maringá',
        animation: google.maps.Animation.DROP
    });

    // Info Window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 10px 0; color: #25D366;">Mundial Forros</h3>
                <p style="margin: 0; color: #333;">
                    <strong>Endereço:</strong><br>
                    Rua Campos Sales, 1660<br>
                    Maringá - PR
                </p>
                <p style="margin: 10px 0 0 0;">
                    <a href="https://wa.me/5544999111647" target="_blank" 
                       style="color: #25D366; text-decoration: none; font-weight: bold;">
                        📱 (44) 9 9911-1647
                    </a>
                </p>
            </div>
        `
    });

    // Abrir info window ao clicar no marcador
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });

    // Abrir info window automaticamente
    infoWindow.open(map, marker);
}

// Adicionar efeito de scroll no header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});
