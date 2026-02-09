import React, { useState } from 'react';
import usr_icon from './../../assets/usr_icon.png';
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
    const { user } = useAuth();


    const [activeJokeId, setActiveJokeId] = useState<number | null>(null);
    const [ratingInput, setRatingInput] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);


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
                    setActiveJokeId(null); // Zavřeme formulář
                    refreshJokes();        // <--- Místo reloadu zavoláme refresh dat!
                } else {
                    console.error("Chyba při updatu ratingu");
                }
            })
            .catch(err => console.error(err));
    };


    const onDelete = async (id: number) => {
        if (!window.confirm("Do you really want to delete the joke?")) return;

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
    };

    return (
        <>
            {message && <p className="success-msg">{message}</p>}
            {error && <p className="error-msg">{error}</p>}

            {jokes.map((joke) => (
                <div className="bubbleBox" key={joke.jokeId}>
                    <div className="userInfoBox">
                        <img src={usr_icon} alt="User" />
                        <p>{joke.authorName}</p>
                    </div>

                    <p>{joke.jokeContent}</p>

                    <div className="ourFlex">
                        <div className="jokeInfoBox">
                            <p id="rating" onClick={() => toggleForm(joke.jokeId)}>
                                Rating: {joke.rating}/10
                            </p>
                            <p className="info_notif">click on 'Rating' to change</p>
                        </div>

                        {/* Formulář pro změnu ratingu - zobrazí se jen pro aktivní vtip */}
                        <div className={activeJokeId === joke.jokeId ? "hid active" : "hid"}>
                            <form className="ourFlex" onSubmit={(e) => updateRating(e, joke.jokeId)}>
                                <input
                                    min="1" max="10"
                                    id="ratingChange"
                                    value={ratingInput}
                                    onChange={(e) => setRatingInput(e.target.value)}
                                    type="number"
                                />
                                <button type="submit" id="submitRate">Change</button>
                            </form>
                        </div>
                    </div>

                    {/* Tlačítko smazat se ukáže jen autorovi vtipu */}
                    {joke.authorName === user?.userName && (
                        <button className="delete_btn" onClick={() => onDelete(joke.jokeId)}>
                            Delete joke
                        </button>
                    )}
                </div>
            ))}
        </>
    );
};

export default JokeBuble;
