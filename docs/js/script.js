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



function init_sync_sliders() {
	var $sync1 = $('.pict_zoom_slider');
	var $sync2 = $('.pict_preview_slider');
	var syncedSecondary = true;

	$sync1
		.owlCarousel({
			items: 1,
			nav: true,
			autoplay: false,
			dots: false,
			loop: true,
		})
		.on('changed.owl.carousel', syncPosition);

	$sync2
		.on('initialized.owl.carousel', function () {
			$sync2.find('.owl-item').eq(0).addClass('current');
		})
		.owlCarousel({
			items: 'auto',
			dots: false,
			nav: false,
			smartSpeed: 200,
			slideSpeed: 500,
			slideBy: 'auto', //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
			responsiveRefreshRate: 100,
		})
		.on('changed.owl.carousel', syncPosition2);

	function syncPosition(el) {
		//if you set loop to false, you have to restore this next line
		//var current = el.item.index;

		//if you disable loop you have to comment this block
		var count = el.item.count - 1;
		var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

		if (current < 0) {
			current = count;
		}
		if (current > count) {
			current = 0;
		}

		//end block

		$sync2.find('.owl-item').removeClass('current').eq(current).addClass('current');
		var onscreen = $sync2.find('.owl-item.active').length - 1;
		var start = $sync2.find('.owl-item.active').first().index();
		var end = $sync2.find('.owl-item.active').last().index();

		if (current > end) {
			$sync2.data('owl.carousel').to(current, 100, true);
		}
		if (current < start) {
			$sync2.data('owl.carousel').to(current - onscreen, 100, true);
		}
	}

	function syncPosition2(el) {
		if (syncedSecondary) {
			var number = el.item.index;
			$sync1.data('owl.carousel').to(number, 100, true);
		}
	}

	$sync2.on('click', '.owl-item', function (e) {
		e.preventDefault();
		var number = $(this).index();
		$sync1.data('owl.carousel').to(number, 300, true);
	});
}

$('document').ready(function () {
	init_search();
	// init_faq();
	init_carousel();
	init_tabs();
	init_qty();
	init_forms();
	init_sync_sliders();
});
