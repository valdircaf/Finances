import React from "react";
import '../Styles/Cards.scss'

export default function Cards({title, value, className}){
    return(
        <section className={className ? className : "card"}>
            <div className="title">
                <div className="color"></div>
                <h1>{title}</h1>
            </div>
            <div className="value">
                <h2>R${value},00</h2>
            </div>
        </section>
    );
}