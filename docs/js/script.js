function init_search() {
	const $search_btn = $('.js_search_btn');

	$search_btn.on('click', function (evt) {
		evt.preventDefault();

		$(this).closest('.header__search').toggleClass('open');
	});
}

function init_carousel() {
	$('.js_reviews_carousel').owlCarousel({
		loop: true,
		nav: true,
		navText: ['<span class="reviews__nav reviews__nav--prev"></span>', '<span class="reviews__nav reviews__nav--next"></span>'],
		navContainer: '.reviews__wrapper',
		autoHeight: false,
		responsive: {
			0: {
				items: 1,
				dots: false,
			},
			420: {
				items: 2,
				dots: true,
			},
		},
	});

	$('.js_banner_carousel').owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		autoHeight: false,
		items: 1,
	});

	/* $('.js_product_preview_slider').owlCarousel({
		loop: true,
		nav: true,
		dots: true,
		autoHeight: false,
		responsive: {
			0: {
				items: 4,
			},
			420: {
				items: 5,
			},
		},
	}); */

	$('.js_product_preview_slider').slick({
		vertical: true,
		verticalSwiping: true,
		slidesToShow: 5,
		slidesToScroll: 5,
		autoplay: false,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-next"></button>',
		infinite: false,
		responsive: [
			{
				breakpoint: 420,
				settings: {
					slidesToShow: 3,
					slidesToscroll: 3,
					vertical: false,
					verticalSwiping: false,
				},
			},
		],
	});

	$('.product-top__img').on('click', function () {
		const img = $(this).find('img').attr('src');

		$('.product-top__main-img img').attr('src', img);
	});
}

function init_tabs() {
	$('.product-info__tabs').tabs();
}

function init_qty() {
	init_input_auto_width();

	$(document).on('click', '.qty__decrement', function (evt) {
		evt.preventDefault();

		const $decr = $(this),
			$qty = $decr.closest('.qty').find('.qty__input'),
			val = parseInt($qty.val()) - 1;

		if (val >= 0) {
			$qty.val(val).trigger('change');
		}
	});

	$(document).on('click', '.qty__increment', function (evt) {
		evt.preventDefault();

		const $decr = $(this),
			$qty = $decr.closest('.qty').find('.qty__input'),
			val = parseInt($qty.val()) + 1;

		$qty.val(val).trigger('change');
	});

	$(document).on('change', '.qty__input', function (evt) {
		const $qty = $(this),
			val = parseInt($qty.val());

		if (val < 0) {
			$qty.val(0).trigger('change');
		}
	});
}

function init_input_auto_width() {
	$('.js_input_auto_width').each(function () {
		const $el = $(this),
			$widthMachine = $el.closest('.input-wrap').find('.width-machine');

		$widthMachine.text($el.val());
	});

	$(document).on('keyup change', '.js_input_auto_width', function () {
		const $el = $(this),
			$widthMachine = $el.closest('.input-wrap').find('.width-machine');

		$widthMachine.text($el.val());
	});
}

function init_forms() {
	$('input[name="phone"]').on('keydown', function (evt) {
		if ($(this).val() == '' && evt.originalEvent.key == '8') {
			evt.preventDefault();

			$(this).val('+7 (');
		}

		$('input[name="phone"]').mask('+7 (000) 000-00-00');
	});

	$('.callback__form').validate({
		rules: {
			name: 'required',
			email: {
				required: true,
				email: true,
			},
			phone: 'required',
		},
		messages: {
			name: 'Введите ваше имя',
			email: {
				required: 'Введите адрес электронной почты',
				email: 'Введите корректный адрес электронной почты',
			},
			phone: 'Введите ваш телефон',
		},
		submitHandler: function (form) {
			form.submit();
		},
	});

	$('.cart__form').validate({
		rules: {
			name: 'required',
			email: {
				required: true,
				email: true,
			},
			phone: 'required',
			city: 'required',
			address: 'required',
		},
		messages: {
			name: 'Введите ваше имя',
			email: {
				required: 'Введите адрес электронной почты',
				email: 'Введите корректный адрес электронной почты',
			},
			phone: 'Введите ваш телефон',
			city: 'Введите ваш город',
			address: 'Введите ваш адрес',
		},
		submitHandler: function (form) {
			form.submit();
		},
	});
}

$('document').ready(function () {
	init_search();
	// init_faq();
	init_carousel();
	init_tabs();
	init_qty();
	init_forms();
	//init_sync_sliders();
});
