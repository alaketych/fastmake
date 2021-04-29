import React from "react"
import logo from "../assets/images/Logo.png"
import "../sass/components/Bid.sass"

function Bid() {
    return (
        <section className="bid">
            <div className="content-inner">
                <div className="wrapper">
                    <div className="bid__text">
                        <div className="title">ShoppingCart</div>
                        <div className="description">The shopping cart project needs to create the shopping cart system to organize the
                            products record and the other information about the customers.How customers can buy
                            products from website can be recognized from their username and password. The
                            methodology used - Database design(MSSQL) Input design(.NET Web Api with C#)
                        </div>
                    </div>

                    <form action="/">

                    </form>

                    <img className="bid__picture" src={ logo } alt="" />
                </div>
            </div>
        </section>
    )
}

export default Bid