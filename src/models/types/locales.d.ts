import 'react-i18next';

declare module 'react-i18next' {
  interface Resources {
    translation: {
      addProducts: {
        header: string;
        inputPlaceHolder: string;
        button: string;
      };
      createList: {
        tab: string;
        inputPlaceHolder: string;
        button: string;
        emptyText: string;
        emptyButton: string;
        buttonAddProduct: string;
      };
      createProduct: {
        header: string;
        inputPlaceHolder: string;
        selectPlaceHolder: string;
        button: string;
      };
      home: {
        tab: string;
        nameApp: string;
        renderItem: {
          createdAt: string;
          product: string;
          products: string;
        };
      };
      listDetail: {
        header: string;
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
        tab: string;
        emptyText: string;
        button: string;
      };
      userSettings: {
        header: string;
        profileCreatedWith: string;
        language: string;
        appTheme: string;
      };
    };
  }
}
