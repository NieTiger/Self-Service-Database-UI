import React, { Component } from 'react';
import './FilterPage.css';
import { apiBaseURL } from './config'

class FilterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            "eye_diagnosis" : false,
            "eye_diagnosis_categories" : false,
            "systemic_diagnosis": false,
            "systemic_diagnosis_categories": false,
            "age": false,
            "ethnicity": false,
            "image_procedure_type": false,
            "image_procedure_type_categories": false,
            "labs": false,
            "labs_categories": false,
            "medication_generic_name": false,
            "medication_generic_name_categories": false,
            "medication_therapuetic_name": false,
            "medication_therapuetic_name_categories": false,
            "vision": false,
            "pressure": false,
        }
        this.category_pressed = this.category_pressed.bind(this);
        this.category_filter_pressed = this.category_filter_pressed.bind(this);
        this.default_value_change = this.default_value_change.bind(this); 
        this.back_pressed = this.back_pressed.bind(this);

        this.get_eye_diagnosis_categories = this.get_eye_diagnosis_categories.bind(this);
        this.get_systemic_diagnosis_categories = this.get_systemic_diagnosis_categories.bind(this);
        this.get_image_procedure_type_categories = this.get_image_procedure_type_categories.bind(this);
        this.get_labs_categories = this.get_labs_categories.bind(this)
        this.get_medication_generic_name_categories = this.get_medication_generic_name_categories.bind(this);
        this.get_medication_therapuetic_name_categories = this.get_medication_therapuetic_name_categories.bind(this);
    }

    get_eye_diagnosis_categories(link) {
        let currentComponent = this;
        const axios = require('axios');
        axios.get(link)
            .then(function (response) {
            currentComponent.setState({"eye_diagnosis_categories":response.data.data})
        })
            .catch(function (error) {
            console.log(error);
        }) 
    }

    get_systemic_diagnosis_categories(link) {
        let currentComponent = this;
        const axios = require('axios');
        axios.get(link)
            .then(function (response) {
            currentComponent.setState({"systemic_diagnosis_categories":response.data.data})
        })
            .catch(function (error) {
            console.log(error);
        }) 
    }
    
    get_image_procedure_type_categories(link) {
        let currentComponent = this;
        const axios = require('axios');
        axios.get(link)
            .then(function (response) {
            currentComponent.setState({"image_procedure_type_categories":response.data.data})
        })
            .catch(function (error) {
            console.log(error);
        }) 
    }

    get_labs_categories (link) {
        let currentComponent = this;
        const axios = require('axios');
        axios.get(link)
            .then(function (response) {
            currentComponent.setState({"labs_categories":response.data.data})
        })
            .catch(function (error) {
            console.log(error);
        }) 
    }

    get_medication_generic_name_categories (link) {
        let currentComponent = this;
        const axios = require('axios');
        axios.get(link)
            .then(function (response) {
            currentComponent.setState({"medication_generic_name_categories":response.data.data})
        })
            .catch(function (error) {
            console.log(error);
        }) 
    }

    get_medication_therapuetic_name_categories (link) {
        let currentComponent = this;
        const axios = require('axios');
        axios.get(link)
            .then(function (response) {
            currentComponent.setState({"medication_therapuetic_name_categories":response.data.data})
        })
            .catch(function (error) {
            console.log(error);
        }) 
    }

    category_pressed(category,item) {
        if (this.state[category] === false) {
            this.setState({[category]: item})
        }
        else {
            this.setState({[category]: false})
        }
    }

    category_filter_pressed(e,category) {
        let item = e.target.value;
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

    default_value_change(category,subcategory, value) {
        this.state[category][0][subcategory] = value
        this.setState({[category]:this.state[category]})
    }

    back_pressed() {
        let default_state = {
            "eye_diagnosis" : false,
            "systemic_diagnosis": false,
            "age": false,
            "ethnicity": false,
            "image_procedure_type": false,
            "labs": false,
            "medication_generic_name": false,
            "medication_therapuetic_name": false,
            "vision": false,
            "pressure": false
        } 
        this.setState(default_state)
    }

    render() {
        let div_eye_diagnosis = <div className = "hidden"></div>;
        if (this.state.eye_diagnosis !== false) {
            let category = "eye_diagnosis"
            if (this.state.eye_diagnosis_categories === false) {
                this.get_eye_diagnosis_categories(apiBaseURL + '/ssd_api/get_distinct?special=eye_diagnosis')
            }
            var category_options = this.state.eye_diagnosis_categories;
            let temp_div_eye_diagnosis = [<div className="table-title">Eye Diagnosis</div>]
            
            for (var i = 0; i < category_options.length; i++) {
                var option = category_options[i]
                this.option = category_options[i];
                let temp_filter = <div className="filter-choice">
                    <input type="checkbox" value={option} onChange = {e => this.category_filter_pressed(e, category)}></input>
                    <label className="label-choice"> {option} </label>
                </div>
                temp_div_eye_diagnosis.push(temp_filter)
            }
            div_eye_diagnosis = <div className = "subfilter-choice"> {temp_div_eye_diagnosis} </div>
        }

        let div_systemic_diagnosis = <div className = "hidden"></div>;
        if (this.state.systemic_diagnosis !== false) {
            console.log("hello")
            let category = "systemic_diagnosis"
            if (this.state.systemic_diagnosis_categories === false) {
                this.get_systemic_diagnosis_categories(apiBaseURL + '/ssd_api/get_distinct?special=systemic_diagnosis')
            }
            var category_options = this.state.systemic_diagnosis_categories;
            let temp_div_systemic_diagnosis = [<div className="table-title">Systemic Diagnosis</div>]
            
            for (var i = 0; i < category_options.length; i++) {
                var option = category_options[i]
                this.option = category_options[i];
                let temp_filter = <div className="filter-choice">
                    <input type="checkbox" value={option} onChange = {e => this.category_filter_pressed(e, category)}></input>
                    <label className="label-choice"> {option} </label>
                </div>
                temp_div_systemic_diagnosis.push(temp_filter)
            }
            div_systemic_diagnosis = <div className = "subfilter-choice"> {temp_div_systemic_diagnosis} </div>
        }

        let div_age = <div className = "hidden"></div>;
        if (this.state.age !== false) {
            let category = "age"
            div_age = <div className = "subfilter-choice">
                <div className="table-title">
                    Age
                </div>
                <div className="filter-choice">
                    <input type="checkbox" value={"less than"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                    <label className="label-choice"> less than
                        <input className="filter-textbox" type="text" onChange = {(input) => this.default_value_change(category,"less",input.target.value)} defaultValue= {this.state.age[0].less} />
                    </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" value={"greater than"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                    <label className="label-choice"> greater than
                        <input className="filter-textbox" type="text" onChange = {(input) => this.default_value_change(category,"greater",input.target.value)} defaultValue= {this.state.age[0].greater} />
                    </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" value={"equal to"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                    <label className="label-choice"> equal to 
                        <input className="filter-textbox" type="text" onChange = {(input) => this.default_value_change(category,"equal",input.target.value)} defaultValue= {this.state.age[0].equal} />
                    </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" value={"between"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                    <label className="label-choice"> 
                        between
                        <input className="filter-textbox" type="text" onChange = {(input) => this.default_value_change(category,"between_less",input.target.value)} defaultValue= {this.state.age[0].between_less}/>
                        and
                        <input className="filter-textbox" type="text" onChange = {(input) => this.default_value_change(category,"between_greater",input.target.value)} defaultValue= {this.state.age[0].between_greater}/>
                    </label>
                </div>
            </div>
        }
        
        let div_ethnicity = <div className = "hidden"></div>;
        if (this.state.ethnicity !== false) {
            let category = "ethnicity"
            div_ethnicity = <div className = "subfilter-choice">
                <div className="table-title">
                    Ethnicity
                </div>
                <div className="filter-choice">
                    <input type="checkbox" value={"Hispanic or Latino"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                    <label className="label-choice"> Hispanic or Latino </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" value={"Not Hispanic or Latino"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                    <label className="label-choice"> Not Hispanic or Latino </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" value={"Declined"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                    <label className="label-choice"> Declined </label>
                </div>
            </div>
        }

        let div_image_procedure_type = <div className = "hidden"></div>;
        if (this.state.image_procedure_type !== false) {
            let category = "image_procedure_type"
            if (this.state.image_procedure_type_categories === false) {
                this.get_image_procedure_type_categories(apiBaseURL + '/ssd_api/get_distinct?table_name=image_procedure&col_name=image_procedure')
            }
            var category_options = this.state.image_procedure_type_categories;
            let temp_div_image_procedure_type = [<div className="table-title">Image Procedure Type</div>]
            
            for (var i = 0; i < category_options.length; i++) {
                var option = category_options[i]
                let temp_filter = <div className="filter-choice">
                    <input type="checkbox" value={option} onChange = {e => this.category_filter_pressed(e, category)}></input>
                    <label className="label-choice"> {option} </label>
                </div>
                temp_div_image_procedure_type.push(temp_filter)
            }
            div_image_procedure_type = <div className = "subfilter-choice"> {temp_div_image_procedure_type} </div>
        }

        let div_labs = <div className = "hidden"></div>;
        if (this.state.labs !== false) {
            let category = "labs"
            if (this.state.labs_categories === false) {
                this.get_labs_categories(apiBaseURL + '/ssd_api/get_distinct?table_name=lab_value_deid&col_name=name')
            }

            var category_options = this.state.labs_categories;
            let temp_div_labs = [<div className="table-title">Labs</div>]
            
            for (var i = 0; i < category_options.length; i++) {
                var option = category_options[i]
                this.option = category_options[i];
                let temp_filter = <div className="filter-choice">
                    <input type="checkbox" value={option} onChange = {e => this.category_filter_pressed(e, category)}></input>
                    <label className="label-choice"> {option} </label>
                </div>
                temp_div_labs.push(temp_filter)
            }
            div_labs = <div className = "subfilter-choice"> {temp_div_labs} </div>
        }

        let div_medication_generic_name = <div className = "hidden"></div>;
        if (this.state.medication_generic_name !== false) {
            let category = "medication_generic_name"
            if (this.state.medication_generic_name_categories === false) {
                this.get_medication_generic_name_categories(apiBaseURL + '/ssd_api/get_distinct?table_name=medication_deid&col_name=generic_name')
            }
            var category_options = this.state.medication_generic_name_categories;
            let temp_div_medication_generic_name = [<div className="table-title">Medication Generic Name</div>]
            
            for (var i = 0; i < category_options.length; i++) {
                var option = category_options[i]
                this.option = category_options[i];
                let temp_filter = <div className="filter-choice">
                    <input type="checkbox" value={option} onChange = {e => this.category_filter_pressed(e, category)}></input>
                    <label className="label-choice"> {option} </label>
                </div>
                temp_div_medication_generic_name.push(temp_filter)
            }
            div_medication_generic_name = <div className = "subfilter-choice"> {temp_div_medication_generic_name} </div>
        }

        let div_medication_therapuetic_name = <div className = "hidden"></div>;
        if (this.state.medication_therapuetic_name !== false) {
            let category = "medication_therapuetic_name"
            if (this.state.medication_therapuetic_name_categories === false) {
                this.get_medication_therapuetic_name_categories(apiBaseURL + '/ssd_api/get_distinct?table_name=medication_deid&col_name=therapeutic_class')
            }
            var category_options = this.state.medication_therapuetic_name_categories;
            let temp_div_medication_therapuetic_name = [<div className="table-title">Medication Therapuetic Name</div>]
            
            for (var i = 0; i < category_options.length; i++) {
                var option = category_options[i]
                this.option = category_options[i];
                let temp_filter = <div className="filter-choice">
                    <input type="checkbox" value={option} onChange = {e => this.category_filter_pressed(e, category)}></input>
                    <label className="label-choice"> {option} </label>
                </div>
                temp_div_medication_therapuetic_name.push(temp_filter)
            }
            div_medication_therapuetic_name = <div className = "subfilter-choice"> {temp_div_medication_therapuetic_name} </div>
        }

        let div_vision = <div className = "hidden"></div>;
        if (this.state.vision !== false) {
            let category = "vision"
            div_vision = <div>
                <div className = "subfilter-choice">
                    <div className="table-title">
                        Left Vision
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"left_less"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> worse than
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_less",input.target.value)} defaultValue= {this.state.vision[0].left_less}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"left_greater"} onChange = {e => this.category_filter_pressed(e, category)}></input>
                        <label className="label-choice"> better than
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_greater",input.target.value)} defaultValue= {this.state.vision[0].left_greater}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"left_equal"} onChange = {e => this.category_filter_pressed(e, category)}></input>
                        <label className="label-choice"> equal to
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_equal",input.target.value)} defaultValue= {this.state.vision[0].left_equal}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"left_between"} onChange = {e => this.category_filter_pressed(e, category)}></input>
                        <label className="label-choice"> 
                            between
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_between_less",input.target.value)} defaultValue= {this.state.vision[0].left_between_less}/>
                            {"&"}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_between_greater",input.target.value)} defaultValue= {this.state.vision[0].left_between_greater}/>
                        </label>
                    </div>
                </div>
                <div className = "subfilter-choice">
                    <div className="table-title">
                        Right Vision
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"right_less"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> worse than
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_less",input.target.value)} defaultValue= {this.state.vision[0].right_less}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"right_greater"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> better than
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_greater",input.target.value)} defaultValue= {this.state.vision[0].right_greater}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"right_equal"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> equal to
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_equal",input.target.value)} defaultValue= {this.state.vision[0].right_equal}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"right_between"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> 
                            between
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_between_less",input.target.value)} defaultValue= {this.state.vision[0].right_between_less}/>
                            {"&"}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_between_greater",input.target.value)} defaultValue= {this.state.vision[0].right_between_greater}/>
                        </label>
                    </div>
                </div>
            </div>
        }

        let div_pressure = <div className = "hidden"></div>;
        if (this.state.pressure !== false) {
            let category = "pressure"
            div_pressure = <div>
                <div className = "subfilter-choice">
                    <div className="table-title">
                        Left Pressure
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"left_less"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> less than
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_less",input.target.value)} defaultValue= {this.state.pressure[0].left_less}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"left_greater"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> greater than
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_greater",input.target.value)} defaultValue= {this.state.pressure[0].left_greater}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"left_equal"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> equal to
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_equal",input.target.value)} defaultValue= {this.state.pressure[0].left_equal}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"left_between"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> 
                            between
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_between_less",input.target.value)} defaultValue= {this.state.pressure[0].left_between_less}/>
                            {"&"}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_between_greater",input.target.value)} defaultValue= {this.state.pressure[0].left_between_greater}/>
                        </label>
                    </div>
                </div>
                <div className = "subfilter-choice">
                    <div className="table-title">
                        Right Pressure
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"right_less"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> less than
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_less",input.target.value)} defaultValue= {this.state.pressure[0].right_less}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"right_greater"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> greater than
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_greater",input.target.value)} defaultValue= {this.state.pressure[0].right_greater}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"right_equal"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> equal to
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_equal",input.target.value)} defaultValue= {this.state.pressure[0].right_equal}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" value={"right_between"} onChange = {e => this.category_filter_pressed(e,category)}></input>
                        <label className="label-choice"> 
                            between
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_between_less",input.target.value)} defaultValue= {this.state.pressure[0].right_between_less}/>
                            {"&"}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_between_greater",input.target.value)} defaultValue= {this.state.pressure[0].right_between_greater}/>
                        </label>
                    </div>
                </div>
            </div>
        }
        console.log(this.state)
        return (
            <div className="App-background">
                <h1 className="upper-text">Please Select Your Filters to Create a Patient Cohort</h1>
                <div className="filter-table">
                    <div className="table-title">Filters</div>
                    <div className="filter-choice">
                        <input type="checkbox" checked={this.state.eye_diagnosis !== false} onChange={() => this.category_pressed("eye_diagnosis",[])}></input>
                        <label className="label-choice">Eye_Diagnosis</label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" checked={this.state.systemic_diagnosis !== false} onChange={() => this.category_pressed("systemic_diagnosis",[])}></input>
                        <label className="label-choice">Systemic_Diagnosis </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" checked={this.state.age !== false} onChange={() => this.category_pressed("age",[{"less":"50","equal":"50","greater":"50","between_less": "45", "between_greater":"55"}])}></input>
                        <label className="label-choice">Age</label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" checked={this.state.ethnicity !== false} onChange={() => this.category_pressed("ethnicity",[])}></input>
                        <label className="label-choice">Ethnicity</label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" checked={this.state.image_procedure_type !== false} onChange={() => this.category_pressed("image_procedure_type",[])}></input>
                        <label className="label-choice">Image_Procedure_Type</label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" checked={this.state.labs !== false}  onChange={() => this.category_pressed("labs",[])}></input>
                        <label className="label-choice">Labs</label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" checked={this.state.medication_generic_name !== false} onChange={() => this.category_pressed("medication_generic_name",[])}></input>
                        <label className="label-choice">Medication_Generic_Name</label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" checked={this.state.medication_therapuetic_name !== false} onChange={() => this.category_pressed("medication_therapuetic_name",[])}></input>
                        <label className="label-choice">Medication_Therapuetic_Name</label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" checked={this.state.vision !== false} onChange={() => this.category_pressed("vision",[{"left_less":"20/100","left_equal":"20/100","left_greater":"20/100","left_between_less": "20/100", "left_between_greater":"20/20", "right_less":"20/100","right_equal":"20/100","right_greater":"20/100","right_between_less": "20/100", "right_between_greater":"20/20"}])}></input>
                        <label className="label-choice">Vision</label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" checked={this.state.pressure !== false} onChange={() => this.category_pressed("pressure",[{"left_less":"50","left_equal":"50","left_greater":"50","left_between_less": "45", "left_between_greater":"55", "right_less":"50","right_equal":"50","right_greater":"50","right_between_less": "45", "right_between_greater":"55"}])}></input>
                        <label className="label-choice">Pressure</label>
                    </div>
                </div>
                <button className="back_button" onClick={this.back_pressed}>Back</button>
                <button className="submit_button" onClick={() => this.props.submit_function("patients",this.state)}>Submit</button>
                {div_eye_diagnosis}
                {div_systemic_diagnosis}
                {div_age}
                {div_ethnicity}
                {div_image_procedure_type}
                {div_labs}
                {div_medication_generic_name}
                {div_medication_therapuetic_name}
                {div_vision}
                {div_pressure}
            </div>
    );
  }
}

export default FilterPage;