import myAxios, {AxiosTransformer} from '../../src/index'
import qs from 'qs'

// myAxios.defaults.headers.common['test2'] = 123

// myAxios({
//     url: '/config/post',
//     method: 'post',
//     data: qs.stringify({
//        a: 1,
//        b: 2
//     }),
//     headers: {
//         test: '321'
//     }
// }).then(res => {
//     console.log(res.data)
// })
myAxios({
    transformRequest: [(function(data) {
        return qs.stringify(data)
    }), ...(myAxios.defaults.transformRequest as AxiosTransformer[])],
    transformResponse: [...(myAxios.defaults.transformResponse as AxiosTransformer[]), function(data) {
        if (typeof data === 'object') {
            data.b = 2
        }
        return data
    }],
    // headers: {}, // 目前代码有点问题，必须要传入一个空的 headers，目前没有找到问题所在
    // 已经解决，mergeConfig 中的 deepMergeStrat 写的不完善，没有考虑 val2 为 undefined 的合并
    // 顺便，debugger 真的很好用
    url: '/config/post',
    method: 'post',
    data: {
        a: 1
    }
}).then((res) => {
    console.log(res.data)
})
