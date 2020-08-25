$(document).ready(function(){
    $('.slider__cont').slick({
        speed: 1600,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_l.svg"</button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_r.svg"</button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: false,
                }
            }
        ]
      });
    $('ul.fourth__tabs').on('click', 'li:not(.fourth__tab_active)', function() {
    $(this)
        .addClass('fourth__tab_active').siblings().removeClass('fourth__tab_active')
        .closest('div.container').find('div.fourth__box').removeClass('fourth__box_active').eq($(this).index()).addClass('fourth__box_active');
    });
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.fourth-item__frontside').eq(i).toggleClass('fourth-item__frontside_active');
                $('.fourth-item__backside').eq(i).toggleClass('fourth-item__backside_active')
            })
        });
    };
    toggleSlide('.fourth-item__link')
    toggleSlide('.fourth-item__linkback')
    
    //modal
    $('[data-modal=modal1]').on('click', function() {
        $('.overlay, #modal1').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #modal1, #modal2, #modal3').fadeOut('slow');
    });
    $('.button_buy').each(function(i) {
        $(this).on('click', function() {
            $('#modal2 .modal__descr').text($('.fourth-item__subtitle').eq(i).text());
            $('.overlay, #modal2').fadeIn('slow');
        })
    });
    function validateForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свой почтовый адрес",
                    email: "Почтовый адрес должен быть введен в формате: имя@домен.ru"
                }
            },
        });
    }
    validateForms('#feed-form1');
    validateForms('#modal1 form');
    validateForms('#modal2 form');

    $('input[name=phone').mask("+7 (999) 999-99-99");
    
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#modal1, #modal2').fadeOut();
            $('.overlay, #modal3').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });


    $(window).scroll(function() {
        if ($(this).scrollTop() >1200) {
            $('.page_up_arrow').fadeIn();
        } else {
            $('.page_up_arrow').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
  });