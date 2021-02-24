import React, { Component } from 'react';
import PopularData from './PopularData'
import '../../assets/style/new.css';

export default class Popular extends Component {
    render() {
        return (
            <>
                <section>
                    <div className="container mt-5">
                        <div className="title-new">
                            <h3>Popular</h3>
                            <p className="lead text-muted">Find clothes that are trending recently</p>
                        </div>
                    </div>
                </section>

                <article>
                    <div className="container">
                        <div className="row d-flex flex-row justify-content-start">
                            <PopularData />
                        </div>
                    </div>
                </article>
            </>
        )
    }
}