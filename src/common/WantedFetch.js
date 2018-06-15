/**
 * 让fetch也可以timeout
 *  timeout不是请求连接超时的含义，它表示请求的response时间，包括请求的连接、服务器处理及服务器响应回来的时间
 * fetch的timeout即使超时发生了，本次请求也不会被abort丢弃掉，它在后台仍然会发送到服务器端，只是本次请求的响应内容被丢弃而已
 * @param {Promise} fetch_promise    fetch请求返回的Promise
 * @param {number} [timeout=10000]   单位：毫秒，这里设置默认超时时间为10秒
 * @return 返回Promise
 */

function timeout_fetch(fetch_promise,timeout = 10000) {
    let timeout_fn = null; 

    //这是一个可以被reject的promise
    let timeout_promise = new Promise(function(resolve, reject) {
        timeout_fn = function() {
            reject('timeout promise');
        };
    });

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    let abortable_promise = Promise.race([
        fetch_promise,
        timeout_promise
    ]);

    setTimeout(function() {
        timeout_fn();
    }, timeout);

    return abortable_promise ;
}

// 请求服务器host
const host = "http://2v0683857e.iask.in:22871/";

/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [data=''] body的请求参数，默认为空
 * @param {function} finallyCB 请求结束后执行的回调函数
 * @return 返回Promise
 */


export default  function(url, method, data, finallyCB = () => {console.log('finally')} ) {
    const fullUrl = url.indexOf('http') === -1 ? (host + url) : url
    const data_string = JSON.stringify(data)
    const formData = new FormData()
    //formData.append('phone', String(data.phone))
    //formData.append('password', String(data.password))
    if (method === 'GET') {
        return new Promise((resolve,reject) => {
            timeout_fetch(fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })).then((res) => {
                if(res ) {
                    return res.json()
                }
                throw new Error('server error')
            }).then((res) => { 
                finallyCB()
                resolve({ res }) 
            }).catch((err) => {
                console.log(err);
                finallyCB()
                reject(err);
            });
        })
    } else if (method === 'POST') {
        return new Promise((resolve,reject) => {
            timeout_fetch(fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })).then((res) => {
                if(res && res.status === 200) {
                    return res.json()
                }
                throw new Error('server error')
            }).then((res) => { 
                finallyCB()
                resolve({ res }) 
            }).catch((err) => {
                    console.log(err);
                    finallyCB()
                    reject(err);
            });
        })
    }

}