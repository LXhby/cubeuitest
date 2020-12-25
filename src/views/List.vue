<template>
  <div class="about">
  <div class='search'>
  <cube-form :model="search" @submit="submitHandler">
  <cube-form-item class="formitem">
<cube-input v-model="search.name" placeholder="按姓名搜索" clearable >
    <span slot="append" class="iconfont icon-icon-search" @click="submitHandler"></span>
    </cube-input>
  </cube-form-item>
  </cube-form>

  </div>
    <div class="time-select">
    <cube-button @click="showDateSegmentPicker" class='btn'>选择时间</cube-button>
    <div v-if="search.startTime" class="searchtime">{{new Date(search.startTime) | formartTime('YY-MM-DD')}}~{{new Date(search.endTime)| formartTime('YY-MM-DD')}}</div>
    </div>
    <div class="scroll-list-wrap">
       <cube-scroll
            ref="scroll"
            :data="list"
            :options="options"
            @pulling-up="onPullingUp">
            <ul class="item-wrapper">
              <li v-for="item in list" class='item' :key="item.id">
                <div class="userinfo">
                  <div class="top">
                    <div class="name">{{item.name}}</div>
                    <div class="temp">{{item.temperature}}℃</div>
                  </div>
                  <div class="reason">来访事由:{{item.visitReason}}</div>
                  <div :class="[item.showdetail?'show':'schedule','reason']" v-show="item.showdetail">过去十四天行程:{{item.scheduling}}</div>
                  <div class="bottom">

                    <div class="time">{{item.visitTime}}</div>
                    <div class="detail" @click="handleDtail(item)">详情<div :class="[item.showdetail?'front':'back','iconfont','icon-xiala']"></div></div>
                  </div>
                </div>
              </li>
            </ul>
            </cube-scroll>
    </div>
  </div>
</template>
<script>
import { fetchList } from '@/api/index.js'
import Utils from '@/utils/utils'
const dateSegmentData = [
  {
    is: 'cube-date-picker',
    title: '开始时间',
    min: new Date(Utils.getDate().Y - 1, Utils.getDate().M, Utils.getDate().D),
    max: new Date()
  },
  {
    is: 'cube-date-picker',
    title: '结束时间',
    min: new Date(Utils.getDate().Y - 1, Utils.getDate().M, Utils.getDate().D),
    max: new Date()
  }
]
export default {

  data () {
    return {
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多中',
      pullUpLoadNoMoreTxt: '没有更多了',
      list: [],
      pageCount: 0,
      fields: [
        {
          type: 'input',
          modelKey: 'name'
        }
      ],
      search: {
        name: null,
        startTime: null,
        endTime: null,
        currentPage: 1,
        pageSize: 8
      },

      dateSegmentPicker: null
    }
  },
  computed: {
    options () {
      return {
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      }
    },
    pullUpLoadObj: function () {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {
          more: this.pullUpLoadMoreTxt,
          noMore: this.pullUpLoadNoMoreTxt
        }
      } : false
    }
  },
  created () {
    Utils.searchAssign(this.search)
    this.initData()
  },
  mounted () {
    this.dateSegmentPicker = this.$createSegmentPicker({
      data: dateSegmentData,
      onSelect: (selectedDates, selectedVals, selectedTexts) => {
        this.search.startTime = new Date(selectedDates[0]).getTime()
        this.search.endTime = new Date(selectedDates[1]).getTime() + 1000 * 24 * 60 * 60 - 1
        Utils.searchAssign(this.search, { currentPage: 1 })
        this.initData()
      },
      onNext: (i, selectedDate, selectedValue, selectedText) => {
        dateSegmentData[1].min = selectedDate
        if (i === 0) {
          this.dateSegmentPicker.$updateProps({
            data: dateSegmentData
          })
        }
      }
    })
  },
  methods: {
    initData () {
      fetchList(this.search).then(res => {
        var arr = res.records.map(item => {
          item.showdetail = false
          return item
        })
        if (this.search.currentPage === 1) {
          this.list = arr
        } else {
          this.list = this.list.concat(arr)
        }
        this.pageCount = res.pageCount
      })
    },
    showDateSegmentPicker () {
      this.dateSegmentPicker.show()
    },
    handleDtail (item) {
      item.showdetail = !item.showdetail
    },
    submitHandler () {
      Utils.searchAssign(this.search, { currentPage: 1, name: this.search.name })
      this.initData()
    },
    onPullingUp () {
      // 更新数据
      console.log(9999)
      if (this.pageCount > this.search.currentPage) {
        // 如果有新数据
        Utils.searchAssign(this.search, { currentPage: ++this.search.currentPage })
        this.initData()
      } else {
        // 如果没有新数据
        this.$refs.scroll.forceUpdate()
      }
    }
  }
}
</script>
<style lang='scss'>
.about{
  text-align: left;
  .search{
    padding:12px;
    // .iconfont{
    //   padding:0 12px;
    // }
    .formitem{
      border-radius:4px;
      border: 1px solid #dcdfe6;
    }
  }
  .time-select{
    @include center-flex(y);
    padding:0 12px;
    .btn{
      width:100px;
    }
    .searchtime{
      font-size: 15px;
      margin-left:8px;
    }
  }
  .item-wrapper{
    margin:12px;
  }
  .item{
    margin-top:12px;
    border: 1px solid #dcdfe6;
    border-radius:4px;
    .userinfo{
      width: 100%;
      padding:12px;

      .top,.bottom{
         @include center-flex(y);
        justify-content:space-between;
      }
      .reason{
        @include ellipse-lines(2);
         padding:4px 0;
       }
       .schedule{
        height:0;
        transition:all 2s;
       }
       .show{
         height:auto;
       }
      .bottom{
        .detail{
          @include center-flex(y);
          color:$blue;
          .iconfont{
            margin-left:4px;
            &.front{
              transform: rotateX(180deg);
            }
          }
        }
      }
    }
  }
  .scroll-list-wrap {
    height:calc(100vh - 120px);
    overflow:hidden;
  }
}
</style>
