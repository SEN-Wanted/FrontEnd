import { action, autorun, observable, useStrict } from 'mobx'

class user {
    @observable 
    networkType = true

    @action.bound
    setNetworkType(status) {
        this.networkType = status
    }

    @observable
    userPhone = '10000'

    @observable
    userID = '10000'

    @observable
    username = 'chenmy'

    @action.bound
    setUser(id, username) {
        this.userID = id,
        this.username = username
    }

    @action.bound
    setUserPhone(phone) {
        this.userPhone = phone
    }


    @observable
    token = ''
    @action.bound
    setToken(Token) {
        this.token = Token
    }

    @observable
    isLogin = false

    @action.bound
    setLoginStatus(status) {
        this.isLogin = status
    }

    @observable
    orderList = [
        {id: 1, name:"海底捞火锅(珠影广场)", cost:331.2, time: "2017-01-08 17:05", status: false, rating: 0},
        {id: 2, name:"海底捞火锅(珠影广场)", cost:331.2, time: "2017-01-08 17:05", status: false, rating: 0},
        {id: 3, name:"海底捞火锅(珠影广场)", cost:331.2, time: "2017-01-08 17:05", status: false, rating: 0},
        {id: 4, name:"海底捞火锅(珠影广场)", cost:331.2, time: "2017-01-08 17:05", status: false, rating: 0},
    ]

    @action.bound
    evaluateOrder(id, ratingNumber){
        this.orderList[id].status = true
        this.orderList[id].rating = ratingNumber
    }

    @action.bound
    getOrderMessage(id){

    }


}

const store = window.store = new user()
export default store