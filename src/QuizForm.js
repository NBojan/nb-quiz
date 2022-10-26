import { useGlobalContext } from "./context";

const QuizForm = () => {
    const {amount, category, difficulty, handleSubmit, handleChange, formErr, err} = useGlobalContext();

    return (  
        <section className="centerFlex containerBoot m-auto">
            <form onSubmit={handleSubmit} className="quizForm smallCard">
                <h3 className="mb-24">Setup Quiz</h3>
                <div className="form-control">
                    <label htmlFor="amount">Number Of Questions</label>
                    <input type="number" name="amount" id="amount" min={1} max={30} value={amount} onChange={handleChange}/>
                </div>
                <div className="form-control">
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" value={category} onChange={handleChange}>
                        <option value="sports">Sports</option>
                        <option value="history">History</option>
                        <option value="politics">Politics</option>
                    </select>
                </div>
                <div className="form-control">
                    <label htmlFor="difficulty">Difficulty</label>
                    <select name="difficulty" id="difficulty" value={difficulty} onChange={handleChange}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>

                {formErr && <p className="formErr">Cannot generate questions. Please try different options.</p>}
                {err && <p className="formErr">{err}</p>}
                
                <button type="submit" className="btn btn-m btn-warning fw-600 w100p">Start</button>
            </form>
        </section>
    );
}
 
export default QuizForm;