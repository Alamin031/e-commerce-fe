import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios"
import { API_CONFIG } from "./config"
import { TokenManager } from "./token-manager"
import { ApiResponse } from "./types"

let refreshTokenRequest: Promise<string> | null = null

class ApiClient {
  private client: AxiosInstance
  private isRefreshing = false

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: API_CONFIG.headers,
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = TokenManager.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean
        }

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Wait for the refresh request to complete
            if (!refreshTokenRequest) {
              refreshTokenRequest = this.performTokenRefresh()
            }
            try {
              const token = await refreshTokenRequest
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`
              }
              return this.client(originalRequest)
            } catch (err) {
              this.handleAuthError()
              return Promise.reject(err)
            }
          }

          this.isRefreshing = true
          try {
            refreshTokenRequest = this.performTokenRefresh()
            const token = await refreshTokenRequest
            refreshTokenRequest = null
            this.isRefreshing = false

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return this.client(originalRequest)
          } catch (err) {
            refreshTokenRequest = null
            this.isRefreshing = false
            this.handleAuthError()
            return Promise.reject(err)
          }
        }

        return Promise.reject(error)
      }
    )
  }

  private async performTokenRefresh(): Promise<string> {
    try {
      const refreshToken = TokenManager.getRefreshToken()
      if (!refreshToken) {
        throw new Error("No refresh token available")
      }

      const response = await this.client.post("/auth/refresh", {
        refreshToken,
      })

      const { token, refreshToken: newRefreshToken } = response.data

      TokenManager.setTokens(token, newRefreshToken || refreshToken)
      return token
    } catch (error) {
      TokenManager.clearTokens()
      throw error
    }
  }

  private handleAuthError(): void {
    // Clear tokens and redirect to login
    TokenManager.clearTokens()

    // Dispatch logout event or redirect
    if (typeof window !== "undefined") {
      // You can dispatch a custom event or use localStorage to notify other tabs
      window.dispatchEvent(
        new CustomEvent("auth-error", {
          detail: { message: "Authentication failed. Please login again." },
        })
      )
      // Optionally redirect to login
      // window.location.href = '/login'
    }
  }

  public getInstance(): AxiosInstance {
    return this.client
  }

  /**
   * GET request
   */
  public get<T = unknown>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.get<ApiResponse<T>>(url, config)
  }

  /**
   * POST request
   */
  public post<T = unknown>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.post<ApiResponse<T>>(url, data, config)
  }

  /**
   * PATCH request
   */
  public patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.patch<ApiResponse<T>>(url, data, config)
  }

  /**
   * PUT request
   */
  public put<T = unknown>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.put<ApiResponse<T>>(url, data, config)
  }

  /**
   * DELETE request
   */
  public delete<T = unknown>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.client.delete<ApiResponse<T>>(url, config)
  }
}

// Create singleton instance
export const apiClient = new ApiClient()

// Export the axios instance for advanced usage
export const axiosInstance = apiClient.getInstance()

export default apiClient
