import React, { Component } from 'react';
import './FilterPage.css';

class FilterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        this.category_pressed = this.category_pressed.bind(this);
        this.category_filter_pressed = this.category_filter_pressed.bind(this);
        this.default_value_change = this.default_value_change.bind(this); 
        this.back_pressed = this.back_pressed.bind(this);
    }

    category_pressed(category,item) {
        if (this.state[category] === false) {
            this.setState({[category]: item})
        }
        else {
            this.setState({[category]: false})
        }
    }

    category_filter_pressed(category,item) {
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
            div_eye_diagnosis = <div className = "subfilter-choice">
                <div className="table-title">
                    Eye Diagnosis
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Retenal Edema")}></input>
                    <label className="label-choice">Retenal Edema</label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Acute Sinusitus")}></input>
                    <label className="label-choice">Acute Sinusitus</label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Macular puckering of retina")}></input>
                    <label className="label-choice">Macular puckering of retina</label>
                </div>
            </div>
        }

        let div_systemic_diagnosis = <div className = "hidden"></div>;
        if (this.state.systemic_diagnosis !== false) {
            let category = "systemic_diagnosis"
            div_systemic_diagnosis = <div className = "subfilter-choice">
                <div className="table-title">
                    Systemic Diagnosis
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Gout")}></input>
                    <label className="label-choice">Gout</label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Sarcoidosis")}></input>
                    <label className="label-choice">Sarcoidosis</label>
                </div>
            </div>
        }

        let div_age = <div className = "hidden"></div>;
        if (this.state.age !== false) {
            let category = "age"
            div_age = <div className = "subfilter-choice">
                <div className="table-title">
                    Age
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "less")}></input>
                    <label className="label-choice"> less than
                        <input className="filter-textbox" type="text" onChange = {(input) => this.default_value_change(category,"less",input.target.value)} defaultValue= {this.state.age[0].less} />
                    </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "greater")}></input>
                    <label className="label-choice"> greater than
                        <input className="filter-textbox" type="text" onChange = {(input) => this.default_value_change(category,"greater",input.target.value)} defaultValue= {this.state.age[0].greater} />
                    </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "equal")}></input>
                    <label className="label-choice"> equal to 
                        <input className="filter-textbox" type="text" onChange = {(input) => this.default_value_change(category,"equal",input.target.value)} defaultValue= {this.state.age[0].equal} />
                    </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "between")}></input>
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
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"White/Caucasian")}></input>
                    <label className="label-choice"> White/Caucasian </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Hispanic or Latino")}></input>
                    <label className="label-choice"> Hispanic or Latino </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Black/African American")}></input>
                    <label className="label-choice"> Black/African American </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Asian")}></input>
                    <label className="label-choice"> Asian </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Native American or Pacific Islander")}></input>
                    <label className="label-choice"> Native American or Pacific Islander </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Declined")}></input>
                    <label className="label-choice"> Declined </label>
                </div>
            </div>
        }

        let div_image_procedure_type = <div className = "hidden"></div>;
        if (this.state.image_procedure_type !== false) {
            let category = "image_procedure_type"
            div_image_procedure_type = <div className = "subfilter-choice">
                <div className="table-title">
                    Image Procedure Type
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"IR-OCT")}></input>
                    <label className="label-choice"> IR-OCT </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"AF-image")}></input>
                    <label className="label-choice"> AF-image </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"FA-image")}></input>
                    <label className="label-choice"> FA-image </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Anteior segment-OCT")}></input>
                    <label className="label-choice"> Anteior segment-OCT </label>
                </div>
            </div>
        }

        let div_labs = <div className = "hidden"></div>;
        if (this.state.labs !== false) {
            let category = "labs"
            div_labs = <div className = "subfilter-choice">
                <div className="table-title">
                    Labs
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Ventricular Rate")}></input>
                    <label className="label-choice"> Ventricular Rate </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Calcium")}></input>
                    <label className="label-choice"> Calcium </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Hemoglobin")}></input>
                    <label className="label-choice"> Hemoglobin </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Hematocrit")}></input>
                    <label className="label-choice"> Hematocrit </label>
                </div>
            </div>
        }

        let div_medication_generic_name = <div className = "hidden"></div>;
        if (this.state.medication_generic_name !== false) {
            let category = "medication_generic_name"
            div_medication_generic_name = <div className = "subfilter-choice">
                <div className="table-title">
                    Medication Generic Name
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Ketorolac")}></input>
                    <label className="label-choice"> Ketorolac </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Clindamycin")}></input>
                    <label className="label-choice"> Clindamycin </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"azithromycin")}></input>
                    <label className="label-choice"> azithromycin </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"atorvastatin")}></input>
                    <label className="label-choice"> atorvastatin </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"heparin")}></input>
                    <label className="label-choice"> heparin </label>
                </div>
            </div>
        }

        let div_medication_therapuetic_name = <div className = "hidden"></div>;
        if (this.state.medication_therapuetic_name !== false) {
            let category = "medication_therapuetic_name"
            div_medication_therapuetic_name = <div className = "subfilter-choice">
                <div className="table-title">
                    Medication Therapuetic Name
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"CNS Agent")}></input>
                    <label className="label-choice"> CNS Agent </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Gastrointestinal Agent")}></input>
                    <label className="label-choice"> Gastrointestinal Agent </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Respiratory Agents")}></input>
                    <label className="label-choice"> Respiratory Agents </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"Vitamins")}></input>
                    <label className="label-choice"> Vitamins </label>
                </div>
                <div className="filter-choice">
                    <input type="checkbox" onChange = {() => this.category_filter_pressed(category,"EENT PREPS")}></input>
                    <label className="label-choice"> EENT PREPS </label>
                </div>
            </div>
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
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "left_less")}></input>
                        <label className="label-choice"> {"\"<\""}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_less",input.target.value)} defaultValue= {this.state.vision[0].left_less}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "left_greater")}></input>
                        <label className="label-choice"> {"\">\""}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_greater",input.target.value)} defaultValue= {this.state.vision[0].left_greater}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "left_equal")}></input>
                        <label className="label-choice"> {"\"=\""}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_equal",input.target.value)} defaultValue= {this.state.vision[0].left_equal}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "left_between")}></input>
                        <label className="label-choice"> 
                            Between
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
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "right_less")}></input>
                        <label className="label-choice"> {"\"<\""}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_less",input.target.value)} defaultValue= {this.state.vision[0].right_less}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "right_greater")}></input>
                        <label className="label-choice"> {"\">\""}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_greater",input.target.value)} defaultValue= {this.state.vision[0].right_greater}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "right_equal")}></input>
                        <label className="label-choice"> {"\"=\""}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_equal",input.target.value)} defaultValue= {this.state.vision[0].right_equal}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "right_between")}></input>
                        <label className="label-choice"> 
                            Between
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
            div_vision = <div>
                <div className = "subfilter-choice">
                    <div className="table-title">
                        Left Pressure
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "left_less")}></input>
                        <label className="label-choice"> {"\"<\""}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_less",input.target.value)} defaultValue= {this.state.pressure[0].left_less}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "left_greater")}></input>
                        <label className="label-choice"> {"\">\""}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_greater",input.target.value)} defaultValue= {this.state.pressure[0].left_greater}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "left_equal")}></input>
                        <label className="label-choice"> {"\"=\""}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"left_equal",input.target.value)} defaultValue= {this.state.pressure[0].left_equal}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "left_between")}></input>
                        <label className="label-choice"> 
                            Between
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
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "right_less")}></input>
                        <label className="label-choice"> {"\"<\""}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_less",input.target.value)} defaultValue= {this.state.pressure[0].right_less}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "right_greater")}></input>
                        <label className="label-choice"> {"\">\""}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_greater",input.target.value)} defaultValue= {this.state.pressure[0].right_greater}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "right_equal")}></input>
                        <label className="label-choice"> {"\"=\""}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_equal",input.target.value)} defaultValue= {this.state.pressure[0].right_equal}/>
                        </label>
                    </div>
                    <div className="filter-choice">
                        <input type="checkbox" onChange = {() => this.category_filter_pressed(category, "right_between")}></input>
                        <label className="label-choice"> 
                            Between
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_between_less",input.target.value)} defaultValue= {this.state.pressure[0].right_between_less}/>
                            {"&"}
                            <input className="filter-textbox-2" type="text" onChange = {(input) => this.default_value_change(category,"right_between_greater",input.target.value)} defaultValue= {this.state.pressure[0].right_between_greater}/>
                        </label>
                    </div>
                </div>
            </div>
        }

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
                        <input type="checkbox" checked={this.state.vision !== false} onChange={() => this.category_pressed("vision",[{"left_less":"50","left_equal":"50","left_greater":"50","left_between_less": "45", "left_between_greater":"55", "right_less":"50","right_equal":"50","right_greater":"50","right_between_less": "45", "right_between_greater":"55"}])}></input>
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