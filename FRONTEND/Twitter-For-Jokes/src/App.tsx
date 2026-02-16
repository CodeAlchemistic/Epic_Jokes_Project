//React packages:
import {Route, Routes} from "react-router-dom";
//Modules:
import NavBar from "./Modules/Global/NavBar.tsx";
import Footer from "./Modules/Global/Footer.tsx";
//Pages:
import Landing from "./Pages/Landing.tsx";
import Feed from "./Pages/Feed.tsx";
import PlayGround from "./Pages/PlayGround.tsx";
import Creators from "./Pages/Creators.tsx";
import Register from "./Pages/Register.tsx";
import Login from "./Pages/Login.tsx";
import {AuthProvider} from "./Modules/Contexts/AuthContext.tsx";
import {Toaster} from "react-hot-toast";
import JokeDetailPage from "./Pages/JokeDetailPage.tsx";
import Profile from "./Pages/Profile/Profile.tsx";



function App() {
  return (
      <>
          <AuthProvider>
              <Toaster position="top-left" reverseOrder={false} />

              <NavBar />

              <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/profile" element={<Profile/>}></Route>
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/creators" element={<Creators />} />
                  <Route path="/playground" element={<PlayGround />} />

                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route path="/jokes/:id" element={<JokeDetailPage />} />
              </Routes>

              <Footer />
          </AuthProvider>
      </>

  )
}

export default App;