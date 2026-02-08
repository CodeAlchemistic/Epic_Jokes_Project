import { useAuth } from "../Contexts/AuthContext.tsx";

export default function UselessText() {
    const user = useAuth();


    /*const isAuthenticated = user?.user?.isAuthenticated;*/

    if (user.user?.isAuthenticated === true) {
        return (
            <div>
                <p>Jsem přihlášen</p>
            </div>
        )
    }else {
       return( <>
               <div>
                    <p>Nejsem přihlášen</p>
               </div>

        </>
       )
    }

}
