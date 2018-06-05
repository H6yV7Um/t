<template>
    <div>
        <div class="form-group">
            <label for="type" class="col-sm-2 control-label">测试用户</label>
            <div class="col-sm-10">
                <div class="loading" v-if="this.testAccounts == null"></div>
                <b-btn v-b-modal.modal-add class="btn btn-default" v-else-if="this.testAccounts && this.testAccounts.length == 0">添加</b-btn>
                <div class="input-group" v-else-if="this.testAccounts && this.testAccounts.length > 0">
                    <select name="testaccounts" class="form-control">
                        <option v-for="item in this.testAccounts" :key="item.id" :id="item.id">{{ item.account }}</option>
                    </select>
                     <span class="input-group-btn">
                        <b-btn v-b-modal.modal-add class="btn btn-default">添加</b-btn>
                    </span>
                </div>
            </div>
        </div>
        <b-modal id="modal-add" ref="modal"
            centered 
            title="添加测试账号"
            @ok="submit"
            @shown="clear"
        >
            <div class="alert alert-warning">建议使用小号</div>
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="account" class="col-sm-2 control-label">账号</label>
                    <div class="col-sm-10">
                        <input type="text" maxlength="24" name="account" v-model="form.account" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="password" class="col-sm-2 control-label">密码</label>
                    <div class="col-sm-10">
                        <input type="text" name="password" v-model="form.password" class="form-control" />
                    </div>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import {mapGetters} from 'Vuex'

    export default {
        data() {
            return {
                form: {
                    account: "",
                    password: ""
                }
            }
        },
        computed: {
            ...mapGetters([
                'testAccounts'
            ])
        },
        async mounted() {
            try {
                await this.$store.dispatch('getAllTestAccounts');
            } catch(e) {
                console.error(e);
            }
        },
        methods: {
            async submit(evt) {
                evt.preventDefault()
                const account = this.form.account;
                const password = this.form.value;
                if (!account || !password) {
                    return ;
                }
                try {
                    await this.$store.dispatch('addTestAccounts',{
                        account: account,
                        password: password
                    });
                    this.clear();
                    this.$refs.modal.hide();
                } catch(e) {
                    throw e;
                }
            },
            clear() {
                this.form.account = ""
                this.form.password = ""
            }
        }

    }
</script>
