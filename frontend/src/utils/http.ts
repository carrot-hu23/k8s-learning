import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 定义基础配置
const TIMEOUT = 10000; // 请求超时时间（毫秒）

// 创建 Axios 实例
const http: AxiosInstance = axios.create({
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
http.interceptors.request.use(
    // @ts-ignore
    (config: AxiosRequestConfig) => {
        // 在请求头中添加 Token（如果有）
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data; // 直接返回数据，省去 data 解析
    },
    (error) => {
        console.error('HTTP Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// **封装请求方法，支持泛型**
// @ts-ignore
export const get = <T = any>(url: string, params?: object): Promise<T> => http.get<T>(url, { params });

// @ts-ignore
export const post = <T = any>(url: string, data?: object): Promise<T> => http.post<T>(url, data);

// @ts-ignore
export const put = <T = any>(url: string, data?: object): Promise<T> => http.put<T>(url, data);

// @ts-ignore
export const del = <T = any>(url: string): Promise<T> => http.delete<T>(url);

export default http;
