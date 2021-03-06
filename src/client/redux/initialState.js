export const initialState = {
    filter: {
        sortingMap: new Map([]),
        filterText: '',
        filterFields: [],
        currentPage: 1,
    },
    data: {
        currentElement: {
            elementInfo: undefined,
            elementIndex: -1,
        },
        fullData: [],
        pageCount: 1,
        appElements: [],
        pageElements: [],
        inputContainer: {
            isAddButtonDisabled: false,
            isFormOpen: false,
            inputElement: {
                id: 0,
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            },
            validInputs: {
                id: false,
                firstName: false,
                lastName: false,
                email: false,
                phone: false,
            },
            addingStatus: {
                addingStatusText: '',
                isError: false,
            },
        },
    },
    appStatus: {
        isLoading: false,
        error: undefined,
    },
};
