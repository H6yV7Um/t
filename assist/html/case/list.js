const TMPL = {
    progress : `<div class="progress full-progress progress-black">\
                    <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%">\
                        <span class="sr-only">45% Complete</span>\
                    </div>\
                </div>`,
    progressText : `<div class="col-md-3 text-center">\
                        <span class="text-muted over-ellipsis">正在执行中...</span>\
                    </div>`
}

window.Actions = {
    detail : function(evt) {
        let target = $(evt.target);
        let id = target.attr('data-id');
        console.log('->id');
        const dialog = new Ui.Dialog({
            title : `测试用例1详情`
        });
        dialog.updateContent(
            $(Ui.tmpl(`tmpl_detail`,{}))
        )
    },
    run : function(evt) {
        let target = $(evt.target);
        let parents = target.closest('.list-group-item');
        let id = target.attr('data-id');
        parents.addClass('disabled');
        parents.find('.opera').addClass('hide');
        parents.append($(TMPL.progress))
        parents.find('.row').append($(TMPL.progressText))

    }
}



$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})