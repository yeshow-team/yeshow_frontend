import {atom} from "recoil";

const reserverState = atom({
    key: "reserverState",
    default: {
        reserverDate: "",
        reserverPeople: 1,
        shopMenus: [],
        reserverMenus: [],
        reserverPrice: 0,
    }
})

export default reserverState;