import myAxios from '../../src/index'

myAxios({
    method: 'post',
    url: '/base/post',
    data: {
        a: 1,
        b: 2
    }
})

myAxios({
    method: 'post',
    url: '/base/post',
    headers: {
        // 注意：这里的 application/json 后面如果没有设置 charset，不要加 ; 号，
        // 否则无法返回数据
        'content-type': 'application/json',

    },
    data: {
        a: 1,
        b: 2
    }
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

myAxios({
    method: 'post',
    url: '/base/post',
    data: searchParams
})
