import zhInput from './zhInput/zhInput.vue'
import zhImgList from './zhImgList/zhImgList.vue'
import colorPicker from './colorPicker/colorPicker.vue'
export default {
  install: function (vue) {
    vue.component('zhInput', zhInput)
    vue.component('zhImgList', zhImgList)
    vue.component('colorPicker', colorPicker)
  }
}
