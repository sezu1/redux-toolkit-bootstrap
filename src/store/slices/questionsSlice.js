import {createSlice} from '@reduxjs/toolkit';

const questionsSlice = createSlice({

    name: 'questions',
    initialState: {
        questions: [],
        modal: false,
        modal2: false,
        questionIdToDelete: null,
        questionIdToUpdate: null
    },

    reducers: {
        addQuestion: (state, action) => {
            let id = 1;
            if (state.questions.length > 0) {
                id = state.questions[state.questions.length - 1].id + 1;
            }
            state.questions = [...state.questions, {id, ...action.payload}];
        },
        deleteQuestion: (state, action) => {
            const filteredQuestions = state.questions.filter(question => question.id !== action.payload);
            state.questions = filteredQuestions;

        },
        updateQuestion: (state, action) => {
            const updatedQuestions = state.questions.map(question => question.id === action.payload.id ? action.payload : question);
            state.questions = updatedQuestions
        },
        setModal: (state, action) => {
            state.modal = action.payload;
        },
        setModal2: (state, action) => {
            state.modal2 = action.payload;
        },
        setQuestionIdToDelete: (state, action) => {
            state.questionIdToDelete = action.payload;
        },
        setQuestionIdToUpdate: (state, action) => {
            state.questionIdToUpdate = action.payload;
        }
    },
});


export const {
    addQuestion,
    deleteQuestion,
    updateQuestion,
    setModal,
    setModal2,
    setQuestionIdToDelete,
    setQuestionIdToUpdate,
} = questionsSlice.actions;

export default questionsSlice.reducer;