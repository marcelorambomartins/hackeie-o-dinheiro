const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyhCEUMnyx_GO6E85e56iLBj-y67qIIvbNqTQUn8GZ9QITYR-tiiSEDXN616Wtr52ZR/exec';

// Função para lidar com o envio do formulário
async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input').value;
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    
    // Mostra loading
    btn.textContent = 'ENVIANDO...';
    btn.disabled = true;
    
    try {
        // Envia usando fetch sem no-cors
        const response = await fetch(SCRIPT_URL + '?email=' + encodeURIComponent(email), {
            method: 'GET',
            redirect: 'follow'
        });
        
        // Sucesso
        btn.textContent = '✓ EMAIL ENVIADO!';
        btn.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
        
        setTimeout(() => {
            alert(`🎉 Parabéns!\n\nSeu e-book foi enviado para:\n${email}\n\nVerifique sua caixa de entrada (e a pasta de spam também)!`);
            btn.textContent = originalText;
            btn.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
            btn.disabled = false;
            form.reset();
        }, 1500);
        
    } catch (error) {
        console.error('Erro:', error);
        alert('❌ Erro ao cadastrar email. Tente novamente!');
        btn.textContent = originalText;
        btn.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
        btn.disabled = false;
    }
}

// Parallax suave no scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Adiciona o evento ao formulário quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emailForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});