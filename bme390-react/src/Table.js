import React, { Component } from 'react'
import './Table.css'

class Table extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         patient_data: props.patient_data,
         filters: props.filters
      }
   }

   renderTableData(patient,number) {
       var patient_info = []
        for (var key2 in this.props.filters) {
            var filter_name = <td>{patient[this.props.filters[key2]]}</td>
            patient_info.push(filter_name)
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

        return (
            <div>
                <table id='patients'>
                    <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {result}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Table