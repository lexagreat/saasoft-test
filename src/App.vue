<template>
   <main>
      <div class="profiles-section">

         <div class="profiles-section__header">
            <div class="profiles-section__heading">
               <h1 class="profiles-section__title">Учетные записи</h1>
               <el-button type="primary" @click="addNew">+</el-button>
            </div>
            <div class="profiles-section__prompt">Для указания нескольких меток для одной учетной записи используйте
               разделитель ;</div>
         </div>
         <div class="profiles-section__main">
            <ul class="profiles-section__cats">
               <li>Метки</li>
               <li>Тип записи</li>
               <li>Логин</li>
               <li>Пароль</li>
            </ul>
            <ul class="profiles-section__list">
               <li v-for="(item, index) in recordsStore.records" :key="index">
                  <RecordItem :info="item" />
               </li>
            </ul>
         </div>
      </div>
   </main>
</template>
<script setup lang="ts">
import { ElButton } from 'element-plus'
import RecordItem from '@/components/RecordItem.vue'
import { useRecordsStore } from './stores/records';
import { onMounted } from 'vue';
const recordsStore = useRecordsStore()
const addNew = () => {
   if (!recordsStore.records.length) {
      recordsStore.addNew()
   }
   let isValid = true
   recordsStore.records.forEach(record => {
      if (!record.login.length || ((record.type == 'local' && !Boolean(record.password)))) {
         isValid = false
      }
   })
   if (isValid) {
      recordsStore.addNew()
   }
}
onMounted(() => {
   recordsStore.getFromLS()
})
</script>
<style scoped lang="scss">
.profiles-section {
   padding: 50px;
   display: flex;
   flex-direction: column;
   gap: 32px;
   font-family: Arial, Helvetica, sans-serif;
   // .profiles-section__header

   &__header {
      display: flex;
      flex-direction: column;
      gap: 16px;
   }

   // .profiles-section__heading

   &__heading {
      display: flex;
      align-items: center;
      gap: 24px;
   }

   // .profiles-section__title

   &__title {
      font-size: 40px;
   }

   // .profiles-section__prompt

   &__prompt {
      font-size: 16px;
   }

   // .profiles-section__main

   &__main {
      display: flex;
      flex-direction: column;
      gap: 16px;
   }

   // .profiles-section__cats

   &__cats {
      display: grid;
      grid-template-columns: repeat(4, 1fr) 50px;
      gap: 12px;
   }

   // .profiles-section__list

   &__list {
      display: flex;
      flex-direction: column;
      gap: 12px;
   }
}
</style>
