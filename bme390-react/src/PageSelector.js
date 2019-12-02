import React, { Component } from 'react';
import FilterPage from "./FilterPage.js";
import PatientsPage from "./PatientsPage.js";
import PatientHistoryPage from "./PatientHistoryPage.js";
import PatientImagePage from "./PatientImagePage.js";
import PatientExamPage from "./PatientExamPage.js";
import ShowPatientImagePage from "./ShowPatientImagePage.js";

class PageSelector extends Component {

    constructor() {
        super()
        this.state = {
            "page": "filter",
            "prev_state": null
        }
        this.to_page_submit = this.to_page_submit.bind(this)
    }

    to_page_submit(page,items) {
        this.setState({
            "page": page,
            "prev_state": items
        })
    }

    render() {
        let view = null
        if (this.state.page === "filter") {
            view = <FilterPage app_state = {this.state} submit_function = {this.to_page_submit}></FilterPage>
        }
        else if (this.state.page === "patients") {
            this.state.filters = this.state.prev_state
            view = <PatientsPage app_state = {this.state} submit_function = {this.to_page_submit}></PatientsPage>
        }
        else if (this.state.page === "patient history") {
            view = <PatientHistoryPage app_state = {this.state} submit_function = {this.to_page_submit} filters = {this.state.filters}></PatientHistoryPage>
        }
        else if (this.state.page === "patient images") {
            view = <PatientImagePage app_state = {this.state} submit_function = {this.to_page_submit} filters = {this.state.filters}></PatientImagePage>
        }
        else if (this.state.page === "patient exams") {
            view = <PatientExamPage app_state = {this.state} submit_function = {this.to_page_submit} filters = {this.state.filters}></PatientExamPage>
        }
        else if (this.state.page === "view image") {
            view = <ShowPatientImagePage app_state = {this.state} submit_function = {this.to_page_submit} filters = {this.state.filters}></ShowPatientImagePage>
        }
        return (
            <div>{view}</div>
        )
    }

}

export default PageSelector;