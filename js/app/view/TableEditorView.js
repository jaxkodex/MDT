

var TableEditorView = Backbone.View.extend({
	tagName: 'div',
	className: '',
	template: _.template('<form><div class="form-group"><label for="<%=tableNameId%>">Nombre:</label><input class="form-control input-sm" id="<%=tableNameId%>" data-modelattribute="tableName" value="<%=tableName%>" /></div><div><table class="table table-condensed table-bordered"><thead><tr><th>Nombre</th><th>Tipo</th><th>Descripcion</th></tr></thead><tbody></tbody><tfoot><tr><td colspan="3"><a href="#">Agregar atributo...</a></td></tr></tfoot></table></div></form>'),
	events: {
		'click a': 'newTableAttribute',
		'keyup input': 'onInputChange'
	},
	initialize: function () {
		this.on('update', $.proxy(this.render, this));
	},
	render: function () {
		var me = this, table = this.model ? this.model.toJSON() : {};
		table = _.extend(table, {
			tableNameId: _.uniqueId('input_')
		});
		this.$el.html(this.template(table));
		if (this.model.tableAttributes) {
			this.model.tableAttributes.each(function (obj, index) {
				var attributeView = new TableAttributeEditor ({
					model: obj,
					parentView: me
				});
				attributeView.render().$el.appendTo(me.$el.find('table tbody'));
			});
		}
		return this;
	},
	newTableAttribute: function (evt) {
		evt.preventDefault();
		this.model.newTableAttribute();
		/*
		if (!this.collection) {
			this.collection = new TableAttributeCollection();
		}
		this.collection.add({});
		this.render();*/
	},
	onInputChange: function (evt) {
		var el = $(evt.currentTarget), modelAttribute = el.data('modelattribute');
		if (modelAttribute) {
			this.model.set(modelAttribute, el.val());
			this.model.reDraw();
		}
	}
});

var TableAttributeEditor = Backbone.View.extend({
	tagName: 'tr',
	template: _.template('<td><input class="form-control input-sm" data-modelattribute="attributeName" value="<%=attributeName%>" /></td><td></td><td><input class="form-control input-sm" /></td>'),
	events: {
		'keyup input': 'onInputChange'
	},
	initialize: function (opts) {
		opts = opts || {};
		this.parentView = opts.parentView;
	},
	render: function () {
		this.$el.html(this.template(this.model ? this.model.toJSON() : {}));
		return this;
	},
	onInputChange: function (evt) {
		evt.stopPropagation();
		var el = $(evt.currentTarget), modelAttribute = el.data('modelattribute');
		if (modelAttribute) {
			this.model.set(modelAttribute, el.val());
		}
		this.parentView.model.reDraw();
	}
});