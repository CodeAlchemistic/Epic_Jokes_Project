import React, { useState } from 'react';
import usr_icon from './../../assets/usr_icon.png';
import './JokeBubble.css'
import {Link} from "react-router-dom";
import './JokeBubble.css';
import { convertStringFromInput } from "../Auxiliary/AuxiliaryFunctions.tsx";
import { useAuth } from "../Contexts/AuthContext.tsx";


interface Joke {
    jokeId: number;
    jokeContent: string;
    rating: string;
    authorName: string;
}


interface RatingUpdateDto {
    jokeId: number;
    rating: number;
}


interface JokeBubbleProps {
    jokes: Joke[];
    refreshJokes: () => void;
}

const JokeBuble: React.FC<JokeBubbleProps> = ({ jokes, refreshJokes }) => {
    const user = useAuth();


    const [activeJokeId, setActiveJokeId] = useState<number | null>(null);
    const [ratingInput, setRatingInput] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const toggleForm = (id: number) => {
        setActiveJokeId(activeJokeId === id ? null : id);
        setRatingInput("");
    };


    const updateRating = (e: React.FormEvent, jokeId: number) => {
        e.preventDefault();

        const jokeToUpdate: RatingUpdateDto = {
            jokeId: jokeId,
            rating: convertStringFromInput(ratingInput),
        };

        fetch(`http://localhost:65451/api/Jokes/${jokeId}/rating`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jokeToUpdate)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Rating aktualizován");
                    setActiveJokeId(null);
                    refreshJokes();
                } else {
                    console.error("Chyba při updatu ratingu");
                }
            })
            .catch(err => console.error(err));
    };


    const onDelete = async (id: number) => {
        const handleDeleteclick = () => {
            setIsConfirmOpen(true);
        };

        const confirmDelete = async () => {
            setIsConfirmOpen(false);
        };



        setMessage(null);
        setError(null);

        try {
            const res = await fetch(`http://localhost:65451/api/Jokes/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setMessage("Joke was deleted successfully.");
                refreshJokes();
            } else {
                const text = await res.text();
                setError(text || "Unable to delete the joke.");
            }
        } catch {
            setError("Network error occurred while deleting.");
        }



    }

    if (user.user?.isAuthenticated === true) {
        return (
            <>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}

                {jokes.map((Joke) =>(
                    <div className="bubbleBox" key={Joke.jokeId}>

                        <div className="userInfoBox">
                            <img src={usr_icon} alt=""/>
                            <p>{Joke.authorName}</p>
                        </div>
                        <p>{Joke.jokeContent}</p>
                        <div className="ourFlex">
                            <div className="jokeInfoBox">
                                <p id="rating" onClick={() => toggleForm(Joke.jokeId)}>Rating: {Joke.rating}/10</p>
                                <p className="info_notif">click on 'Rating' to change</p>
                            </div>
                            <div className={activeJokeId === Joke.jokeId ? "hid active" : "hid"}>
                                <form className="ourFlex" onSubmit={(e) => updateRating(e, Joke.jokeId)}>
                                    <input min="1" max="10" id="ratingChange" value={ratingInput} onChange={(e) => setRatingInput(e.target.value)} type="number"></input>
                                    <button type="submit" id="submitRate">Change rating</button>
                                </form>
                            </div>
                        </div>
                        <div className="lower-flex">
                            {user.user?.userName === Joke.authorName ?
                                <button className="delete_btn" onClick={() => onDelete(Joke.jokeId)}>
                                    Delete joke
                                </button>
                            : <></>
                            }

                            <div className="see-comments-box">
                                <Link to={`/jokes/${Joke.jokeId}`} className="comment-link">See all comments</Link>
                            </div>
                        </div>

                    </div>
                ))}
            </>
        )
    }
    else {
        return (
            <>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}

                {jokes.map((Joke) =>(
                    <div className="bubbleBox" key={Joke.jokeId}>

                        <div className="userInfoBox">
                            <img src={usr_icon} alt=""/>
                            <p>{Joke.authorName}</p>
                        </div>
                        <p>{Joke.jokeContent}</p>
                        <div className="ourFlex">
                            <div className="jokeInfoBox">
                                <p id="rating" onClick={() => toggleForm(Joke.jokeId)} style={{cursor: "default"}}>Rating: {Joke.rating}/10</p>
                                <p className="info_notif">Login to change rating</p>
                            </div>
                        </div>

                        <div className="see-comments-box">
                                <Link to={`/jokes/${Joke.jokeId}`} className="comment-link">See all comments</Link>
                        </div>
                    </div>
                ))}
            </>
        )
    }

}
export default JokeBuble;
