<template>
     <div class="form-group">
        <label for="type" class="col-sm-2 control-label">User Agent</label>
        <div class="col-sm-10">
            <div class="input-group">
                <select class="form-control" name="type">
                    <option value="1">普通</option>
                    <option value="2">iPhone QQ</option>
                    <option value="2">Android QQ</option>
                </select>
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" data-action="addUserAgent">添加</button>
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
