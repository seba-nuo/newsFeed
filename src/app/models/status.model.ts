export type Status = "checking..." | "success" | "error" | "notTriggered" | "error rateLimited"

export interface ResStatus {
  status: Status
}