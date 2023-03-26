export interface User {
  id: number,
  name: string,
  mail: string,
  password: string,
}

// export enum SignUpStatus {
//   checking,
//   approved,
//   error,
//   notTriggered
// }

export type SignStatus = "checking" | "approved" | "error" | "notTriggered"

export interface ResSignUpStatus {
  status: SignStatus
}