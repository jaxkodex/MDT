

var TableEditorView = Backbone.View.extend({
	tagName: 'div',
	className: '',
	template: _.template('<form><div class="form-group"><label for="table_name">Nombre:</label><input class="form-control input-sm" id="table_name" value="<%=tableName%>" /></div><div><table class="table table-condensed table-bordered"><thead><tr><th>Nombre</th><th>Tipo</th><th>Descripción</th></tr></thead><tbody></tbody><tfoot><tr><td colspan="3"><a href="#">Agregar atributo...</a></td></tr></tfoot></table></div></form>'),
	events: {
		'click a': 'agregarAtributo'
	},
	render: function () {
		var me = this;
		this.$el.html(this.template(this.model ? this.model.toJSON() : {}));
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
	agregarAtributo: function (evt) {
		evt.preventDefault();
		if (!this.collection) {
			this.collection = new TableAttributeCollection();
		}
		this.collection.add({});
		this.render();
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