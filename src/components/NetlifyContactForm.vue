<template>
  <div class="netlify-form-container">
    <form name="contact" method="POST" netlify data-netlify="true" @submit.prevent="handleSubmit">
      <input type="hidden" name="form-name" value="contact" />
      
      <div class="form-row">
        <div class="form-col">
          <label for="name">{{ t('contact.name') }}</label>
          <input type="text" id="name" name="name" v-model="formData.name" required />
        </div>
        
        <div class="form-col">
          <label for="email">{{ t('contact.email') }}</label>
          <input type="email" id="email" name="email" v-model="formData.email" required />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-col">
          <label for="phone">{{ t('contact.phone') }}</label>
          <input type="tel" id="phone" name="phone" v-model="formData.phone" required />
        </div>
        
        <div class="form-col">
          <label for="company">{{ t('contact.company') }}</label>
          <input type="text" id="company" name="company" v-model="formData.company" />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-col full-width">
          <label for="message">{{ t('contact.message') }}</label>
          <textarea id="message" name="message" rows="4" v-model="formData.message" required></textarea>
        </div>
      </div>
      
      <div class="form-row">
        <button type="submit" :disabled="submitting">
          {{ submitting ? '提交中...' : t('contact.submit') }}
        </button>
      </div>
    </form>
    
    <div v-if="formSuccess" class="success-message">
      <p>{{ t('contact.successMessage') || '感谢您的留言，我们将尽快与您联系。' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

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

const handleSubmit = async () => {
  submitting.value = true;
  
  try {
    // 构建表单数据
    const formBody = new FormData();
    formBody.append('form-name', 'contact');
    Object.entries(formData).forEach(([key, value]) => {
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
      
      // 3秒后隐藏成功消息
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.form-row {
  display: flex;
  gap: 20px;
  width: 100%;
}

.form-col {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.full-width {
  width: 100%;
}

label {
  margin-bottom: 5px;
  font-weight: 500;
}

input, textarea {
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

button[type="submit"] {
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: fit-content;
}

button[type="submit"]:hover:not(:disabled) {
  background-color: #40a9ff;
}

button[type="submit"]:disabled {
  background-color: #d9d9d9;
  cursor: not-allowed;
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 4px;
  color: #52c41a;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
    gap: 20px;
  }
}
</style> 