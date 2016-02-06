;( function( $ ) {
	"use strict";

	window.body = $('body');
	window._this = null;

	var ww = $(window).width(), wh = $(window).height(), sl = $('#side-left'), sr = $('#side-right'), sb = $('#side-bottom'), height = 0, result = 0, debounce = null;

	$.app = {
		
		initTrigger: function()
		{
			var trigger, wrapper, container, debounce;

			body.on('click', '.js-trigger-about', function(e){
				e.preventDefault();

				if ($($(this).attr('href')).length)
				{
					$($(this).attr('href')).toggleClass('is-hidden');
				}

				return !1;
			});

			body.on('click', function(e){
				if (!$(e.target).closest('.about').length && $('.js-about.open').length)
				{
					$('.js-about.open').removeClass('animate');
					
					setTimeout(function(){
						$('.js-about.open').removeClass('open');
					}, 350);
				}
			});

			body.on('click', '.js-trigger', function(e){
				e.preventDefault();

				trigger = $(this);
				
				if (!trigger.data('busy'))
				{
					trigger.data('busy', true);

					wrapper = trigger.closest('.js-about');

					if (wrapper.hasClass('open'))
					{
						wrapper.removeClass('animate');
					
						setTimeout(function(){
							wrapper.removeClass('open');
						}, 350);
					}
					else
					{
						wrapper.addClass('open');
					
						setTimeout(function(){
							wrapper.addClass('animate');
						}, 10);
					}
					
					trigger.data('busy', false);
				}

			});
		},

		closeMap: function()
		{
			if (body.find('.side__map.show').length)
			{
				body.find('.side__map.show').removeClass('animate');

				setTimeout(function(){
					body.find('.side__map.show').removeClass('show');
				}, 350);
			}

			$('.js-backuri.active').removeClass('active');

			$('#close-map.open').removeClass('animate');
			
			setTimeout(function(){
				$('#close-map.open').removeClass('open');
			}, 350);
		},

		initMap: function()
		{
			body.on('click', '.js-backuri', function(e){
				e.preventDefault();

				_this.closeMap();

				return !1;
			});

			body.on('click', '.js-load-map', function(e){
				e.preventDefault();
				
				if ($($(this).data('container')).length)
				{
					var container, div, script;

					if (ww <= 960)
					{
						container = $('#layout-wrapper');
					}
					else
					{
						container = $($(this).data('container'));
					}					

					if (!container.find('.side__map').length)
					{
						div = document.createElement('div');
						div.className = 'side__map';

						script = document.createElement('script');
						script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?sid=' + $.trim($(this).data('token')) + '&width=100%&height=100%&lang=ru_RU&sourceType=constructor';

						div.appendChild(script);

						container.append(div);
					}

					if (container.find('.side__map').hasClass('show'))
					{
						_this.closeMap();
					}
					else
					{
						if ($($(this).data('another')).length)
						{
							$($(this).data('another')).find('.js-backuri').addClass('active');
						}

						container.find('.side__map').addClass('show');

						setTimeout(function(){
							container.find('.side__map').addClass('animate');
						}, 10);
					}

					if (ww <= 960)
					{
						$('#close-map').addClass('open');
						
						setTimeout(function(){
							$('#close-map').addClass('animate');
						}, 10);
					}
				}
			});
		},

		initResize: function()
		{
			height += sl.outerHeight();
			height += sr.outerHeight();

			if (sb.is(':visible'))
			{
				height += sb.outerHeight();
			}
			
			if (ww <= 960)
			{
				if (height > wh)
				{
					if (sb.is(':visible'))
					{
						result = ((wh - sb.outerHeight()) / 2) - 8;
					}
					else
					{
						result = (wh / 2) - 4;
					}

					$('#side-left').height(result);
					$('#side-right').height(result);
					
					$('#side-left').find('.side__content').height(result);
					$('#side-right').find('.side__content').height(result);

					$('#side-right').find('.about__content').height(result - 165);
				}
			}
		},

		init: function()
		{
			_this = this;

			_this.initResize();

			$(window).on('resize', function(){
				clearTimeout(debounce);

				debounce = setTimeout(function(){

					_this.initResize();

				}, 50);
			});

			this.initTrigger();
			this.initMap();
		}

	};

})( jQuery );