import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
  login: { required, maxLength: maxLength(25) },
  password: { required, minLength: minLength(5), maxLength: maxLength(50) },
};
