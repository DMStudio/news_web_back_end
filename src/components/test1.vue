<template>
<div class="el-col el-col-21" id="app">
  <el-row style="position: relative;margin-top: 100px;float: right;margin-right: -150px">
    <el-col :span="8">
      <el-button  type="info" @click="dialogFormVisible = true" style="margin-left: 40%;margin-top: 2%;font-size: large">创建新表单</el-button>
      <el-dialog title="填写新表单" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="表单标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="表单内容" prop="content">
            <el-input type="textarea" min-rows="2" max-rows="4" v-model="ruleForm.content"></el-input>
          </el-form-item>
          <el-form-item label="表单类型" prop="type_id">
            <el-input v-model.number="ruleForm.type_id"></el-input>
          </el-form-item>
          <el-form-item label="图片链接" prop="img_url">
            <el-input v-model="ruleForm.img_url"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="修改表单" :visible.sync="dialogFormVisible2">
        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="表单标题" prop="title">
            <el-input v-model="ruleForm2.title"></el-input>
          </el-form-item>
          <el-form-item label="表单内容" prop="content">
            <el-input type="textarea" min-rows="2" max-rows="4" v-model="ruleForm2.content"></el-input>
          </el-form-item>
          <el-form-item label="表单类型" prop="type_id">
            <el-input v-model.number="ruleForm2.type_id"></el-input>
          </el-form-item>
          <el-form-item label="图片链接" prop="img_url">
            <el-input v-model="ruleForm2.img_url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirmFixedForm">确定修改</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-col>
    <!--<my-page></my-page>-->
    <!--<el-button @click.native="startHacking">Let's do it</el-button>-->
  </el-row>
  <div style="width: 95%;position: fixed;left: 150px;top: 150px;">
    <el-table
      :data="tableData4"
      border
      style="width: 95%;"
    >
      <!--style="width: 95%;border-top: 5px solid #bbbbbb;border-left:#bbb solid 5px;position: fixed;left: 150px;top: 150px;"-->
      <el-table-column
        prop="id"
        label="ID"
        fixed="left"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="240"
      >
      </el-table-column>
      <el-table-column
        prop="type_id"
        label="类型"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="views"
        label="浏览次数"
        width="120"
      >
      </el-table-column>
      <el-table-column prop="img_url" label="图片" width="180">
        <template scope="scope">
          <img :src="scope.row.img_url" width="100" max-height="100"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updated_at"
        label="更新时间">
      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
        fixed="right"
      >
        <template scope="scope">
          <el-button
            size="small"
            type="text"
            @click="update(scope.$index, tableData4)">
            修改
          </el-button>
          <el-button
            @click="deleteRow(scope.$index, tableData4)"
            type="text"
            size="small">
            移除
          </el-button>
          <!--click.native.prevent-->
        </template>
      </el-table-column>
    </el-table>
    <my-page style="float: right;margin-right: 150px;margin-top: 45px"></my-page>
  </div>




</div>

</template>

