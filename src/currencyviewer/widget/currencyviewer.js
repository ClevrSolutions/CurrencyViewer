dojo.provide("CurrencyViewer.widget.currencyviewer");
 
mendix.widget.declare("CurrencyViewer.widget.currencyviewer", {
    mixins     : [dijit._Contained, mendix.addon._Contextable],
  
    inputargs  : {
        name	 		: '',
        currencyType    : '',
		useSeparators	: true
        },
		
	currencyBox			: null,
	
    postCreate : function(){
		mendix.dom.addClass(this.domNode, 'currencyviewer_widget');
		this.initContext();
        this.actRendered();
    },

    applyContext : function(context, callback){
        var self = this;
		var guid = context.getTrackId();
		
        if (context && guid != ''){
            mx.data.get({
            	guid     : context.getTrackId(),
   				callback : function(obj) {
   					var object = obj;
					self.showCurrency(object.getAttribute(self.name));
        			self.subscribe({
        				guid: object.getGUID(), 
        				callback: function() {
							self.showCurrency(object.getAttribute(self.name));
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
		var value = obj.getAttribute(this.name);
		this.showCurrency(value);

		callback && callback();
	},


	showCurrency : function (currency) {
		currency = mx.parser.formatValue(currency, "currency");
		
		if (!this.currencyBox) {
			this.currencyBox = mendix.dom.label();
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