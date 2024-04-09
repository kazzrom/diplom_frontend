import { ACTIONS } from "@/constants";

export default class DialogForm {
  action = ACTIONS.VIEW;
  isShowDialog = false;
  formHeaders = { add: "", edit: "", view: "" };
  currentHeader = "";

  constructor(formHeaders) {
    this.formHeaders = formHeaders;
    this.currentHeader = formHeaders.view;
  }

  get isShowDialog() {
    return this.isShowDialog;
  }

  setHeaderForm(action) {
    switch (action) {
      case ACTIONS.ADD:
        this.currentHeader = this.formHeaders.add;
        break;
      case ACTIONS.EDIT:
        this.currentHeader = this.formHeaders.edit;
        break;
      default:
        this.currentHeader = this.formHeaders.view;
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
