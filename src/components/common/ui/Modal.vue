<template>
    <div class="modal-box" transition="fade" v-show="show">
        <div class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="destroy">
                            <span>&times;</span>
                        </button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="modal-body-content">
                        Hello World, Modal
                    </div>
                </div>
                <div class="modal-footer">

                </div>
            </div>
            <div class="modal-backdrop fade"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isShow: true
            }
        },
        methods: {
            destroy() {

            }
        }
    }
</script>
