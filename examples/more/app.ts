import myAxios from '../../src/index'
import qs from 'qs'

// 携带 cookie 示例
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


// XSRF 防御示例
// const instance = myAxios.create({
//     xsrfCookieName: 'XSRF-TOKEN-D',
//     xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })
//
// instance.get('/more/get').then(res => {
//     console.log(res)
// })



// HTTP 授权示例
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



// 自定义合法状态码示例
// myAxios.get('/more/304').then(res => {
//     console.log(res)
// }).catch((e: AxiosError) => {
//     console.log(e.message)
// })
//
// myAxios.get('/more/304', {
//     validateStatus(status) {
//         return status >= 200 && status < 400
//     }
// }).then(res => {
//     console.log(res)
// }).catch((e: AxiosError) => {
//     console.log(e.message)
// })


// 自定义序列化示例
// myAxios.get('/more/get', {
//     params: new URLSearchParams('a=b&c=d')
// }).then(res => {
//     console.log(res)
// })
//
// myAxios.get('/more/get', {
//     params: {
//         a: 1,
//         b: 2,
//         c: ['a', 'b', 'c']
//     }
// }).then(res => {
//     console.log(res)
// })
//
// const instance = myAxios.create({
//     paramsSerializer(params) {
//         return qs.stringify(params, { arrayFormat: 'brackets' })
//     }
// })
//
// instance.get('/more/get', {
//     params: {
//         a: 1,
//         b: 2,
//         c: ['a', 'b', 'c']
//     }
// }).then(res => {
//     console.log(res)
// })



// baseURL 示例
// const instance = myAxios.create({
//     baseURL: 'https://img.mukewang.com/'
// })
//
// instance.get('5cc01a7b0001a33718720632.jpg')
//
// instance.get('https://img.mukewang.com/szimg/5becd5ad0001b89306000338-360-202.jpg')



// 静态方法扩展示例
function getA() {
    return myAxios.get('/more/A')
}

function getB() {
    return myAxios.get('/more/B')
}

myAxios.all([getA(), getB()])
    .then(myAxios.spread(function(resA, resB) {
        console.log(resA.data)
        console.log(resB.data)
    }))


myAxios.all([getA(), getB()])
    .then(([resA, resB]) => {
        console.log(resA.data)
        console.log(resB.data)
    })

const fakeConfig = {
    baseURL: 'https://www.baidu.com/',
    url: '/user/12345',
    params: {
        idClient: 1,
        idTest: 2,
        testString: 'thisIsATest'
    }
}
console.log(myAxios.getUri(fakeConfig))
