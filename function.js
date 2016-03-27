var Item = Backbone.Model.extend({
	});
var ItemView = Backbone.View.extend({
	tagName:'tr',
	template:_.template($('#item-template').html()),
	render:function(){
	this.$el.html(this.template(this.model.toJSON()));
	
		return this;		
	},
	events:{
		'click .edit':'edit',
		'click .save':'save',
		'click .cancel':'save'
	},
	edit:function(){
		this.$el.addClass('editing');
	},
	cancel:function(){
		this.$el.removeClass('editing');
	},
	save:function(){
		var price = $('.input-v').val();
	
		this.model.set({price:price});
		this.$el.removeClass('editing');
	},
	initialize:function(){
		this.listenTo(this.model,'change',this.render,this);
	}
});
var ItemCollection = Backbone.Collection.extend({
	model:Item
});
var ItemCollectionView = Backbone.View.extend({
	el:$('#pricelist'),
	render:function(){
		_.each(this.collection.models,function(model){		
			var t = new ItemView({
				model:model
			}).render().el;
			this.append(t);	
		},this);		
	},
	append:function(t){
		this.$el.append(t);
	}
});
var itemcollection = new ItemCollection([
{price:'1'},
	{price:'2'}
]);
var itemcollectionview = new ItemCollectionView({
	collection:itemcollection
});
itemcollectionview.render();