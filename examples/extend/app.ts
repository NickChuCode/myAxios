import myAxios from '../../src/index'

myAxios({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hi, myAxios post'
    }
})

myAxios.request({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hi, myAxios request post'
    }
})

myAxios.get('/extend/get')

myAxios.options('/extend/options')

myAxios.delete('/extend/delete')

myAxios.head('/extend/head')

myAxios.post('/extend/post', { msg: 'post' })

myAxios.put('/extend/put', { msg: 'put' })

myAxios.patch('/extend/patch', { msg: 'patch' })
