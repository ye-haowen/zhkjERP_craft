<template>
  <div id="index">
    <div class="header">
      <div class="navCtn">
        <div class="leftCtn">
          <div class="companyCtn"
            @click.stop="$router.push('/craft/craftList')">
            <div class="logo">
              <img :src="logo" />
            </div>
            <div class="name">{{companyName}}</div>
          </div>
          <!-- <zh-nav :data="navCmp"></zh-nav> -->
        </div>
        <div class="rightCtn">
          <i class="el-icon-setting elIcon"
            @click="$router.push('/setting')"></i>
          <div class="headImg">{{userName.charAt(userName.length-1)}}</div>
          <div class="selectCtn">
            <el-dropdown @command="commondHandler"
              trigger="click">
              <span class="el-dropdown-link">
                个人中心<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="changePas"
                  divided>修改密码</el-dropdown-item>
                <el-dropdown-item command="logout"
                  divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="breadCtn">
      <div class="bread">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item,index) in breadUrl"
            :key="index"><span class="breadText"
              @click="goBack(index)">{{item}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="titleCtn">
      <div class="title">
        {{title}}
      </div>
    </div>
    <div class="body">
      <div class="main">
        <!-- keep-alive是Vue提供的一个抽象组件，用来对组件进行缓存  -->
        <router-view />
      </div>
    </div>
    <div class="popup"
      v-if="changePasPopupFlag">
      <div class="main">
        <div class="title">
          <span class="text">修改密码</span>
          <span class="el-icon-close"
            @click="closePopup"></span>
        </div>
        <div class="content">
          <div class="row">
            <span class="label">原密码：</span>
            <span class="info">
              <zh-input placeholder="请输入原密码"
                v-model="oldPasd" />
            </span>
          </div>
          <div class="row">
            <span class="label">新密码：</span>
            <span class="info">
              <zh-input placeholder="请输入新密码"
                v-model="firstPasd" />
            </span>
          </div>
          <div class="row">
            <span class="label">确认密码：</span>
            <span class="info">
              <zh-input placeholder="请再次输入新密码"
                v-model="lastPasd" />
            </span>
          </div>
        </div>
        <div class="opr">
          <div class="btn btnGray"
            @click="closePopup">取消</div>
          <div class="btn btnBlue"
            @click="changePasd">修改</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logout, changeUserPasd } from '@/assets/js/api.js'
export default {
  data () {
    return {
      userName: window.sessionStorage.getItem('user_name'),
      logo: window.sessionStorage.getItem('logo') || require('@/assets/image/craft/noPic.jpg'),
      companyName: window.sessionStorage.getItem('company_name') || '未登录',
      total: 0,
      changePasPopupFlag: false,
      oldPasd: '',
      firstPasd: '',
      lastPasd: '',
      newNavData: []
    }
  },
  computed: {
    title () {
      return this.$store.state.title
    },
    breadUrl () {
      return this.$store.state.breadUrl
    }
  },
  watch: {
    $route: {
      handler (val) {
        // 首次进入页面触发
        this.$nextTick(() => {
          this.$fuckSelect()
        })
        let body = document.getElementsByClassName('body')[0]
        if (body) {
          body.scrollTop = 0
        }
      },
      deep: true
    }
  },
  methods: {
    commondHandler (cmd) {
      if (cmd === 'sendMsg') {
        this.$router.push('/other/sendMsg')
      } else if (cmd === 'logout') {
        logout().then((res) => {
          if (res.data.status) {
            window.sessionStorage.setItem('token', '')
            window.sessionStorage.setItem('user_id', '')
            window.sessionStorage.setItem('company_id', '')
            window.localStorage.setItem('zhUsername', '')
            this.$message.success('已退出登录')
          } else {
            this.$message.error(res.data.message)
          }
          this.$router.push('/login')
        })
      } else if (cmd === 'sendMsg') {

      } else if (cmd === 'changePas') {
        this.changePasPopupFlag = true
      }
    },
    goBack (index) {
      if (index < (this.breadUrl.length - 1)) {
        if (index === 0) {

        } else {
          this.$router.go(index - (this.breadUrl.length - 1))
        }
      }
    },
    closePopup () {
      this.changePasPopupFlag = false
    },
    changePasd () {
      if (!this.oldPasd) {
        this.$message.error('请输入原密码')
        return
      }
      if (!this.firstPasd || !this.lastPasd) {
        this.$message.error('请输入新密码')
        return
      }
      if (this.firstPasd !== this.lastPasd) {
        this.$message.warning('请确认输入的密码一致')
      } else {
        changeUserPasd({
          old_pass: this.oldPasd,
          new_pass: this.firstPasd
        }).then(res => {
          if (res.data.status !== false) {
            this.$message.success('修改密码成功，请重新登录')
            this.$router.push('/login')
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/index.less";
</style>
