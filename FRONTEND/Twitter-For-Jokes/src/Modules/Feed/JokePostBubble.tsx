import React, {useState} from 'react'
import './JokePostBubble.css'
import {useAuth} from "../Contexts/AuthContext.tsx";
import {Link} from "react-router-dom";

interface JokePostBubbleProps {
    onJokePosted: () => void;
}

function JokePostBubble({ onJokePosted }: JokePostBubbleProps) {

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
            jokeContent: jokeContent,
            rating: rating
        }

        fetch('http://localhost:65451/api/Jokes', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jokeToPost),
        })
            .then(response => {
                if (response.ok) {
                    console.log(response, "nic není ok")
                    setJokeContent('');
                    setRating('');
                    onJokePosted();
                } else{
                    console.log(response, "Vše OK")

                }
            })
        .catch(error => console.log(error));

    }


const [showError, setShowError] = useState(false);

    const user = useAuth();

    if (user.user?.isAuthenticated === true) {
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

                {showError && (<p className="error_message">Joke nor rating cannot be empty!</p>)}

            </>
        )
    }
    else {
        return (
            <>
                <div className="not-authorized-preview-box">
                    <p>Wanna create your own joke?</p>
                    <p>Wanna be part of the community?</p>
                    <p><span id="link-to-there" className="big-text"><Link to="/Register">Create your account</Link></span> or login to your existing one!</p>
                </div>
            </>

        )
    }

}

export default JokePostBubble;