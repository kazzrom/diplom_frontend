import { required } from "@vuelidate/validators";

export default {
  theme: { required },
  meetingDate: { required },
  location: { required },
  numberPeoplePresent: { required },
};
