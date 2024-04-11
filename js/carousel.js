$(document).ready(function(){
    if($(window).width() >= 800) {
        createButtons();
    }


    // Общее количество элементов карусели
    var itemCount = $('.vacancies-cards-card').length;

    // Количество видимых элементов в карусели
    var visibleItems = 4;

    // Текущая позиция карусели
    var currentPosition = 0;

    // Флаг перетаскивания
    var isDragging = false;

    // Начальная позиция перетаскивания
    var startDraggingX = 0;

    // Начальная позиция
    var startPosition = 0;

    // Минимальная позиция
    var minPosition = 0;

    // Максимальная позиция
    var maxPosition = 0;

    // Ширина элемента карусели
    var itemWidth;

    // Флаг блокировки кнопок во время анимации
    var isAnimating = false;

    // Обновление ширины элемента карусели
    updateItemWidth();
    updateLimits();
    updateButtons();

    // Обновление ограничений и состояния кнопок при изменении размеров окна
    $(window).on('resize', function() {
        updateItemWidth();
        updateLimits();
        updateButtons();
    });

    // Показывать кнопки, если ширина экрана >= 800
    if ($(window).width() >= 800) {
        $('#previous').show();
        $('#next').show();
    }

    // Начало перетаскивания элементов карусели
    $('.vacancies-cards').on('mousedown touchstart', function(event) {
        isDragging = true;
        startDraggingX = event.clientX || event.originalEvent.touches[0].clientX;
        startPosition = parseInt($('.vacancies-cards').css('marginLeft')) || 0;
    });

    // Перемещение элементов карусели
    $(document).on('mousemove touchmove', function(event) {
        if (isDragging) {
            var distance = (event.clientX || event.originalEvent.touches[0].clientX) - startDraggingX;
            var newPosition = startPosition + distance;
            newPosition = Math.min(maxPosition, Math.max(minPosition, newPosition));
            $('.vacancies-cards').css('marginLeft', newPosition);
            currentPosition = Math.round(-newPosition / itemWidth);
            updateButtons();
        }
    });

    // Окончание перетаскивания элементов карусели
    $(document).on('mouseup touchend', function() {
        isDragging = false;

    });

    // Обновление состояния кнопок при загрузке страницы
    updateButtons();

    // Обработчик события клика на кнопку Next
    $('#next').click(function(){
        if (!isAnimating && currentPosition <= itemCount - visibleItems) {
            isAnimating = true;
            currentPosition++;
            updateCarousel($('.vacancies-cards-card')[0]); // Передаем первый элемент карточки
        }
    });

    // Обработчик события клика на кнопку Previous
    $('#previous').click(function(){
        if (!isAnimating && currentPosition > 0) {
            isAnimating = true;
            currentPosition--;
            updateCarousel($('.vacancies-cards-card')[0]); // Передаем первый элемент карточки
        }
    });

    function createButtons() {
        // Создаем элементы кнопок
        const previousButton = document.createElement('button');
        previousButton.className = 'vacancies-head-buttons-button';
        previousButton.id = 'previous';
        const previousButtonImg = document.createElement('img');
        previousButtonImg.className = 'arrow arrow-previous';
        previousButtonImg.alt = 'arrow';
        previousButtonImg.src = 'images/arrow-left.svg';
        previousButton.appendChild(previousButtonImg);

        const nextButton = document.createElement('button');
        nextButton.className = 'vacancies-head-buttons-button';
        nextButton.id = 'next';
        const nextButtonImg = document.createElement('img');
        nextButtonImg.className = 'arrow arrow-next';
        nextButtonImg.alt = 'arrow';
        nextButtonImg.src = 'images/arrow-right.svg';
        nextButton.appendChild(nextButtonImg);

        // Находим родительский элемент для кнопок
        const vacanciesHeadButtons = document.querySelector('.vacancies-head-buttons');

        // Добавляем кнопки в родительский элемент
        vacanciesHeadButtons.appendChild(previousButton);
        vacanciesHeadButtons.appendChild(nextButton);

        // Скрытие кнопок Next и Previous при загрузке страницы
        $('#previous').hide();
        $('#next').hide();
    }

    // Обновление состояния кнопок
    function updateButtons() {
        if($(window).width() >= 800) {
            if (minPosition <= -10) {
                $('#next').show();
                $('#previous').show();
            
                if (currentPosition <= 0) {
                    $('#previous').addClass('disabled');
                } else {
                    $('#previous').removeClass('disabled');
                }
            
                if (currentPosition >= itemCount - visibleItems || visibleItems >= itemCount) {
                    $('#next').addClass('disabled');
                } else {
                    $('#next').removeClass('disabled');
                }
            } else {
                $('#next').hide();
                $('#previous').hide();
            }
            
        } else {
            $('#next').hide();
            $('#previous').hide();
        }

    }

    // Обновление положения карусели
    function updateCarousel(card) {
        if (card) {
            var computedStyle = window.getComputedStyle(card);
            var marginRight = parseFloat(computedStyle.getPropertyValue("margin-right"));
        }

        if (currentPosition - 1 == itemCount - visibleItems) {
            if (minPosition - (-currentPosition * itemWidth) > 0 && minPosition - (-currentPosition * itemWidth) < itemWidth) {
                if ((minPosition - (-currentPosition * itemWidth)) + (currentPosition-1 * itemWidth) > 10 || (minPosition - (-currentPosition * itemWidth)) + (currentPosition-1 * itemWidth) < -10) {
                    var newPosition = -((currentPosition * itemWidth) - (minPosition - (-currentPosition * itemWidth)))
                } else {
                    currentPosition--
                }
            } else {
                var newPosition = -currentPosition * itemWidth;
            }
        } else {
            var newPosition = -currentPosition * itemWidth;
        }

        $('.vacancies-cards').stop().animate({marginLeft: newPosition}, 400, function() {
            isAnimating = false; // По завершении анимации разблокируем кнопки
        });
        updateButtons();
    }

    // Обновление минимальной и максимальной позиции
    function updateLimits() {
        var containerWidth = $('.vacancies-content').width();
        var totalWidth = itemWidth * itemCount;
        var card = document.querySelector(".vacancies-cards-card");
        if (card) {
            var computedStyle = window.getComputedStyle(card);
            var marginRight = parseFloat(computedStyle.getPropertyValue("margin-right"));
        }
        minPosition = containerWidth - totalWidth + marginRight;
        maxPosition = 0;
    }

    // Обновление ширины элемента
    function updateItemWidth() {
        itemWidth = $('.vacancies-cards-card').outerWidth(true);
    }
});
