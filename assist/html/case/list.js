window.Actions = {
    detail : function(evt) {
        let target = $(evt.target);
        let id = target.attr('data-id');
        console.log('->id');
        const dialog = new Ui.Dialog({
            title : `测试用例1详情`
        });
        dialog.updateContent(
            $(Ui.tmpl(`tmpl_detail`),{})
        )
    }
}