export interface Users {
  id: number
  name: string
  email: string
  verified_email: boolean
  doc?: string
  password: string
  cellphone?: string
  verified_cellphone: boolean
}