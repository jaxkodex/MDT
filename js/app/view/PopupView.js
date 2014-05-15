

var PopupView = Backbone.View.extend({
	tagName: 'div',
	className: 'popup',
	opened: false,
	template: _.template('<div class="title"><%=title%></div><div class="body"><%=htmlBody%></div>'),
	initialize: function (opts) {
		this.opts = opts || {
			title: 'Nueva ventana',
			htmlBody: ''
		};
	},
	render: function () {
		this.$el.html(this.template(this.opts));
		return this;
	},
	open: function () {
		if (!this.opened) {
			this.render().$el.appendTo('body');
		}
		this.opened = true;
	}
});