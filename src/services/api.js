import axios from 'axios'

const API_BASE_URL ='https://blogmaestro.onrender.com/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers : {
        'Content-Type' : 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.request.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register',userData)
}

export const postsAPI = {
    getAll : () => api.get('/posts'),
    getById: (id) => api.get(`/posts/${id}`),
    create : (postData) => api.post('/posts/create',postData),
    update: (id,postData) => api.put(`/posts/${id}`,postData),
    delete: (id) => api.delete(`/posts/${id}`)
}

export const usersAPI ={
    getProfile : (id) => api.get(`/user/${id}`),
    getUserPosts : (id) => api.get(`/user/${id}/posts`)
}

export const commentsAPI = {
    getByPost : (postId) => api.get(`/comments/post/${postId}`),
    create : (commentData) => api.post('/comments/create',commentData),
    update: (id,commentData) => api.put(`/comments/${id}`,commentData),
    delete: (id) => api.delete(`/comments/${id}`)
}

export default api
