import myAxios from '../../src/index'

// 这个例子没走通，无法携带 cookie
document.cookie = 'a=b'

myAxios.get('/more/get').then(res => {
    console.log(res.data)
})

myAxios.post('http://127.0.0.1:8088/more/server2', {}, {
    withCredentials: true
}).then(res => {
    console.log(res)
})
