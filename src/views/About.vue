<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Row, Col, Typography, Divider, Card, Tabs } from 'ant-design-vue';

const { t } = useI18n();
const activeKey = ref('company');

// 发展历程数据
const historyData = [
  { year: '2018', event: '公司成立，专注氢燃料电池技术研发' },
  { year: '2019', event: '发布首款氢燃料电池系统HiTS-100' },
  { year: '2020', event: '与多家高校建立产学研合作，池州生产基地投产' },
  { year: '2021', event: '发布擎天H100无人机，填补国内氢动力重载无人机空白' },
  { year: '2022', event: '枣庄生产基地投产，产能提升300%' },
  { year: '2023', event: '青鸾H25无人机量产并出口，成为行业标杆' },
  { year: '2024', event: '麒麟HiTS系列完成全系列产品布局，覆盖200W-12000W功率段' }
];

// 工厂图片
const factoryImages = [
  { src: '/images/factory/factory-1.jpg', title: '池州生产基地' },
  { src: '/images/assembly/assembly-1.jpg', title: '无人机组装车间' }
];

// 合作伙伴
const partners = [
  { name: '中国科学院', logo: '/images/partners/cas.png' },
  { name: '清华大学', logo: '/images/partners/tsinghua.png' },
  { name: '中国石化', logo: '/images/partners/sinopec.png' },
  { name: '国家电网', logo: '/images/partners/sgcc.png' }
];
</script>

<template>
  <div class="about">
    <div class="page-header">
      <h1>{{ t('about.title') }}</h1>
    </div>
    
    <div class="container">
      <!-- 选项卡 -->
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="company" :tab="t('about.company')">
          <div class="company-profile">
            <a-row :gutter="[24, 24]">
              <a-col :xs="24" :md="12">
                <a-typography-title level="2">协氢科技</a-typography-title>
                <a-typography-paragraph>
                  协氢科技成立于2018年，是一家专注于氢燃料电池及应用系统研发、生产和销售的高新技术企业。公司拥有先进的氢燃料电池技术，产品涵盖氢燃料电池系统、无人机、电动车等多个领域。
                </a-typography-paragraph>
                <a-typography-paragraph>
                  公司总部位于北京，拥有池州和枣庄两大生产基地，年产能达到1000套燃料电池系统和500架无人机。我们的产品已广泛应用于电力巡检、应急救援、物流运输等领域，并出口至欧洲、中东等地区。
                </a-typography-paragraph>
                <a-typography-paragraph>
                  协氢科技致力于推动氢能产业发展，为绿色低碳社会贡献力量。
                </a-typography-paragraph>
              </a-col>
              <a-col :xs="24" :md="12">
                <img src="/images/factory/factory-1.jpg" alt="公司全景" class="company-image" />
              </a-col>
            </a-row>
          </div>
        </a-tab-pane>
        
        <a-tab-pane key="history" :tab="t('about.history')">
          <a-timeline>
            <a-timeline-item v-for="(item, index) in historyData" :key="index">
              <template #dot>
                <div class="timeline-year">{{ item.year }}</div>
              </template>
              <div class="timeline-content">
                <a-typography-paragraph>{{ item.event }}</a-typography-paragraph>
              </div>
            </a-timeline-item>
          </a-timeline>
        </a-tab-pane>
        
        <a-tab-pane key="factory" :tab="t('about.factory')">
          <a-row :gutter="[24, 24]">
            <a-col :xs="24" :sm="12" v-for="(image, index) in factoryImages" :key="index">
              <a-card>
                <template #cover>
                  <img :src="image.src" :alt="image.title" />
                </template>
                <a-card-meta :title="image.title" />
              </a-card>
            </a-col>
          </a-row>
        </a-tab-pane>
        
        <a-tab-pane key="partners" :tab="t('about.partners')">
          <a-typography-title level="3" class="partners-title">战略合作伙伴</a-typography-title>
          <a-row :gutter="[24, 24]" class="partners-list">
            <a-col :xs="12" :sm="6" v-for="(partner, index) in partners" :key="index">
              <div class="partner-item">
                <img :src="partner.logo" :alt="partner.name" class="partner-logo" />
                <div class="partner-name">{{ partner.name }}</div>
              </div>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<style scoped>
.about {
  width: 100%;
}

.page-header {
  background-color: #f5f5f5;
  padding: 60px 10%;
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin: 0;
}

.container {
  padding: 0 10% 60px;
}

.company-image {
  width: 100%;
  border-radius: 8px;
}

.timeline-year {
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #1890ff;
  color: white;
  font-weight: bold;
}

.timeline-content {
  padding: 10px 0;
}

.partners-title {
  margin-bottom: 30px;
  text-align: center;
}

.partners-list {
  margin-top: 20px;
}

.partner-item {
  text-align: center;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: all 0.3s;
}

.partner-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.partner-logo {
  max-width: 100%;
  height: 60px;
  margin-bottom: 10px;
}

.partner-name {
  font-size: 14px;
  color: #666;
}

@media (max-width: 768px) {
  .page-header {
    padding: 40px 5%;
  }
  
  .container {
    padding: 0 5% 40px;
  }
}
</style> 