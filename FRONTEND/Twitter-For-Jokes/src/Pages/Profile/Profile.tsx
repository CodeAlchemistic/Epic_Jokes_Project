import "./Profile.css"
import {useAuth} from "../../Modules/Contexts/AuthContext.tsx";
import usr_icon from "../../assets/usr_icon.png";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

interface Joke {
    jokeId: number;
    jokeContent: string;
}

interface userToGetJokeCount {
    userId: number;
    userName: string;
    jokeCount: number;
    jokes: Joke[];
}

export function Profile() {
    const {user} = useAuth();
    const [data, setData] = useState<userToGetJokeCount | null>(null);


    useEffect(() => {
        async function load() {

            const token = localStorage.getItem("secureToken");

            const res = await fetch("http://localhost:65451/api/Authentication/profile", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                }
            });

            if (!res.ok) {
                return;
            }



            const profileData: userToGetJokeCount = await res.json();
            setData(profileData);


        }
        load();

    }, [user?.userId]);
    console.log(data?.jokeCount, data?.jokes, data?.jokes, data?.userId);
    return (
      <>
          <h1>Your profile</h1>
          <div className="profile-container">
              <div className="profile-flex-box">
                  <img src={usr_icon}/>
                  <p>Nickname: {data?.userName}</p>
                  <p>Total number of your jokes: <span>{data?.jokeCount}</span></p>
              </div>

              <p>Your jokes:</p>
              {data?.jokes.map(j => (
                  <div className="joke-profile-container" key={j.jokeId}>
                     <Link to={`/jokes/${j.jokeId}`} > <p>{j.jokeContent}</p></Link>
                  </div>
              ))}
          </div>

      </>

    );
}

export default Profile;