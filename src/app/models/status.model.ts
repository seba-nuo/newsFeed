export type Status = "checking..." | "success" | "error" | "notTriggered"

export interface ResStatus {
  status: Status
}