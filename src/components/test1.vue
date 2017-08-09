<template>
<div class="el-col el-col-21">
  <el-table
    :data="tableData4"
    border
    style="width: 100%;border-top: 5px solid #bbbbbb;border-left:#bbb solid 5px"
    max-height=100%>
    <el-table-column
      fixed
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容"
      width="300">
    </el-table-column>
    <el-table-column
      prop="picture"
      label="图片"
      width="240">
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      width="240">
    </el-table-column>
    <el-table-column
      fixed="right"
      prop="people"
      label="操作人"
      width="120">
    </el-table-column>
    <el-table-column

      label="操作"
    >
      <template scope="scope">
        <!--<el-button-->
        <!--size="small"-->
        <!--type="text"-->
        <!--@click.native.prevent="update">-->
        <!--修改-->
        <!--</el-button>-->
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData4)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row>
    <el-col :span="8">
      <el-button type="text" @click="dialogFormVisible = true" style="margin-left: 40%;margin-top: 2%;font-size: large">创建新表单</el-button>
      <el-dialog title="填写新表单" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="表单标题" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="表单内容" prop="content">
            <el-input type="textarea" min-rows="2" max-rows="4" v-model="ruleForm.content"></el-input>
          </el-form-item>
          <el-upload
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <!--action action action-->
            <el-button size="small" type="primary">点击上传照片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1Mb</div>
          </el-upload>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-col>

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
    <el-button @click.native="startHacking">Let's do it</el-button>
  </el-row>
</div>

