import myAxios from '../../src/index'

// 这个例子没走通，无法携带 cookie
// document.cookie = 'a=b'
//
// myAxios.get('/more/get').then(res => {
//     console.log(res.data)
// })
//
// myAxios.post('http://127.0.0.1:8088/more/server2', {}, {
//     withCredentials: true
// }).then(res => {
//     console.log(res)
// })



// const instance = myAxios.create({
//     xsrfCookieName: 'XSRF-TOKEN-D',
//     xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })
//
// instance.get('/more/get').then(res => {
//     console.log(res)
// })




// myAxios.post('/more/post', {
//     a: 1
// }, {
//     auth: {
//         username: 'nick',
//         password: '123'
//     }
// }).then(res => {
//     console.log(res)
// })




myAxios.get('/more/304').then(res => {
    console.log(res)
}).catch((e: AxiosError) => {
    console.log(e.message)
})

myAxios.get('/more/304', {
    validateStatus(status) {
        return status >= 200 && status < 400
    }
}).then(res => {
    console.log(res)
}).catch((e: AxiosError) => {
    console.log(e.message)
})
