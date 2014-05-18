

var TableModel = Backbone.Model.extend({
	defaults: {
		x: 0,
		y: 0,
		width: 130,
		height: 70,
		stroke: 'black',
		fill: '#C2D6FF',
		strokeWidth: 1,
		tableName: 'Nueva tabla',
		fontSize: 14
	},
	initialize: function () {
		this.rec = new Kinetic.Rect(this.toJSON());
		this.textName = new Kinetic.Text({
			x: 50,
			y: 15,
			text: this.get('tableName'),
			fontSize: this.get('fontSize'),
			fontFamily: 'Arial',
			fill: 'black'
		});
		this.nameDivisor = new Kinetic.Line ({
			points: [0, this.textName.getTextHeight()+7, this.get('width'), this.textName.getTextHeight()+7],
			stroke: this.get('stroke'),
			strokeWidth: this.get('strokeWidth')
		});
		this.textName.x(this.get('width')/2-this.textName.getTextWidth()/2);
		this.textName.y(3);
		this.group = new Kinetic.Group({
			x: 10,
			y: 10,
			draggable: true
		});
		this.group.add(this.rec);
		this.group.add(this.nameDivisor);
		this.group.add(this.textName);

		this.view = new TableEditorView({
			model: this
		});
		this.popupWindow = new PopupView ({
			view: this.view,
			title: 'Nueva tabla'
		});
	},
	addToLayer: function (layer) {
		//layer.add(this.rec, this.textName);
		layer.add(this.group);
		return this;
	},
	reDraw: function () {
		//this.rec.draw();
		//this.textName.draw();
		this.group.draw();
		return this;
	},
	showTableEditor: function () {
		this.popupWindow.open();
	}
});