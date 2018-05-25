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
    isLogin = true

    @action.bound
    setLoginStatus(status) {
        this.isLogin = status
    }

    @observable
    orderList = [
        {name:"海底捞火锅(珠影广场)", cost:331.2, time: "2017-01-08 17:05:24", status: false, rating: 0},
        {name:"海底捞火锅(珠影广场)", cost:331.2, time: "2017-01-08 17:05:24", status: false, rating: 0},
        {name:"海底捞火锅(珠影广场)", cost:331.2, time: "2017-01-08 17:05:24", status: false, rating: 0},
        {name:"海底捞火锅(珠影广场)", cost:331.2, time: "2017-01-08 17:05:24", status: false, rating: 0},
    ]

    @action.bound
    evaluateOrder(index, ratingNumber){
        this.orderList[index].status = true
        this.orderList[index].rating = ratingNumber
    }

    @observable
    isStatusbarHidden = false
    
    @action.bound
    setStatusbarHidden(flag) {
        this.isStatusbarHidden = flag
    }
}

const store = window.store = new user()
export default store