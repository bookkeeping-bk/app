<template>
  <router-view />
  <be-tabbar />
  <be-edit-bill />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tabbar from '@/components/tabbar/index.vue'
import EditBill from '@/business/edit-bill/index.vue'

export default defineComponent({
  components: {
    [Tabbar.name]: Tabbar,
    [EditBill.name]: EditBill,
  },
})
</script>
