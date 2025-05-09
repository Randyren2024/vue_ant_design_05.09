<template>
  <div class="netlify-form-container">
    <a-form layout="vertical" name="contact" netlify data-netlify="true" @finish="handleSubmit">
      <input type="hidden" name="form-name" value="contact" />
      
      <a-row :gutter="24">
        <a-col :xs="24" :md="12">
          <a-form-item name="name" :label="t('contact.name')" :rules="[{ required: true, message: '请输入姓名' }]">
            <a-input v-model:value="formData.name" name="name" />
          </a-form-item>
        </a-col>
        
        <a-col :xs="24" :md="12">
          <a-form-item name="email" :label="t('contact.email')" :rules="[{ required: true, type: 'email', message: '请输入有效的邮箱地址' }]">
            <a-input v-model:value="formData.email" name="email" />
          </a-form-item>
        </a-col>
      </a-row>
      
      <a-row :gutter="24">
        <a-col :xs="24" :md="12">
          <a-form-item name="phone" :label="t('contact.phone')" :rules="[{ required: true, message: '请输入电话' }]">
            <a-input v-model:value="formData.phone" name="phone" />
          </a-form-item>
        </a-col>
        
        <a-col :xs="24" :md="12">
          <a-form-item name="company" :label="t('contact.company')">
            <a-input v-model:value="formData.company" name="company" />
          </a-form-item>
        </a-col>
      </a-row>
      
      <a-form-item name="message" :label="t('contact.message')" :rules="[{ required: true, message: '请输入留言内容' }]">
        <a-textarea v-model:value="formData.message" :rows="4" name="message" />
      </a-form-item>
      
      <a-form-item>
        <a-button type="primary" html-type="submit" :loading="submitting" size="large">
          {{ submitting ? '提交中...' : t('contact.submit') }}
        </a-button>
      </a-form-item>
    </a-form>
    
    <a-alert
      v-if="formSuccess"
      type="success"
      :message="t('contact.successMessage') || '感谢您的留言，我们将尽快与您联系。'"
      show-icon
      banner
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { Form, Input, Button, Row, Col, Alert } from 'ant-design-vue';

const AForm = Form;
const AFormItem = Form.Item;
const AInput = Input;
const ATextarea = Input.TextArea;
const AButton = Button;
const ARow = Row;
const ACol = Col;
const AAlert = Alert;

const { t } = useI18n();
const submitting = ref(false);
const formSuccess = ref(false);

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: ''
});

const handleSubmit = async (values) => {
  submitting.value = true;
  
  try {
    // 构建表单数据
    const formBody = new FormData();
    formBody.append('form-name', 'contact');
    
    // 使用表单验证后的值
    Object.entries(values).forEach(([key, value]) => {
      formBody.append(key, value);
    });
    
    // 提交到Netlify
    const response = await fetch('/', {
      method: 'POST',
      body: formBody
    });
    
    if (response.ok) {
      // 重置表单
      Object.keys(formData).forEach(key => {
        formData[key] = '';
      });
      formSuccess.value = true;
      
      // 5秒后隐藏成功消息
      setTimeout(() => {
        formSuccess.value = false;
      }, 5000);
    } else {
      throw new Error('表单提交失败');
    }
  } catch (error) {
    console.error('表单提交出错:', error);
    alert('表单提交失败，请稍后再试');
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.netlify-form-container {
  width: 100%;
  margin-bottom: 20px;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}

:deep(.ant-alert) {
  margin-top: 20px;
}
</style> 