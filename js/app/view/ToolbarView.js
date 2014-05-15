


var ToolbarView = Backbone.View.extend({
	tagName: 'div',
	className: 'toolbar',
	events: {
		'click #agregarTabla': 'agregarTabla'
	},
	template: _.template($('#toolbarTemplate').html()),
	render: function () {
		this.$el.html(this.template());
		return this;
	},
	agregarTabla: function (evt) {
		evt.preventDefault();
		this.collection.add({});
	}
});