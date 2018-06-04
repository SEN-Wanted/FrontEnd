// 请求服务器host
const host = "http://5afbc8babc1beb0014c29e31.mockapi.io/api";
//const host = 'http://api.meituan.com'
export default async function(url, method, data) {
    const fullUrl = host + url
    const data_string = JSON.stringify(data)
    const formData = new FormData()
    formData.append('phone', String(form.$('phone').value))
    formData.append('password', String(form.$('password').value))
    return new Promise((resolve,reject) => {
        if (method === 'GET') {
            fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(res => res.json())
                .then((res) => { resolve({ res }) })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                });
        } else if (method === 'POST') {
            fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: formData
            })
                .then(res => res.json())
                .then((res) => { resolve(res) })
                .catch((err) => {
                    console.log(err);
                });
        }
    })
}