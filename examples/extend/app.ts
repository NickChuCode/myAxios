import myAxios from '../../src/index'

interface ResponseData<T = any> {
    code: number
    result: T
    message: string
}

interface User {
    name: string
    age: number
}

function getUser<T>() {
    return myAxios<ResponseData<T>>('/extend/user')
        .then(res => res.data)
        .catch(err => console.error(err))
}

myAxios({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hi, myAxios post'
    }
})

myAxios('/extend/post',{
    method: 'post',
    data: {
        msg: 'hi, myAxios post with 2 arguments'
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

async function test() {
    const user = await getUser<User>()
    if (user) {
        console.log(user.result.name)
    }
}

test()
