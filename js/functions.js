(function($){
	var CIRCLE_LIMITS = [30,200];
	var SQUARE_LIMITS = [20,150];

	var MainView = Backbone.View.extend({
		el: $('html'),
		events: {
			'click': 'addItem'
		},
		
		initialize: function(){
			this.collectionDraw = new Figures();
			this.collectionDraw.bind('add', this.appendItem); 
		},
		
		addItem: function(e){
			if (!$(e.target).is('.shape')){
				var figure = new Figure();
				var randomshape = (iRand(0,1)) ? new Circle(): new Square();
				randomshape.setSize(iRand(0,250));
				figure.set({
					x: e.pageX,
					y: e.pageY,
					shape: randomshape,
					color: randomColor()
				});
				
				this.collectionDraw.add(figure);
			}
		},
		
		appendItem: function(figure){
			var itemView = new ItemView({ model: figure });
			$('body').append(itemView.render());
		}
	
	});
	
	var ItemView =  Backbone.View.extend({
		tagName: 'div',
		events: {
			'click': 'remove'
		},   
		render: function(){
			$(this.el).addClass('shape');
			$(this.el).css(this.model.get('style'));
			return this.el;
		},
		remove: function(){
			$(this.el).remove();
			this.model.destroy();
		}
	});
	
	var Figure = Backbone.Model.extend({
		defaults: {
			x: 0,
			y: 0,
			shape: {},
			color: '#ffffff',
			style: {}
		},
		initialize: function(){
			this.on('change:shape', this.updateCss, this);
		},
		updateCss: function(){
			var color = this.get('color');
			var shape = this.get('shape');
			var x = this.get('x');
			var y = this.get('y');
			var coords = { "left": x-shape.size/2, "top": y-shape.size/2 }
			var background = { "background-color": color}
			var css = $.extend({},shape.style,coords,background);
			this.set({
				style: css
			});
		}
	});
	
	var Figures = Backbone.Collection.extend({
		model: Figure	
	});
	
	var Circle = Backbone.Collection.extend({
		setSize: function(size){
			size = (size > CIRCLE_LIMITS[1]) ? CIRCLE_LIMITS[1] : size;
			size = (size < CIRCLE_LIMITS[0]) ? CIRCLE_LIMITS[0] : size;
			this.size = size;
			this.setStyle();
		},
		setStyle: function(){
			this.style =  {
				"width": this.size,
				"height": this.size,
				"-moz-border-radius": this.size/2,
				"-webkit-border-radius": this.size/2,
				"border-radius": this.size/2
			}
		}
	});
	
	var Square = Backbone.Collection.extend({
		setSize: function(size){
			size = (size > SQUARE_LIMITS[1]) ? SQUARE_LIMITS[1] : size;
			size = (size < SQUARE_LIMITS[0]) ? SQUARE_LIMITS[0] : size;
			this.size = size;
			this.setStyle();
		},
		setStyle: function(){
			this.style =  {
				"width": this.size,
				"height": this.size
			}
		}
	});

	function iRand(min, max){
		return Math.round(Math.random() * (max - min) + min);
	}
	
	var mainView = new MainView();

})(jQuery);