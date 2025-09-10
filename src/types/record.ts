interface Label {
  id: number
  name: string
}
export interface RecordItem {
  id: number
  labels: Label[]
  type: string
  login: string
  password: string | null
}
