/**
 * 公共的
 */
const CommonEvent = {
    init : function() {
        this.select();
    },
    select : function() {
        this._initSelect();
        /**
         * eg : 
         *      <select data-ui="select" data-mod="m1">
         *          <option value="1"></option>
         *          <option value="2"></option>
         *      </select>
         *      <div data-mod="m1" data-key="1"></div>
         *      <div data-mod="m1" data-key="2"></div>
         * 
         */
        $(document.body).on('change','[data-ui="select"]',(evt) => {
            let target = $(evt.target);
            this._handlerSelect(target);
        });
    },
    _initSelect : function() {
        const me = this;
        $(`[data-mod]`).hide();
        $selects = $(`[data-ui="select"]`);
        $selects.each(function(){
            let $select = $(this);
            me._handlerSelect( $select );
        });
    },
    /**
     * @param {jQDom} $select select的jq选择dom
     */
    _handlerSelect : function($select) {
        let key = $.trim( $select.val() );
        let modkey = $select.attr('data-modkey');
        let mods = $(`[data-mod=${modkey}]`);
            mods.hide();
            mods.each(function(){
                let $mod = $(this);
                if ( $mod.attr('data-key') == key ) {
                    $mod.show();
                }
            });
    }
}
CommonEvent.init();