<template>
<div class="el-col el-col-21" id="app">
  <div style="width: 95%;position: fixed;left: 250px;top: 160px;">
    <el-table :data="tableData4" border style="width: 92%;">
      <el-table-column v-for="label in tableTitle" :prop="label.key" :key="label.key" :label="label.value" :width="label.width"></el-table-column>
      <el-table-column prop="img_url" label="图片" width="180">
        <template scope="scope"><img :src="scope.row.img_url" width="100" max-height="100"/></template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间"></el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template scope="scope">
          <el-button size="small" type="text" @click="update(scope.$index, tableData4)">修改</el-button>
          <el-button @click="deleteRow(scope.$index, tableData4)" type="text" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table><!--<button @click="zhengze">1234</button>-->
<!--<分页组件 begin>-->
    <my-page style="float: right;margin-right: 240px;margin-top: 45px"></my-page>
<!--</分页组件 end>-->
  </div>
  <div style="position: absolute;font-size:2rem;top:100px;left: 270px;z-index: -1;">
    新闻版块后台管理
  </div>
  <div style="position: absolute;;top:100px;right: 60px">
      <el-row>
      <el-col>
        <el-button  type="info"  @click="createForm"  style=";font-size: large;">创建新表单</el-button>
        <el-dialog title='创建新表单' :visible.sync="dialogFormVisible">
          <div slot="footer" class="dialog-footer" style="text-align: left">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-input v-model="ruleForm.title" placeholder="请输入文章标题"></el-input>
                <div id="summernote1"></div>
                <el-select v-model="ruleForm.type_id" placeholder="请选择新闻类型">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form>
            <el-upload class="avatar-uploader" action="http://118.89.37.216/api/upload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="ruleForm.img_url" :src="ruleForm.img_url" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-button type="primary" @click="submitForm($event)">立即创建</el-button>
            <el-button  @click="resetForm1('ruleForm')">重置</el-button>
          </div>
          </el-dialog>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
  import Vue from 'vue'
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  import myPage from "../components/page.vue";
  import axios from  'axios'
  import Qs from 'qs'
  import $ from 'jquery'

  export default {
    components: {ElRow, ElCol, myPage},
    data () {
      return {
        options: [{value: '1', label: '黄金糕'}, {value: '2', label: '双皮奶'}, {value: '3', label: '蚵仔煎'}, {value: '4', label: '龙须面'}, {value: '5', label: '北京烤鸭'}],
        tableTitle:[{key:'id',value:'Id',width:'180'},
          {key:'title',value:'标题',width:'180'},
          {key:'content',value:'内容',width:'240'},
          {key:'type_id',value:'类型',width:'120'},
          {key:'views',value:'浏览次数',width:'120'},
        ],
        title:'123',
        value: '',
        item:[],
        tableData4: [],
        loading: true,
        activeIndex: '1',
        activeIndex2: '1',
        currentPage4: 4,
        formLabelWidth: '120px',
        dialogFormVisible: false,
        dialogFormVisible2: false,
        ruleForm: {title: '', content:'', type_id:'', img_url:''},
        ruleForm2: {title: '', content:'', type_id:'', img_url:''},
        rules: {
          title: [{ required: true, message: '请输入表单名称', trigger: 'blur' }, { min: 2, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }],
          content:[{required: true, message: '请输入表单内容',trigger: 'blur'},],
          type_id:[{ required: true, message: '类型不能为空'}, { type: 'number', message: '类型必须为数字值'}],
          img_url:[{required: true, message: '请输入表单图片链接',trigger: 'blur'},]
        },
      }
    },
    mounted() {
      $('#summernote1').summernote({height:320, minHeight:320, htmlMode: true, placeholder:'请输入文章内容',
        callbacks:{
          onImageUpload: function(files) {
            var formData = new FormData();
            formData.append('file',files[0]);
            axios.post('http://118.89.37.216/api/upload',formData)
              .then(function (response) {
                 $('#summernote1').summernote('insertImage', response.data.path);// console.log(response.data)
              })
          }
        }
      }),
        $('#summernote2').summernote({height:320, minHeight:320, htmlMode: true, placeholder:'请输入文章内容',}),
        axios.get("http://118.89.37.216/api/news_list?skip=1&take=10")
        .then(response => {this.tableData4 = response.data})},
    methods: {
      handleAvatarSuccess (res) {console.log(res.path);this.ruleForm.img_url = res.path;console.log(this.ruleForm.img_url)},
      handleAvatarSuccess2 (res) {console.log(res.path);this.ruleForm2.img_url = res.path},
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {this.$message.error('上传头像图片只能是 JPG 格式!');}
        if (!isLt2M) {this.$message.error('上传头像图片大小不能超过 2MB!');}
        return isJPG && isLt2M;
      },
      deleteRow(index, rows) {
        var vm = this //        console.log(vm.ruleForm)
        axios.post('http://118.89.37.216/api/destroy_news', {id : [rows[index].id]})
          .then(function (response) {
            vm.ruleForm={};
            vm.$alert("删除成功",{closeOnClickModal:true, closeOnPressEscape:true, type:'success'})
            axios.get("http://118.89.37.216/api/news_list?skip=1&take=10")
              .then(response => {vm.tableData4 = response.data})
          })
          .catch(function (error) {console.log(error)})
      },
      update(index,rows){

              this.dialogFormVisible=true;//console.log(rows[index].title)
        var title=$('.el-dialog__title')[0].innerHTML='修改文章'
        console.log(title)
              this.ruleForm.id=rows[index].id;this.ruleForm.title=rows[index].title;
              this.ruleForm.content=rows[index].content;
              this.ruleForm.type_id=rows[index].type_id;
              this.ruleForm.img_url=rows[index].img_url;
              $('#summernote1').summernote('code',rows[index].content)         //console.log(rows[index].img_url)
        this.logFormVisible = false;
      },
      createForm:function () {
        this.dialogFormVisible = true
        var title=$('.el-dialog__title')[0].innerHTML='创建新文章'
        this.ruleForm={}
        $('#summernote1').summernote('reset')
        console.log(title)
      },
      confirmFixedForm:function () {
        var vm = this
        vm.ruleForm2.content=$('#summernote2').summernote('code');
        let data = Qs.stringify(vm.ruleForm2) //console.log(vm.ruleForm2)
        axios.post('http://118.89.37.216/api/update_news', data)
          .then(function (response) {//console.log(data);
            vm.ruleForm={};
            setTimeout(()=>{
              vm.$alert("修改成功",{closeOnClickModal:true, closeOnPressEscape:true, type:'success',})
            },300)
            axios.get("http://118.89.37.216/api/news_list?skip=1&take=10")
              .then(response => {vm.tableData4 = response.data})
          })
          .catch(function (error) {
            vm.$message({showClose: true, message: '未成功修改，请正确输入', type: 'error'});
            console.log(error)
          })
        this.dialogFormVisible2 = false;
        this.logFormVisible = false;
      },
      submitForm:function () {
        var vm = this
        vm.ruleForm.content=$('#summernote1').summernote('code');
        let data = Qs.stringify(vm.ruleForm)
        console.log(vm.ruleForm)
        if ($('#summernote1').summernote('isEmpty')) {
          vm.$message({showClose:true, message:'添加未成功，请正确输入', type:'error'})
        }
        axios.post('http://118.89.37.216/api/update_news', data)
          .then(function (response) {
            $('#summernote1').summernote('reset');
            console.log(vm.ruleForm.type_id)
            vm.ruleForm={};//vm.ruleForm.img_url=null;console.log(vm.ruleForm.type_id)
            vm.$alert("添加成功",{closeOnClickModal:true, closeOnPressEscape:true, type:'success'})
            axios.get("http://118.89.37.216/api/news_list?skip=1&take=10")
              .then(response => {vm.tableData4 = response.data})})
          .catch(function (error) {
              vm.$message({showClose:true, message:'添加未成功，请正确输入', type:'error'})
              vm.ruleForm={};//console.log(data),
              console.log(error)
          })
        this.dialogFormVisible = false;
        this.logFormVisible = false;
      },
      resetForm1(formName) {
          this.ruleForm={};//var vm = this;console.log(vm.ruleForm);vm.ruleForm={};
        $('#summernote1').summernote('reset');
        this.dialogFormVisible = false;
        this.logFormVisible = false;
      },
      resetForm2(formName) {
        this.$refs[formName].resetFields();
        this.ruleForm={};
        $('#summernote2').summernote('reset')
        this.ruleForm2={id:this.ruleForm2.id};
      },
      handleSizeChange(val) {console.log(`每页 ${val} 条`);},
      handleCurrentChange(val) {console.log(`当前页: ${val}`);},
    },
  }
</script>
