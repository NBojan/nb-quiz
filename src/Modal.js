import { useGlobalContext } from "./context";

const Modal = () => {
    const {showModal, correct, questions, closeModal} = useGlobalContext();

    return (  
        <div className={`modal centerFlex ${showModal && "modal-show"}`}>
            <div className="modal-card smallCard ta-center">
                <h2>Congrats!</h2>
                <p>You answered {correct} out of {questions.length} of the questions correctly.</p>
                <button className="btn btn-warning btn-l fw-600" onClick={closeModal}>Play Again</button>
            </div>
        </div>
    );
}
 
export default Modal;