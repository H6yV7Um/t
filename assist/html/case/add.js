window.Actions = {

    addQQ : function(evt,target) {
        Ui.btnLoading(target);
        const dialog = new Ui.Dialog({
            title : `添加测试QQ号码`,
            content : `添加测试QQ号码`,
            onInit : function() {

            }
        });
        setTimeout(() => {
            Ui.btnUnLoading(target);
        },1000);
    },

    addUserAgent : function(evt) {
        console.log('addUserAgent');
    }
}