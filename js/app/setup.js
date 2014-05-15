var toolbar, workspace, tableCollection;
(function () {
	tableCollection = new TableCollection();
	workspace = new WorkspaceView ({
		collection: tableCollection,
		top: 40
	});
	workspace.render().$el.appendTo('body');
	workspace.initStage();
	toolbar = new ToolbarView({
		collection: tableCollection
	});
	toolbar.render().$el.appendTo('body');
	$(window).resize($.proxy(workspace.resizeCanvas, workspace));
})();