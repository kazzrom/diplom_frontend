import { required, minLength, maxLength } from "@vuelidate/validators";

export default {
  login: { required, maxLength: maxLength(25) },
  // FIXME: сделать минимальную длину пароля 8 символов и желательно поменять пароль на тестовом аккаунте
  password: { required, minLength: minLength(8), maxLength: maxLength(50) },
};
