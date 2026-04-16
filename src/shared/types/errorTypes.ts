export interface ErrorType {
  readonly message: string
  readonly response: {
    readonly status?: string
    readonly data?: {
      readonly detail?: string
    }
  }
}

export interface CancelErrorType {
  readonly response: {
    readonly data?: {
      readonly result: boolean
      readonly error?: string
    }
  }
}

export interface RejectedDataType {
  readonly messageError: string
  readonly status?: string
}