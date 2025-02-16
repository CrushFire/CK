document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide'); // Все слайды
    const dots = document.querySelectorAll('.ellipse'); // Все точки
    let currentSlide = 0; // Индекс текущего слайда

    // Функция для изменения слайда
    function changeSlide(slideIndex) {
        // Убираем активные классы с слайдов и точек
        slides.forEach(slide => slide.classList.remove('slide-active'));
        dots.forEach(dot => dot.classList.remove('void-ellipse'));
        
        // Показываем текущий слайд
        slides[slideIndex].classList.add('slide-active');
        dots[slideIndex].classList.add('void-ellipse');
    }

    // Обработчик кликов на точки
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index; // Обновляем текущий слайд
            changeSlide(currentSlide); // Переключаем слайд
        });
    });

    // Автоматическое переключение слайдов
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length; // Увеличиваем индекс слайда (по кругу)
        changeSlide(currentSlide); // Переключаем слайд
    }, 3000); // Меняем слайд каждые 3 секунды
});
