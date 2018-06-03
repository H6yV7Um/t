<template>
    <div>
        <Header />
        <div class="container" v-if="this.project != null">
            <ol class="breadcrumb">
                <li>
                    <router-link to="/projects">所有项目</router-link>
                </li>
                <li class="active">{{ this.project.name }}</li>
            </ol>
            <ul class="nav nav-tabs mar-b-15" role="tablist">
                <li role="presentation" class="active" ><a href="#task" aria-controls="home" role="tab" data-toggle="tab">任务列表</a></li>
                <li role="presentation" ><a href="#case" aria-controls="case" role="tab" data-toggle="tab">用例列表</a></li>
                <li class="pull-right">
                    <a href="#" class="btn">
                        <i class="glyphicon glyphicon glyphicon-education mar-r-5"></i>Help
                    </a>
                </li>
            </ul>
            <div class="tab-content">  
                <div role="tabpanel" class="tab-pane active" id="task">
                    <div class="well well-sm clearfix">
                        <div class="pull-right">
                           <!-- Small button group -->
                            <div class="btn-group">
                                <button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    添加测试任务 <span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a href="../task/add.html">UI交互测试类型</a></li>
                                    <li><a href="../task/add.html">连通性测试类型</a></li>
                                    <li><a href="../task/add.html">单元测试类型</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <TaskList />
                    
                </div>
                <div role="tabpanel" class="tab-pane " id="case">
                    <div class="well well-sm clearfix">
                        <div class="pull-right">
                            <!-- Small button group -->
                            <div class="btn-group">
                                <a href="./add.html" class="btn btn-default btn-sm" type="button" >添加用例 </a>                              
                            </div>
                        </div>
                    </div>
                    <CaseList />
                </div>
            </div>
        </div>
        <div class="container" v-else>
            <ol class="breadcrumb">
                <li>
                    <router-link to="/projects">所有项目</router-link>
                </li>
                <li class="active" v-if="!this.initError">loading...</li>
            </ol>
            <div class="text-center">
                <div v-if="this.initError" class="text-muted">
                    项目数据加载失败!
                </div >
                <div class="loading" v-else></div>
            </div>
        </div>
    </div>
</template>
<script>
    import Header from '../common/Header.vue'
    import TaskList from '../task/List.vue'
    import CaseList from '../case/List.vue'

    export default {
        components: {
            Header,
            TaskList,
            CaseList
        },
        data() {
            return {
                initError: false,
                project: null,
                id: 0
            }
        },
        async mounted() {
            try {
                let params = this.$router.history.current.params;
                this.id = params.id || 0;
                let data = await this.$store.dispatch('getProject',this.id)
                if ( !data ) {
                    this.initError = true;
                    return ;
                }
                this.project = data;
            } catch(e) {
                this.initError = true;
            }
        }
    }
</script>
