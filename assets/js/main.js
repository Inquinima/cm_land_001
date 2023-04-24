$(()=>{
    const observer = lozad();
    observer.observe();

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
    const regexExclude =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    $('#useremail').on('input', function(){
        // const regexExclude =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(regexExclude.test($(this).val()) && $(this).val().length >= 5){
            $(this).css('border-color', '#C3C3C3');
        } else{
            $(this).css('border-color', '#F5265C');
        }
    });

    function validate(form) {
        var fields;
        try {
          fields = form.querySelectorAll("#useremail");
        } catch (e) {
          console.log('err');
          return true;
        }
        var arr = [];
        console.log(fields);
        fields.forEach(function (field) {
          if (!field.value || field.value === "") {
            field.classList.add("invalid");
            arr.push(false);
            return;
          }
          field.classList.remove("invalid");
          arr.push(true);
        });
        if (arr.find(function (el) {
          return el === false;
        }) === false) return false;
        console.log('ookkk');
        return true;
      }

      var forms = document.querySelectorAll('.popup');
      console.log(forms);
      forms.forEach(function (form) {
        form.addEventListener("submit", function (e) {
          if (!validate(form)) {
            e.preventDefault();
            return;
          }
          console.log('ok');
        });
      });

    // $('form.popup').on("submit", function (e) {
    //     if(!regexExclude.test($('#useremail').val()) && (!$('#useremail').val().length >= 5) && (!$('#useremail').val().length != 0)){
    //         $('#useremail').css('border-color', '#C3C3C3');
    //         e.preventDefault();
    //     }
    // });

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
        switch(popupActive){
            case true:
                if(e.key == "Escape"){
                    popupSwitch();
                }
                break;
            case false:
                if(e.key == "ArrowLeft") {
                    $('.slider').slick('slickPrev');
                }
                if(e.key == "ArrowRight") {
                    $('.slider').slick('slickNext');
                }
                break;
            default:
        }
    });
});




$(()=>{
    $('.slider').slick({
        infinite: false,
        arrows: true,
        slidesToShow: 2,
        prevArrow: $('.slider-button-prev'),
        nextArrow: $('.slider-button-next'),
        variableWidth: true,
        centerMode: false,
        responsive: [{
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                arrows: false,
                centerMode: true,
            }
        }]
    });
});

$('.slider').on('afterChange', function(currentSlide){
    if( ($('.slick-slide[data-slick-index="3"]').hasClass('slick-active') || $('.slick-slide[data-slick-index="3"]').hasClass('slick-current')) || ($('.slick-slide[data-slick-index="4"]').hasClass('slick-active') || $('.slick-slide[data-slick-index="4"]').hasClass('slick-current')) ){
        if(!$('.slider').hasClass('--blur')){
            $('.slider-overlay').fadeIn();
            $('.slider').addClass('--blur');
        }
    } else{
        $('.slider-overlay').fadeOut();
        $('.slider').removeClass('--blur');
    }
});

$('.slider-button-area-prev').on('click', function(){
    $('.slider').slick('slickPrev');
});
$('.slider-button-area-next').on('click', function(){
    $('.slider').slick('slickNext');
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

