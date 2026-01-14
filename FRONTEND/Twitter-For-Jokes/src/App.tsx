//React packages:
import {Route, Routes} from "react-router-dom";
//Modules:
import NavBar from "./Modules/Global/NavBar.tsx";
//Pages:
import Landing from "./Pages/Landing.tsx";
import Feed from "./Pages/Feed.tsx";

function App() {
  return (
      <>
          <div>
              <NavBar />
          </div>

          <div>
              <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/feed" element={<Feed />} />
              </Routes>
          </div>
      </>
  )
}

export default App;