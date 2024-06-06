import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const token = localStorage.getItem("token")



    return (
        <div>
            {
                store.token ?
                    (<div className="d-flex justify-content-center">
                        <h1>ZONA PRIVADA</h1>
                        <img src="https://cdn-icons-png.flaticon.com/512/61/61355.png" />
                    </div>
                    ) :
                    (<div className="d-flex justify-content-center">
                        <h1>PROHIBIDO EL PASO</h1>
                        <img src="https://cdn-icons-png.flaticon.com/512/44/44622.png" />
                    </div>)
            }
        </div>
    )
}

export default Private
