import { GROUP_ID } from "@/constants";

export default class Student {
  static get fields() {
    return {
      surname: null,
      name: null,
      patronymic: null,
      fullname: null,
      groupId: GROUP_ID,
      PersonalDatum: {
        birthday: null,
        reportCardNumber: null,
        phoneNumber: null,
        residentialAddress: null,
        SNILS: null,
        medicalPolicy: null,
      },
    };
  }
}
