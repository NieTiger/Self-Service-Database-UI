import React, { Component } from 'react';
import './PatientsPage.css';
import Table from './Table.js';

class PatientsPage extends Component {

    constructor(props) {
        super(props);
        this.get_filters = this.get_filters.bind(this)
        this.get_filters_and_values = this.get_filters_and_values.bind(this)
        this.get_data = this.get_data.bind(this)
        this.state = {
            original_filters: ["PT_ID"].concat(this.get_filters()),
            filters: ["PT_ID"].concat(this.get_filters()),
            filters_and_values: this.get_filters_and_values(),
            patient_data: this.get_data()
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

    get_filters() {
        let previous_state = this.props.app_state.prev_state
        let show_hide_filters = []
        for (var key in previous_state) {
            if (previous_state [key] instanceof Array && previous_state [key].length !== 0) {
                show_hide_filters.push(key)
            }
        }
        return show_hide_filters
    }

    get_filters_and_values() {
        let previous_state = this.props.app_state.prev_state
        let filters_and_values = []
        for (var key in previous_state) {
            if (previous_state [key] instanceof Array && previous_state [key].length !== 0) {
                filters_and_values.push([key,previous_state[key]])
            }
        }
        return filters_and_values
    }

    get_data() {
        let patient_data = [
            { PT_ID: 1, eye_diagnosis: "retenal edema", systemic_diagnosis: "gout", age: 50, ethnicity: "asian", image_procedure_type: "AF-image", labs: "calcium", medication_generic_name: "atorvastatin", medication_therapuetic_name: "vitamins", vision: {"left_vision": "20/20","right_vision": "20/200"}, pressure: {"left_pressure": "100","right_pressure": "50"}},
            { PT_ID: 2, eye_diagnosis: "retenal edema", systemic_diagnosis: "gout", age: 50, ethnicity: "asian", image_procedure_type: "AF-image", labs: "calcium", medication_generic_name: "atorvastatin", medication_therapuetic_name: "vitamins", vision: {"left_vision": "20/20","right_vision": "20/200"}, pressure: {"left_pressure": "100","right_pressure": "50"}},
            { PT_ID: 3, eye_diagnosis: "retenal edema", systemic_diagnosis: "gout", age: 50, ethnicity: "asian", image_procedure_type: "AF-image", labs: "calcium", medication_generic_name: "atorvastatin", medication_therapuetic_name: "vitamins", vision: {"left_vision": "20/20","right_vision": "20/200"}, pressure: {"left_pressure": "100","right_pressure": "50"}},
            { PT_ID: 4, eye_diagnosis: "retenal edema", systemic_diagnosis: "gout", age: 50, ethnicity: "asian", image_procedure_type: "AF-image", labs: "calcium", medication_generic_name: "atorvastatin", medication_therapuetic_name: "vitamins", vision: {"left_vision": "20/20","right_vision": "20/200"}, pressure: {"left_pressure": "100","right_pressure": "50"}},
        ]
        return patient_data
    }

    render() {
        console.log(this.categories_selected("PT_IDc"))
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
            <div>
                <div className="title_div">
                    <div className="title_text">
                        Your Patient Cohort
                    </div>
                    <div className="patient_data_table">
                        <Table patient_data = {this.state.patient_data} filters = {this.get_data_categories()} ></Table>
                    </div>
                </div>
                <div>
                    <div className="show_hide">
                        <div className="show_hide_title">
                            Show/Hide
                            <div className="show_hide_category">
                                {show_hide_filters}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PatientsPage;