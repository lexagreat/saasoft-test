// stores/recordsStore.ts или useRecordsStore.ts
import { defineStore } from 'pinia'
import type { RecordItem } from '@/types/record'
export const useRecordsStore = defineStore('records', {
  state: () => ({
    records: [] as RecordItem[],
  }),
  actions: {
    addNew() {
      const newRecord: RecordItem = {
        id: Date.now(),
        labels: [],
        type: '',
        login: '',
        password: '',
      }
      this.records.push(newRecord)
    },
    saveToLS() {
      localStorage.records = JSON.stringify(
        this.records.filter(
          (record) =>
            record.login.length &&
            ((record.type == 'local' && Boolean(record.password)) || record.type == 'LDAP'),
        ),
      )
      console.log('saveToLS records', localStorage.records)
    },
    getFromLS() {
      const saved = localStorage.getItem('records')
      if (saved) {
        this.records = JSON.parse(saved)
      }
    },
    saveRecord(info: RecordItem) {
      const index = this.records.findIndex((item) => item.id === info.id)
      const object = info
      if (object.type == 'LDAP') {
        object.password = null
      }
      if (index === -1) {
        this.records.push(object)
      } else {
        // Сохраняем старый id, перезаписываем всё остальное
        this.records[index] = {
          ...this.records[index], // оставляем старый id
          ...info, // перезаписываем всё, кроме id
        }
      }
      this.saveToLS()
    },
    remove(id: number) {
      this.records = this.records.filter((item) => item.id !== id)
      this.saveToLS()
    },
  },
})