</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import ElRow from "element-ui/packages/row/src/row";
  export default {
    components: {
      ElRow,
      ElCol},
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        tableData4: [{
          id:'1',
          title:'test1',
          content:'boomshakalak',
          picture:'src/test1',
          date: '2016-05-04',
          people: '王小虎',
        },
          {
            id:'1',
            title:'test1',
            content:'boomshakalak',
            picture:'src/test1',
            date: '2016-05-04',
            people: '王小虎',
          }, {
            id:'1',
            title:'test1',
            content:'boomshakalak',
            picture:'src/test1',
            date: '2016-05-04',
            people: '王小虎',
          }, {
            id:'1',
            title:'test1',
            content:'boomshakalak',
            picture:'src/test1',
            date: '2016-05-04',
            people: '王小虎',
          }, {
            id:'1',
            title:'test1',
            content:'boomshakalak',
            picture:'src/test1',
            date: '2016-05-04',
            people: '王小虎',
          }, {
            id:'1',
            title:'test1',
            content:'boomshakalak',
            picture:'src/test1',
            date: '2016-05-04',
            people: '王小虎',
          }, {
            id:'1',
            title:'test1',
            content:'boomshakalak',
            picture:'src/test1',
            date: '2016-05-04',
            people: '王小虎',
          },{
            id:'1',
            title:'test1',
            content:'boomshakalak',
            picture:'src/test1',
            date: '2016-05-04',
            people: '王小虎',
          },{
            id:'1',
            title:'test1',
            content:'boomshakalak',
            picture:'src/test1',
            date: '2016-05-04',
            people: '王小虎',
          },{
            id:'1',
            title:'test1',
            content:'boomshakalak',
            picture:'src/test1',
            date: '2016-05-04',
            people: '王小虎',
          }],
        dialogFormVisible: false,
        ruleForm: {
          name: '',
          content:'',

//                    region: '',
//                    date1: '',
//                    date2: '',
//                    delivery: false,
//                    type: [],
//                    resource: '',
//                    desc: ''
        },
        fileList: [{name: 'food.jpeg', url: 'http://shell.zchuhyy.cn/add1-1.png'}],
        rules: {
          name: [
            { required: true, message: '请输入表单名称', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          content:[
            {required: true, message: '请输入表单内容',trigger: 'blur'},
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
        rows.splice(index, 1);
        this.$message('删除成功');
      },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
          this.dialogFormVisible = false;
        });
        this.logFormVisible = false;
      },
      resetForm(formName) {
//                dialogFormVisible = false;
        this.$refs[formName].resetFields();
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



<!--<el-col :span="21">-->
  <!--<el-table-->
    <!--:data="tableData4"-->
    <!--border-->
    <!--style="width: 100%;border-top: 5px solid #bbbbbb;border-left:#bbb solid 5px"-->
    <!--max-height=100%>-->
    <!--<el-table-column-->
      <!--fixed-->
      <!--prop="id"-->
      <!--label="ID"-->
      <!--width="180">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="title"-->
      <!--label="标题"-->
      <!--width="180">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="content"-->
      <!--label="内容"-->
      <!--width="300">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="picture"-->
      <!--label="图片"-->
      <!--width="240">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="date"-->
      <!--label="日期"-->
      <!--width="240">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--fixed="right"-->
      <!--prop="people"-->
      <!--label="操作人"-->
      <!--width="120">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->

      <!--label="操作"-->
    <!--&gt;-->
      <!--<template scope="scope">-->
        <!--&lt;!&ndash;<el-button&ndash;&gt;-->
        <!--&lt;!&ndash;size="small"&ndash;&gt;-->
        <!--&lt;!&ndash;type="text"&ndash;&gt;-->
        <!--&lt;!&ndash;@click.native.prevent="update">&ndash;&gt;-->
        <!--&lt;!&ndash;修改&ndash;&gt;-->
        <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
        <!--<el-button-->
          <!--@click.native.prevent="deleteRow(scope.$index, tableData4)"-->
          <!--type="text"-->
          <!--size="small">-->
          <!--移除-->
        <!--</el-button>-->
      <!--</template>-->
    <!--</el-table-column>-->
  <!--</el-table>-->


  <!--<el-row>-->
    <!--<el-col :span="8">-->
      <!--<el-button type="text" @click="dialogFormVisible = true" style="margin-left: 40%;margin-top: 2%;font-size: large">创建新表单</el-button>-->
      <!--<el-dialog title="填写新表单" :visible.sync="dialogFormVisible">-->
        <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
          <!--<el-form-item label="表单标题" prop="name">-->
            <!--<el-input v-model="ruleForm.name"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="表单内容" prop="content">-->
            <!--<el-input type="textarea" min-rows="2" max-rows="4" v-model="ruleForm.content"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-upload-->
            <!--class="upload-demo"-->
            <!--action=""-->
            <!--:on-preview="handlePreview"-->
            <!--:on-remove="handleRemove"-->
            <!--:file-list="fileList">-->
            <!--&lt;!&ndash;action action action&ndash;&gt;-->
            <!--<el-button size="small" type="primary">点击上传照片</el-button>-->
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1Mb</div>-->
          <!--</el-upload>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</el-dialog>-->
    <!--</el-col>-->

    <!--<el-col :span="16">-->
      <!--<div class="block" style="margin-left: 10%;margin-top: 2%;font-size: large">-->
        <!--&lt;!&ndash;<span class="demonstration">完整功能</span>&ndash;&gt;-->
        <!--<el-pagination-->
          <!--@size-change="handleSizeChange"-->
          <!--@current-change="handleCurrentChange"-->
          <!--:current-page="currentPage4"-->
          <!--:page-sizes="[50,100, 200, 300, 400]"-->
          <!--:page-size="100"-->
          <!--layout="total, sizes, prev, pager, next, jumper"-->
          <!--:total="800">-->
        <!--</el-pagination>-->
      <!--</div>-->
    <!--</el-col>-->
    <!--<el-button @click.native="startHacking">Let's do it</el-button>-->
  <!--</el-row>-->



  <!--&lt;!&ndash;<el-form-item label="活动区域" prop="region">&ndash;&gt;-->
  <!--&lt;!&ndash;<el-select v-model="ruleForm.region" placeholder="请选择活动区域">&ndash;&gt;-->
  <!--&lt;!&ndash;<el-option label="区域一" value="shanghai"></el-option>&ndash;&gt;-->
  <!--&lt;!&ndash;<el-option label="区域二" value="beijing"></el-option>&ndash;&gt;-->
  <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
  <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
  <!--&lt;!&ndash;<el-form-item label="即时配送" prop="delivery">&ndash;&gt;-->
  <!--&lt;!&ndash;<el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>&ndash;&gt;-->
  <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
  <!--&lt;!&ndash;<el-form-item label="活动性质" prop="type">&ndash;&gt;-->
  <!--&lt;!&ndash;<el-checkbox-group v-model="ruleForm.type">&ndash;&gt;-->
  <!--&lt;!&ndash;<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>&ndash;&gt;-->
  <!--&lt;!&ndash;<el-checkbox label="地推活动" name="type"></el-checkbox>&ndash;&gt;-->
  <!--&lt;!&ndash;<el-checkbox label="线下主题活动" name="type"></el-checkbox>&ndash;&gt;-->
  <!--&lt;!&ndash;<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>&ndash;&gt;-->
  <!--&lt;!&ndash;</el-checkbox-group>&ndash;&gt;-->
  <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
  <!--&lt;!&ndash;<el-form-item label="特殊资源" prop="resource">&ndash;&gt;-->
  <!--&lt;!&ndash;<el-radio-group v-model="ruleForm.resource">&ndash;&gt;-->
  <!--&lt;!&ndash;<el-radio label="线上品牌商赞助"></el-radio>&ndash;&gt;-->
  <!--&lt;!&ndash;<el-radio label="线下场地免费"></el-radio>&ndash;&gt;-->
  <!--&lt;!&ndash;</el-radio-group>&ndash;&gt;-->
  <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
  <!--&lt;!&ndash;<el-form-item label="活动形式" prop="desc">&ndash;&gt;-->
  <!--&lt;!&ndash;<el-input type="textarea" v-model="ruleForm.desc"></el-input>&ndash;&gt;-->
  <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
  <!--&lt;!&ndash;<div slot="footer" class="dialog-footer">&ndash;&gt;-->
  <!--&lt;!&ndash;<el-button @click="resetForm('ruleForm')">重置</el-button>&ndash;&gt;-->
  <!--&lt;!&ndash;&lt;!&ndash;<el-button @click="dialogFormVisible = false">取 消</el-button>&ndash;&gt;&ndash;&gt;-->
  <!--&lt;!&ndash;<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>&ndash;&gt;-->
  <!--&lt;!&ndash;</div>&ndash;&gt;-->
<!--</el-col>-->
