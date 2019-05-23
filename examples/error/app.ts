import myAxios, { AxiosError } from '../../src/index'

myAxios({
    method: 'get',
    url: '/error/get1'
}).then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
})

myAxios({
    method: 'get',
    url: '/error/get'
}).then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
})

setTimeout(() => {
    myAxios({
        method: 'get',
        url: '/error/get'
    }).then((res) => {
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })
}, 5000)

myAxios({
    method: 'get',
    url: '/error/timeout',
    timeout: 2000
}).then((res) => {
    console.log(res)
}).catch((e: AxiosError) => {
    console.log(e.message)
    console.log(e.code)
    console.log(e.config)
    console.log(e.request)
    console.log(e.response)
})
