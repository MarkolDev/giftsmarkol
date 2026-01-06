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
        // Оставляем как есть, без преобразования в верхний регистр
        return code.replace(/[^A-Za-z0-9-]/g, '');
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

    // Обработка ввода кода на typecode.html
    const codeInput = document.getElementById('giftCode');
    if (codeInput) {
        codeInput.addEventListener('input', function(e) {
            // НЕ ПРЕОБРАЗУЕМ В ВЕРХНИЙ РЕГИСТР
            // Оставляем как вводят, только фильтруем спецсимволы
            this.value = this.value.replace(/[^A-Za-z0-9-]/g, '');
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

    // БЕЗ ПРЕОБРАЗОВАНИЯ В ВЕРХНИЙ РЕГИСТР
    const code = Utils.formatGiftCode(input.value.trim());
    
    if (!Utils.isValidCode(code)) {
        input.focus();
        return;
    }

    Utils.showLoading('Проверка кода...');
    
    // Проверяем существование файла
    checkFileExists(code).then(exists => {
        if (exists) {
            // Файл существует, переходим
            setTimeout(() => {
                // Открываем в том же регистре, как ввели
                window.location.href = code + '.html';
            }, 800);
        } else {
            // Файл не существует, показываем ошибку
            setTimeout(() => {
                Utils.hideLoading();
                alert('Подарок с таким кодом не найден. Проверьте правильность кода.');
                input.focus();
                input.select();
            }, 800);
        }
    }).catch(() => {
        // Если проверка не удалась, все равно пробуем перейти
        setTimeout(() => {
            window.location.href = code + '.html';
        }, 800);
    });
}

// Функция для проверки существования файла
async function checkFileExists(filename) {
    try {
        const response = await fetch(filename + '.html', { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.log('Не удалось проверить файл:', error);
        return false;
    }
}

// Функция для перехода на главную
function goToHome() {
    Utils.showLoading('Возврат на главную...');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}
