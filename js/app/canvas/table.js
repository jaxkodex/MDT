


var Table =  function () {
	//
}


Table.prototype = {
	x: 0,
	y: 0,
	width: 50,
	height: 50,
	rec: null,
	drawMe: function () {
		if (this.rec == null) {
			this.rec = new Kinetic.Rect({
				x: this.x,
				y: this.y,
				width: this.width,
				height: this.height,
				stroke: 'gray',
				fill: 'red',
				strokeWidth: 2,
				draggable: true
			});
		} else {
			this.rec.setWidth(this.width);
			this.rec.setHeight(this.height);
		}
		return this;
	}
}