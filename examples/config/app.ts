import myAxios from '../../src/index'
import qs from 'qs'

myAxios.defaults.headers.common['test2'] = 123

myAxios({
    url: '/config/post',
    method: 'post',
    data: qs.stringify({
       a: 1,
       b: 2
    }),
    headers: {
        test: '321'
}
}).then(res => {
    console.log(res.data)
})
