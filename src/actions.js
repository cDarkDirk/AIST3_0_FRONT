import {ADD_COUNTER,
    TEST_BLOCK_MOVED,
    FORM_INPUT_CHANGE,
    CHAIN_SELECTED,
    FORM_TEMPLATE_FETCH_SUCCSEED,
    FORM_TEMPLATE_FETCH_FAIL,
    CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
    CHAIN_EDITOR_TEMPLATE_FETCH_FAIL,
    TESTS_LIST_TEMPLATE_FETCH_SUCCEED,
    TESTS_LIST_TEMPLATE_FETCH_FAIL} from './constants'

export const addCounter = () => ({type: ADD_COUNTER})

export const onFormInputChange = (value,paramName,formName) => ({
    type: FORM_INPUT_CHANGE,
    payload: {value,paramName,formName}
})

export const testBlockMoved = (payload) => ({
    type: TEST_BLOCK_MOVED,
    payload: payload
})

export const formTemplateFetchSuccseed = (payload) => ({
    type: FORM_TEMPLATE_FETCH_SUCCSEED,
    payload: payload
})

export const formTemplateFetchFail = (payload) => ({
    type: FORM_TEMPLATE_FETCH_FAIL,
    payload: payload
})
export const chainEditorTemplateFetchSucceed = (payload) => ({
    type: CHAIN_EDITOR_TEMPLATE_FETCH_SUCCEED,
    payload: payload
})
export const chainEditorTemplateFetchFail = (payload) => ({
    type: CHAIN_EDITOR_TEMPLATE_FETCH_FAIL,
    payload: payload
})
export const testsListTemplateFetchSucceed = (payload) => ({
    type: TESTS_LIST_TEMPLATE_FETCH_SUCCEED,
    payload: payload
})
export const testsListTemplateFetchFail = (payload) => ({
    type: TESTS_LIST_TEMPLATE_FETCH_FAIL,
    payload: payload
})

export const chainSelected = (selectedChain) => ({type: CHAIN_SELECTED, selectedChain})
