<template>
  <cube-page type="checkbox-group-view" title="CheckboxGroup">
    <template slot="content">
      <cube-checkbox-group v-model="checkList" :options="options" />
      <p>checkList value : {{checkList}}</p>
      <br>
      <cube-checkbox-group v-model="checkList" :options="options" :horizontal="true" position="right" shape="square" :hollow-style="true" />
      <br>
      <cube-checkbox-group v-model="checkList">
        <cube-checkbox option="1"><i>Checkbox 1</i></cube-checkbox>
        <cube-checkbox option="2"><i>Checkbox 2</i></cube-checkbox>
        <cube-checkbox :option="{value: '3', disabled: true}"><i>Disabled Checkbox</i></cube-checkbox>
        <cube-checkbox :option="{value: '4', disabled: true}"><i>Disabled & Checked Checkbox</i></cube-checkbox>
      </cube-checkbox-group>
      <br>
      <cube-input placeholder="Input column number" v-model="colNum">
        <div slot="prepend" style="paddingLeft: 10px"> Column number:</div>
      </cube-input>
      <cube-checkbox-group v-model="colCheckList" :options="colOptions" :col-num="Math.floor(colNum)" />
      <br>
    </template>
  </cube-page>
</template>

<script type="text/ecmascript-6">
import CubePage from '../components/cube-page.vue'

export default {
  data () {
    return {
      checkList: ['1', '4'],
      options: [
        '1',
        '2',
        {
          label: '3',
          value: '3',
          disabled: true
        },
        {
          label: '4',
          value: '4',
          disabled: true
        }
      ],
      colOptions: ['1', '2', '3', '4', '5', '6', '7', '8'],
      colNum: 3,
      colCheckList: []
    }
  },
  components: {
    CubePage
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .checkbox-group-view
    .content
      >
        *
          margin: 10px 0
</style>
