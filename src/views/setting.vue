<template>
  <div id='setting'
    class='indexMain'>
    <div class="module">
      <div class="titleCtn">
        <div class="title">系统设置</div>
      </div>
      <div class="settingCtn">
        <div class="navFather">
          <div class="list"
            v-for="(item,key) in navList"
            :key="key"
            :class="{'active':pName === item.name}"
            @click="pName=item.name">{{item.name}}</div>
        </div>
        <div class="mainCtn">
          <!-- <template v-if="pName==='配色组'">
            <div class="ingredientCtn">
              <div class="addBtn"
                @click="showPopup=true">添加配色</div>
              <div class="tableCtnLv2 minHeight5">
                <div class="tb_header">
                  <div class="tb_row flex5">配色名称</div>
                  <div class="tb_row middle">操作</div>
                </div>
                <div class="tb_content"
                  v-for="(item,index) in colorList[colorPage - 1]"
                  :key="index">
                  <div class="tb_row flex5">{{item.name}}</div>
                  <div class="tb_row middle">
                    <span class="tb_handle_btn blue"
                      @click="updateItem(item)">更新</span>
                    <span class="tb_handle_btn red"
                      @click="deleteColor(item.id)">删除</span>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination background
                  :page-size="1"
                  layout="prev, pager, next"
                  :total="colorTotal"
                  :current-page.sync="colorPage">
                </el-pagination>
              </div>
            </div>
          </template> -->
          <!-- <template v-if="pName==='边型'">
            <div class="flowerCtn">
              <div class="addBtn"
                @click="showPopup=true">添加边型</div>
              <div class="tableCtnLv2 minHeight5">
                <div class="tb_header">
                  <div class="tb_row flex5">边型</div>
                  <div class="tb_row middle ">操作</div>
                </div>
                <div class="tb_content"
                  v-for="(item,index) in sideList[sidePage - 1]"
                  :key="index">
                  <div class="tb_row flex5">{{item.name}}</div>
                  <div class="tb_row middle">
                    <span class="tb_handle_btn blue"
                      @click="updateItem(item)">更新</span>
                    <span class="tb_handle_btn red"
                      @click="deleteSide(item.id)">删除</span>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination background
                  :page-size="1"
                  layout="prev, pager, next"
                  :total="sideTotal"
                  :current-page.sync="sidePage">
                </el-pagination>
              </div>
            </div>
          </template> -->
          <!-- <template v-if="pName==='机型'">
            <div class="flowerCtn">
              <div class="addBtn"
                @click="showPopup=true">添加机型</div>
              <div class="tableCtnLv2 minHeight5">
                <div class="tb_header">
                  <div class="tb_row flex5">机型</div>
                  <div class="tb_row middle">操作</div>
                </div>
                <div class="tb_content"
                  v-for="(item,index) in machineList[machinePage - 1]"
                  :key="index">
                  <div class="tb_row flex5">{{item.name}}</div>
                  <div class="tb_row middle">
                    <span class="tb_handle_btn blue"
                      @click="updateItem(item)">更新</span>
                    <span class="tb_handle_btn red"
                      @click="deleteMachine(item.id)">删除</span>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination background
                  :page-size="1"
                  layout="prev, pager, next"
                  :total="machineTotal"
                  :current-page.sync="machinePage">
                </el-pagination>
              </div>
            </div>
          </template> -->
          <!-- <template v-if="pName==='组织法'">
            <div class="flowerCtn">
              <div class="addBtn"
                @click="showPopup=true"
                style="width:6em">添加组织法</div>
              <div class="tableCtnLv2 minHeight5">
                <div class="tb_header">
                  <div class="tb_row flex5">组织法</div>
                  <div class="tb_row middle">操作</div>
                </div>
                <div class="tb_content"
                  v-for="(item,index) in methodsList[methodsPage - 1]"
                  :key="index">
                  <div class="tb_row flex5">{{item.name}}</div>
                  <div class="tb_row middle">
                    <span class="tb_handle_btn blue"
                      @click="updateItem(item)">更新</span>
                    <span class="tb_handle_btn red"
                      @click="deleteMethods(item.id)">删除</span>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination background
                  :page-size="1"
                  layout="prev, pager, next"
                  :total="methodsTotal"
                  :current-page.sync="methodsPage">
                </el-pagination>
              </div>
            </div>
          </template> -->
          <template v-if="pName==='纱线原料'">
            <div class="flowerCtn">
              <div class="filterCtn"
                style="justify-content: space-between;">
                <el-autocomplete v-model="filterYarnKeyword"
                  clearable
                  :trigger-on-focus="false"
                  style="width:200px;height:32px"
                  :fetch-suggestions="querySearchYarn"
                  placeholder="搜索纱线"></el-autocomplete>
                <div class="addBtn"
                  @click="addYarnsFlag = true"
                  style="width:6em">批量添加纱线</div>
              </div>
              <div class="tableCtnLv2 minHeight5"
                v-loading='loading'>
                <div class="tb_header">
                  <div class="tb_row flex5">纱线名称</div>
                  <div class="tb_row middle">操作</div>
                </div>
                <div class="tb_content"
                  v-for="(item,index) in yarnNameList"
                  :key="index">
                  <div class="tb_row flex5">{{item.name}}</div>
                  <div class="tb_row middle">
                    <span class="tb_handle_btn blue"
                      @click="updateItem(item)">更新</span>
                    <span class="tb_handle_btn red"
                      @click="deleteYarnName(item.id)">删除</span>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination background
                  :page-size="5"
                  layout="prev, pager, next"
                  :total="yarnNameTotal"
                  :current-page.sync="yarnNamePage"
                  @current-change='getYarnComList'>
                </el-pagination>
              </div>
            </div>
          </template>
          <template v-if="pName==='纱线颜色'">
            <div class="flowerCtn">
              <div class="filterCtn"
                style="justify-content: space-between;">
                <el-autocomplete v-model="filterYarnColorKeyword"
                  clearable
                  :trigger-on-focus="false"
                  style="width:200px;height:32px"
                  :fetch-suggestions="querySearchYarnColor"
                  placeholder="搜索纱线颜色"></el-autocomplete>
                <div class="addBtn"
                  @click="showPopup=true"
                  style="width:7em">添加纱线颜色</div>
              </div>
              <div class="tableCtnLv2 minHeight5"
                v-loading='loading'>
                <div class="tb_header">
                  <div class="tb_row flex3">纱线颜色</div>
                  <div class="tb_row flex2">色块</div>
                  <div class="tb_row middle">操作</div>
                </div>
                <div class="tb_content"
                  v-for="(item,index) in yarnColorList"
                  :key="index">
                  <div class="tb_row flex3">{{item.name}}</div>
                  <div class="tb_row flex2">
                    <div class="rect"
                      :style="{'background':item.color_code}"></div>
                  </div>
                  <div class="tb_row middle">
                    <span class="tb_handle_btn blue"
                      @click="updateItem(item)">更新</span>
                    <span class="tb_handle_btn red"
                      @click="deleteYarnColor(item.id)">删除</span>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination background
                  :page-size="5"
                  layout="prev, pager, next"
                  :total="yarnColorTotal"
                  :current-page.sync="yarnColorPage"
                  @current-change="getYarnColorComList">
                </el-pagination>
              </div>
            </div>
          </template>
          <!-- <template v-if="pName==='装饰辅料'">
            <div class="flowerCtn">
              <div class="addBtn"
                @click="showPopup = true"
                style="width:6em">添加辅料</div>
              <div class="tableCtnLv2 minHeight5">
                <div class="tb_header">
                  <div class="tb_row flex3">辅料名称</div>
                  <div class="tb_row flex2">计量单位</div>
                  <div class="tb_row middle">操作</div>
                </div>
                <div class="tb_content"
                  v-for="(item,index) in materialNameList[materialNamePage - 1]"
                  :key="index">
                  <div class="tb_row flex3">{{item.name}}</div>
                  <div class="tb_row flex2">{{item.unit}}</div>
                  <div class="tb_row middle">
                    <span class="tb_handle_btn blue"
                      @click="updateItem(item)">更新</span>
                    <span class="tb_handle_btn red"
                      @click="deleteMaterialName(item.id)">删除</span>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination background
                  :page-size="1"
                  layout="prev, pager, next"
                  :total="materialNameTotal"
                  :current-page.sync="materialNamePage">
                </el-pagination>
              </div>
            </div>
          </template> -->
          <!-- <template v-if="pName==='员工帐号'">
            <div class="flowerCtn">
              <div class="addBtn"
                @click="showPopup = true">添加员工</div>
              <div class="tableCtnLv2">
                <div class="tb_header">
                  <div class="tb_row">姓名</div>
                  <div class="tb_row">登录帐号</div>
                  <div class="tb_row">手机号</div>
                  <div class="tb_row">状态</div>
                  <div class="tb_row middle">操作</div>
                </div>
                <div class="tb_content"
                  v-for="item in authList"
                  :key="item.id">
                  <div class="tb_row">{{item.name}}</div>
                  <div class="tb_row">{{item.user_name}}</div>
                  <div class="tb_row">{{item.telephone}}</div>
                  <div class="tb_row"
                    :class="{'green':item.status===1,'red':item.status!==1}">{{item.status===1?'已启用':'已禁用'}}</div>
                  <div class="tb_row middle">
                    <span class="tb_handle_btn blue"
                      @click="updateItem(item)">更新</span>
                    <span class="tb_handle_btn"
                      :class="{'red':item.status===1,'blue':item.status!==1}">{{item.status===1?'禁用':'启用'}}</span>
                  </div>
                </div>
              </div>
              <div class="pageCtn">
                <el-pagination background
                  :page-size="5"
                  layout="prev, pager, next"
                  :total="authTotal"
                  :current-page.sync="authPage"
                  @current-change="getAuth">
                </el-pagination>
              </div>
            </div>
          </template> -->
        </div>
      </div>
    </div>
    <div class="popup"
      v-show="showPopup">
      <!-- <template v-if="pName==='配色组'">
        <div class="main">
          <div class="title">
            <div class="text">{{handleType?'新增配色':'更新配色'}}</div>
            <i class="el-icon-close"
              @click="closePopup"></i>
          </div>
          <div class="content">
            <div class="row">
              <div class="label">配色名称：</div>
              <div class="info">
                <el-input placeholder="请输入配色名称"
                  v-model="changeColorInfo.color"></el-input>
              </div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="closePopup">取消</div>
            <div class="btn btnBlue"
              @click="saveColor">确定</div>
          </div>
        </div>
      </template> -->
      <!-- <template v-if="pName==='边型'">
        <div class="main">
          <div class="title">
            <div class="text">{{handleType?'新增边型':'更新边型'}}</div>
            <i class="el-icon-close"
              @click="closePopup"></i>
          </div>
          <div class="content">
            <div class="row">
              <div class="label">边型名称：</div>
              <div class="info">
                <el-input placeholder="请输入边型名称"
                  v-model="changeSideInfo.side"></el-input>
              </div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="closePopup">取消</div>
            <div class="btn btnBlue"
              @click="saveSide">确定</div>
          </div>
        </div>
      </template> -->
      <!-- <template v-if="pName==='机型'">
        <div class="main">
          <div class="title">
            <div class="text">{{handleType?'新增机型':'更新机型'}}</div>
            <i class="el-icon-close"
              @click="closePopup"></i>
          </div>
          <div class="content">
            <div class="row">
              <div class="label">机型名称：</div>
              <div class="info">
                <el-input placeholder="请输入机型名称"
                  v-model="changeMacineInfo.machine"></el-input>
              </div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="closePopup">取消</div>
            <div class="btn btnBlue"
              @click="saveMachine">确定</div>
          </div>
        </div>
      </template> -->
      <!-- <template v-if="pName==='组织法'">
        <div class="main">
          <div class="title">
            <div class="text">{{handleType?'新增组织法':'更新组织法'}}</div>
            <i class="el-icon-close"
              @click="closePopup"></i>
          </div>
          <div class="content">
            <div class="row">
              <div class="label">组织法名称：</div>
              <div class="info">
                <el-input placeholder="请输入组织法名称"
                  v-model="changeMethodsInfo.methods"></el-input>
              </div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="closePopup">取消</div>
            <div class="btn btnBlue"
              @click="saveMethods">确定</div>
          </div>
        </div>
      </template> -->
      <template v-if="pName==='纱线原料'">
        <div class="main"
          style="width:800px">
          <div class="title">
            <div class="text">更新纱线信息</div>
            <i class="el-icon-close"
              @click="closePopup"></i>
          </div>
          <div class="content">
            <div class="row">
              <div class="label isMust">纱线名称：</div>
              <div class="info">
                <el-input placeholder="请输入纱线名称"
                  v-model="changeYarnInfo.yarnName"></el-input>
              </div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="closePopup">取消</div>
            <div class="btn btnBlue"
              @click="saveYarnName">确定</div>
          </div>
        </div>
      </template>
      <template v-if="pName==='纱线颜色'">
        <div class="main">
          <div class="title">
            <div class="text">{{handleType?'添加纱线颜色':'更新纱线颜色'}}</div>
            <i class="el-icon-close"
              @click="closePopup"></i>
          </div>
          <div class="content">
            <div class="row">
              <div class="label">颜色名称：</div>
              <div class="info">
                <el-input placeholder="请输入颜色名称"
                  v-model="changeYarnColorInfo.yarnColor"></el-input>
              </div>
            </div>
            <div class="row">
              <div class="label">选择色块：</div>
              <div class="info">
                <el-color-picker v-model="changeYarnColorInfo.yarnColorCode"></el-color-picker>
              </div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="closePopup">取消</div>
            <div class="btn btnBlue"
              @click="saveYarnColor">确定</div>
          </div>
        </div>
      </template>
      <!-- <template v-if="pName==='装饰辅料'">
        <div class="main">
          <div class="title">
            <div class="text">{{handleType  ? '添加辅料信息' : '更新辅料信息'}}</div>
            <i class="el-icon-close"
              @click="closePopup"></i>
          </div>
          <div class="content">
            <div class="row">
              <div class="label">辅料名称：</div>
              <div class="info">
                <zh-input placeholder="请输入装饰辅料名称"
                  v-model="changeMaterialInfo.materialName"></zh-input>
              </div>
            </div>
            <div class="row">
              <div class="label">计量单位：</div>
              <div class="info">
                <zh-input placeholder="请输入计量单位"
                  v-model="changeMaterialInfo.unit"></zh-input>
              </div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="closePopup">取消</div>
            <div class="btn btnBlue"
              @click="saveMaterial">确定</div>
          </div>
        </div>
      </template> -->
      <!-- <template v-if="pName==='员工帐号'">
        <div class="main">
          <div class="title">
            <div class="text">添加员工</div>
            <i class="el-icon-close"
              @click="closePopup"></i>
          </div>
          <div class="content">
            <div class="row">
              <div class="label">员工姓名：</div>
              <div class="info">
                <el-input placeholder="请输入员工姓名"
                  v-model="authInfo.name"></el-input>
              </div>
            </div>
            <div class="row">
              <div class="label">联系方式：</div>
              <div class="info">
                <zh-input placeholder="请输入手机号"
                  type="mobile"
                  v-model="authInfo.telephone"></zh-input>
              </div>
            </div>
            <div class="row">
              <div class="label">登录帐号：</div>
              <div class="info">
                <zh-input placeholder="请输入自定义帐号"
                  v-model="authInfo.login_account"></zh-input>
              </div>
            </div>
          </div>
          <div class="opr">
            <div class="btn btnGray"
              @click="closePopup">取消</div>
            <div class="btn btnBlue"
              @click="saveAuth">确定</div>
          </div>
        </div>
      </template> -->
    </div>
    <!-- 批量添加纱线 -->
    <div class="popup"
      v-if="addYarnsFlag">
      <div class="main"
        :style="{width:!yarnAddType ? '1100px' : '800px'}">
        <div class="title">
          <span class="text">添加纱线原料</span>
          <i class="el-icon-close"
            @click="closeBatchPopup"></i>
        </div>
        <div class="content">
          <div class="row">
            <span class="label isMust">添加方式：</span>
            <div class="info"
              style="display:flex;align-items:center">
              <el-radio-group v-model="yarnAddType">
                <el-radio :label="true">名称添加</el-radio>
                <el-radio :label="false">格式添加</el-radio>
              </el-radio-group>
            </div>
          </div>
          <template v-if="yarnAddType">
            <div class="row"
              v-for="(itemYarn,indexYarn) in editYarnInfo"
              :key="indexYarn + 'yarn'">
              <span class="label isMust">{{indexYarn === 0 ? '名称添加：' : ''}}</span>
              <div class="info">
                <el-autocomplete v-model="itemYarn.name"
                  :fetch-suggestions="querySearchYarn"
                  :trigger-on-focus="false"
                  placeholder="请输入纱线名称"
                  @select="handleSelectYarn"></el-autocomplete>
              </div>
              <div class="editBtn blue"
                v-if="indexYarn === 0"
                @click="addItem(editYarnInfo,'yarn')">添加</div>
              <div class="editBtn red"
                v-else
                @click="deleteItem(editYarnInfo,indexYarn)">删除</div>
            </div>
          </template>
          <template v-else>
            <div class="row">
              <span class="label isMust">格式添加：</span>
              <div class="info">
                <el-input placeholder="取值阈值"
                  v-model="layoutData.thresholdValues"
                  class="elInput w100 hasMarginRight"
                  @change="buildYarnList"></el-input>
                <el-input placeholder="取值"
                  v-model="layoutData.firstValue"
                  class="elInput w80"
                  @change="buildYarnList"></el-input>
                -
                <el-input placeholder="取值"
                  v-model="layoutData.lastValue"
                  class="elInput w80 hasMarginRight"
                  @change="buildYarnList"></el-input>
                <el-select v-model="layoutData.unit"
                  class="elInput w100 hasMarginRight"
                  placeholder="支/cm/S/公分"
                  @change="buildYarnList">
                  <el-option v-for="item in layoutData.unitArr"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                <el-input placeholder="纱线名称"
                  v-model="layoutData.yarnName"
                  class="elInput w150 hasMarginRight"
                  @change="buildYarnList"></el-input>
                <el-input placeholder="#"
                  v-model="layoutData.colorCodeUnit"
                  class="elInput w50 hasMarginRight"
                  @change="buildYarnList"></el-input>
                <el-input placeholder="色号"
                  v-model="layoutData.firstColorCode"
                  class="elInput w80"
                  @change="buildYarnList"></el-input>
                -
                <el-input placeholder="色号"
                  v-model="layoutData.lastColorCode"
                  class="elInput w80 hasMarginRight"
                  @change="buildYarnList"></el-input>
              </div>
            </div>
            <div class="row">
              <span class="label isMust">名称预览：</span>
              <div class="info tagCtn">
                <span class="yarnNameTag"
                  v-for="(itemYarn,indexYarn) in layoutData.yarnNameList"
                  :key="indexYarn">
                  <span class="name">{{itemYarn}}</span>
                  <span class="el-icon-close icon"
                    @click="deleteItem(layoutData.yarnNameList,indexYarn)"></span>
                </span>
              </div>
            </div>
          </template>
        </div>
        <div class="opr">
          <div class="btn btnGray"
            @click="closeBatchPopup">取消</div>
          <div class="btn btnBlue"
            @click="saveYarns">确定</div>
        </div>
      </div>
    </div>
    <div class="bottomFixBar">
      <div class="main">
        <div class="btnCtn">
          <span class="btn btnGray"
            @click="$router.go(-1)">返回</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { yarn, yarnColor } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: true,
      navList: [
        // { name: '配色组' },
        // { name: '边型' },
        // { name: '机型' },
        // { name: '组织法' },
        { name: '纱线原料' },
        { name: '纱线颜色' }
        // { name: '装饰辅料' },
        // { name: '员工帐号' }
      ],
      pName: '',
      showPopup: false,
      handleType: true, // true为新增false为修改
      // 配色组
      // colorList: [],
      // colorTotal: 1,
      // colorPage: 1,
      // filterColorKeyWord: '',
      // changeColorInfo: {
      //   id: null,
      //   color: ''
      // },
      // 边型
      // sideList: [],
      // sideTotal: 1,
      // sidePage: 1,
      // changeSideInfo: {
      //   id: null,
      //   side: ''
      // },
      // 机型
      // machineList: [],
      // machineTotal: 1,
      // machinePage: 1,
      // changeMacineInfo: {
      //   id: null,
      //   machine: ''
      // },
      // 组织法
      // methodsList: [],
      // methodsTotal: 1,
      // methodsPage: 1,
      // changeMethodsInfo: {
      //   id: null,
      //   methods: ''
      // },
      // 纱线原料
      filterYarnKeyword: '',
      yarnNameList: [],
      rawYarnNameList: [],
      yarnNameTotal: 1,
      yarnNamePage: 1,
      addYarnsFlag: false,
      changeYarnInfo: {
        id: null,
        yarnName: ''
      },
      // 纱线颜色
      filterYarnColorKeyword: '',
      yarnColorList: [],
      rawYarnColorList: [],
      yarnColorTotal: 1,
      yarnColorPage: 1,
      changeYarnColorInfo: {
        id: null,
        yarnColor: '',
        yarnColorCode: ''
      },
      // 装饰辅料
      // materialNameList: [],
      // materialNameTotal: 1,
      // materialNamePage: 1,
      // changeMaterialInfo: {
      //   id: null,
      //   materialName: '',
      //   unit: ''
      // },
      // 员工帐号
      // authList: [],
      // authTotal: 1,
      // authPage: 1,
      // authInfo: {
      //   id: null,
      //   name: '',
      //   telephone: '',
      //   login_account: ''
      // },
      // 批量添加纱线
      yarnAddType: true,
      layoutData: {
        thresholdValues: '',
        firstValue: '',
        lastValue: '',
        unit: '',
        unitArr: [{ name: '支' }, { name: 'cm' }, { name: 'S' }, { name: '公分' }],
        yarnName: '',
        colorCodeUnit: '',
        firstColorCode: '',
        lastColorCode: '',
        yarnNameList: [],
        yarnPriceArr: [
          { company: '', price: '', desc: '' }
        ]
      },
      editYarnInfo: [{ name: '' }]
    }
  },
  methods: {
    // 配色组事件
    // getColor () {
    //   colour.list().then((res) => {
    //     if (res.data.status !== false) {
    //       this.colorList = this.$newSplice(res.data.data, 5)
    //       this.colorTotal = this.colorList.length
    //     }
    //   })
    // },
    // saveColor () {
    //   if (this.color && this.color.indexOf('/') === -1) {
    //     colour.create({
    //       name: this.color,
    //       color_code: ''
    //     }).then((res) => {
    //       if (res.data.status !== false) {
    //         this.$message.success({
    //           message: '添加配色成功'
    //         })
    //         this.color = ''
    //         this.getColor()
    //       }
    //     })
    //   } else {
    //     this.$message.error('配色名称未填写或名称里包含斜杠，请重新填写')
    //   }
    // },
    // deleteColor (id) {
    //   this.$confirm('是否删除该配色组?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     colour.delete({
    //       id: id
    //     }).then((res) => {
    //       if (res.data.status !== false) {
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功!'
    //         })
    //         this.getColour()
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // 边型
    // getSide () {
    //   craftSetting.list().then(res => {
    //     if (res.data.status !== false) {
    //       this.sideList = this.$newSplice(res.data.data.side, 5)
    //       this.sideTotal = this.sideList.length
    //     }
    //   })
    // },
    // saveSide () {
    //   if (this.side) {
    //     craftSetting.createSide({
    //       name: this.side
    //     }).then((res) => {
    //       if (res.data.status !== false) {
    //         this.$message.success('添加成功')
    //         this.side = ''
    //         this.getSide()
    //       }
    //     })
    //   } else {
    //     this.$message.error('请输入边型')
    //   }
    // },
    // deleteSide (id) {
    //   this.$confirm('是否删除该边型?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     craftSetting.deleteSide({
    //       id: id
    //     }).then((res) => {
    //       if (res.data.status !== false) {
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功!'
    //         })
    //         this.getSide()
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // 机型
    // getMachine () {
    //   craftSetting.list().then(res => {
    //     if (res.data.status !== false) {
    //       this.machineList = this.$newSplice(res.data.data.type, 5)
    //       this.machineTotal = this.machineList.length
    //     }
    //   })
    // },
    // saveMachine () {
    //   if (this.machine) {
    //     craftSetting.createMachine({
    //       name: this.machine
    //     }).then((res) => {
    //       if (res.data.status !== false) {
    //         this.$message.success('添加成功')
    //         this.machine = ''
    //         this.getMachine()
    //       }
    //     })
    //   } else {
    //     this.$message.error('请输入机型')
    //   }
    // },
    // deleteMachine (id) {
    //   this.$confirm('是否删除该机型?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     craftSetting.deleteMachine({
    //       id: id
    //     }).then((res) => {
    //       if (res.data.status !== false) {
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功!'
    //         })
    //         this.getMachine()
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // 组织法
    // getMethods () {
    //   craftSetting.list().then(res => {
    //     if (res.data.status !== false) {
    //       this.methodsList = this.$newSplice(res.data.data.method, 5)
    //       this.methodsTotal = this.methodsList.length
    //     }
    //   })
    // },
    // saveMethods () {
    //   if (this.methods) {
    //     craftSetting.createMethods({
    //       name: this.methods
    //     }).then((res) => {
    //       if (res.data.status !== false) {
    //         this.$message.success('添加成功')
    //         this.methods = ''
    //         this.getMethods()
    //       }
    //     })
    //   } else {
    //     this.$message.error('请输入组织法')
    //   }
    // },
    // deleteMethods (id) {
    //   this.$confirm('是否删除该组织法?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     craftSetting.deleteMethods({
    //       id: id
    //     }).then((res) => {
    //       if (res.data.status !== false) {
    //         this.$message({
    //           type: 'success',
    //           message: '删除成功!'
    //         })
    //         this.getMethods()
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // 纱线原料
    getYarnName () {
      yarn.list().then(res => {
        if (res.data.status !== false) {
          this.rawYarnNameList = res.data.data
          this.getYarnComList(1)
        }
      })
    },
    getYarnComList (page = 1) {
      this.loading = true
      this.yarnNamePage = page
      let yarnNameList = this.filterYarnKeyword ? this.rawYarnNameList.filter(itemF => itemF.name.includes(this.filterYarnKeyword)) : this.rawYarnNameList
      this.yarnNameTotal = yarnNameList.length
      this.yarnNameList = this.$newSplice(this.$clone(yarnNameList), 5)[page - 1]
      this.loading = false
    },
    querySearchYarn (queryString, cb) {
      var restaurants = this.rawYarnNameList.map(item => {
        return { value: item.name }
      })
      var results = queryString ? restaurants.filter(item => item.value.indexOf(queryString) !== -1) : []
      cb(results)
    },
    saveYarnName () {
      if (this.changeYarnInfo.yarnName) {
        yarn.create({
          data: [
            {
              id: this.changeYarnInfo.id,
              name: this.changeYarnInfo.yarnName
            }
          ]
        }).then((res) => {
          if (res.data.status) {
            this.$message.success('添加成功')
            this.getYarnName()
            this.closePopup()
          }
        })
      } else {
        this.$message.error('请输入纱线名称')
      }
    },
    deleteYarnName (id) {
      this.$confirm('是否删除该纱线?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        yarn.delete({
          id: id
        }).then((res) => {
          if (res.data.status !== false) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getYarnName()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 批量添加时
    saveYarns () {
      let data = []
      if (this.yarnAddType) {
        this.editYarnInfo.filter(item => item.name).forEach(item => {
          data.push({
            name: item.name
          })
        })
      } else {
        this.layoutData.yarnNameList.forEach(item => {
          data.push({
            name: item
          })
        })
      }
      if (data.length !== 0) {
        yarn.create({ data: data }).then(res => {
          if (res.data.status !== false) {
            this.$message.success('添加成功')
            this.getYarnName()
            this.closeBatchPopup()
          }
        })
      } else {
        this.$message.warning('无可提交的数据')
      }
    },
    buildYarnList () {
      this.layoutData.yarnNameList = []
      let thresholdValues = Number(this.layoutData.thresholdValues)
      let fixedNum = thresholdValues.toString().split('.')[1] ? thresholdValues.toString().split('.')[1].length : 0
      let firstValue = Number(this.layoutData.firstValue)
      let lastValue = Number(this.layoutData.lastValue)
      let unit = this.layoutData.unit
      let yarnName = this.layoutData.yarnName
      let colorCodeUnit = this.layoutData.colorCodeUnit
      let firstColorCode = Number(this.layoutData.firstColorCode)
      let lastColorCode = Number(this.layoutData.lastColorCode)
      if (thresholdValues && (firstValue || firstValue === 0) && lastValue && unit && yarnName) {
        for (let i = firstValue; lastValue >= i;) {
          if (colorCodeUnit && (firstColorCode || firstColorCode === 0) && lastColorCode) {
            for (let j = firstColorCode; lastColorCode >= j; j++) {
              this.layoutData.yarnNameList.push([i.toFixed(fixedNum), unit, yarnName, colorCodeUnit, j].join(''))
            }
          } else {
            this.layoutData.yarnNameList.push([i.toFixed(fixedNum), unit, yarnName].join(''))
          }
          i += thresholdValues
        }
      }
    },
    handleSelectYarn (item) {
      this.$message.warning('物料"' + item.value + '"已存在,无需再次添加')
    },
    addItem (data, type) {
      if (type === 'yarn') {
        data.push({ name: '' })
      }
    },
    deleteItem (data, index) {
      data.splice(index, 1)
    },
    // 纱线颜色
    getYarnColor () {
      yarnColor.list().then(res => {
        if (res.data.status !== false) {
          this.rawYarnColorList = res.data.data
          this.getYarnColorComList(1)
        }
      })
    },
    getYarnColorComList (page = 1) {
      this.loading = true
      this.yarnColorPage = page
      let yarnColorList = this.filterYarnColorKeyword ? this.rawYarnColorList.filter(itemF => itemF.name.includes(this.filterYarnColorKeyword)) : this.rawYarnColorList
      this.yarnColorTotal = yarnColorList.length
      this.yarnColorList = this.$newSplice(this.$clone(yarnColorList), 5)[page - 1]
      this.loading = false
    },
    querySearchYarnColor (queryString, cb) {
      var restaurants = this.rawYarnColorList.map(item => {
        return { value: item.name }
      })
      var results = queryString ? restaurants.filter(item => item.value.indexOf(queryString) !== -1) : []
      cb(results)
    },
    saveYarnColor () {
      if (this.changeYarnColorInfo.yarnColor && this.changeYarnColorInfo.yarnColorCode) {
        yarnColor.create({
          id: this.changeYarnColorInfo.id,
          name: this.changeYarnColorInfo.yarnColor,
          color_code: this.changeYarnColorInfo.yarnColorCode
        }).then((res) => {
          if (res.data.status !== false) {
            this.$message.success('提交成功')
            this.closePopup()
            this.getYarnColor()
          }
        })
      } else {
        this.$message.error('请检查纱线颜色和色块是否填写完整')
      }
    },
    deleteYarnColor (id) {
      this.$confirm('是否删除该纱线颜色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        yarnColor.delete({
          id: id
        }).then((res) => {
          if (res.data.status !== false) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getYarnColor()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 装饰辅料
    // getMaterialName () {
    //   material.list().then(res => {
    //     if (res.data.status !== false) {
    //       this.materialNameList = this.$newSplice(res.data.data, 5)
    //       this.materialNameTotal = this.materialNameList.length
    //     }
    //   })
    // },
    // saveMaterial () {
    //   if (this.changeMaterialInfo.materialName && this.changeMaterialInfo.unit) {
    //     material.create({
    //       id: this.changeMaterialInfo.id,
    //       unit: this.changeMaterialInfo.unit,
    //       name: this.changeMaterialInfo.materialName
    //     }).then(res => {
    //       if (res.data.status !== false) {
    //         this.$message.success('添加成功')
    //         this.closeAndResetInfo('material')
    //         this.getMaterialName()
    //       }
    //     })
    //   } else {
    //     this.$message.error('检测到辅料名称或计量单位未填写，请填写')
    //   }
    // },
    // deleteMaterialName (id) {
    //   this.$confirm('此操作将永久删除该包装辅料, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     material.delete({
    //       id: id
    //     }).then(res => {
    //       if (res.data.status !== false) {
    //         this.$message.success('删除成功')
    //         this.getMaterialName()
    //       }
    //     })
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    // 员工帐号
    // getAuth (isFirstPage) {
    //   if (isFirstPage === true) {
    //     this.authPage = 1
    //   }
    //   auth.list({
    //     page: this.authPage,
    //     limit: 5
    //   }).then((res) => {
    //     this.authList = res.data.data
    //     this.authTotal = res.data.meta.total
    //   })
    // },
    // saveAuth () {
    //   if (this.authInfo.telephone === '') {
    //     this.$message({
    //       type: 'error',
    //       message: '手机号码不能为空'
    //     })
    //   } else if (this.authInfo.user_name === '') {
    //     this.$message({
    //       type: 'error',
    //       message: '登录帐号不能为空'
    //     })
    //   } else if (this.authInfo.name === '') {
    //     this.$message({
    //       type: 'error',
    //       message: '姓名不能为空'
    //     })
    //   } else {
    //     auth.create(this.authInfo).then((res) => {
    //       if (res.data.status) {
    //         this.$message.success('添加成功')
    //         this.authInfo = {
    //           id: null,
    //           user_name: '',
    //           status: 1,
    //           telephone: '',
    //           group_id: '',
    //           station_name: '',
    //           name: '',
    //           mobile: '',
    //           has_check: 0,
    //           module_id: []
    //         }
    //       }
    //     })
    //   }
    // },
    closePopup () {
      if (this.pName === '配色组') {
        this.changeColorInfo = {
          id: null,
          color: ''
        }
      } else if (this.pName === '边型') {
        this.changeSideInfo = {
          id: null,
          side: ''
        }
      } else if (this.pName === '机型') {
        this.changeMacineInfo = {
          id: null,
          machine: ''
        }
      } else if (this.pName === '组织法') {
        this.changeMethodsInfo = {
          id: null,
          methods: ''
        }
      } else if (this.pName === '纱线原料') {
        this.changeYarnInfo = {
          id: null,
          yarnName: ''
        }
      } else if (this.pName === '纱线颜色') {
        this.changeYarnColorInfo = {
          id: null,
          yarnColor: '',
          yarnColorCode: ''
        }
      } else if (this.pName === '装饰辅料') {
        this.changeMaterialInfo = {
          id: null,
          materialName: '',
          unit: ''
        }
      } else if (this.pName === '员工帐号') {
        this.authInfo = {
          id: null,
          name: '',
          telephone: '',
          login_account: ''
        }
      }
      this.handleType = true
      this.showPopup = false
    },
    closeBatchPopup () {
      this.editYarnInfo = [{ name: '' }]
      this.layoutData = {
        thresholdValues: '',
        firstValue: '',
        lastValue: '',
        unit: '',
        unitArr: [{ name: '支' }, { name: 'cm' }, { name: 'S' }, { name: '公分' }],
        yarnName: '',
        colorCodeUnit: '',
        firstColorCode: '',
        lastColorCode: '',
        yarnNameList: []
      }
      this.addYarnsFlag = false
    },
    updateItem (item) {
      if (this.pName === '配色组') {
        this.changeColorInfo = {
          id: item.id,
          color: item.name
        }
      } else if (this.pName === '边型') {
        this.changeSideInfo = {
          id: item.id,
          side: item.name
        }
      } else if (this.pName === '机型') {
        this.changeMacineInfo = {
          id: item.id,
          machine: item.name
        }
      } else if (this.pName === '组织法') {
        this.changeMethodsInfo = {
          id: item.id,
          methods: item.name
        }
      } else if (this.pName === '纱线原料') {
        this.changeYarnInfo = {
          id: item.id,
          yarnName: item.name
        }
      } else if (this.pName === '纱线颜色') {
        this.changeYarnColorInfo = {
          id: item.id,
          yarnColor: item.name,
          yarnColorCode: item.color_code
        }
      } else if (this.pName === '装饰辅料') {
        this.changeMaterialInfo = {
          id: item.id,
          materialName: item.name,
          unit: item.unit
        }
      } else if (this.pName === '员工帐号') {
        this.authInfo = {
          id: item.id,
          name: item.name,
          telephone: item.telephone,
          login_account: item.user_name
        }
      }
      this.handleType = false
      this.showPopup = true
    }
  },
  created () {
    this.pName = '纱线原料'
  },
  watch: {
    pName (newVal) {
      switch (newVal) {
        case '配色组':
          this.getColor()
          break
        case '边型':
          this.getSide()
          break
        case '机型':
          this.getMachine()
          break
        case '组织法':
          this.getMethods()
          break
        case '纱线原料':
          this.getYarnName()
          break
        case '纱线颜色':
          this.getYarnColor()
          break
        case '装饰辅料':
          this.getMaterialName()
          break
        case '员工帐号':
          this.getAuth(true)
          break
      }
    },
    filterYarnKeyword (newVal) {
      this.getYarnComList(1)
    },
    filterYarnColorKeyword (newVal) {
      this.getYarnColorComList(1)
    }
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/less/setting.less";
</style>
