<template>
  <div>
    <el-col :span="16">
      <div class="block" style="margin-left: 10%;margin-top: 2%;font-size: large">
        <!--<span class="demonstration">完整功能</span>-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[50,100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="800">
        </el-pagination>
      </div>
    </el-col>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  export default {

    components: {
      ElRow,
      ElCol,
    },
    data () {
      return {
        formLabelWidth: '120px',
        currentPage4: 4
      }
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },

  }
</script>
