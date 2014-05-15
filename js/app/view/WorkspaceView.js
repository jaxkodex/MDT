

var WorkspaceView = Backbone.View.extend({
	el: '#workspace',
	stage: null,
	layer: null,
	template: _.template(''),
	top: 0,
	left: 0,
	initialize: function (opts) {
		opts = opts || {
			top: 0,
			left: 0
		};
		this.top = opts.top || 0;
		this.left = opts.left || 0;
		this.collection.on ('add', $.proxy(this.addTableToWorkSpace, this));
	},
	render: function () {
		return this;
	},
	initStage: function () {
		if (this.stage == null) {
			this.stage = new Kinetic.Stage({
				container: 'workspace',
				draggable: true
			});
			this.layer = new Kinetic.Layer();
			this.stage.add(this.layer);
			this.resizeCanvas();
		}
	},
	resizeCanvas : function () {
		this.$el.css({
			top: this.top,
			left: this.left,
			width: window.innerWidth-this.left,
			height: window.innerHeight-this.top
		});
		this.stage.setWidth(window.innerWidth-this.left);
		this.stage.setHeight(window.innerHeight-this.top);
	},
	addTableToWorkSpace: function (obj) {
		obj.addToLayer(this.layer);
		obj.reDraw();
	}
});