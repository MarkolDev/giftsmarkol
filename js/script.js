// Простые утилиты
class Utils {
    static showLoading(message = 'Загрузка...') {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.querySelector('p').textContent = message;
            overlay.classList.add('active');
        }
    }

    static hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    static redirect(url) {
        Utils.showLoading('Перенаправление...');
        setTimeout(() => {
            window.location.href = url;
        }, 800);
    }

    static formatGiftCode(code) {
        return code.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    }

    static isValidCode(code) {
        if (!code || code.length < 3) {
            alert('Код должен содержать минимум 3 символа');
            return false;
        }
        
        if (!/^[A-Za-z0-9-]+$/.test(code)) {
            alert('Используйте только буквы, цифры и дефисы');
            return false;
        }
        
        return true;
    }
}

// Обработка главной страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Markol.RendemGift - Система загружена');
    
    // Добавление простого ripple эффекта к кнопкам
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Простая анимация нажатия
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Обработка ввода кода
    const codeInput = document.getElementById('giftCode');
    if (codeInput) {
        codeInput.addEventListener('input', function(e) {
            this.value = this.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
        });

        codeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitCode();
            }
        });
    }

    // Обработка формы ввода кода
    const codeForm = document.getElementById('codeForm');
    if (codeForm) {
        codeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitCode();
        });
    }
});

// Функция отправки кода
function submitCode() {
    const input = document.getElementById('giftCode');
    if (!input) return;

    const code = Utils.formatGiftCode(input.value.trim());
    
    if (!Utils.isValidCode(code)) {
        input.focus();
        return;
    }

    Utils.showLoading('Проверка кода...');
    
    setTimeout(() => {
        window.location.href = code + '.html';
    }, 800);
}

// Функция для перехода на главную
function goToHome() {
    Utils.showLoading('Возврат на главную...');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}
