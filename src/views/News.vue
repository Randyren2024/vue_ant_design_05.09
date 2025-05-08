<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { List, Card, Tag, Input, Divider, Space, Typography } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();
const searchValue = ref('');

// 新闻数据
const newsData = [
  {
    id: 'news-001',
    title: '公司成功研发新型氢燃料电池系统，续航提升50%',
    summary: '近日，协氢科技成功研发出新一代氢燃料电池系统，能量密度提高30%，续航时间提升50%，标志着国内氢能技术迈入新阶段。',
    date: '2024-03-15',
    category: '技术突破',
    tags: ['氢燃料电池', '续航提升', '技术创新'],
    image: '/images/news/news-1.jpg'
  },
  {
    id: 'news-002',
    title: '擎天H100无人机成功应用于南极科考任务',
    summary: '协氢科技的擎天H100氢能无人机近日成功应用于南极科考任务，在极寒环境下连续工作5小时，创下行业记录。',
    date: '2024-02-20',
    category: '应用案例',
    tags: ['南极科考', '极寒环境', '擎天H100'],
    image: '/images/news/news-2.jpg'
  },
  {
    id: 'news-003',
    title: '协氢科技与清华大学达成战略合作，共建氢能研究中心',
    summary: '协氢科技与清华大学签署战略合作协议，共建"氢能应用技术研究中心"，推动氢能技术产学研结合。',
    date: '2024-01-10',
    category: '合作动态',
    tags: ['产学研合作', '清华大学', '研究中心'],
    image: '/images/news/news-3.jpg'
  },
  {
    id: 'news-004',
    title: '公司荣获"国家高新技术企业"认定',
    summary: '协氢科技凭借在氢能领域的技术创新，成功获得"国家高新技术企业"认定，标志着公司研发能力获得国家认可。',
    date: '2023-12-18',
    category: '企业荣誉',
    tags: ['高新技术企业', '技术认证', '企业发展'],
    image: '/images/news/news-4.jpg'
  }
];

// 新闻分类
const categories = [
  { name: '全部', count: newsData.length },
  { name: '技术突破', count: newsData.filter(item => item.category === '技术突破').length },
  { name: '应用案例', count: newsData.filter(item => item.category === '应用案例').length },
  { name: '合作动态', count: newsData.filter(item => item.category === '合作动态').length },
  { name: '企业荣誉', count: newsData.filter(item => item.category === '企业荣誉').length }
];

// 标签聚合
const allTags = newsData.reduce((acc, curr) => {
  curr.tags.forEach(tag => {
    if (!acc.includes(tag)) acc.push(tag);
  });
  return acc;
}, [] as string[]);

// 搜索功能
const onSearch = () => {
  console.log('搜索:', searchValue.value);
  // 实际项目中这里可以实现搜索逻辑
};

// 点击新闻
const goToNewsDetail = (id: string) => {
  router.push(`/news/${id}`);
};
</script>

<template>
  <div class="news">
    <div class="page-header">
      <h1>{{ t('news.title') }}</h1>
    </div>
    
    <div class="container">
      <a-row :gutter="24">
        <!-- 新闻列表 -->
        <a-col :xs="24" :md="16">
          <a-input-search
            v-model:value="searchValue"
            :placeholder="t('news.search')"
            @search="onSearch"
            class="search-input"
          />
          
          <a-list
            :data-source="newsData"
            :grid="{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }"
            class="news-list"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <a-card hoverable @click="goToNewsDetail(item.id)">
                  <a-row :gutter="16">
                    <a-col :xs="24" :sm="8">
                      <img :src="item.image" :alt="item.title" class="news-image" />
                    </a-col>
                    <a-col :xs="24" :sm="16">
                      <div class="news-meta">
                        <a-tag color="blue">{{ item.category }}</a-tag>
                        <span class="news-date">{{ item.date }}</span>
                      </div>
                      <a-typography-title level="4" class="news-title">{{ item.title }}</a-typography-title>
                      <a-typography-paragraph class="news-summary">{{ item.summary }}</a-typography-paragraph>
                      <div class="news-tags">
                        <a-tag v-for="(tag, index) in item.tags" :key="index">{{ tag }}</a-tag>
                      </div>
                      <a-typography-text class="news-readmore">{{ t('news.readMore') }} →</a-typography-text>
                    </a-col>
                  </a-row>
                </a-card>
              </a-list-item>
            </template>
          </a-list>
        </a-col>
        
        <!-- 侧边栏 -->
        <a-col :xs="24" :md="8" class="sidebar">
          <!-- 分类 -->
          <div class="sidebar-section">
            <a-typography-title level="3">{{ t('news.categories') }}</a-typography-title>
            <a-divider />
            <ul class="category-list">
              <li v-for="(category, index) in categories" :key="index">
                <a href="javascript:;">{{ category.name }} <span>({{ category.count }})</span></a>
              </li>
            </ul>
          </div>
          
          <!-- 最近文章 -->
          <div class="sidebar-section">
            <a-typography-title level="3">{{ t('news.recentPosts') }}</a-typography-title>
            <a-divider />
            <ul class="recent-list">
              <li v-for="(news, index) in newsData.slice(0, 3)" :key="index" @click="goToNewsDetail(news.id)">
                <a href="javascript:;">{{ news.title }}</a>
                <span class="recent-date">{{ news.date }}</span>
              </li>
            </ul>
          </div>
          
          <!-- 标签 -->
          <div class="sidebar-section">
            <a-typography-title level="3">{{ t('news.tags') }}</a-typography-title>
            <a-divider />
            <div class="tag-cloud">
              <a-tag v-for="(tag, index) in allTags" :key="index" color="blue">{{ tag }}</a-tag>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
.news {
  width: 100%;
}

.page-header {
  background-color: #f5f5f5;
  padding: 60px 5%;
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin: 0;
}

.container {
  padding: 0 5% 60px;
}

.search-input {
  margin-bottom: 20px;
}

.news-list {
  margin-bottom: 40px;
}

.news-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 4px;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.news-date {
  color: #999;
  font-size: 14px;
}

.news-title {
  margin-bottom: 8px !important;
}

.news-summary {
  color: #666;
  margin-bottom: 8px !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-tags {
  margin-bottom: 10px;
}

.news-readmore {
  color: #1890ff;
  cursor: pointer;
}

.sidebar {
  padding-left: 24px;
}

.sidebar-section {
  margin-bottom: 40px;
}

.category-list, .recent-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li, .recent-list li {
  margin-bottom: 10px;
}

.category-list a, .recent-list a {
  color: #333;
  text-decoration: none;
  transition: all 0.3s;
}

.category-list a:hover, .recent-list a:hover {
  color: #1890ff;
}

.category-list span {
  color: #999;
}

.recent-list li {
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.recent-date {
  display: block;
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 768px) {
  .page-header {
    padding: 40px 5%;
  }
  
  .container {
    padding: 0 5% 40px;
  }
  
  .sidebar {
    padding-left: 0;
    margin-top: 40px;
  }
}
</style> 