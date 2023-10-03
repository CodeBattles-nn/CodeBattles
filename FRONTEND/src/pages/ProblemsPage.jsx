import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const ProblemsPage = (props) => {

    const [problems, setProblems] = useState({});

    useEffect(() => {
        axios.get("http://localhost:5000/api/problems").then(
            (r) => {
                console.log(r.data)
                setProblems(r.data.problems)
            }
        ).catch(() => console.log("ЧТо-то пошло не так"))
    }, []);


    return (
        <main style={{"background-color": "#ffe0b2", "min-height": " 94vh"}}>
            <div className="container ">
                <div className="row">
                    <div className="col" style={{minHeight: "50px"}}></div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="jumbotron bg-light table-bordered table-hover p-3">
                            <h4>Задачи</h4>
                            <p></p>
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Название</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        Object.keys(problems).map((letter) => {
                                            return (
                                                <tr key={letter}>
                                                    <th className="{{problem[2]}}" scope="row">{letter}</th>
                                                    <td className="{{problem[2]}}"><Link
                                                        to={`/problem/${letter}`}>{problems[letter]}</Link></td>
                                                </tr>
                                            )
                                        }, problems)
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
};

export default ProblemsPage;