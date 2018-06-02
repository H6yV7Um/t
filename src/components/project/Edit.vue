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
                                <label for="name" class="col-sm-2 control-label">名称</label>
                                <div class="col-sm-10">
                                    <input v-model="form.name" class="form-control" id="name" placeholder="请输入项目名称">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="creater" class="col-sm-2 control-label">创建人</label>
                                <div class="col-sm-10">
                                    <input type="text" v-model="form.creater" class="form-control" id="creater" readonly>
                                    <!-- <p class="form-control-static">CK.Ming</p> -->
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="type" class="col-sm-2 control-label">成员</label>
                                <div class="col-sm-10">
                                    <input type="text" v-model="form.members" class="form-control" placeholder="多个成员用;隔开">
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div class="panel-footer clearfix">
                    <div class="pull-right">
                        <router-link class="btn btn-default" to="/projects">返回</router-link>
                        <button type="button" class="btn btn-primary mar-l-5" @click="submit">保存</button>
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
                type: 'add',
                id: 0,
                form: {}
            }
        },
        async mounted() {
            try {
                let params = this.$router.history.current.params;
                this.type = params.type;
                this.id = params.id || 0;
                if (this.type == 'edit') {
                    let data = await this.$store.dispatch('getProject',this.id)
                    this.form = data;
                }
            } catch(e) {
                alert('数据获取出错');
            }
        },
        methods: {
            async submit() {
                try {
                    let data = {
                        name: this.name,
                        creater: this.creater || 'anonymous',
                        members: this.members
                    }
                    await this.$store.dispatch('addProject',data);
                    alert('添加成功')
                    this.$router.push('/projects')
                } catch (e) {
                    throw e;
                    alert('添加数据失败')
                } 
            }
        }
    }
</script>
