<template>
  <van-popup v-model:show="show" class="popup-fullscreen" position="bottom">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="handleClose"
    />

    <main class="bill-edit">
      <van-form @submit="onSubmit">
        <div class="bill-edit-details">
          <van-field name="radio" label="分类">
            <template #input>
              <van-radio-group v-model="state.type" direction="horizontal">
                <van-radio :name="1">收入</van-radio>
                <van-radio :name="2">支出</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            v-model="state.billCategoryName"
            readonly
            clickable
            label="分类类型"
            placeholder="点击选择类型"
            :rules="[{ required: true, message: '请选择分类类型' }]"
            @click="openShowPicker('category')"
          ></van-field>

          <van-field
            v-model="state.paymentSourceName"
            readonly
            clickable
            label="支付来源"
            placeholder="点击选择支付来源"
            :rules="[{ required: true, message: '请选择支付来源' }]"
            @click="openShowPicker('paymentSource')"
          />

          <van-field
            v-model="state.bookName"
            readonly
            clickable
            label="账本"
            placeholder="点击选择账本类型"
            @click="openShowPicker('book')"
          />

          <van-field
            v-model="state.recordAt"
            readonly
            clickable
            label="记录时间"
            placeholder="点击选择记录时间"
            @click="openShowPicker('recordAt')"
          />

          <van-field
            v-model="formData.money"
            type="number"
            label="金额"
            placeholder="请输入金额"
            :rules="[{ required: true, message: '请输入金额' }]"
          />

          <van-field label="图片">
            <template #input>
              <van-uploader
                v-model="state.fileList"
                multiple
                :after-read="handleAfterRead"
              />
            </template>
          </van-field>

          <van-field
            v-model="formData.remark"
            type="textarea"
            label="备注"
            placeholder="请输入备注信息"
          />
        </div>

        <div style="margin-top: 40px">
          <van-button
            block
            type="primary"
            native-type="submit"
            loading-size="40px"
            loading-text="加载中..."
            :loading="state.isSubLoading"
          >
            {{ title }}
          </van-button>
        </div>
      </van-form>
    </main>
  </van-popup>

  <van-popup v-model:show="state.showPicker" position="bottom">
    <van-picker
      v-show="state.pickerType != 'recordAt'"
      show-toolbar
      value-key="name"
      item-height="1.17333rem"
      :default-index="state.pickerDefaultIndex"
      :columns="columns"
      @confirm="onPickerConfirm"
      @cancel="state.showPicker = false"
    />
    <van-datetime-picker
      v-show="state.pickerType == 'recordAt'"
      v-model="state.currentDate"
      type="date"
      item-height="1.17333rem"
      :formatter="formatter"
      @confirm="onPickerConfirmDate"
      @cancel="state.showPicker = false"
    />
  </van-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useState } from './hooks/use-state'

export default defineComponent({
  name: 'BeEditBill',

  setup() {
    const {
      state,
      show,
      title,
      formData,
      columns,
      handleClose,
      onSubmit,
      openShowPicker,
      onPickerConfirm,
      onPickerConfirmDate,
      formatter,
      handleAfterRead,
    } = useState()

    return {
      state,
      show,
      title,
      formData,
      columns,
      handleClose,
      onSubmit,
      openShowPicker,
      onPickerConfirm,
      onPickerConfirmDate,
      formatter,
      handleAfterRead,
    }
  },
})
</script>

<style lang="scss" scoped>
$--background-color: #303030;

.bill-edit {
  padding: 10px;

  &-details {
    background: $--background-color;
    border-radius: 5px;
  }
}
</style>
