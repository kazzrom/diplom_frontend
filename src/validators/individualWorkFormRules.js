import { required, maxLength } from "@vuelidate/validators";

export default {
  workDate: { required },
  participant: { required, maxLength: maxLength(50) },
  workContent: { required },
};
