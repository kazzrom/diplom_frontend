import { ACTIONS } from "@/constants";

export default class DialogForm {
  action = ACTIONS.VIEW;
  isShowDialog = false;
  formHeaders = { add: "", edit: "", view: "" };
  currentHeaderForm = "";

  constructor(formHeaders) {
    this.formHeaders = formHeaders;
    this.currentHeaderForm = formHeaders.view;
  }

  get isShowDialog() {
    return this.isShowDialog;
  }

  setHeaderForm(action) {
    switch (action) {
      case ACTIONS.ADD:
        this.currentHeaderForm = this.formHeaders.add;
        break;
      case ACTIONS.EDIT:
        this.currentHeaderForm = this.formHeaders.edit;
        break;
      default:
        this.currentHeaderForm = this.formHeaders.view;
        break;
    }
  }

  openDialog(action) {
    this.action = action;
    this.setHeaderForm(action);
    this.isShowDialog = true;
  }

  closeDialog() {
    this.isShowDialog = false;
  }
}
