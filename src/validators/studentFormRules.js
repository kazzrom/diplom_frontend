import { required, maxLength, email } from "@vuelidate/validators";

export default {
  surname: { required, maxLength: maxLength(50) },
  name: { required, maxLength: maxLength(50) },
  patronymic: { required, maxLength: maxLength(50) },
  sex: { required },
  PersonalDatum: {
    birthday: { required },
    reportCardNumber: { required },
    phoneNumber: { required },
    email: { required, email },
    residentialAddress: { required },
  },
};
