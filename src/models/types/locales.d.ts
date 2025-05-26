import 'react-i18next';

declare module 'react-i18next' {
  interface Resources {
    translation: {
      addProducts: {
        inputPlaceHolder: string;
        button: string;
      };
      createList: {
        inputPlaceHolder: string;
        button: string;
        emptyText: string;
        emptyButton: string;
        buttonAddProduct: string;
      };
      createProduct: {
        inputPlaceHolder: string;
        selectPlaceHolder: string;
        button: string;
      };
      home: {
        nameApp: string;
        renderItem: {
          createdAt: string;
          product: string;
          products: string;
        };
      };
      login: {
        nameApp: string;
        signIn: {
          button: string;
          haveAnAccount: string;
          logIn: string;
        };
        logIn: {
          button: string;
          dontHaveAccount: string;
          logIn: string;
        };
      };
      products: {
        emptyText: string;
        button: string;
      };
      userSettings: {
        profileCreatedWith: string;
        language: string;
        appTheme: string;
      };
    };
  }
}
