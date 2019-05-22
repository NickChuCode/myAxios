import myAxios from '../../src/index'

myAxios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: ['bar', 'baz']
    }
})

myAxios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: {
            bar: 'baz'
        }
    }
})

const date = new Date()

myAxios({
    method: 'get',
    url: '/base/get',
    params: {
        date
    }
})

myAxios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: '@:$, '
    }
})

myAxios({
    method: 'get',
    url: '/base/get',
    params: {
        foo: 'bar',
        baz: null
    }
})

myAxios({
    method: 'get',
    url: '/base/get#hash',
    params: {
        foo: 'bar'
    }
})

myAxios({
    method: 'get',
    url: '/base/get?foo=bar',
    params: {
        bar: 'baz'
    }
})
