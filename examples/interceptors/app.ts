import myAxios from '../../src/index'

myAxios.interceptors.request.use(config => {
    config.headers.test += '1'
    return config
})

myAxios.interceptors.request.use(config => {
    config.headers.test += '2'
    return config
})

myAxios.interceptors.request.use(config => {
    config.headers.test += '3'
    return config
})

myAxios.interceptors.response.use(res => {
    res.data += '1'
    return res
})

let interceptor =  myAxios.interceptors.response.use(res => {
    res.data += '2'
    return res
})

myAxios.interceptors.response.use(res => {
    res.data += '3'
    return res
})

myAxios.interceptors.response.eject(interceptor)

myAxios({
    url: '/interceptor/get',
    method: 'get',
    headers: {
        test: ''
    }
}).then((res) => {
    console.log(res.data)
})
