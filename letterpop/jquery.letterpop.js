/******************
	jQuery Plugin
	Name: letterpop
	Author: Miles Rausch (http://awayken.com)
	Version: VER
******************/
(function($){
	$.letterpop = function(el, options){
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;
	
		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;
		
		// Add a reverse reference to the DOM object
		base.$el.data("letterpop", base);
		
		base.init = function(){
			base.options = $.extend({}, $.letterpop.defaultOptions, options);
			base.letterspan();
		};
		
		base.letterspan = function () {
			var letters = base.$el.text().split(''),
				html = '',
				speed = 300,
				poppop = function (e) {
					var $el = $(this),
						width = $el.width(),
						letter = $el.text(),
						$eloffset = $el.offset(),
						popper = $('<span class="letterpop_popper">' + letter + '</span>');
					
					e.preventDefault();
					
					$el.width(width).empty();
					popper.appendTo($el.parent())
						.css({
							'position': 'absolute',
							'top': $eloffset.top,
							'left': $eloffset.left,
							'z-index': 99,
							'display': 'block'
						});
						
					popper
						.animate({
							'opacity': 0,
							'font-size': '300%',
							'line-height': '30%',
							'margin-left': '-0.3em'
						}, speed, function () { $(this).remove(); });
					$el
						.css({
							'min-width': 0,
							'max-width': 'none',
							'min-height': 0,
							'max-height': 'none'
						})
						.animate({
							'width': 0
						}, speed, function () { $(this).remove(); });
				},
				gonnapop = function (e) {
					$(this).addClass('letterpop_hover');
				},
				notgonnapop = function (e) {
					$(this).removeClass('letterpop_hover');
				};
			
			html = '<span class="letterpop_letter">' + letters.join('</span><span class="letterpop_letter">') + '</span>';
			
			base.$el.addClass('letterpop').html(html.replace(/> <\//g, '>&thinsp;</'));
			
			$('.letterpop_letter', base.$el).css('display', 'inline-block').click(poppop).hover(gonnapop, notgonnapop);
		};
	
		// Run initializer
		base.init();
	};
	
	$.letterpop.defaultOptions = {
		OPTION: "OPTION_DEFAULT"
	};
	
	$.fn.letterpop = function(options){
		return this.each(function(){
			(new $.letterpop(this, options));
		});
	};
})(jQuery);