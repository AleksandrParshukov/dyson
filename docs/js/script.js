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

$('document').ready(function () {
	init_menu();
	init_faq();
	init_carousel();
	init_tabs();
});
