/**
 * 公共ui
 */
const Ui = {
    btnLoading : function(target) {
        target.attr('data-text',target.text())
              .attr('disabled','disabled')
              .text('处理中...');
    },
    btnUnLoading : function(target) {
        target.text(target.attr('data-text'))
              .removeAttr('disabled');
    },
    tmpl : function(str, data) {
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
            tmpl(document.getElementById(str).innerHTML) :
    
            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
    
                // Introduce the data as local variables using with(){}
                "with(obj){p.push('" +
    
                // Convert the template into pure JavaScript
                str
                .replace(/[\r\t\n]/g, " ")
                .split("<%").join("\t")
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'") + "');}return p.join('');");
    
        // Provide some basic currying to the user
        return data ? fn(data) : fn;
    },
    alert : function(msg) {
        let dialog = new Ui.Dialog({
            title : `提示`,
            content : msg
        });
    }
}

;(function(exports){
    function Dialog(opts) {
        this.opts = {
            title   : opts.title   || `Title`,
            content : opts.content || `Content`,
            button  : opts.button  || [{
                text : `关闭`
            }],
            onInit  : opts.onInit  || function(){},
            onClick : opts.onClick || function(){}
        }
        this.target = null;
        this.init();
    }
    Dialog.prototype = {
        template : 
            `<div class="modal-box">\
                <div class="modal fade show" data-ui="modal">\
                    <div class="modal-dialog">\
                        <div class="modal-content">\
                            <div class="modal-header">\
                                <button type="button" class="close" data-idx="99" data-act="btn">\
                                    <span>&times;</span>\
                                </button>\
                                <h4 class="modal-title"><%=opts.title %></h4>\
                            </div>\
                            <div class="modal-body" data-ui="content">\
                            </div>\
                            <% if ( opts.button.length > 0 ) { %>\
                            <div class="modal-footer">\
                                <% for ( var i = 0; i < opts.button.length; i++ ) { %>\
                                <button type="button" class="btn btn-default" data-act="btn" data-idx="<%=i %>"><%=opts.button[i].text %></button>\
                                <% } %>\
                            </div>\
                            <% } %>\
                        </div>\
                    </div>\
                </div>\
                <div class="modal-backdrop fade" data-ui="mask"></div>\
            </div>`,
        init : function() {
            this.target = $(Ui.tmpl(this.template,{
                opts : this.opts
            }));
            this.ui = {
                modal : this.target.find('[data-ui="modal"]'),
                mask  : this.target.find('[data-ui="mask"]'),
                content : this.target.find('[data-ui="content"]')
            }
            
            this.ui.content.html(this.opts.content);
            this.target.appendTo(document.body);
            setTimeout(() => {
                this.ui.modal.addClass('in');
                this.ui.mask.addClass('in');
            },10);
            this.bindEvent();
            this.opts.onInit();
        },
        bindEvent : function() {
            this.target.on('click','[data-act="btn"]',(evt) => {
                let target = $(evt.target);
                let idx = Number(target.attr('data-idx'));
                if ( typeof this.opts.button[idx] == 'function' ) {
                    this.opts.button[idx].call(this,evt);
                } else {
                    this.remove();
                }
            });
        },
        remove : function() {
            setTimeout(() => {
                this.target.remove();
            },500);
            this.target.find('.in').removeClass('in');
        }
    }

    exports.Dialog = Dialog;

})(Ui);