<template>
    <div>
        <Header />
        <div class="container">
            <div class="panel panel-default">
                <div class="panel-heading">{{ title }}</div>
                <div class="panel-body">
                    <form class="form-horizontal">
                        <fieldset class="form-fieldset">
                            <legend>基础配置</legend>
                            <div class="form-group">
                                <label for="name" class="col-sm-2 control-label">用例名称</label>
                                <div class="col-sm-10">
                                    <input v-model="form.name" class="form-control" id="name" placeholder="输入用例名称，最长16个字符">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="desc" class="col-sm-2 control-label">用例描述</label>
                                <div class="col-sm-10">
                                    <textarea v-model="form.desc" id="desc" class="form-control" rows="3"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="type" class="col-sm-2 control-label">所属项目</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="pid">
                                        <option value="1">A项目</option>
                                        <option value="2">B项目</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="owner" class="col-sm-2 control-label">创建人</label>
                                <div class="col-sm-10">
                                    <input type="owner" class="form-control" id="owner" placeholder="输入用例名称，最长16个字符">
                                </div>
                            </div>
                        </fieldset>
                        
                        <fieldset class="form-fieldset">
                            <legend>用例配置</legend>
                            <div class="form-group">
                                <label for="type" class="col-sm-2 control-label">用例类型</label>
                                <div class="col-sm-10">
                                    <select class="form-control" name="type" readonly>
                                        <option value="1">UI交互测试</option>
                                        <option value="2" selected>连通性测试</option>
                                        <option value="3">单元测试</option>
                                    </select>
                                </div>
                            </div>
                            <!--S:连通性配置-->
                            <div v-if="this.bizType == 1">
                                <fieldset class="form-fieldset nest-1">
                                    <legend>任务配置</legend>
                                    <div class="form-group">
                                        <label for="code" class="col-sm-2 control-label">用例代码</label>
                                        <div class="col-sm-10" >
                                            <textarea name="code" id="code-editor"></textarea>
                                        </div>    
                                    </div>
                                </fieldset>
                            </div>
                            <div v-else-if="this.bizType == 2">
                                <fieldset class="form-fieldset nest-1">
                                    <legend>输入配置</legend>
                                    <div class="form-group">
                                        <label for="url" class="col-sm-2 control-label">请求URL</label>
                                        <div class="col-sm-10">
                                            <input type="url" class="form-control" id="url" placeholder="输入检测的URL">
                                        </div>
                                    </div>
                                    <TestAccount />
                                    <UserAgent />
                                    
                                    <div class="form-group">
                                        <label for="type" class="col-sm-2 control-label">请求方式</label>
                                        <div class="col-sm-10">
                                            <select class="form-control" name="type">
                                                <option value="GET">GET</option>
                                                <option value="POST">POST</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="type" class="col-sm-2 control-label">指定服务器</label>
                                        <div class="col-sm-10">
                                            <input type="url" class="form-control" id="proxy" placeholder="选填，请求的代理host">
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset class="form-fieldset nest-1">
                                    <legend>成功判定</legend>
                                    <div class="form-group">
                                        <label for="type" class="col-sm-2 control-label">HTTP状态码</label>
                                        <div class="col-sm-10">
                                            <select class="form-control" name="type">
                                                <option value="200">200</option>
                                            </select>
                                            <!-- <p class="form-control-static">request</p> -->
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div v-else-if="this.bizType == 3">
                                <fieldset class="form-fieldset nest-1">
                                    <legend>框架配置</legend>
                                    <div class="form-group">
                                        <label for="code" class="col-sm-2 control-label">测试框架</label>
                                        <div class="col-sm-10" >
                                            <select class="form-control" name="type">
                                                <option value="1">mocha</option>
                                            </select>
                                        </div>    
                                    </div>
                                    <div class="form-group">
                                        <label for="code" class="col-sm-2 control-label">断言库</label>
                                        <div class="col-sm-10" >
                                            <select class="form-control" name="type">
                                                <option value="1">asset</option>
                                                <option value="1">chai</option>
                                            </select>
                                        </div>    
                                    </div>
                                </fieldset>
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div class="panel-footer clearfix">
                    <div class="pull-right">
                        <button type="submit" class="btn btn-default">取消</button>
                        <button type="submit" class="btn btn-primary mar-l-5">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../common/Header.vue'
    import TestAccount from '../common/form/TestAccount.vue'
    import UserAgent from '../common/form/UserAgent.vue'

    export default {
        components: {Header,TestAccount,UserAgent},
        data() {
            return {
                title: '添加用例',
                type: 'add',
                bizType: 1, // 业务类型
                id: 0,
                form: {},
                projects: [],
                ua: [],
                testAccounts: []
            }
        },
        async mounted() {
            try {
                let params = this.$router.history.current.params;
                this.type = params.type;
                this.id = params.id || 0
                if (this.type == 'edit') {
                    this.title = '修改用例'
                    let data = await this.$store.dispatch('getCase',this.id)
                    this.form = data;
                } else if (this.type == 'add') {
                    this.bizType = this.$router.history.current.query.bizType
                }
            } catch (e) {
                console.error(e);
                alert('获取数据错误')
            }  
        }
    }
</script>
