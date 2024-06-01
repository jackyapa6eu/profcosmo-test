const formRules = {
  requiredRule: { required: true, message: 'Обязательное поле' },
  passMatch: ({ getFieldValue }: any) => ({
    validator(_: any, value: string) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Пароли не совпадают!'));
    },
  }),
  emailRule: () => ({ type: 'email', message: 'Введите email' }),
  min: (value: number) => ({ min: value, message: `Минимальное кол-во символов: ${value}` }),
  max: (value: number) => ({ max: value, message: `Максимальное кол-во символов: ${value}` }),
};

export { formRules };
