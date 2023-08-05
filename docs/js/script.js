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

function validate_any_form($form) {
	console.log($form);

	$form.validate({
		rules: {
			name: 'required',
			email: {
				required: true,
				email: true,
			},
			phone: {
				required: '#newsletter:checked',
				minlength: 2,
			},
			agree: 'required',
		},
		messages: {
			firstname: 'Please enter your firstname',
			lastname: 'Please enter your lastname',
			username: {
				required: 'Please enter a username',
				minlength: 'Your username must consist of at least 2 characters',
			},
			password: {
				required: 'Please provide a password',
				minlength: 'Your password must be at least 5 characters long',
			},
			confirm_password: {
				required: 'Please provide a password',
				minlength: 'Your password must be at least 5 characters long',
				equalTo: 'Please enter the same password as above',
			},
			email: 'Please enter a valid email address',
			agree: 'Please accept our policy',
			topic: 'Please select at least 2 topics',
		},
	});
}

$('document').ready(function () {
	init_menu();
	// init_faq();
	init_carousel();
	init_tabs();
	init_qty();

	var $element = $('input[name="phone"]');
	/* var maskOptions = {
		mask: '+7 (000) 000-00-00',
		lazy: false,
	};

	$element.on('focus', function () {
		var mask = new IMask($element[0], maskOptions);
	}); */

	const numberPatterns = ['+7 (NNN) NNN-NN-NN'];

	$element.each(function () {
		const formatterObject = new Freedom.PhoneFormatter(numberPatterns);
		formatterObject.attachToInput($(this)[0]);
	});

	$('form').on('submit', function (evt) {
		evt.preventDefault();
		const $form = $(this);

		validate_any_form($form);
	});
});
