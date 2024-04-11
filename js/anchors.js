function scrollToAnchor(anchorId, offset) {
    if ($(window).width() > 1440) {
        $('html, body').animate({
            scrollTop: $(anchorId).offset().top - offset
        }, 500);
    } else if (($(window).width() >= 1024)) {
        if (anchorId == '#about-anchor') {
            $('html, body').animate({
                scrollTop: $(anchorId).offset().top - offset - 70
            }, 500);
        } else {
            $('html, body').animate({
                scrollTop: $(anchorId).offset().top - offset + 50
            }, 500);
        }
    } else if (($(window).width() >= 600)) {
        if (anchorId == '#about-anchor') {
            $('html, body').animate({
                scrollTop: $(anchorId).offset().top - offset - 130
            }, 500);
        } else {
            $('html, body').animate({
                scrollTop: $(anchorId).offset().top - offset - 70
            }, 500);
        }
    } else if (($(window).width() >= 320)) {
        if (anchorId == '#about-anchor') {
            $('html, body').animate({
                scrollTop: $(anchorId).offset().top - offset - 120
            }, 500);
        } else {
            $('html, body').animate({
                scrollTop: $(anchorId).offset().top - offset - 10
            }, 500);
        }
    }
    
}
