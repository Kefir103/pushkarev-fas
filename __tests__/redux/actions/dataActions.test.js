import * as Types from '../../../src/client/redux/actions/actionTypes';
import {
    setData,
    filterElements,
    loadData,
    setSelectedElement,
    changeInputElementField,
    changeValidateInputs,
    changeIsInputFormOpen,
    changeIsAddButtonDisabled,
    removeInputData,
    addInputDataToArray,
    changeInputAddingStatus, resetValidInputs,
} from '../../../src/client/redux/actions/dataActions';
import { data } from '../../../__mocks__/data';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../../src/client/redux/initialState';
import fetchMock from 'fetch-mock-jest';

const mockStore = configureMockStore([thunk]);

describe('dataActions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    afterEach(() => {
        fetchMock.restore();
    });
    test('setData should set data correctly without sorting', () => {
        const expectedAction = {
            type: Types.DATA.SET_DATA,
            payload: {
                sort: undefined,
                data: data,
            },
        };
        store.dispatch(setData(data));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setData should set data correctly with sorting', () => {
        const sortingMap = new Map([
            ['firstName', 'asc'],
            ['id', 'desc'],
        ]);
        const expectedAction = {
            type: Types.DATA.SET_DATA,
            payload: {
                sort: sortingMap,
                data: data,
            },
        };
        store.dispatch(setData(data, sortingMap));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('filterElements should filter elements correctly', () => {
        const expectedAction = {
            type: Types.DATA.FILTER_ELEMENTS,
            payload: {
                data: data,
                filterFields: ['firstName'],
                filterText: 'Jane',
            },
        };
        store.dispatch(filterElements(data, 'Jane', ['firstName']));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('filterElements should filter elements correctly without fields', () => {
        const expectedAction = {
            type: Types.DATA.FILTER_ELEMENTS,
        };
        store.dispatch(filterElements(data));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setSelectedElement should return selected element', () => {
        const element = {
            id: 115,
            firstName: 'Racquel',
            lastName: 'Herbert',
            email: 'EMarton@placerat.com',
            phone: '(884)101-9065',
        };
        const expectedAction = {
            type: Types.DATA.SET_SELECTED_ELEMENT,
            payload: element,
        };
        store.dispatch(setSelectedElement(element));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('loadData should load data correctly without error', () => {
        const url =
            'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
        fetchMock.get(url, {
            body: data,
        });
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOADING_STATUS, payload: true },
            {
                type: Types.DATA.SET_DATA,
                payload: {
                    sort: undefined,
                    data: data,
                },
            },
            { type: Types.APP_STATUS.CHANGE_LOADING_STATUS, payload: false },
            { type: Types.APP_STATUS.CATCH_ERROR, payload: undefined },
        ];
        return store.dispatch(loadData(url)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    test('loadData should throw error correctly', () => {
        const url =
            'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
        fetchMock.get(url, {
            throws: 'error',
        });
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOADING_STATUS, payload: true },
            { type: Types.APP_STATUS.CHANGE_LOADING_STATUS, payload: false },
            { type: Types.APP_STATUS.CATCH_ERROR, payload: 'error' },
        ];
        return store.dispatch(loadData(url)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    test('changeInputElementField should set correct field in element', () => {
        const expectedAction = {
            type: Types.DATA.CHANGE_INPUT_ELEMENT_FIELD,
            payload: {
                field: 'field',
                value: 'value',
            },
        };
        store.dispatch(changeInputElementField('field', 'value'));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('changeValidateInputs should change validation', () => {
        const expectedAction = {
            type: Types.DATA.CHANGE_VALIDATE_INPUTS,
            payload: {
                field: 'field',
                isValid: true,
            },
        };
        store.dispatch(changeValidateInputs('field', true));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('changeIsInputFormOpen should change open status of input form', () => {
        const expectedAction = {
            type: Types.DATA.CHANGE_IS_INPUT_FORM_OPEN,
            payload: true,
        };
        store.dispatch(changeIsInputFormOpen(true));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('changeIsAddButtonDisabled should change add button disabled status', () => {
        const expectedAction = {
            type: Types.DATA.CHANGE_IS_ADD_BUTTON_DISABLED,
            payload: true,
        };
        store.dispatch(changeIsAddButtonDisabled(true));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('removeInputData should be called', () => {
        const expectedAction = {
            type: Types.DATA.REMOVE_INPUT_DATA,
        };
        store.dispatch(removeInputData());
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('resetValidInputs should be called', () => {
        const expectedAction = {
            type: Types.DATA.RESET_VALID_INPUTS
        }
        store.dispatch(resetValidInputs());
        expect(store.getActions()[0]).toEqual(expectedAction);
    })
    test('changeInputAddingStatus should change addingStatus', () => {
        const expectedAction = {
            type: Types.DATA.CHANGE_INPUT_ADDING_STATUS,
            payload: {
                statusText: 'statusText',
                isError: false,
            },
        };
        store.dispatch(changeInputAddingStatus('statusText', false));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
});
