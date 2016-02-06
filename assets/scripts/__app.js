;( function( $ ) {
	"use strict";

	window.body = $('body');
	window._this = null;

	$.app = {
		
		initTrigger: function()
		{
			var trigger, wrapper, container, debounce;

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

					container = $($(this).data('container'));

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
				}
			});
		},

		init: function()
		{
			_this = this;
			
			this.initTrigger();
			this.initMap();
		}

	};

})( jQuery );