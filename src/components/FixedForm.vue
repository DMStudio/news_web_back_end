<template>
  <div>
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
  </div>
</template>
<script>
  import Vue from 'vue'
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  import axios from "axios"
  import Qs from 'qs'


  export default {

    components: {
      ElRow,
      ElCol},
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        tableData4: [],

        dialogFormVisible2: false,
        item:[],
        ruleForm: {
          title: '',
          content:'',
          type_id:'',
          img_url:''
        },
        ruleForm2: {
          title: '',
          content:'',
          type_id:'',
          img_url:''
        },

        fileList: [{name: 'food.jpeg', url: 'http://shell.zchuhyy.cn/add1-1.png'}],
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
//            axios.get("http://118.89.37.216/api/news_list/skip/1/take/10")
//              .then(response => {vm.tableData4 = response.data})

            // console.log(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
        rows.splice(index, 1);
        this.$message('删除成功');
      },
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
        this.dialogFormVisible = false;
        this.logFormVisible = false;
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
            console.log(error)
          })
        this.dialogFormVisible2 = false;
        this.logFormVisible = false;
      },
      submitForm:function () {
        var vm = this
        let data = Qs.stringify(vm.ruleForm)
        console.log(vm.ruleForm)
        axios.post('http://118.89.37.216/api/update_news', data)
          .then(function (response) {
            console.log(data);
            vm.ruleForm={};
            vm.$message("添加成功 boomshakalaka")
            axios.get("http://118.89.37.216/api/news_list/skip/1/take/10")
              .then(response => {vm.tableData4 = response.data})

            // console.log(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
        this.dialogFormVisible = false;
        this.logFormVisible = false;
      },
      resetForm(formName) {
//                dialogFormVisible = false;
        this.$refs[formName].resetFields();
        this.ruleForm={};
        this.ruleForm2={id:this.ruleForm2.id};
//        console.log(this.ruleForm2)
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
