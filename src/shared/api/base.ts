import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {ImagesDataType} from "@shared/api/image";

export const API_URL = 'http://localhost:8085/v1'

export class ApiInstance {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: API_URL,
      timeout: 120000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async getStatus<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.get(
      endpoint,
      options
    )
    return response.data
  }

  async postImage<T>(
    endpoint: string,
    formData: FormData,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.post(
      endpoint,
      formData,
      options
    )
    return response.data
  }

  async downloadPost(
    endpoint: string,
    guids: string[],
    options: AxiosRequestConfig = {}
  ): Promise<ImagesDataType> {
    const res: AxiosResponse<Blob> = await this.axios.post(
      endpoint,
      guids,
      options
    )
    const cd = res.headers['content-disposition'] as string | undefined
    const ct = (res.headers['content-type'] as string | undefined) ?? res.data?.type ?? 'application/octet-stream'

    const filename =
      parseFilenameFromContentDisposition(cd)
      ?? (guids.length === 1
        ? `${guids[0]}.${guessExt(ct, 'png')}`
        : `images_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}${ct.includes('zip') ? '.zip' : '.bin'}`)

    return { blob: res.data as Blob, filename }
  }
}

export function parseFilenameFromContentDisposition(header?: string | null): string | undefined {
  if (!header) return
  // RFC 5987: filename*=UTF-8''<urlencoded>
  const rfc5987 = /filename\*\s*=\s*UTF-8''([^;]+)/i.exec(header)
  if (rfc5987?.[1]) {
    try { return decodeURIComponent(rfc5987[1].trim()) } catch { /* noop */ }
  }
  // filename="<...>" или filename=...
  const simple = /filename\s*=\s*"([^"]+)"|filename\s*=\s*([^;]+)/i.exec(header)
  if (simple) return (simple[1] ?? simple[2])?.trim()
  return
}


function guessExt(mime: string, fallback = 'bin') {
  if (mime.startsWith('image/')) return mime.split('/')[1]?.split('+')[0] || fallback
  if (mime.includes('zip')) return 'zip'
  return fallback
}

export const apiInstance = new ApiInstance()
