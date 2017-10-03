define([
	'dojo/_base/declare',
	"dijit/_Container",
	'mxui/widget/_WidgetBase',
	"dojo/dom-class",
	"dojo/dom-construct"
], function (declare, _Container, _WidgetBase, domClass, domConstruct) {
	'use strict';

return declare('CurrencyViewer.widget.currencyviewer', [_WidgetBase, _Container], {
	inputargs  : {
	name	 		: '',
	currencyType    : '',
	useSeparators	: true
	},
	
currencyBox			: null,

postCreate : function(){
	domClass.add(this.domNode, 'currencyviewer_widget');
	// this.initContext();
	// this.actRendered();
},

applyContext : function(context, callback){
	var self = this;
	var guid = context.getTrackId();
	
	if (context && guid != ''){
		mx.data.get({
			guid     : context.getTrackId(),
			   callback : function(obj) {
				   var object = obj;
				self.showCurrency(object.get(self.name));
				self.subscribe({
					guid: object.getGuid(), 
					callback: function() {
						self.showCurrency(object.get(self.name));
					}
				});
			}	
		});
	}
	else {
		logger.warn(this.id + ".applyContext received empty context");
	}
	callback && callback();
},

update : function(obj, callback) {
	var value = obj.get(this.name);
	this.showCurrency(value);

	callback && callback();
},


showCurrency : function (currency) {
	currency = mx.parser.formatValue(currency, "currency");
	
	if (!this.currencyBox) {
		this.currencyBox = domConstruct.toDom("<label></label>");
		this.domNode.appendChild(this.currencyBox);
	}
	
	if (currency != "") {
		switch(this.currencyType) {
			case 'Dollar':
				this.currencyBox.innerHTML = '&#36 '+currency;
				break;
			case 'Euro':
				this.currencyBox.innerHTML = '&#8364 '+currency;
				break;
			case 'Pound':
				this.currencyBox.innerHTML = '&#163 '+currency;
				break;
			case 'Yen':
				this.currencyBox.innerHTML = '&#165 '+currency;
				break;
			default:
				this.currencyBox.innerHTML = ''+currency;
				break;
		}
	} else
		this.currencyBox.innerHTML = "";
},

uninitialize : function(){
	this.unsubscribe();
}
});
});

require(['CurrencyViewer/widget/currencyviewer']);
