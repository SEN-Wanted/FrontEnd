import {action, observable, computed, useStrict} from "mobx";
import {extendObservable} from "mobx";

class listcar {
    //计算总金额
    countTotalPrice = () => {
        let totalPrice = 0
        this.states.listCar.forEach(element => {
            totalPrice += element['number'] * element['price']
        });
        return totalPrice
    }

    @observable
    cell = 0

    @observable
    storeName = null

    @action.bound
    setStoreName(name) {
        this.storeName = name
    }

    @observable
    states = {
        isVisible: false,
        modalVisible: false,
        isTrigger: false,

        listCar : [],
        listCount : 0,
        totalCount: 0,
        totalPrice: 0,

        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
    }

    @action.bound
    setCell(index) {
        this.cell = index
    }

    @action.bound
    setEndPosition(position) {
        this.states.end = position
    }

    @action.bound
    setStartPosition(position) {
        this.states.start = position
        this.states.isTrigger = true
    }

    @action.bound
    setTriggerDown() {
        this.states.isTrigger = false
    }

    @action.bound
    setPopoverShow() {
        let isListcarEmpty = this.states.listCount == 0 ? false : true
        this.states.isVisible = isListcarEmpty
        this.states.modalVisible = isListcarEmpty
        this.states.isTrigger = false
    }

    @action.bound
    setPopoverHide() {
        this.states.isVisible = false
        this.states.isTrigger = false
        this.timer = setTimeout (
            () => {
                this.states.modalVisible = false
            },290
        )
    }

    @action.bound
    addListCar(item, index) {
        if(index == -1) {
            this.states.listCar.push(item)
            this.states.listCount ++ 
        } else {
            this.states.listCar[index].number ++ 
        }
        this.states.totalCount ++
        this.states.totalPrice += item.price
    }

    @action.bound
    subListCar(index) {
        this.states.listCar[index].number --
        this.states.totalCount --
        this.states.totalPrice -= this.states.listCar[index].price
        if(this.states.listCar[index].number == 0) {
            this.states.listCar.splice(index,1)
            this.states.listCount --
        }
        if(this.states.listCount == 0) {
            this.clearListCar()
        }
    }

    @action.bound
    clearListCar() {
        this.states.isVisible = false
        this.states.listCar = []
        this.states.listCount = 0
        this.states.totalCount = 0
        this.states.totalPrice = 0
        this.timer = setTimeout (
            () => {
                this.states.modalVisible = false
            },290
        )
    }

    //@computed
    //get listcarData() {
       // return this.
   // }
}

const store = window.store = new listcar()
export default store
