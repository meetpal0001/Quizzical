import "./intro-page.css"
import blob from "./images/blob 5.png"
import blob2 from "./images/blobs.png"


export default function Cover(props) {


    function handleChange(event){
        props.setDifficulty(event.target.value)

    }
    return (
        <div className="intro-page">
            <img src={blob} alt="blob" className="blob1" />
            <div>
                <h1>Quizzical</h1>
                <label htmlFor="difficulty">Difficulty: </label>
                <select name="difficulty" id="difficulty"
                    value={props.difficulty} onChange={handleChange}>
                    
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>

                </select>
                <br />
                <br />

                <button onClick={props.begin}>Start Quiz</button>
            </div>
            <img src={blob2} alt="blob" className="blob2" />

        </div>
    )
}