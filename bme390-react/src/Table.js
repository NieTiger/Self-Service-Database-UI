import React, { Component } from 'react'
import './Table.css'

class Table extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         patient_data: props.patient_data,
         filters: props.filters
      }
      this.give_good_input = this.give_good_input.bind(this)
      console.log(props)
   }

   give_good_input(item) {
       if (typeof item === "string") {
           return item
       }
       else if (typeof item === "number") {
           return item
       }
       else {
           let result = "";
           for (var key in item) {
               result += key + ": " + item[key] + "\n"
           }
           return result
       }
   }

   renderTableData(patient,number) {
       var patient_info = []
        for (var key2 in this.props.filters) {
            let cell_info = null
            cell_info = <td>{this.give_good_input(patient[this.props.filters[key2]])}</td>
            if (this.props.submit_function) {
                for (var key3 in this.props.submit_function) {
                    let funct = this.props.submit_function[key3]
                    if (funct.indexOf(this.props.filters[key2]) !== -1) {
                        cell_info = <td>
                            <button className = "button" onClick = {() => funct[1](funct[2],patient)}> {patient[this.props.filters[key2]]} </button>
                        </td>
                    }
                }
            }
            patient_info.push(cell_info)
        }
        var full_item = <tr key={number}>{patient_info}</tr>
        return full_item
    }

    renderTableHeader() {
        let header = Object.keys(this.props.filters)
        return header.map((key, index) => {
            return <th key={index}>{this.props.filters[key].toUpperCase()}</th>
        })
    }
  
    render() {
        var result = []
        let count = 0
        for (var key in this.props.patient_data) {
            count += 1
            var patient = this.props.patient_data[key]
            var patient_info = this.renderTableData(patient,count)
            result.push(patient_info)
        }

        var table_values = this.renderTableHeader()

        return (
            <div>
                <table id='patients'>
                    <tbody>
                        <tr>{table_values}</tr>
                        {result}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Table