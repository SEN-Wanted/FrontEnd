import { action, autorun, observable, useStrict } from 'mobx'

class user {
    @observable 
    networkType = true

    @action.bound
    setNetworkType(status) {
        this.networkType = status
    }
}

const store = window.store = new user()
export default store