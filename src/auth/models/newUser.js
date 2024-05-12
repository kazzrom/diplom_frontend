export default class User {
  static get fields() {
    return {
      login: null,
      password: null,
      Curator: {
        surname: null,
        name: null,
        patronymic: null,
      },
      Group: {
        groupNumber: null,
        groupName: null,
      },
    };
  }
}
