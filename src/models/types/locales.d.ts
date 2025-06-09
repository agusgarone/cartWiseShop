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
        addNameToTheList: string;
      };
      createProduct: {
        header: string;
        inputPlaceHolder: string;
        selectPlaceHolder: string;
        button: string;
        unexpectedErrorToCreateProduct: string;
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
        theListDoesntExist: string;
        atention: string;
        youGoingToDeleteThelistWithName: string;
        accept: string;
        cancel: string;
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
        atention: string;
        youGoingToDeleteTheProductWithName: string;
        accept: string;
        cancel: string;
      };
      userSettings: {
        header: string;
        profileCreatedWith: string;
        language: string;
        appTheme: string;
      };
      filterProducts: {
        title: string;
        inputPlaceholder: string;
        addButton: string;
      };
    };
  }
}
