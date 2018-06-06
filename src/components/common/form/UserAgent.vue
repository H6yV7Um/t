<template>
    <div>
        <div class="form-group">
            <label for="type" class="col-sm-2 control-label">User Agent</label>
            <div class="col-sm-10">
                <div class="loading" v-if="this.userAgents == null"></div>
                <b-btn v-b-modal.modal-add-useragent class="btn btn-default" v-else-if="this.userAgents && this.userAgents.length == 0">添加</b-btn>
                <div class="input-group" v-else-if="this.userAgents && this.userAgents.length > 0">
                    <select name="useragent" class="form-control" v-model="selected">
                        <option v-for="item in this.userAgents" :key="item.id" :id="item.id">{{ item.name }}</option>
                    </select>
                    <span class="input-group-btn">
                        <b-btn v-b-modal.modal-add-useragent class="btn btn-default">添加</b-btn>
                        <!-- <button class="btn btn-default" type="button" @click="showAddModal">添加</button> -->
                    </span>
                </div>
            </div>
        </div>
        <b-modal id="modal-add-useragent" ref="modal" 
            centered 
            title="添加 User Agent"
            @ok="submit"
            @shown="clear"
        >
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="type" class="col-sm-2 control-label">名称</label>
                    <div class="col-sm-10">
                        <input type="text" maxlength="24" name="name" v-model="form.name" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <label for="value" class="col-sm-2 control-label">UserAgent</label>
                    <div class="col-sm-10">
                        <input type="text" name="value" v-model="form.value" class="form-control" />
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
                    name: "",
                    value: ""
                },
                selected: null
            }
        },
        computed: {
            ...mapGetters([
                'userAgents'
            ])
        },
        async mounted() {
            try {
                await this.$store.dispatch('getAllUserAgents');
            } catch(e) {
                console.error(e);
            }
        },
        methods: {
            async submit(evt) {
                evt.preventDefault()
                const name = this.form.name;
                const value = this.form.value;
                if (!name || !value) {
                    return ;
                }
                try {
                    await this.$store.dispatch('addUserAgent',{
                        name: name,
                        value: value
                    });
                    this.clear();
                    this.$refs.modal.hide();
                } catch(e) {
                    throw e;
                }
            },
            clear() {
                this.form.name = ""
                this.form.value = ""
            }
        }
    }
</script>
