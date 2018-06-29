import { action, autorun, observable, useStrict } from 'mobx'

class user {
    @observable 
    networkType = true

    @action.bound
    setNetworkType(status) {
        this.networkType = status
    }

    @observable
    userID = '10000'   //用户ID

    @observable
    username = '13719342427'    //用户手机号

    @observable
    userNickName = 'hasaki'   //用户昵称

    @action.bound
    setNickName(nickname) {
        this.userNickName = nickname
    }


    @action.bound
    setUser(id, username, nickname) {
        this.userID = id,
        this.username = username
        this.userNickName = nickname
    }

    @action.bound
    setUserName(username) {
        this.username = username
    }

    @action.bound
    getUserName() {
        return this.username;
    }

    @observable
    userPhone = '10000'

    @action.bound
    setUserPhone(phone) {
        this.userPhone = phone
    }

    @action.bound
    getUserPhone() {
        return this.userPhone;
    }

    @observable
    password = ''

    @action.bound
    setPassword(password) {
        this.password = password
    }

    @observable
    token = ''

    @action.bound
    setToken(Token) {
        this.token = Token
    }

    @observable
    isLogin = false

    @observable
    messageCount = 0

    @action.bound
    setLoginStatus(status,count = 10) {
        this.isLogin = status
        this.messageCount = count
    }


}

const store = window.store = new user()
export default store