import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CLabel,
  CButton,
  CSelect,
  CRow
} from '@coreui/react'

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: false, day: "01", month: "01", year: "2019" };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeDay = this.handleChangeDay.bind(this);
    this.handleChangeMonth = this.handleChangeMonth.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
  }

  handleChangeDay(event) {
    this.setState({ day: event.target.value });
  }
  handleChangeMonth(event) {
    this.setState({ month: event.target.value });
  }
  handleChangeYear(event) {
    this.setState({ year: event.target.value });
  }

  handleSearch() {
    let date = this.state.year + "/" + this.state.month + "/" + this.state.day
    /*const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"date": "'+date+'"}'
  };
  fetch('/list', requestOptions)        
      .then(response => response.json())
      .then(data => this.props.showForm(date,data));
*/
    fetch("/backend/list", {
      body: "{\"date\":\"" + date+ "\"}",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(response => response.json())
      .then(data => this.props.showForm(date,data)
      );

  }

  render() {
    return (
      <div>
        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>
              <h4>Kayıt Arama</h4><br></br>
              <h5>{this.state.day}/{this.state.month}/{this.state.year}</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="ccmonth">Gün</CLabel>
                    <CSelect custom name="ccmonth" id="ccmonth" onChange={this.handleChangeDay} >
                      <option value="01">1</option>
                      <option value="02">2</option>
                      <option value="03">3</option>
                      <option value="04">4</option>
                      <option value="05">5</option>
                      <option value="06">6</option>
                      <option value="07">7</option>
                      <option value="08">8</option>
                      <option value="09">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="ccmonth">Ay</CLabel>
                    <CSelect custom name="ccmonth" id="ccmonth" onChange={this.handleChangeMonth} >
                      <option value="01">1</option>
                      <option value="02">2</option>
                      <option value="03">3</option>
                      <option value="04">4</option>
                      <option value="05">5</option>
                      <option value="06">6</option>
                      <option value="07">7</option>
                      <option value="08">8</option>
                      <option value="09">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="ccyear">Yıl</CLabel>
                    <CSelect custom name="ccyear" id="ccyear" onChange={this.handleChangeYear}>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                      <option value="2031">2031</option>
                      <option value="2032">2032</option>
                    </CSelect>
                  </CFormGroup>
                  <CButton block color="primary" onClick={this.handleSearch}>Ara</CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

      </div>
    );
  }
}