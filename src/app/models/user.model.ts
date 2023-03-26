export interface User {
  id?: number,
  name: string,
  email: string,
  password: string,
}

export type Status = "checking" | "approved" | "error" | "notTriggered"

export interface ResStatus {
  status: Status
}