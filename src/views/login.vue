<template>
  <div id="login">
    <div class="leftCtn">
      <div class="title">
        织为云 <br />
        工艺单仿真系统
      </div>
      <div class="input_container account">
        <div class="icon">
          <span class="iconfont account"></span>
        </div>
        <zh-input type='number'
          class="input_item"
          v-model="telephone"
          placeholder="请输入帐号"></zh-input>
      </div>
      <div class="input_container password">
        <div class="icon">
          <span class="iconfont password"></span>
        </div>
        <zh-input type='password'
          class="input_item"
          v-model="password"
          placeholder="请输入密码"></zh-input>
      </div>
      <div class="rememberOrForgetCtn">
        <div class="remember_psd">
          <el-checkbox v-model="remPsd">记住密码</el-checkbox>
        </div>
        <div class="forget_psd">忘记密码？</div>
      </div>
      <div class="login"
        @click="goLogin">登录</div>
      <div class="buy_account">没有账号？<span class="buy_link">去购买</span></div>
      <div class="bottomInfo">
        <div class="line">©zwyknit.com版权所有 数据应用服务：浙ICP备 <a target="_blank"
            href="http://www.miit.gov.cn/">19041626号</a></div>
      </div>
    </div>
    <div class="rightCtn">
      <el-carousel style="height:100%;width:100%"
        :interval='5000'
        trigger='click'
        arrow='never'>
        <el-carousel-item v-for="(item,index) in imageArr"
          :key="index"
          style="display:flex;
                justify-content: center;
                align-items: center;">
          <img :src="item"
            style="width:511px;height:449px"
            alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { login, getAuthorization } from '@/assets/js/api.js'
export default {
  name: 'home',
  data () {
    return {
      telephone: window.localStorage.getItem('zhUsername'),
      password: window.localStorage.getItem('zhPassword'),
      remPsd: true,
      imageArr: [
        require('@/assets/image/login/image_1.png'),
        require('@/assets/image/login/image_2.png'),
        require('@/assets/image/login/image_3.png')
      ]
    }
  },
  methods: {
    noOpr () {
      this.$message.warning('暂无注册功能，请联系管理员添加账号')
    },
    // 登录
    goLogin () {
      let _this = this
      login({
        user_name: _this.telephone,
        password: _this.password
      }).then((res) => {
        if (res.data.code === 200) {
          window.sessionStorage.setItem('token', res.data.data.access_token)
          window.sessionStorage.setItem('token_type', res.data.data.token_type)
          getAuthorization.get().then((res) => {
            this.$message.success({
              message: '登录成功',
              duration: 1000
            })
            window.sessionStorage.setItem('user_name', res.data.data.user_name)
            window.sessionStorage.setItem('company_name', res.data.data.company_name)
            window.sessionStorage.setItem('logo', res.data.data.company_logo)
            window.sessionStorage.setItem('user_id', res.data.data.user_id)
            window.localStorage.setItem('zhUsername', _this.telephone)
            if (_this.remPsd) {
              window.localStorage.setItem('zhPassword', _this.password)
            } else {
              window.localStorage.setItem('zhPassword', '')
            }
            window.removeEventListener('keydown', this.keyDownEnter) // 移除keydown监听事件
            if (_this.$route.query.nextUrl) {
              _this.$router.push(_this.$route.query.nextUrl)
            } else {
              _this.$router.push('/craft/craftList')
            }
          })
        } else {
          _this.password = ''
        }
      })
    },
    // 注册
    goRegister () {
      this.$message.warning({
        message: '注册功能暂不开放'
      })
    },
    // 监听按enter键调用登录函数
    keyDownEnter (e) {
      if (e.keyCode === 13) {
        this.goLogin()
      }
    }
  },
  created () {
    window.addEventListener('keydown', this.keyDownEnter)
  }
}
</script>

<style lang="less" scoped>
@import "~@/assets/less/login.less";
</style>
<style lang="less">
#login {
  .zhInputBox {
    height: 32px !important;
  }
  .zhInput {
    padding-left: 36px;
    color: rgba(0, 0, 0, 0.65);
    background: transparent;
    border: none;
    font-size: 18px;
  }
  .zhInputPrepend {
    position: absolute;
    background: transparent;
    border: 0;
    line-height: 40px;
  }
  .el-carousel__indicator {
    &.is-active {
      .el-carousel__button {
        background: #1a95ff;
        width: 40px;
      }
    }
  }
  .el-carousel__indicators--horizontal {
    bottom: 40px;
    right: 54px;
    left: auto;
  }
}
</style>
