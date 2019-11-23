import React, { Component } from 'react';
import "./PatientHistoryPage.css";
import Table from './Table.js';

class PatientHistoryPage extends Component {
    constructor(props) {
        super(props);
        this.get_summary_data = this.get_summary_data.bind(this)
        this.get_summary_data_columns = this.get_summary_data_columns.bind(this)
        this.get_appointment_data = this.get_appointment_data.bind(this)
        this.get_appointment_data_columns = this.get_appointment_data_columns.bind(this)
        this.state = {
            PT_ID: this.props.app_state.prev_state,
            patient_summary_data: this.get_summary_data(),
            patient_appointment_data: this.get_appointment_data(),
            original_filters: this.get_appointment_data_columns(),
            filters: this.get_appointment_data_columns(),
        }
        this.show_hide_category_changed = this.show_hide_category_changed.bind(this)
        this.get_data_categories = this.get_data_categories.bind(this)
        this.categories_selected = this.categories_selected.bind(this)
    }

    get_data_categories() {
        let result = []
        for (var i in this.state.original_filters) {
            if (this.state.filters.indexOf(this.state.original_filters[i]) !== -1) {
                result.push(this.state.original_filters[i])
            }
        }
        return result
    }

    categories_selected(category) {
        return (this.state.filters.indexOf(category) !== -1)
    }

    show_hide_category_changed(item) {
        if (this.state.filters.indexOf(item) === -1) {
            this.state.filters.push(item)
            this.setState({filters:this.state.filters})
        }
        else {
            var new_list = this.state.filters.filter(function (name){
                return name !== item
            })
            this.setState({filters:new_list})
        }
    } 

    get_summary_data() {
        let first_column = "Patient ID ".concat(this.props.app_state.prev_state)
        let patient_data = [
            {[first_column]: "Current Values", "Left Vision": "20/20", "Right Vision": "20/20", "Left Pressure": 13, "Right Pressure": 15, "Diagnoses": "Sarcoidosis\nRetinal Edema\nGout", "Medication": "Ketorolac\nFentanyl\nFolic acid"}
        ]
        return patient_data
    }
    get_summary_data_columns() {
        let first_column = "Patient ID ".concat(this.props.app_state.prev_state)
        let columns = [first_column, "Left Vision", "Right Vision", "Left Pressure", "Right Pressure", "Diagnoses", "Medication"]
        return columns
    }

    get_appointment_data() {
        let patient_data = [
            {"Date": "2014-03-10","Medication": "Ketorolac", "Therapeutic Class": "CNS Agent", "Eye Diagnoses": "Retinal edema", "Systemic Diagnoses" : "Gout", "Lab Values": "Hemoglobin: 4\nHematocrit: 5","Left Vision": "20/20", "Right Vision": "20/20", "Left Pressure": "30", "Right Pressure": "30","Exam ID": 483752},
            {"Date": "2014-03-10","Medication": "Ketorolac", "Therapeutic Class": "CNS Agent", "Eye Diagnoses": "Retinal edema", "Systemic Diagnoses" : "Gout", "Lab Values": "Hemoglobin: 4\nHematocrit: 5","Left Vision": "20/20", "Right Vision": "20/20", "Left Pressure": "30", "Right Pressure": "30","Exam ID": 483752},
            {"Date": "2014-03-10","Medication": "Ketorolac", "Therapeutic Class": "CNS Agent", "Eye Diagnoses": "Retinal edema", "Systemic Diagnoses" : "Gout", "Lab Values": "Hemoglobin: 4\nHematocrit: 5","Left Vision": "20/20", "Right Vision": "20/20", "Left Pressure": "30", "Right Pressure": "30","Exam ID": 483752},
            {"Date": "2014-03-10","Medication": "Ketorolac", "Therapeutic Class": "CNS Agent", "Eye Diagnoses": "Retinal edema", "Systemic Diagnoses" : "Gout", "Lab Values": "Hemoglobin: 4\nHematocrit: 5","Left Vision": "20/20", "Right Vision": "20/20", "Left Pressure": "30", "Right Pressure": "30","Exam ID": 483752},
            {"Date": "2014-03-10","Medication": "Ketorolac", "Therapeutic Class": "CNS Agent", "Eye Diagnoses": "Retinal edema", "Systemic Diagnoses" : "Gout", "Lab Values": "Hemoglobin: 4\nHematocrit: 5","Left Vision": "20/20", "Right Vision": "20/20", "Left Pressure": "30", "Right Pressure": "30","Exam ID": 483752},
            {"Date": "2014-03-10","Medication": "Ketorolac", "Therapeutic Class": "CNS Agent", "Eye Diagnoses": "Retinal edema", "Systemic Diagnoses" : "Gout", "Lab Values": "Hemoglobin: 4\nHematocrit: 5","Left Vision": "20/20", "Right Vision": "20/20", "Left Pressure": "30", "Right Pressure": "30","Exam ID": 483752}
        ]
        return patient_data
    }

    get_appointment_data_columns() {
        let columns = ["Date", "Medication", "Therapeutic Class", "Eye Diagnoses", "Systemic Diagnoses", "Lab Values", "Left Vision", "Right Vision", "Left Pressure", "Right Pressure","Exam ID"]
        return columns
    }

    render() {
        let show_hide_filters = []
        for (var key in this.state.original_filters) {
            let category = this.state.original_filters[key]
            let show_hide_label = <div className="show_hide_category">
                <input type="checkbox" checked={this.categories_selected(category)} onChange = {() => this.show_hide_category_changed(category)} ></input>
                <label> {category} </label>
            </div>
            show_hide_filters.push(show_hide_label)
        }
        return (
            <div className = "whole_div">
                <div className = "title_div">
                    Individual Patient History- ID: {this.props.app_state.prev_state}
                </div>
                <div className = "before_body_div">
                    <Table patient_data = {this.state.patient_summary_data} filters = {this.get_summary_data_columns()}></Table>
                </div>
                <div className = "body_div">
                    <div className = "show_hide_panel">
                        <div className = "show_hide_t">
                            Show/Hide
                            <div className="show_hide_c">
                                {show_hide_filters}
                            </div>
                        </div>
                    </div>
                    <div className="table_design">
                        <Table patient_data = {this.state.patient_appointment_data} filters = {this.get_data_categories()}></Table>
                    </div>
                </div>
                <div className = "bottom_div">
                    <button className = "button_concept" onClick={() => this.props.submit_function("patients",this.props.filters)}> Back To Patients Page</button>
                    <button className = "button_concept" onClick={() => this.props.submit_function("patient images",this.props.app_state.prev_state)}> See All Patient's Images</button>
                </div>
            </div>
        )
    }
}

export default PatientHistoryPage;