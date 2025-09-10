<template>
  <li class="profile-item">
    <div class="profile-item__input">
      <el-input
        v-model="labels"
        placeholder="Укажите метки через ;"
        :maxlength="50"
        @blur="validate"
      />
    </div>
    <div class="profile-item__select">
      <el-select v-model="recordInfo.type" placeholder="Выберите">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="profile-item__login" :class="{ gc2: recordInfo.type !== 'local' }">
      <el-input
        v-model="recordInfo.login"
        placeholder="Логин"
        @blur="validate"
        :class="{ error: errors.includes('login') }"
        :maxlength="100"
      />
    </div>
    <div class="profile-item__password" v-if="recordInfo.type == 'local'">
      <div class="password-input">
        <el-input
          show-password
          v-model="recordInfo.password"
          type="password"
          :class="{ error: errors.includes('password') }"
          @blur="validate"
          :maxlength="100"
        />
      </div>
    </div>
    <button class="profile-item__remove" @click="recordsStore.remove(recordInfo.id)">
      <Delete style="width: 1em; height: 1em; margin-right: 8px" />
    </button>
  </li>
</template>
<script setup lang="ts">
import { ref, watch, type PropType } from 'vue'
import { ElInput, ElSelect, ElOption } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { useRecordsStore } from '@/stores/records'
import type { RecordItem } from '@/types/record'
const recordsStore = useRecordsStore()
const labels = ref<string>('')
const errors = ref<string[]>([])
const options = [
  { value: 'LDAP', label: 'LDAP' },
  { value: 'local', label: 'Локальная' },
]
const props = defineProps({
  info: {
    type: Object as PropType<RecordItem>,
    required: false, // или true, если всегда должен приходить
    default: null,
  },
})
const recordInfo = ref<RecordItem>({
  id: Date.now(),
  labels: [],
  type: '',
  login: '',
  password: '',
})
const validate = () => {
  if (recordInfo.value.type == 'local' && !Boolean(recordInfo.value.password)) {
    errors.value.push('password')
  } else {
    errors.value = errors.value.filter((item) => item !== 'password')
  }
  if (!recordInfo.value.login.length) {
    errors.value.push('login')
  } else {
    errors.value = errors.value.filter((item) => item !== 'login')
  }
  if (!errors.value.length) {
    recordInfo.value.labels = labels.value.split(';').map((item) => {
      return {
        id: Date.now(),
        name: item,
      }
    })
    recordsStore.saveRecord(recordInfo.value)
  }
}
watch(
  () => recordInfo.value.type,
  () => {
    validate()
  },
)
watch(
  () => props.info,
  (newVal) => {
    if (newVal) {
      recordInfo.value = newVal
      labels.value = recordInfo.value.labels.map((item) => item.name).join(';')
    }
  },
  { immediate: true },
)
</script>

<style lang="scss">
.profile-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr) 50px;
  gap: 12px;
  // .profile-item__input

  &__input {
  }

  // .profile-item__select

  &__select {
  }

  // .profile-item__login

  &__login {
  }

  // .profile-item__password

  &__password {
  }

  // .profile-item__remove

  &__remove {
  }

  .gc2 {
    grid-column: span 2;
  }

  .error {
    .el-input__wrapper {
      box-shadow: 0 0 0 1px var(--el-color-danger) inset;
    }
  }
}
</style>
