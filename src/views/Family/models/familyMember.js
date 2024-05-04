export default class FamilyMember {
  static get fields() {
    return {
      surname: null,
      name: null,
      patronymic: null,
      relation: null,
      MemberPersonalDatum: {
        workPlace: null,
        post: null,
        phoneNumber: null,
        residentialAddress: null,
      },
    };
  }
}
