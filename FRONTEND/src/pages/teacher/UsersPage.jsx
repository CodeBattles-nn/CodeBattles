import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import getApiAddress from "../../utils/api";
import apiAxios from "../../apiAxios";
import If from "../../components/If";
import PageTitle from "../../components/PageTitle";

import "./printMode.css"

const ProblemsPage = () => {

    const [isPrintMode, setIsPrintMode] = useState(false);

    const [users, setUsers] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        apiAxios.get(getApiAddress() + `/api/teacher/champs/${id}/users`).then(
            (data) => {
                setUsers(data.data)
                console.log(data)
            })
    }, []);


    const getClassOrSkip = (className) => {
        if (isPrintMode) return " printMode "
        else return className;
    }
    const gc = getClassOrSkip;

    return (<><PageTitle title="Задачи"/>
            <div className="row">
                <div className="col-12">
                    <div className="jumbotron theme-bg-light  p-3">
                        <h4>Пользователи</h4>

                        <Link to={"add"}>
                            <button className="btn btn-outline-success">Добавить</button>
                        </Link>
                        <div className="form-check form-switch m-2">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                   onClick={() => setIsPrintMode(!isPrintMode)}/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Режим печати
                            </label>
                        </div>
                        <div className="table-responsive mt-3">
                            <table className={gc("table-striped table-bordered") + " table"}>
                                <thead>
                                <tr>
                                    <th scope="col">ФИО</th>
                                    <If
                                        condition={isPrintMode}
                                        is_true={<th scope="col">id</th>
                                        }
                                    />
                                    <th scope="col">Логин</th>
                                    <th scope="col">Пароль</th>
                                </tr>
                                </thead>
                                <tbody>

                                {
                                    users.map((user) => {

                                        let css_class = "";

                                        if (css_class !== "") {
                                            css_class += " theme-text-dark"
                                        }

                                        return (
                                            <tr key={user} className={css_class}>
                                                <th className={gc()}>{user.name}</th>
                                                <If
                                                    condition={isPrintMode}
                                                    is_true={<th className={gc()} scope="col">{id}</th>}
                                                />
                                                <th className={gc()}>{user.login}</th>
                                                <th className={gc()}>
                                                    <If condition={true}
                                                        is_true={user.password}
                                                        is_false='*******'
                                                    />

                                                </th>


                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ProblemsPage;