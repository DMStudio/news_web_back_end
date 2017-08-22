<template>
  <el-dialog title="填写新表单" :visible.sync="dialogFormVisible">
    <div slot="footer" class="dialog-footer" style="text-align: left">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="表单标题" prop="title">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="表单内容" prop="content">
          <!--<el-input type="textarea" min-rows="2" max-rows="4" v-model="ruleForm.content"></el-input>-->
          <!--<div id="summernot" v-model="ruleForm.content"></div>-->
          <div id="summernot" v-model="content"></div>
        </el-form-item>
        <el-form-item label="表单类型" prop="type_id">
          <el-input v-model.number="type_id">
          </el-input>
        </el-form-item>
        <el-form-item label="图片链接" prop="img_url">
          <el-input v-model="img_url"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm($event)">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </el-dialog>
</template>
