<template>
    <div class="form-group">
        <label for="type" class="col-sm-2 control-label">测试用户</label>
        <div class="col-sm-10">
            <div class="input-group">
                <select class="form-control" name="type">
                    <option value="1">2060298388</option>
                    <option value="2">2060128388</option>
                </select>
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" data-action="addQQ">添加</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>
