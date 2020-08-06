export const initialState = {
    filter: {
        sortingMap: new Map([]),
        filterText: '',
        filterFields: [],
        currentPage: 1,
    },
    data: {
        currentElement: undefined,
        elements: [],
        filteredElements: undefined,
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
        },
    },
    appStatus: {
        isLoading: false,
        error: undefined,
    },
};
