import React, { useContext, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();


const table = {
    sports: 21,
    history: 23,
    politics: 24,
}
//const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';
const baseUrl = "https://opentdb.com/api.php?";

const AppProvider = ({children}) => {
    const [showForm, setShowForm] = useState(true);
    const [formValues, setFormValues] = useState({amount: 10, category: "sports", difficulty: "easy"});
    const [formErr, setFormErr] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [index, setIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const getQuestions = async (url) => {
        setLoading(true);
        setShowForm(false);
        const response = await axios(url).catch(err => setErr(err.message));
        if(response){
            if(response.data.results.length > 0){
                setQuestions(response.data.results);
                setFormErr(false);
            } else {
                setShowForm(true);
                setFormErr(true);
            }
            setErr(false);
        } else {
            setShowForm(true);
        }
        setLoading(false);
    }

    const handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({...formValues, [name]: value});
    }
    const handleSubmit = e => {
        e.preventDefault();
        const {amount, category, difficulty} = formValues;
        getQuestions(`${baseUrl}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`)
    }
    const nextQuestion = () => {
        if(index === questions.length - 1){
            openModal();
            setIndex(0);
            return
        } else {
            setIndex(index + 1);
        }
    }
    const checkCorrect = value => {
        if(value){
            setCorrect(correct + 1);
        } 
        nextQuestion();
    }
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setShowForm(true);
        setCorrect(0);
    }

    return (
        <AppContext.Provider value={{showForm, ...formValues, formErr, err, handleSubmit, handleChange, 
        questions, loading, index, correct, showModal, closeModal, nextQuestion, checkCorrect}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => useContext(AppContext);

export {AppProvider, useGlobalContext};