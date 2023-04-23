$(()=>{
    const observer = lozad();
    observer.observe();

    // single popup
    let popupActive = false;
    function popupSwitch(){
        switch(popupActive){
            case true:
                $('.popup').fadeOut();
                $('.overlay').fadeOut();
                $('html').removeClass('noscroll');
                popupActive = !popupActive;
                break;
            case false:
                $('.popup').fadeIn();
                $('.overlay').fadeIn();
                $('html').addClass('noscroll');
                popupActive = !popupActive;
                break;
            default:
        }
    }

    $('#useremail').on('input', function(){
        const regexExclude =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(regexExclude.test($(this).val()) && $(this).val().length >= 5){
            console.log(regexExclude.test($(this).val()));
            console.log($(this).val());
            $(this).css('border-color', '#C3C3C3');
        } else{
            console.log(regexExclude.test($(this).val()));
            $(this).css('border-color', '#F5265C');
        }
    });

    $('.show-popup').on('click', function(){
        popupSwitch();
    });
    $('.overlay').on('click', function(){
        if(popupActive){
            popupSwitch();
        }
    });
    $('.close-popup').on('click', function(){
        if(popupActive){
            popupSwitch();
        }
    });
    $(window).on('keydown', function(e) {
        if(popupActive){
            if (e.which == "27") {
                popupSwitch();
            }
        }
    });
    // function closeE(e){}
    // if(popupActive){L
    //     $(window).on('keydown', function(e) {
            
    //     });
    // }
});


$(()=>{
    $('.slider').slick({
        infinite: false,
        arrows: true,
        slidesToShow: 2,
        prevArrow: $('.slider-button-prev'),
        nextArrow: $('.slider-button-next'),
        variableWidth: true,
        responsive: [{
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                arrows: false,
            }
        }]
    });
});

$('.slider').on('afterChange', function(currentSlide){
    if( $('.slick-slide[data-slick-index="3"]').hasClass('slick-active') || $('.slick-slide[data-slick-index="4"]').hasClass('slick-active') ){
        if(!$('.slider').hasClass('--blur')){
            $('.slider-overlay').fadeIn();
            $('.slider').addClass('--blur');
        }
    } else{
        $('.slider-overlay').fadeOut();
        $('.slider').removeClass('--blur');
    }
});

const cookieStorage = {
    getItem: (item) => {
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
        return cookies[item];
    },
    setItem: (item, value) => {
        document.cookie = `${item}=${value};`
    }
}

const storageType = cookieStorage;
const consentPropertyName = 'jdc_consent';
const shouldShowPopup = () => !storageType.getItem(consentPropertyName);
const saveToStorage = () => storageType.setItem(consentPropertyName, true);

$(()=>{
    const consentPopup = $('#consent-popup');
    const acceptBtn = $('#accept');
    const acceptFn = event => {
        saveToStorage(storageType);
        consentPopup.fadeOut();
    }
    acceptBtn.on('click', acceptFn);
    if (shouldShowPopup(storageType)) {
        setTimeout(() => {
            consentPopup.fadeIn();
        }, 2000);
    }

});

