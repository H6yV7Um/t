window.Actions = {
    detail : function(evt) {
        let target = $(evt.target);
        let id = target.attr('data-id');
        const dialog = new Ui.Dialog({
            fullScreen : true,
            title : `【2018-05-30 10:20:20】执行详情`
        });
        dialog.updateContent(
            $(Ui.tmpl(`tmpl_log_detail`,{}))
        )
    }
}