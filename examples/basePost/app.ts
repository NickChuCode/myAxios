import myAxios from '../../src/index'

myAxios({
    method: 'post',
    url: '/base/post',
    data: {
        a: 1,
        b: 2
    }
})

const arr = new Int32Array([21, 31])

myAxios({
    method: 'post',
    url: '/base/buffer',
    data: arr
})
