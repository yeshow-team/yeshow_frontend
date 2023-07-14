import {atom} from "recoil";

export interface ModalStateType {
  open: boolean;
  title: string;
  content: string;
  icon: string;
  buttonText: string;
}

const modalState = atom<ModalStateType>(
    {
      key: "modalStore",
      default: {
        open: false,
        title: "",
        content: "",
        icon:"",
        buttonText: "",
      }
    }
)

export default modalState;