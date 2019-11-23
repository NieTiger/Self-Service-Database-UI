import React, { Component } from 'react';
import FilterPage from "./FilterPage.js";
import PatientsPage from "./PatientsPage.js";

class PageSelector extends Component {

    constructor() {
        super()
        this.state = {
            "page": "filter",
            "prev_state": null
        }
        this.filter_submit_pressed = this.filter_submit_pressed.bind(this);
    }

    filter_submit_pressed(items) {
        this.setState({
            "page":"patients",
            "prev_state": items
        })
    }

    render() {
        let view = null
        if (this.state.page === "filter") {
            view = <FilterPage app_state = {this.state} submit_function = {this.filter_submit_pressed}></FilterPage>
        }
        else if (this.state.page === "patients") {
            view = <PatientsPage app_state = {this.state}></PatientsPage>
        }
        return (
            <div>{view}</div>
        )
    }

}

export default PageSelector;