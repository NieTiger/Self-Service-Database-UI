import React, { Component } from 'react';
import "./PatientImagePage.css";
import Table from './Table.js';

class PatientImagePage extends Component {
    constructor(props) {
        super(props);
        this.get_data = this.get_data.bind(this)
        this.get_filters = this.get_filters.bind(this)
        this.state = {
            PT_ID: this.props.app_state.prev_state,
            patient_history_data: this.get_data(),
            original_filters: this.get_filters(),
            filters: this.get_filters(),
            export_dropdown: false,
        }
        this.get_data_categories = this.get_data_categories.bind(this)
        this.categories_selected = this.categories_selected.bind(this)
        this.show_hide_category_changed = this.show_hide_category_changed.bind(this)
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

    get_filters() {
        let filters = ["PT_ID","Exam_ID","Exam_Date","Image_ID","Image_Procedure", "Image_Laterality", "Link_To_Image"];
        return filters
    }

    get_data() {
        let patient_data = [
            { PT_ID: this.props.app_state.prev_state.PT_ID, Exam_ID: 23534235, Exam_Date: "2014-10-10", Image_ID: 12312412, Image_Procedure: "IR_OCT", Image_Laterality: "OS", Link_To_Image: "link-to-image"},
            { PT_ID: this.props.app_state.prev_state.PT_ID, Exam_ID: 23534235, Exam_Date: "2014-10-10", Image_ID: 12312412, Image_Procedure: "IR_OCT", Image_Laterality: "OS", Link_To_Image: "link-to-image"},
            { PT_ID: this.props.app_state.prev_state.PT_ID, Exam_ID: 23534235, Exam_Date: "2014-10-10", Image_ID: 12312412, Image_Procedure: "IR_OCT", Image_Laterality: "OS", Link_To_Image: "link-to-image"},
            { PT_ID: this.props.app_state.prev_state.PT_ID, Exam_ID: 23534235, Exam_Date: "2014-10-10", Image_ID: 12312412, Image_Procedure: "IR_OCT", Image_Laterality: "OS", Link_To_Image: "link-to-image"}
        ]
        return patient_data
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
                    Individual Patient Images- ID: {this.props.app_state.prev_state.PT_ID}
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
                        <Table patient_data = {this.state.patient_history_data} filters = {this.get_data_categories()} submit_function = {[["Link_To_Image",this.props.submit_function,"image view"]]} ></Table>
                    </div>
                </div>
                <div className = "bottom_div">
                    <button className = "button_concept" onClick={() => this.props.submit_function("patients",this.props.filters)}> Back To Patients Page</button>
                    <button className = "button_concept" onClick={() => this.export_button_pressed()}> Export All Images for Patient</button>
                    {export_dropdown}
                </div>
            </div>
        )
    }
}

export default PatientImagePage;