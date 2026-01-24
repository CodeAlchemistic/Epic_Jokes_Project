import React, {useState} from 'react'
import './JokePostBubble.css'

function JokePostBubble() {

    const [jokeContent, setJokeContent] = useState('');
    const [rating, setRating] = useState('');

    const postJoke = (e: React.FormEvent) => {
        e.preventDefault()

        /* if statement to show error message to the user during creation of joke if any of these is empty*/
        if (jokeContent.trim() === "" || rating === "") {
            setShowError(true);
            return;
        }

        setShowError(false);

        const jokeToPost = {
            usrId: 1, //Temp user id, registratoron reqired after probably global varialbe
            jokeContent: jokeContent,
            rating: rating
        }

        fetch('http://localhost:65451/api/Jokes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jokeToPost),
        })
            .then(response => {
                if (!response.ok && jokeContent === null || rating === null) {
                    console.log(response, "nic není ok")
                    setJokeContent('');
                } else{
                    window.location.reload();
                    console.log(response, "Vše OK")
                }
            })
        .catch(error => console.log(error));


    }


const [showError, setShowError] = useState(false);


    return (
       <>
        <form onSubmit={postJoke}>
            <div className="joke_upper_post_box">
                    <figcaption>Here! Create your own joke!</figcaption>
                    <textarea value={jokeContent} onChange={e => setJokeContent(e.target.value)} placeholder="write here..."></textarea>
            </div>
            <div className="joke_lower_post_box">
                <div>
                    <label htmlFor="numbericImput">Rating:</label>
                    <input type="number" name="numbericImput" id="numbericImput" min="1" max="10" onChange={e => setRating(e.target.value)}/>
                </div>
                    <button type="submit">Post joke</button>
            </div>
        </form>

           {showError && (<p>Joke nor rating cannot be empty!</p>)}

       </>
    )
}

export default JokePostBubble;