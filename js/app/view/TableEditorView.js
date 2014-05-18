

var TableEditorView = Backbone.View.extend({
	tagName: 'div',
	className: '',
	template: _.template('<form><div class="form-group"><label for="<%=tableNameId%>">Nombre:</label><input class="form-control input-sm" id="<%=tableNameId%>" value="<%=tableName%>" /></div><div><table class="table table-condensed table-bordered"><thead><tr><th>Nombre</th><th>Tipo</th><th>Descripcion</th></tr></thead><tbody></tbody><tfoot><tr><td colspan="3"><a href="#">Agregar atributo...</a></td></tr></tfoot></table></div></form>'),
	events: {
		'click a': 'newTableAttribute'
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
		if (this.collection) {
			this.collection.each(function (obj, index) {
				var attributeView = new TableAttributeEditor ({
					model: obj
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
	}
});

var TableAttributeEditor = Backbone.View.extend({
	tagName: 'tr',
	template: _.template('<td><input class="form-control input-sm" value="<%=attributeName%>" /></td><td></td><td><input class="form-control input-sm" /></td>'),
	render: function () {
		this.$el.html(this.template(this.model ? this.model.toJSON() : {}));
		return this;
	}
});