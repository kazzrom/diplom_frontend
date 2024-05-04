import { required, maxLength } from "@vuelidate/validators";

export default {
  name: { required, maxLength: maxLength(50) },
  surname: { required, maxLength: maxLength(50) },
  patronymic: { required, maxLength: maxLength(50) },
  relation: { required },
};
