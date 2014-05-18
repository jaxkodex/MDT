

var TableModel = Backbone.Model.extend({
	defaults: {
		tableName: 'Nueva tabla',
		tableDrawOptions: {
			x: 0.5,
			y: 0.5,
			width: 130,
			height: 70,
			stroke: 'black',
			fill: '#C2D6FF',
			strokeWidth: 1
		},
		tableTextOptions: {
			text: '',
			fontSize: 12,
			fontFamily: 'Arial',
			fill: 'black'
		},
		lineOptions: {
			stroke: 'black',
			strokeWidth: 1
		}
	},
	initialize: function () {
		this.tableAttributes = new TableAttributeCollection(); // Table Attributes
		/*
		this.rec = new Kinetic.Rect(this.toJSON());
		this.textName = new Kinetic.Text({
			x: 50.5,
			y: 15.5,
			text: this.get('tableName'),
		});
		this.nameDivisor = new Kinetic.Line ({
			points: [0, this.textName.getTextHeight()+7.5, this.get('width'), this.textName.getTextHeight()+7.5],
			stroke: this.get('stroke'),
			strokeWidth: this.get('strokeWidth')
		});
		this.textName.x(this.get('width')/2-this.textName.getTextWidth()/2);
		this.textName.y(3);
		*/
		this.group = new Kinetic.Group({
			x: 10,
			y: 10,
			draggable: true
		});
		/*
		this.group.add(this.rec);
		this.group.add(this.nameDivisor);
		this.group.add(this.textName);
		*/

		this.view = new TableEditorView({
			model: this,
			collection: this.tableAttributes
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
		var me = this;
		this.group.destroyChildren();

		var tableName, rec, firstSeparator, firstSeparatorPos, textAttributes = [], 
			maxTextWidth = 0, totalHeight = 0.5, xPadding = 10, yPadding = 2;

		rec = new Kinetic.Rect (_.extend(this.get('tableDrawOptions'), {
			y: totalHeight
		}));

		totalHeight += 4.5;
		tableName = new Kinetic.Text(_.extend(this.get('tableTextOptions'), {
			text: this.get('tableName'),
			y: totalHeight
		}));
		maxTextWidth = tableName.getTextWidth();
		totalHeight += tableName.getTextHeight() +1;

		firstSeparator = new Kinetic.Line(_.extend(this.get('lineOptions'), {}));
		firstSeparatorPos = totalHeight; // store separator position

		totalHeight += 3;
		this.tableAttributes.each(function (obj, index) {
			var text = new Kinetic.Text(_.extend(me.get('tableTextOptions'), {
				text: obj.get('attributeName'),
				x: xPadding,
				y: totalHeight
			}));

			maxTextWidth = maxTextWidth < text.getTextWidth() ? text.getTextWidth() : maxTextWidth;
			totalHeight += text.getTextHeight() +1;

			textAttributes.push(text);
		});

		totalHeight += 4;
		rec.size({
			width: maxTextWidth + 2*xPadding,
			height: totalHeight
		});

		tableName.x(rec.width()/2-tableName.getTextWidth()/2);

		firstSeparator.points([0, firstSeparatorPos+0.5, rec.width(), firstSeparatorPos+0.5]);

		this.group.add(rec);
		this.group.add(tableName);
		this.group.add(firstSeparator);

		_.each(textAttributes, function (obj) {
			me.group.add(obj);
		});

		this.group.draw();
		return this;
	},
	newTableAttribute: function () {
		if (!this.tableAttributes) {
			this.tableAttributes = new TableAttributeCollection();
		}
		this.tableAttributes.add({});
		this.view.trigger('update');
		this.reDraw();
	},
	showTableEditor: function () {
		this.popupWindow.open();
	}
});