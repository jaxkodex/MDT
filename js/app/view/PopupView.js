

var PopupView = Backbone.View.extend({
	tagName: 'div',
	className: 'popup',
	opened: false,
	template: _.template('<div class="title"><div class="close"></div><%=title%></div><div class="body"></div>'),
	title: 'Nueva Ventana',
	events: {
		'click .close': 'close'
	},
	initialize: function (opts) {
		opts = opts || {};
		this.view = opts.view;
		this.title = opts.title;
	},
	render: function () {
		this.$el.html(this.template({ title: this.title, }));
		this.delegateEvents();
		if (this.view) {
			this.view.render().$el.appendTo(this.$('.body'));
		}
		this.$el.draggable().css({
			position: 'absolute'
		});
		return this;
	},
	setTitle: function (title) {
		this.title = title;
		return this;
	},
	open: function () {
		if (!this.opened) {
			this.render().$el.appendTo('body');
		}
		this.opened = true;
		return this;
	},
	close: function () {
		//this.$el.remove();
		this.remove();
		this.trigger('close');
		this.unbind();
		this.opened = false;
	}
});