import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Search.scss";
import { Store } from "../../interfaces";
import { storeMockup } from "../../mockup";

export default function Search(props: any) {
    let [stores, setStores] = useState([]);

    function retira_acentos(str: any) {
        let com_acento =
            "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
        let sem_acento =
            "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
        let novastr = "";

        for (let i = 0; i < str.length; i++) {
            let troca = false;
            for (let a = 0; a < com_acento.length; a++) {
                if (str.substr(i, 1) == com_acento.substr(a, 1)) {
                    novastr += sem_acento.substr(a, 1);
                    troca = true;
                    break;
                }
            }
            if (troca == false) {
                novastr += str.substr(i, 1);
            }
        }
        return novastr;
    }

    function handleSearch(e: any) {
        e.preventDefault();

        let filtered: any = storeMockup.filter((item) =>
            retira_acentos(item.name?.toLowerCase()).includes(
                retira_acentos(e.target.value.toLowerCase())
            )
        );

        setStores(filtered);
    }

    function handleSelectStore(opened: any) {
        if (opened) {
            alert("yupi");
        }
    }

    return (
        <div className="search-page-container">
            <input
                type="text"
                className="search-page-input"
                placeholder="Procure por loja"
                onChange={(e) => handleSearch(e)}
            />
            {stores.length > 0 &&
                stores.map((store: Store) => (
                    <div
                        className={`store-display-container ${
                            !store.opened && "store-display-container-closed"
                        }`}
                        onClick={() => handleSelectStore(store.opened)}
                        key={Math.random()}
                    >
                        <img
                            src={store.img}
                            alt=""
                            className="store-display-img"
                        />
                        <div className="store-display-info-container">
                            <span className="store-display-title">
                                {store.name}
                            </span>
                            <div className="store-display-info-description-distance">
                                {store.description} - {store.distance}km
                            </div>
                            <div
                                className="store-display-info-description-distance
        store-display-info-align-delivery"
                            >
                                {store.delivery_fee ? (
                                    <span>
                                        R${" "}
                                        {store.delivery_fee &&
                                            store.delivery_fee.toFixed(2)}
                                    </span>
                                ) : (
                                    <span>Entrega Grátis</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            <Navbar props={props} />
        </div>
    );
}