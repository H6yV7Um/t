<template>
    <table class="table table-striped" v-if="this.list.length > 0">
        <thead>
            <tr>
                <th>用例名称</th>
                <th>所属项目</th>
                <th>创建人</th>
                <th>用例类型</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="item in this.list" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.pid }}</td>
                <td>{{ item.creater }}</td>
                <td>
                    <span class="label-default label">{{ item.type }}</span>
                </td>
                <td>
                    <a type="button" class="btn btn-black btn-xs" title="编辑" href="./add.html">
                        <i class="glyphicon glyphicon-pencil"></i>
                    </a>
                    <button type="button" class="btn btn-default btn-xs" title="详情" data-action="detail">
                        <i class="glyphicon glyphicon-list-alt"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="text-muted text-center" v-else>
        暂无数据...
    </div>
</template>
<script>
    export default {
        data() {
            return {
                pid: 0,
                list: [],
                total: 0
            }
        },
        async mounted() {
            try {
                let params = this.$router.history.current.params;
                this.pid = params.id || 0;
                let res = await this.$store.dispatch('getCasesByPid',this.pid);
                this.total = res.total;
                this.list = res.list
            } catch(e) {
                console.error(e);
                alert('获取数据出错')
            }
        }
    }
</script>
