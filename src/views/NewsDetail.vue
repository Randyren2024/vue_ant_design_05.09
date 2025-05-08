<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { Row, Col, Typography, Divider, Tag, Card } from 'ant-design-vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const newsId = ref(route.params.id as string);
const news = ref<any>(null);
const loading = ref(true);

// 新闻数据（实际项目中应该从API获取）
const newsData = {
  'news-001': {
    id: 'news-001',
    title: '公司成功研发新型氢燃料电池系统，续航提升50%',
    summary: '近日，协氢科技成功研发出新一代氢燃料电池系统，能量密度提高30%，续航时间提升50%，标志着国内氢能技术迈入新阶段。',
    content: `
      <p>近日，协氢科技宣布成功研发出新一代氢燃料电池系统。这款系统相比上一代产品，能量密度提高了30%，使搭载该系统的无人机续航时间提升了50%，标志着国内氢能技术迈入了新的阶段。</p>
      
      <p>据协氢科技研发团队负责人介绍，新系统采用了全新的膜电极结构和先进的氢气流场设计，大幅提高了能量转换效率。同时，在电池管理系统方面也进行了优化，使得整个系统在低温环境下的稳定性得到显著提升，工作温度范围扩展到了-30°C至50°C。</p>
      
      <p>"这次技术突破，将使我们的无人机在同等重量下飞行时间更长，或者在同等飞行时间下携带更多负载，显著提升工作效率。"该负责人表示，"特别是在极端天气条件下的可靠性提升，将使我们的产品在更多场景下发挥作用。"</p>
      
      <p>该系统将首先应用于公司旗舰产品擎天H100无人机上，预计将于今年第三季度量产。此外，公司还计划将这一技术扩展到其他系列产品中，进一步扩大氢能技术的应用范围。</p>
      
      <p>作为国内领先的氢能无人机制造商，协氢科技一直致力于氢燃料电池技术的研发和应用。此次技术突破再次证明了公司在该领域的创新能力和技术实力，也为氢能在航空领域的更广泛应用奠定了基础。</p>
    `,
    date: '2024-03-15',
    author: '协氢科技新闻中心',
    category: '技术突破',
    tags: ['氢燃料电池', '续航提升', '技术创新'],
    image: '/images/news/news-1.jpg',
    relatedNews: ['news-004', 'news-003']
  },
  'news-002': {
    id: 'news-002',
    title: '擎天H100无人机成功应用于南极科考任务',
    summary: '协氢科技的擎天H100氢能无人机近日成功应用于南极科考任务，在极寒环境下连续工作5小时，创下行业记录。',
    content: `
      <p>近日，中国第40次南极科考队传来好消息，由协氢科技提供的擎天H100氢能无人机成功完成了南极科考任务，在极寒环境下连续工作5小时，创下了同类产品在极地环境下的工作时间记录。</p>
      
      <p>据了解，此次科考任务主要是对南极冰盖进行测绘和监测，以评估气候变化对南极冰层的影响。科考队需要在短时间内完成大面积的冰盖测绘工作，传统的电池无人机由于续航时间短和低温环境下电池性能下降等问题，难以胜任这一任务。</p>
      
      <p>协氢科技的擎天H100氢能无人机凭借其优异的低温性能和长续航能力，成功克服了南极极寒、强风等恶劣环境的挑战。在-35°C的环境下，该无人机仍然保持了稳定的工作状态，单次飞行时间达到了5小时，大大提高了科考效率。</p>
      
      <p>"氢燃料电池在低温环境下的性能优势在此次任务中得到了充分体现。"科考队无人机操作负责人表示，"它不仅解决了我们的测绘需求，还为我们提供了高空视角的实时监测能力，对科考工作帮助很大。"</p>
      
      <p>据协氢科技技术人员介绍，为了适应南极环境，他们对擎天H100进行了特殊改装，包括加强保温措施、优化电池管理系统以及增强抗风能力等。这些改进使得无人机能够在极端条件下保持高效工作。</p>
      
      <p>此次南极科考的成功，不仅验证了氢能无人机在极地环境中的应用价值，也为未来极地科研提供了新的技术手段。协氢科技表示，将继续改进产品性能，为更多极端环境下的科研和工作任务提供解决方案。</p>
    `,
    date: '2024-02-20',
    author: '协氢科技新闻中心',
    category: '应用案例',
    tags: ['南极科考', '极寒环境', '擎天H100'],
    image: '/images/news/news-2.jpg',
    relatedNews: ['news-001']
  },
  'news-003': {
    id: 'news-003',
    title: '协氢科技与清华大学达成战略合作，共建氢能研究中心',
    summary: '协氢科技与清华大学签署战略合作协议，共建"氢能应用技术研究中心"，推动氢能技术产学研结合。',
    content: `
      <p>日前，协氢科技与清华大学能源与动力工程系签署了战略合作协议，双方将共同建设"氢能应用技术研究中心"，致力于氢燃料电池技术研发和应用创新，推动氢能产业发展。</p>
      
      <p>根据协议，双方将在氢燃料电池性能优化、氢能系统集成、特殊环境适应性研究等方面展开深入合作。清华大学将发挥其在基础研究和人才培养方面的优势，协氢科技则将提供产业化应用和市场需求导向，形成产学研紧密结合的创新体系。</p>
      
      <p>清华大学能源与动力工程系主任表示："氢能是未来清洁能源的重要组成部分，具有巨大的发展潜力。此次与协氢科技的合作，将加速基础研究成果向实际应用的转化，为我国氢能产业发展提供强有力的技术支撑。"</p>
      
      <p>协氢科技CEO在签约仪式上表示："与清华大学的合作是公司发展战略的重要一步。通过结合学术界的前沿研究和企业的实际需求，我们将能够开发出更高效、更可靠的氢能应用产品，提升公司的核心竞争力。"</p>
      
      <p>据了解，双方共建的研究中心将设立联合实验室，开展氢燃料电池寿命延长、低温启动、高功率密度等关键技术研究。同时，还将建立产学研人才培养基地，为氢能产业培养专业技术人才。</p>
      
      <p>业内专家认为，此次合作是产学研结合的典范，将有助于解决氢能产业发展中的技术瓶颈，加速氢能应用在无人机、电动车等领域的推广，对推动我国氢能产业升级具有重要意义。</p>
    `,
    date: '2024-01-10',
    author: '协氢科技新闻中心',
    category: '合作动态',
    tags: ['产学研合作', '清华大学', '研究中心'],
    image: '/images/news/news-3.jpg',
    relatedNews: ['news-001', 'news-004']
  },
  'news-004': {
    id: 'news-004',
    title: '公司荣获"国家高新技术企业"认定',
    summary: '协氢科技凭借在氢能领域的技术创新，成功获得"国家高新技术企业"认定，标志着公司研发能力获得国家认可。',
    content: `
      <p>近日，协氢科技正式获得"国家高新技术企业"认定，这标志着公司在氢能技术研发和创新方面的实力得到了国家层面的认可。</p>
      
      <p>国家高新技术企业认定是对企业自主创新能力的重要评估，需要满足研发投入比例、知识产权数量、科技成果转化能力等严格条件。协氢科技凭借在氢燃料电池系统和无人机应用领域的持续创新，顺利通过了各项评审标准。</p>
      
      <p>据公司技术负责人介绍，近年来协氢科技在氢燃料电池膜电极技术、系统集成、低温启动等关键领域取得了多项技术突破，申请了30余项专利，其中包括8项发明专利。公司还建立了完善的研发体系，研发投入占营业收入的比例持续保持在12%以上。</p>
      
      <p>"获得高新技术企业认定是对我们技术创新能力的肯定，也为公司未来发展提供了政策支持。"公司CEO表示，"我们将继续加大研发投入，推动氢能技术的进步和应用拓展，为绿色能源转型贡献力量。"</p>
      
      <p>高新技术企业认定将为协氢科技带来一系列政策优惠，包括减按15%的税率征收企业所得税、研发费用加计扣除等。这些政策红利将进一步增强公司的研发实力和市场竞争力。</p>
      
      <p>业内分析人士指出，随着国家对氢能产业的重视和支持力度不断加大，协氢科技作为行业领先企业，有望在技术创新和市场拓展方面获得更大发展空间，公司未来发展值得期待。</p>
    `,
    date: '2023-12-18',
    author: '协氢科技新闻中心',
    category: '企业荣誉',
    tags: ['高新技术企业', '技术认证', '企业发展'],
    image: '/images/news/news-4.jpg',
    relatedNews: ['news-001', 'news-003']
  }
};

