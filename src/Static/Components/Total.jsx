import React from "react";
import SVGCoin from '../Images/SVG Coin.svg';
import '../Styles/Total.scss';
import GreenArrow from '../Images/green arrow.svg';
import RedArrow from '../Images/red arrow.svg';

export default function Total({value}){
    return(
        <section className="container">
            <div className="svg-coin">
                <img src={SVGCoin} alt="Coin SVG" />
            </div>
            <div className="infos">
                <h2>Sobra</h2>
                <h1>R${value},00</h1>
            </div>
            <div className="svg-arrow">
                {value > 0 ? <img src={GreenArrow}/> : <img src={RedArrow}/>}
            </div>
        </section>
    );
}