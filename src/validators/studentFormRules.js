import { required, maxLength } from "@vuelidate/validators";

export default {
  surname: { required, maxLength: maxLength(50) },
  name: { required, maxLength: maxLength(50) },
  patronymic: { required, maxLength: maxLength(50) },
  sex: { required },
  Personaldatum: {
    birthday: { required },
    reportCardNumber: { required },
    phoneNumber: { required },
    residentialAddress: { required },
    SNILS: { required },
    medicalPolicy: { required },
  },
};
