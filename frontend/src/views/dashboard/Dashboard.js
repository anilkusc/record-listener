import React from 'react'
import SearchForm from '../../myComponents/SearchForm'
import Records from '../../myComponents/Records'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  isContentSearch: true , records: "" };
    this.showForm = this.showForm.bind(this);
    this.showRecords = this.showRecords.bind(this);
  }

  showForm(searchDate,allData){
    this.setState({ isContentSearch: false , date: searchDate , records: allData});
  }
  showRecords(){
    this.setState({ isContentSearch: true , });
  }
  
  render(){
    
  let content = ""
  this.state.isContentSearch ? (content =  <SearchForm showForm={this.showForm}/>) :( content =  <Records records={this.state.records} date={this.state.date} showRecords={this.showRecords}/>)
  
  return (
    <div>
      {content}
    </div>
    
  );
}
}

