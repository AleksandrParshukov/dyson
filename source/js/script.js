function init_menu() {
	const $menu_btns = $('.js_top_menu_btn');

	$menu_btns.on('click', function (evt) {
		evt.preventDefault();

		$(this).closest('.catalog-select').find('.catalog-select__list').toggleClass('open');
	});
}

function init_faq() {
	$('.faq__list').accordion({
		heightStyle: 'content',
		collapsible: true,
		active: false,
	});
	$('.selector').accordion('option', 'header', '.faq__item');
}

function init_carousel() {
	$('.js_reviews_carousel').owlCarousel({
		loop: true,
		nav: false,
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

$('document').ready(function () {
	init_menu();
	// init_faq();
	init_carousel();
	init_tabs();
	init_qty();
});
