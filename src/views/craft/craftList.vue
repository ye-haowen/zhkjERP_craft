<template>
  <div id="craftList"
    class="indexMain"
    v-loading="loading">
    <div class="module"
      :class="{cardModule:!show_list_type}">
      <div class="listCtn">
        <div class="filterCtn">
          <div class="leftCtn">
            <span class="switchCtn">
              <span class="item el-icon-s-order"
                :class="{'active':show_list_type}"
                @click="show_list_type = true"></span>
              <span class="item el-icon-menu"
                :class="{'active':!show_list_type}"
                @click="show_list_type = false"></span>
            </span>
            <span class="label">筛选条件：</span>
            <div class="filter_line">
              <el-input class="filter_item"
                v-model="keyword"
                @change="changeRouter(1)"
                placeholder="输入编号按回车键查询">
              </el-input>
              <el-date-picker v-model="date"
                style="width:290px"
                class="filter_item"
                type="daterange"
                align="right"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeRouter(1)">
              </el-date-picker>
              <div class="resetBtn"
                @click="reset">重置</div>
            </div>
          </div>
          <div class="rightCtn">
            <div class="btn btnBlue"
              @click="$router.push('/craft/craftCreate')">新建工艺单</div>
          </div>
        </div>
        <div class="list"
          v-if="show_list_type">
          <div class="title">
            <div class="col flex15">
              <span class="text">编号</span>
            </div>
            <div class="col flex15">
              <span class="text">名称</span>
            </div>
            <div class="col">
              <span class="text middle">图片</span>
            </div>
            <div class="col">
              <span class="text">规格</span>
            </div>
            <div class="col right flex06">
              <span class="text">克重</span>
            </div>
            <div class="col middle">
              <span class="text">创建时间</span>
            </div>
            <div class="col middle">
              <span class="text">操作</span>
            </div>
          </div>
          <div class="row"
            v-for="(item,index) in list"
            :key="index">
            <div class="col flex15">{{item.craft_code}}</div>
            <div class="col flex15">{{item.title}}</div>
            <div class="col middle">
              <zh-img-list :list="item.image"></zh-img-list>
            </div>
            <div class="col">{{item.size ? `${item.size}cm` : '/'}}</div>
            <div class="col right flex06">{{item.weight}}g</div>
            <div class="col middle">{{$getTime(item.create_time)}}</div>
            <div class="col middle">
              <span class="opr"
                @click="$openUrl(`/craftTable/${item.id}`)">打印</span>
              <span class="opr orange"
                @click="$router.push(`/craft/craftUpdate/${item.id}`)">修改</span>
              <span class="opr"
                @click="$router.push(`/craft/craftDetail/${item.id}`)">详情</span>
              <!-- <span class="opr red">删除</span> -->
            </div>
          </div>
        </div>
        <div class="card_list"
          v-else>
          <div class="card_item"
            v-for="(item,index) in list"
            :key="index">
            <div class="infoCtn">
              <zh-img-list :list='item.image'
                style="width:100%;height:100%" />
              <div class="textCtn">
                <span class="name">{{item.title}}</span>
                <span class="text">
                  <!-- <span>{{item.craft_code}}</span> -->
                  <span>{{$getTime(item.create_time)}}</span>
                </span>
              </div>
            </div>
            <div class="oprCtn">
              <span class="opr"
                @click="$openUrl(`/craftTable/${item.id}`)">打印</span>
              <span class="opr orange"
                @click="$route.push(`/craft/craftUpdate/${item.id}`)">修改</span>
              <span class="opr"
                @click="$router.push(`/craft/craftDetail/${item.id}`)">详情</span>
            </div>
          </div>
        </div>
        <div class="pageCtn">
          <el-pagination background
            :page-size="10"
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="page">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { craft } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: false,
      show_list_type: true, // true=>列表模式false=>卡片模式
      list: [],
      keyword: '',
      date: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      total: 1,
      page: 1
    }
  },
  watch: {
    page (newVal) {
      this.changeRouter(newVal)
    },
    $route (newVal) {
      // 点击返回的时候更新下筛选条件
      this.getFilters()
      this.getList()
    },
    show_list_type (newVal) {
      // this.getList()
    }
  },
  methods: {
    getList () {
      this.loading = true
      craft.list({
        craft_code: this.keyword,
        limit: 10,
        page: this.page,
        start_time: (this.date && this.date.length > 0) ? this.date[0] : '',
        end_time: (this.date && this.date.length > 0) ? this.date[1] : ''
      }).then((res) => {
        this.list = res.data.data
        this.total = res.data.meta.total
        this.loading = false
      })
    },
    // 更新筛选条件
    getFilters () {
      let params = this.$route.query
      this.page = Number(params.page) || 1
      this.keyword = params.keyword || ''
      if (params.date && params.date !== 'null' && params.date !== '') {
        this.date = params.date.split(',')
      } else {
        this.date = ''
      }
    },
    changeRouter (page) {
      let pages = page || 1
      this.$router.push('/craft/craftList?page=' + pages + '&keyword=' + this.keyword + '&date=' + this.date)
    },
    reset () {
      this.$router.push('/craft/craftList')
    }
  },
  created () {
    this.getFilters()
    this.getList()
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/craft/craftList.less";
</style>
