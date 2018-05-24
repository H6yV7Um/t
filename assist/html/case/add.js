window.Actions = {

    addQQ : function(evt,target) {
        Ui.btnLoading(target);
        const dialog = Ui.confirm(
            `添加UserAgent`,
            null,
            {text:`添加`,click:function(){
                console.log('点击了')
            }}
        );
        dialog.updateContent(
            Ui.tmpl(`addQQ`)
        )
        setTimeout(() => {
            Ui.btnUnLoading(target);
        },1000);
    },

    addUserAgent : function(evt,target) {
        Ui.btnLoading(target);
        const dialog = Ui.confirm(
            `添加UserAgent`,
            null,
            {text:`添加`,click:function(){
                console.log('点击了')
            }}
        );
        dialog.updateContent(
            Ui.tmpl(`addUserAgent`)
        )
        setTimeout(() => {
            Ui.btnUnLoading(target);
        },1000);
        console.log('addUserAgent');
    }
}