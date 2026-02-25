import React, { useState} from 'react'
import './JokePostBubble.css'
import {useAuth} from "../Contexts/AuthContext.tsx";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../Global/Loading.tsx";

interface JokePostBubbleProps {
    onJokePosted: () => void;
}

function JokePostBubble({ onJokePosted }: JokePostBubbleProps) {
    const [jokeContent, setJokeContent] = useState('');
    const [rating, setRating] = useState('');
    const [loading, setLoading] = useState(false);

    const postJoke = (e: React.FormEvent) => {
        e.preventDefault();

        /* if statement to show error message to the user during creation of joke if any of these is empty*/
        if (jokeContent.trim() === "" || rating === "") {
            setShowError(true);
            return;
        }

        setShowError(false);

        const token = localStorage.getItem("secureToken");

        const jokeToPost = {
            jokeContent: jokeContent,
            rating: rating
        }

        setLoading(true);

        fetch('http://localhost:65451/api/Jokes', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: JSON.stringify(jokeToPost),
        })
            .then(response => {
                if (response.ok) {
                    console.log(response, "nic není ok")
                    setJokeContent('');
                    setRating('');
                    toast.success("Joke was Posted");
                    setLoading(false);
                    onJokePosted();
                } else{
                    setLoading(false);
                    console.log(response, "Vše OK")
                    toast.error("There was an error while posting your joke. Try again later")
                }

                if (response.status === 401) {
                    setShowError(true);
                    console.log("Nejsi přihlášený");
                    return;
                }

                if (!response.ok) {
                    const text = response.text();
                    setShowError(true);
                    console.log("Api chyba", text);
                    return;
                }
                setShowError(false);
                setJokeContent('');

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
                        </div>
                        <button type="submit">Post joke</button>
                    </div>
                </form>
                {loading && <Loading />}
                {showError && (<p className="error_message">Joke cannot be empty!</p>)}

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