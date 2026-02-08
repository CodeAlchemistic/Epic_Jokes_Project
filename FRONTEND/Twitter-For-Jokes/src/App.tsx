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



function App() {
  return (
      <>
          <AuthProvider>
          <div>
              <NavBar />
              <Routes>
                  <Route path="/login" element={<Login/>}></Route>
                  <Route path="/register" element={<Register/>}></Route>
              </Routes>
          </div>

          <div>
              <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/creators" element={<Creators />}></Route>
                  <Route path="/playground" element={<PlayGround />} />
              </Routes>
          </div>
          <div>
              <Footer></Footer>
          </div>
          </AuthProvider>
      </>

  )
}

export default App;