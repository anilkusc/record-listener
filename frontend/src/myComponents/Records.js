import React from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'


const fields = ['id','isim', 'arayan', 'aranan', 'zaman', 'tür', 'dinle']

export default class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: this.props.date, allRecords: [] };
    this.handleForm = this.handleForm.bind(this);
  }
  componentDidMount() {
    let id = 0;
    let isim,arayan,aranan,zaman,tür,dinle,json;
    let usersDate = [];
    this.props.records.map((record) => {   
      isim=record.name
      arayan=record.caller
      aranan=record.called
      zaman=record.time
      if(record.type=="exten"){
        tür="dahili arama"
      }else if(record.type=="q"){
        tür="gelen arama"
      }else if(record.type=="out"){
        tür="giden arama"
      }else{
        tür="bilinmiyor"
      }
      dinle=record.name     
      json={ "id": id, "isim": isim, "arayan": arayan, "aranan": aranan, "zaman": zaman, "tür": tür, "dinle": dinle }
      id++
      usersDate.push(json)   
      return (null) 
   })
    this.setState({allRecords:usersDate})

  }

  handleForm() {
    this.props.showRecords()
  }

  render() {

    return (
      <div>

        <CButton block color="secondary" onClick={this.handleForm}>Aramaya Dön</CButton>
        <br></br>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <h4>Kayıtlar</h4> <h5>({this.state.date})</h5>
              </CCardHeader>
              <CCardBody>
                <CDataTable
                  items={this.state.allRecords}
                  fields={fields}
                  hover
                  striped
                  bordered
                  size="sm"
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                    'dinle':
                      (item) => (
                        <td>
                          <CBadge >
                            <Audio date={this.state.date} record={item}></Audio>
                          </CBadge>
                        </td>
                      )

                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

      </div>
    );
  }
}
class Audio extends React.Component {
  
  render() {
    return (
      <div>
        <audio src={"./records/"+this.props.date+"/"+this.props.record.isim} ref={(audio) => { this.audio = audio }} controls />
      </div>
    );
  }
}