<template>
    <div>
        <Header />
        <div class="container">
            <div class="well well-sm clearfix text-right">
                <router-link class="btn btn-default btn-sm" to="/add/project">添加项目</router-link>
           </div>
            <div>
                <div class="row" v-if=" projects.length > 0 ">
                    <div class="col-sm-6 col-md-4" v-for="project in projects" :key="project.id">
                        <div class="thumbnail">
                            <div class="caption">
                                <h3>{{ project.name }}
                                    <router-link class="glyphicon glyphicon-edit small text-muted edit-btn" :to="'/edit/project/'+project.id"></router-link>
                                </h3>
                                <p>创建人：{{ project.creater }}</p>
                                <p class="text-right">
                                    <router-link class="btn btn-default" :to="`/project/${project.id}`">
                                        ENTER
                                    </router-link>  
                                </p>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div class="row" v-else>
                    <div class="col-md-12 col-sm-12">
                        <p class="text-muted text-center">暂无项目...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
    import { mapGetters } from 'Vuex'
    import Header from '../common/Header.vue'
    export default {
        name: 'ProjectList',
        computed: mapGetters({
            projects: 'projects'
        }),
        async mounted() {
            try {
                await this.$store.dispatch('getProjectsByPage');
            } catch (e) {
                alert('获取数据出错');
            } 
        },
        components: { Header },
        methods: {
           
        }
    }
</script>
