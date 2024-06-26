import SeeQuizzProblemPage from "./pages/SeeQuizzProblemPage.jsx";

import("../node_modules/bootstrap/dist/js/bootstrap.min.js")


import Header from "./components/Header.jsx";
import ProblemsListPage from "./pages/ProblemsListPage.jsx";
import SendsListPage from "./pages/SendsListPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import SeeProblemPage from "./pages/SeeProblemPage.jsx";

import SeeSendPage from "./pages/SeeSendPage.jsx";
import StatusesPage from "./pages/StatusesPage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";

function App() {

    return (
        <BrowserRouter>
            <Header/>
            <div className="container">
                <div className="row my-4"></div>
                <div className="row">
                    <Routes>
                        <Route path="/problems" element={<ProblemsListPage/>}/>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/problems" element={<ProblemsListPage/>}/>
                        <Route path="/problems/:letter" element={<SeeProblemPage/>}/>
                        <Route path="/problems/:letter/quizz" element={<SeeQuizzProblemPage/>}/>
                        <Route path="/stats" element={<StatsPage/>}/>
                        <Route path="/sends" element={<SendsListPage/>}/>
                        <Route path="/sends/:id" element={<SeeSendPage/>}/>
                        <Route path="/statuses" element={<StatusesPage/>}/>
                    </Routes>


                    {/*<StatusesPage/>*/}
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
