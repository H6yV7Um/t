<template>
    <div>
        <Header />
        <div class="container">
             <div class="panel panel-default">
                <div class="panel-heading">添加项目</div>
                <div class="panel-body">
                    <form class="form-horizontal">

                        <fieldset class="form-fieldset">
                            <legend>项目配置</legend>
                            <div class="form-group">
                                <label for="type" class="col-sm-2 control-label">名称</label>
                                <div class="col-sm-10">
                                    <input type="url" class="form-control" id="name" placeholder="请输入项目名称">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="type" class="col-sm-2 control-label">创建人</label>
                                <div class="col-sm-10">
                                    <p class="form-control-static">CK.Ming</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="type" class="col-sm-2 control-label">成员</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" placeholder="多个成员用;隔开">
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div class="panel-footer clearfix">
                    <div class="pull-right">
                        <router-link class="btn btn-default" to="/projects">返回</router-link>
                        <button type="button" class="btn btn-primary mar-l-5">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../common/Header.vue'
    export default {
        components: {Header},
        data() {
            return {
                data : 1
            }
        }
    }
</script>
