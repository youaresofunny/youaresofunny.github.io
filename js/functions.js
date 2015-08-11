jQuery(document).ready(function($){
	
	$('html').click(function(e) {
		var target = $(e.target);
		if (target.is('div')){
			target.remove();
		}else{
			var offset = $(this).offset();
			var coords = {x: e.pageX - offset.left, y: e.pageY - offset.top }
			var shapesArray = ["circle","square","pgram"];
			
			//Get random figureName from array
			var randomShape = shapesArray[iRand(0,shapesArray.length-1)];
			
			//New shape from figureName and size
			var shape = new shapes(randomShape,iRand(10,200));
			
			//Generete and draw figure from shape, color and click position
			$('body').append(
				new figure(shape,randomColor(),coords.x,coords.y)
			);
		}
	});
	
	//Figure for draw
	function figure(shape,color,x,y){
		var coords = { "left": x-shape.size/2, "top": y-shape.size/2 }
		var background = { "background-color": color}
		
		//Styles combine here, shape params, screen position and background color
		var styles = $.extend({},shape.style,coords,background);
		
		var container = $("<div>", {class: shape.constructor.name,css:styles});
		return container;
	}
	
	//Shapes container
	function shapes(name,radius){
		this.circle = function(size){
			var rMax = 200/2;
			var rMin = 30/2;
			radius = size/2;
			radius = (radius > rMax) ? rMax : radius;
			radius = (radius < rMin) ? rMin : radius;
			
			this.style =  {
				"width": radius*2,
				"height": radius*2,
				"-moz-border-radius": radius,
				"-webkit-border-radius": radius,
				"border-radius": radius
			}
			this.size = radius*2;
			return this;
		}
		
		this.square = function(size){
			var sMax = 100;
			var sMin = 15;
			size = (size > sMax) ? sMax : size;
			size = (size < sMin) ? sMin : size;
			
			this.style =  {
				"width": size,
				"height": size
			}
			this.size = size;
			return this;
		}
		
		this.pgram = function(size){
			var sMax = 150;
			var sMin = 80;
			size = (size > sMax) ? sMax : size;
			size = (size < sMin) ? sMin : size;
			
			this.style = {
				"width": size,
				"height": size*3/4,
				"-webkit-transform": "skew(20deg)",
				"-moz-transform": "skew(20deg)",
				"-o-transform": "skew(20deg)"
			}
			this.size = size;
			return this;
		}
		
		return this[name](radius);
	}
	
	//Rounded random with interval
	function iRand(min, max){
		return Math.round(Math.random() * (max - min) + min);
	}
});
	
