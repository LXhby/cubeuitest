<template>
  <div class="home">
    <demo-questionnaire

      :tip="tip"
      :questions="questions"
      :submit="submit"
      @submit="submitHandler"
    />
  </div>
</template>

<script>
import DemoQuestionnaire from '@/example/components/questionnaire/questionnaire.vue'
import { insert } from '@/api/index'
export default {
  name: 'Home',
  data () {
    return {
      tip: '请配合如实填写问卷，确保xxxx相关文案',
      model: {
        name: '',
        temperature: '',
        visitReason: '',
        scheduling: ''
      },
      questions: [
        {
          type: 'input',
          model: 'name',
          title: '姓名',
          options: {
            placeholder: '请输入姓名'
          },
          required: true,
          errMsg: '请输入姓名'
        },
        {
          type: 'temperature',
          model: 'temperature',
          title: '体温(℃)',
          options: {
            placeholder: '请输入体温'
          },
          required: true,
          errMsg: '请输入体温',
          pattern: /^\d+(\.\d+)?$/
        },

        {
          type: 'textarea',
          model: 'visitReason',
          title: '来访事由',
          options: {
            placeholder: '请输入来访事由',
            indicator: true,
            maxlength: 255
          },
          required: true,
          errMsg: '请输入来访事由'
        },
        {
          type: 'textarea',
          model: 'scheduling',
          title: '过去14天行程',
          options: {
            placeholder: '请输入过去14天行程',
            indicator: true,
            maxlength: 255
          },
          required: true,
          errMsg: '请输入过去14天行程'
        }
      ],
      submit: {
        text: '提交'
      }
    }
  },
  components: {
    DemoQuestionnaire
  },
  methods: {
    submitHandler (model) {
      insert(model).then(res => {

        // this.$refs.form.reset()
      })
    }
  }
}
</script>
