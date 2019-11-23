import React, { Component } from 'react';
import './PatientsPage.css';
import Table from './Table.js';

class PatientsPage extends Component {

    constructor(props) {
        super(props);
        this.get_filters = this.get_filters.bind(this)
        this.get_data = this.get_data.bind(this)
        this.state = {
            original_filters: ["PT_ID"].concat(this.get_filters()).concat(["images"]),
            filters: ["PT_ID"].concat(this.get_filters()).concat(["images"]),
            patient_data: this.get_data()
        }
        this.show_hide_category_changed = this.show_hide_category_changed.bind(this)
        this.get_data_categories = this.get_data_categories.bind(this)
        this.categories_selected = this.categories_selected.bind(this)
        this.export_button_pressed = this.export_button_pressed.bind(this)
        this.export_filter_pressed = this.export_filter_pressed.bind(this)
        this.begin_export = this.begin_export.bind(this)
        this.export_category_selected = this.export_category_selected.bind(this)
    }

    export_button_pressed() {
        if (this.state.export_dropdown) {
            this.setState({export_dropdown:false})
        }
        else {
            this.setState({export_dropdown:[]})
        }
    }

    export_category_selected(category) {
        return (this.state.export_dropdown.indexOf(category) !== -1)
    }

    export_filter_pressed(category,item) {
        if (this.state[category].indexOf(item) === -1) {
            this.state[category].push(item)
            this.setState({[category]:this.state[category]})
        }
        else {
            var new_list = this.state[category].filter(function (name){
                return name !== item
            })
            this.setState({[category]:new_list})
        }
    }

    begin_export(){
        console.log(this.state.export_dropdown)
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
    get_filters() {
        let previous_state = this.props.app_state.prev_state
        let show_hide_filters = []
        for (var key in previous_state) {
            if (previous_state[key] instanceof Array) {
                let value = previous_state[key]
                if (value instanceof Array && typeof value[0] === "string") {
                    show_hide_filters.push(key)
                }
                else if (value instanceof Array && value[1] && value[1].length !== 0) {
                    show_hide_filters.push(key)
                }
            }
        }
        return show_hide_filters
    }
    get_data() {
        let patient_data = [
            { PT_ID: 1, eye_diagnosis: "retenal edema", systemic_diagnosis: "gout", age: 50, ethnicity: "asian", image_procedure_type: "AF-image", labs: "calcium", medication_generic_name: "atorvastatin", medication_therapuetic_name: "vitamins", vision: {"left_vision": "20/20","right_vision": "20/200"}, pressure: {"left_pressure": "100","right_pressure": "50"}, images: "link-to-image"},
            { PT_ID: 2, eye_diagnosis: "retenal edema", systemic_diagnosis: "gout", age: 50, ethnicity: "asian", image_procedure_type: "AF-image", labs: "calcium", medication_generic_name: "atorvastatin", medication_therapuetic_name: "vitamins", vision: {"left_vision": "20/20","right_vision": "20/200"}, pressure: {"left_pressure": "100","right_pressure": "50"}, images: "link-to-image"},
            { PT_ID: 3, eye_diagnosis: "retenal edema", systemic_diagnosis: "gout", age: 50, ethnicity: "asian", image_procedure_type: "AF-image", labs: "calcium", medication_generic_name: "atorvastatin", medication_therapuetic_name: "vitamins", vision: {"left_vision": "20/20","right_vision": "20/200"}, pressure: {"left_pressure": "100","right_pressure": "50"}, images: "link-to-image"},
            { PT_ID: 4, eye_diagnosis: "retenal edema", systemic_diagnosis: "gout", age: 50, ethnicity: "asian", image_procedure_type: "AF-image", labs: "calcium", medication_generic_name: "atorvastatin", medication_therapuetic_name: "vitamins", vision: {"left_vision": "20/20","right_vision": "20/200"}, pressure: {"left_pressure": "100","right_pressure": "50"}, images: "link-to-image"},
        ]
        return patient_data
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
        let export_dropdown = null;
        if (this.state.export_dropdown) {
            export_dropdown = <div className="export_dropdown">
                <div>
                    <input type="checkbox" checked={this.export_category_selected("by patient ID")} onChange = {() => this.export_filter_pressed("export_dropdown","by patient ID")}></input>
                    <label> by patient ID </label>
                </div>
                <div>
                    <input type="checkbox" checked={this.export_category_selected("by diagnosis")} onChange = {() => this.export_filter_pressed("export_dropdown","by diagnosis")}></input>
                    <label> by diagnosis </label>
                </div>
                <div>
                    <input type="checkbox" checked={this.export_category_selected("by image procedure")} onChange = {() => this.export_filter_pressed("export_dropdown","by image procedure")}></input>
                    <label> by image procedure </label>
                </div>
                <button className="export_button_concept" onClick={() => this.begin_export()}> Export Images</button>
            </div>
        }
        return (
            <div className = "whole_div">
                <div className = "title_div">
                    Your Patient Cohort
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
                        <Table patient_data = {this.state.patient_data} filters = {this.get_data_categories()} submit_function = {[["PT_ID",this.props.submit_function,"patient history"],["images",this.props.submit_function,"view image"]]} ></Table>
                    </div>
                </div>
                <div className = "bottom_div">
                    <button className = "button_concept" onClick={() => this.props.submit_function("filter")}> Back To Filters Page</button>
                    <button className = "button_concept" onClick={() => this.props.submit_function("patient exams")}> Go To All Patient Exams Page</button>
                    <button className = "button_concept" onClick={() => this.export_button_pressed()}> Export All Images for Patient</button>
                    {export_dropdown}
                </div>
            </div>
        )
    }
}

export default PatientsPage;