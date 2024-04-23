import { required, maxLength } from "@vuelidate/validators";

export default {
  meetingDate: { required },
  theme: { required, maxLength: maxLength(50) },
};
