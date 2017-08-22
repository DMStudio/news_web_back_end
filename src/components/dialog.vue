<template>
  <div>
    <el-dialog title="填写新表单" :visible.sync="dialogFormVisible">
      <div slot="footer" class="dialog-footer" style="text-align: left">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="表单标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="表单内容" prop="content">
            <div id="summernot"></div>
          </el-form-item>
          <el-form-item label="表单类型" prop="type_id">
            <el-input v-model.number="ruleForm.type_id">
            </el-input>
          </el-form-item>
          <el-form-item label="图片链接" prop="img_url">
            <el-input v-model="ruleForm.img_url"></el-input>
          </el-form-item>
          <el-form-item label="上传文件" prop="img_url">
            <input type="file" @change="getFile($event)">
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitForm1($event)">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  import myPage from "../components/page.vue";
  import textEdit from "../components/TextEditor.vue"
  import axios from "axios"
  import Qs from 'qs'
  import $ from 'jquery'

  export default {
    name: 'myDialog',
    props: {
      visible:Boolean
  },

    components: {
      ElRow,
      ElCol,
      myPage,
      textEdit},
    data () {
      return {
        title: '',
        content:'',
        type_id:'',
        img_url:'',
        loading: true,
        activeIndex: '1',
        activeIndex2: '1',
        tableData4: [],
        dialogFormVisible: false,
        dialogFormVisible2: false,
        item:[],
        ruleForm: {


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
        },
        formLabelWidth: '120px',
        currentPage4: 4
      }
    },
    created(){




    },
    mounted() {
      $('#summernot').summernote({
        height:320,
        minHeight:320,
        htmlMode: true,
        placeholder:'请输入文章内容',
      }),
        $('#summer').summernote({
          placeholder:'请输入文章内容',

        })
      axios.get("http://118.89.37.216/api/news_list/skip/1/take/10")
        .then(response => {this.tableData4 = response.data})
      console.log(this.tableData4)
    },



    methods: {
      getFile ($event) {
        this.file = event.target.files[0]
      },
      submitForm1 ($event) {
        var vm = this
        var content=$('#summernot').summernote('code');

        console.log(235);
        let data = new FormData()
        data.append('title', this.title)
        data.append('content', this.content)
        data.append('type_id', this.type_id)
        data.append('img_url', this.img_url)
        data.append('file', this.file)


        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios .post('http://118.89.37.216/api/test', data, config)
          .then(function (response) {
            console.log(data);
//            vm.$notify.success({
//              title: '成功',
//              message: '这是一条成功的提示消息',
//              offset: 100
//            });
            data.append('title', '')
            data.append('content', '')
            data.append('type_id', '')
            data.append('img_url', '')
            data.append('file', '')
//            vm.$message("添加成功 boomshakalaka")
            vm.$alert("添加成功",{
              closeOnClickModal:true,
              closeOnPressEscape:true,
              type:'success'
            })
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
            console.log(data),
              console.log(error)
          })
        this.dialogFormVisible = false;
        this.logFormVisible = false;
      },
      startHacking () {
        this.$notify({
          title: 'It Works',
          message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
          duration: 3000
        })
      },
      handleOpen(key, keyPath) {console.log(key, keyPath);},
      handleClose(key, keyPath) {console.log(key, keyPath);},
      handleSelect(key, keyPath) {console.log(key, keyPath);},
      handleRemove(file, fileList) {console.log(file, fileList);},
      handlePreview(file) {console.log(file);},

      deleteRow(index, rows) {
        var vm = this
        console.log(vm.ruleForm)
        axios.post('http://118.89.37.216/api/destroy_news', {id : [rows[index].id]})
          .then(function (response) {
            vm.ruleForm={};
            vm.$alert("删除成功",{
              closeOnClickModal:true,
              closeOnPressEscape:true,
              type:'success'
            })
            axios.get("http://118.89.37.216/api/news_list/skip/1/take/10")
              .then(response => {vm.tableData4 = response.data})
          })
          .catch(function (error) {
            console.log(error)
          })

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
//            vm.$message("修改成功 boomshakalaka")
            setTimeout(()=>{
              vm.$alert("修改成功",{
                closeOnClickModal:true,
                closeOnPressEscape:true,
                type:'success',
              })
            },300)

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

      },


      submitForm:function () {
        var vm = this
        var content=$('#summernot').summernote('code');
        console.log(vm.ruleForm)
        vm.ruleForm.content=content
        let data = Qs.stringify(vm.ruleForm)
        console.log(vm.ruleForm)
        console.log(content);
        console.log(data);
        axios.post('http://118.89.37.216/api/update_news', data)
          .then(function (response) {
            console.log(data);
//            vm.$notify.success({
//              title: '成功',
//              message: '这是一条成功的提示消息',
//              offset: 100
//            });
            vm.ruleForm={};
//            vm.$message("添加成功 boomshakalaka")
            vm.$alert("添加成功",{
              closeOnClickModal:true,
              closeOnPressEscape:true,
              type:'success'
            })
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
            console.log(data),
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
      handleSizeChange(val) {console.log(`每页 ${val} 条`);},
      handleCurrentChange(val) {console.log(`当前页: ${val}`);},
      abcclick:function () {
//        alert(123);
        var va=$('#summer').summernote('code');
        console.log(va)
        console.log(123)
      }
    },

  }

</script>
