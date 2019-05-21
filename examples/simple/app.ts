import myAxios from '../../src/index'

myAxios({
    method: 'get',
    url: '/simple/get',
    params: {
        a: 1,
        b: 2
    }
})
