<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Carousel, Card, Button, Row, Col, Typography, Divider } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

// 轮播图数据
const bannerImages = [
  { 
    src: '/images/products/qingtian-h100-1.jpg', 
    title: t('home.banner.title1'), 
    subtitle: t('home.banner.subtitle1') 
  },
  { 
    src: '/images/products/qingluanH25-1.jpg', 
    title: t('home.banner.title2'), 
    subtitle: t('home.banner.subtitle2') 
  }
];

// 产品数据
const products = [
  {
    id: 'qingtian-h100',
    name: '擎天H100',
    image: '/images/products/qingtian-h100-1.jpg',
    description: '重载氢燃料电池多旋翼无人机',
  },
  {
    id: 'qingluan-h25',
    name: '青鸾H25',
    image: '/images/products/qingluanH25-1.jpg',
    description: '轻型氢燃料电池多旋翼无人机',
  },
  {
    id: 'hits-series',
    name: '麒麟HiTS系列',
    image: '/images/products/hits-series.jpg',
    description: '氢燃料电池系统',
  },
  {
    id: 'hydrogen-bike',
    name: '氢电共享两轮车',
    image: '/images/products/hydrogen-bike-1.jpg',
    description: '环保高效的城市共享交通工具',
  }
];

// 应用场景数据
const scenarios = [
  {
    id: 'inspection',
    name: '巡检应用',
    image: '/images/scenarios/inspection.jpg',
    description: '光伏板巡检、电力巡检',
  },
  {
    id: 'cleaning',
    name: '清洁服务',
    image: '/images/scenarios/cleaning.jpg',
    description: '光伏板清洗、玻璃幕墙清洗',
  },
  {
    id: 'emergency',
    name: '应急救援',
    image: '/images/scenarios/emergency.jpg',
    description: '消防、医疗救援',
  },
  {
    id: 'logistics',
    name: '物流运输',
    image: '/images/scenarios/logistics.jpg',
    description: '货物运输、应急物资投送',
  }
];
</script>

<template>
  <div class="home">
    <!-- 大图轮播 -->
    <div class="banner">
      <a-carousel autoplay>
        <div v-for="(banner, index) in bannerImages" :key="index" class="banner-slide">
          <div class="banner-content" :style="{ backgroundImage: `url(${banner.src})` }">
            <div class="banner-text">
              <h1>{{ banner.title }}</h1>
              <h3>{{ banner.subtitle }}</h3>
              <a-button type="primary" size="large" @click="router.push('/products')">
                {{ t('home.banner.learnMore') }}
              </a-button>
            </div>
          </div>
        </div>
      </a-carousel>
    </div>

    <!-- 产品展示 -->
    <div class="section">
      <a-typography-title level="2" class="section-title">
        {{ t('home.products.title') }}
      </a-typography-title>
      <a-divider></a-divider>
      
      <a-row :gutter="[24, 24]">
        <a-col :xs="24" :sm="12" :md="6" v-for="product in products" :key="product.id">
          <a-card hoverable @click="router.push(`/products/${product.id}`)">
            <template #cover>
              <img :alt="product.name" :src="product.image" />
            </template>
            <a-card-meta :title="product.name">
              <template #description>{{ product.description }}</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      
      <div class="text-center mt-4">
        <a-button type="primary" @click="router.push('/products')">
          {{ t('home.products.viewAll') }}
        </a-button>
      </div>
    </div>

    <!-- 应用场景 -->
    <div class="section">
      <a-typography-title level="2" class="section-title">
        {{ t('home.scenarios.title') }}
      </a-typography-title>
      <a-divider></a-divider>
      
      <a-row :gutter="[24, 24]">
        <a-col :xs="24" :sm="12" :md="6" v-for="scenario in scenarios" :key="scenario.id">
          <a-card hoverable @click="router.push(`/scenarios/${scenario.id}`)">
            <template #cover>
              <img :alt="scenario.name" :src="scenario.image" />
            </template>
            <a-card-meta :title="scenario.name">
              <template #description>{{ scenario.description }}</template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      
      <div class="text-center mt-4">
        <a-button type="primary" @click="router.push('/scenarios')">
          {{ t('home.scenarios.viewAll') }}
        </a-button>
      </div>
    </div>

    <!-- 下载资料 -->
    <div class="section download-section">
      <a-row type="flex" align="middle" justify="center">
        <a-col :span="16">
          <a-typography-title level="2">
            {{ t('home.download.title') }}
          </a-typography-title>
          <a-typography-paragraph>
            {{ t('home.download.description', '下载我们的产品目录，了解更多氢燃料电池无人机及配套产品信息。') }}
          </a-typography-paragraph>
          <a-button type="primary" size="large" @click="window.open('/files/HiTS Drone Series Catalog.pdf', '_blank')">
            {{ t('home.download.catalog') }}
          </a-button>
          <a-button size="large" class="ml-3" @click="router.push('/contact')">
            {{ t('home.download.contact') }}
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
}

.banner {
  width: 100%;
  margin-bottom: 40px;
}

.banner-slide {
  height: 500px;
}

.banner-content {
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
}

.banner-text {
  width: 50%;
  padding-left: 10%;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.banner-text h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: white;
}

.banner-text h3 {
  font-size: 1.25rem;
  margin-bottom: 30px;
  color: white;
}

.section {
  padding: 60px 5%;
}

.section-title {
  text-align: center;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 30px;
}

.ml-3 {
  margin-left: 15px;
}

.download-section {
  background-color: #f5f5f5;
  text-align: center;
}

@media (max-width: 768px) {
  .banner-slide {
    height: 350px;
  }
  
  .banner-text {
    width: 80%;
    padding-left: 5%;
  }
  
  .banner-text h1 {
    font-size: 1.75rem;
  }
  
  .banner-text h3 {
    font-size: 1rem;
  }
  
  .section {
    padding: 40px 5%;
  }
}
</style> 