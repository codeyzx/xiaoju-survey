    <template>
      <div>
        <div class="header">
          <h3>{{ t('publish.method1') }}</h3>
          <el-button plain @click="copyCode(code, 'api')">{{ buttonLabel }}</el-button>
        </div>
        <pre><code>{{ code }}</code></pre>
        <div class="header">
          <h3>{{ t('publish.method2') }}</h3>
          <el-button plain @click="copyCode(code1, 'component')">{{ buttonLabel1 }}</el-button>
        </div>
        <pre><code>{{ code1 }}</code></pre>
      </div>
    </template>
<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import copy from 'copy-to-clipboard';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const buttonLabel = ref(t('publish.copyCode'))

const props = defineProps<{
  surveyPath: {
    type: String;
    required: false;
  };
}>();
const { surveyPath } = toRefs(props);

const code = `import { Survey } from 'xiaojusurvey-sdk-rn'
  
  // sdk initialization
  Survey.init({
    host: '', // Please fill in your domain
    port: '', // Please fill in your port
    appId: '2bAppid'
    channelId: '' // Please fill in your channel id
  });
  
  // api call method
  Survey.show({
    id: '${surveyPath.value || 'xxx'}', // survey deployment id
    type: 'card',
    onSuccess: () => {},
    onError: (error) => { console.log(error.message) }
  });
  
  Survey.close();
  `
const buttonLabel1 = ref(t('publish.copyCode'))
const code1 = `import { Survey, SurveyCard } from 'xiaojusurvey-sdk-rn'

// sdk initialization
Survey.init({
  host: '', // Please fill in your domain
  port: '', // Please fill in your port
  appId: '2bAppid'
  channelId: '' // Please fill in your channel id
});

// card component integration method
<SurveyCard
  id='${surveyPath.value || 'xxx'}' // survey deployment id
  type='card'
  onSuccess={() => {}}
  onError={(error) => { console.log(error.message) }}
/>
`
const copyCode = (content: string, type: string) => {

  const data = copy(content)

  if (data) {
    if (type === 'api') {
      buttonLabel.value = t('publish.copied')
    } else {
      buttonLabel1.value = t('publish.copied')
    }
  }
};

</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 10px 0;

}

pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}

code {
  color: #333;
}
</style>