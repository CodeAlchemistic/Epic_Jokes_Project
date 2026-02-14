import "./Profile.css"
import {useAuth} from "../Modules/Contexts/AuthContext.tsx";
import usr_icon from "../assets/usr_icon.png";
import {useEffect, useState} from "react";

interface userToGetJokeCount {
    userId: number;
    userName: string;
    jokesCount: number;
}

export function Profile() {
    const {user} = useAuth();
    const [jokesCount, setJokeCount] = useState<number | null>(null);

    useEffect(() => {
        async function load() {
            if (!user?.userId) {
                return;
            }

            const res = await fetch("http://localhost:65451/api/Users");
            if (!res.ok) return;

            const users: userToGetJokeCount[] = await res.json();
            const thisUser = users.find(u => u.userId === user.userId);

            setJokeCount(thisUser?.jokesCount ?? 0);
        }
        load();

    }, [user?.userId]);
    console.log("userId:", user?.userId);

    return (
        <>
            <p id="profile-text">Your profile</p>

            <div>
                <img src={usr_icon} alt=""/>
                <p>{user?.userName}</p>
                <p>{jokesCount}</p>
            </div>
        </>
    )
}

export default Profile;