// 根据ID获取新闻详情
onMounted(() => {
  if (newsId.value && newsData[newsId.value as keyof typeof newsData]) {
    news.value = newsData[newsId.value as keyof typeof newsData];
    loading.value = false;
  } else {
    // 新闻不存在，跳转到新闻列表页
    router.push('/news');
  }
});

// 获取相关新闻数据
const getRelatedNewsData = (relatedIds: string[]) => {
  return relatedIds.map(id => newsData[id as keyof typeof newsData]).filter(Boolean);
};
</script>

<template>
  <div class="news-detail">
    <div v-if="loading" class="loading">
      <a-spin size="large" />
    </div>
    
    <div v-else class="container">
      <!-- 新闻头部 -->
      <div class="news-header">
        <h1>{{ news.title }}</h1>
        <div class="news-meta">
          <a-tag color="blue">{{ news.category }}</a-tag>
          <span class="news-date">{{ news.date }}</span>
          <span class="news-author">{{ news.author }}</span>
        </div>
      </div>
      
      <!-- 新闻内容 -->
      <div class="news-content">
        <div class="featured-image">
          <img :src="news.image" :alt="news.title" />
        </div>
        
        <div class="news-text" v-html="news.content"></div>
        
        <div class="news-tags">
          <a-tag v-for="(tag, index) in news.tags" :key="index">{{ tag }}</a-tag>
        </div>
      </div>
      
      <!-- 相关新闻 -->
      <div v-if="news.relatedNews && news.relatedNews.length > 0" class="related-news">
        <a-divider />
        <a-typography-title level="3">相关新闻</a-typography-title>
        
        <a-row :gutter="[24, 24]">
          <a-col :xs="24" :sm="12" v-for="item in getRelatedNewsData(news.relatedNews)" :key="item.id">
            <a-card hoverable @click="router.push(`/news/${item.id}`)">
              <a-row :gutter="16">
                <a-col :xs="24" :sm="8">
                  <img :src="item.image" :alt="item.title" class="related-image" />
                </a-col>
                <a-col :xs="24" :sm="16">
                  <a-typography-title level="4" class="related-title">{{ item.title }}</a-typography-title>
                  <div class="related-meta">
                    <span>{{ item.date }}</span>
                  </div>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
      </div>
      
      <div class="back-button">
        <a-button @click="router.push('/news')">
          {{ t('common.back') }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-detail {
  width: 100%;
  padding: 40px 0;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.container {
  padding: 0 10%;
}

.news-header {
  margin-bottom: 30px;
}

.news-header h1 {
  font-size: 2.2rem;
  margin-bottom: 15px;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #666;
}

.news-content {
  margin-bottom: 40px;
}

.featured-image {
  margin-bottom: 30px;
}

.featured-image img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
}

.news-text {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.news-text p {
  margin-bottom: 20px;
}

.news-tags {
  margin-top: 30px;
}

.related-news {
  margin-top: 50px;
  margin-bottom: 40px;
}

.related-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.related-title {
  font-size: 16px !important;
  margin-bottom: 10px !important;
  line-height: 1.4 !important;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-meta {
  font-size: 12px;
  color: #999;
}

.back-button {
  text-align: center;
  margin-top: 30px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 5%;
  }
  
  .news-header h1 {
    font-size: 1.8rem;
  }
  
  .featured-image img {
    max-height: 300px;
  }
}
</style> 