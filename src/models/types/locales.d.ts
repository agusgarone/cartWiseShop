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
        newProductChip: string;
        aiVoice: {
          title: string;
          subtitle: string;
          start: string;
          stop: string;
          continue: string;
          close: string;
          listening: string;
          readyToContinue: string;
          preview: string;
          openAssistant: string;
        };
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
        editButton: string;
        shareButton: string;
        deleteButton: string;
        shareError: string;
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
        aiVoice: {
          title: string;
          subtitle: string;
          start: string;
          stop: string;
          continue: string;
          close: string;
          listening: string;
          readyToContinue: string;
          preview: string;
          openAssistant: string;
        };
        voiceReview: {
          headerStack: string;
          subtitle: string;
          empty: string;
          namePlaceholder: string;
          done: string;
          deleteA11y: string;
          nothingSavedTitle: string;
          nothingSavedMessage: string;
          partialSavedTitle: string;
          partialSavedMessage: string;
          saveErrorTitle: string;
          saveErrorMessage: string;
        };
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