<script>
  import Vue from 'vue'
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  import myPage from "../components/page.vue"
  import axios from "axios"
  import Qs from 'qs'

  export default {

    components: {
      ElRow,
      ElCol,
    myPage},
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        tableData4: [],
        dialogFormVisible: false,
        dialogFormVisible2: false,
        item:[],
        ruleForm: {
          title: '',
          content:'',
          type_id:'',
          img_url:''

//                    region: '',
//                    date1: '',
//                    date2: '',
//                    delivery: false,
//                    type: [],
//                    resource: '',
//                    desc: ''
        },
        ruleForm2: {
          title: '',
          content:'',
          type_id:'',
          img_url:''

//                    region: '',
//                    date1: '',
//                    date2: '',
//                    delivery: false,
//                    type: [],
//                    resource: '',
//                    desc: ''
        },

        rules: {
          title: [
            { required: true, message: '请输入表单名称', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          content:[
            {required: true, message: '请输入表单内容',trigger: 'blur'},
          ],
          type_id:[
            { required: true, message: '年龄不能为空'},
            { type: 'number', message: '年龄必须为数字值'}
          ],
          img_url:[
            {required: true, message: '请输入表单图片链接',trigger: 'blur'},
          ]
//                    region: [
//                        { required: true, message: '请选择活动区域', trigger: 'change' }
//                    ],
//                    date1: [
//                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
//                    ],
//                    date2: [
//                        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
//                    ],
//                    type: [
//                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
//                    ],
//                    resource: [
//                        { required: true, message: '请选择活动资源', trigger: 'change' }
//                    ],
//                    desc: [
//                        { required: true, message: '请填写活动形式', trigger: 'blur' }
//                    ]
        },
        formLabelWidth: '120px',
        currentPage4: 4
      }
    },
    mounted() {

      axios.get("http://118.89.37.216/api/news_list/skip/1/take/10")
        .then(response => {this.tableData4 = response.data})
      console.log(this.tableData4)
    },

    methods: {
      startHacking () {
        this.$notify({
          title: 'It Works',
          message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
          duration: 3000
        })
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      deleteRow(index, rows) {

        axios.post('http://118.89.37.216/api/destroy_news ',{id : [rows[index].id]})
          .then(function (response) {
              alert(23);

//            this.$message("添加成功 boomshakalaka")
            axios.get("http://118.89.37.216/api/news_list/skip/1/take/10")
              .then(response => {vm.tableData4 = response.data})

            // console.log(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
        rows.splice(index, 1);
        this.$message('删除成功');
      },
//      submitForm(formName) {
////          console.log(this.$refs[formName]);
//        console.log(formName)
//        this.$refs[formName].validate((valid) => {
//          if (valid) {
//            alert('submit!');
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//          this.dialogFormVisible = false;
//        });
//        this.logFormVisible = false;
//      },

      update(index,rows){
          let itemId=rows[index].id;
        this.dialogFormVisible2=true;
          console.log(rows[index].title)
              this.ruleForm2.id=rows[index].id;
              this.ruleForm2.title=rows[index].title;
              this.ruleForm2.content=rows[index].content;
              this.ruleForm2.type_id=rows[index].type_id;
              this.ruleForm2.img_url=rows[index].img_url;
//          console.log(itemId);
          let nub=3;
          let item1={};
        this.dialogFormVisible = false;
        this.logFormVisible = false;
//        axios.get("http://118.89.37.216/api/news_list/skip/itemId/take/1")
//          .then(response => {
//              this.dialogFormVisible2=true;
////              this.title=this.item.title;
//
//              this.item = response.data[0];
//              this.ruleForm2.id=this.item.id;
//              this.ruleForm2.title=this.item.title;
//              this.ruleForm2.content=this.item.content;
//              this.ruleForm2.type_id=this.item.type_id;
//              this.ruleForm2.img_url=this.item.img_url;
//              console.log(this.item.title)
//            }
//          )
        this.dialogFormVisible = false;
        this.logFormVisible = false;
//        console.log(response.data)
      },
      confirmFixedForm:function () {
        var vm = this
        let data = Qs.stringify(vm.ruleForm2)
        console.log(vm.ruleForm2)
        axios.post('http://118.89.37.216/api/update_news', data)
          .then(function (response) {
            console.log(data);
            vm.ruleForm={};
            vm.$message("修改成功 boomshakalaka")
            axios.get("http://118.89.37.216/api/news_list/skip/1/take/10")
              .then(response => {vm.tableData4 = response.data})
          })
          .catch(function (error) {
            vm.$message({
              showClose: true,
              message: '未成功修改，请正确输入',
              type: 'error'
            });
            console.log(error)
          })
        this.dialogFormVisible2 = false;
        this.logFormVisible = false;
//        vm.$http.post('http://118.89.37.216/api/update_news', vm.ruleForm)
//          .then((response) => {
//            vm.$set('ruleForm', {})
//          })
//        this.show = false
      },
//      let data = Qs.stringify({'msg': '123'})
//      alert(data)

      submitForm:function () {
        var vm = this
        let data = Qs.stringify(vm.ruleForm)
        console.log(vm.ruleForm)
        axios.post('http://118.89.37.216/api/update_news', data)
          .then(function (response) {
            console.log(data);
//            vm.$notify.success({
//              title: '成功',
//              message: '这是一条成功的提示消息',
//              offset: 100
//            });
            vm.ruleForm={};
            vm.$message("添加成功 boomshakalaka")
            axios.get("http://118.89.37.216/api/news_list/skip/1/take/10")
              .then(response => {vm.tableData4 = response.data})

            // console.log(response.data)
          })
          .catch(function (error) {
              vm.$message({
                showClose:true,
                message:'添加未成功，请正确输入',
                type:'error'
              })
            vm.ruleForm={};
            console.log(error)
          })
        this.dialogFormVisible = false;
        this.logFormVisible = false;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm={};
        this.ruleForm2={id:this.ruleForm2.id};
        this.dialogFormVisible = false;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },

  }
</script>

<style>
  .max-height:{font-size: 50px}
</style>
