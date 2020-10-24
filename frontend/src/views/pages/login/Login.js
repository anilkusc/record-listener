import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", loggedIn: false };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleRedirectLogin = this.handleRedirectLogin.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleRedirectLogin(auth) {
    console.log(auth)
    if (auth == "true") {
      this.props.handleSetLoggedIn()
    } else if (auth == "false") {
      alert("Kullanıcı adı veya şifre yanlış")
    } else {
      alert("bilinmeyen hata")
    }
  }
  handleLogin() {
    /*
        const requestOptions = {
          method: 'POST',
          mode: "no-cors",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials": true
          },
          // body: '{"username": "' + this.state.username + '","password":"' + this.state.password + '"}'
          body: JSON.stringify({ username: this.state.username, password: this.state.password })
        };*/

    //const URL = "https://localhost:8080/login"
    /* fetch(URL, requestOptions)
       .then(response => response.json())
       .then(response => console.log(response))
       .then(data => this.handleRedirectLogin(data.authenticated)     
       );*/
    fetch("/backend/login", {
      body: "{\"username\":\"" + this.state.username + "\",\"password\":\"" + this.state.password + "\"}",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(response => response.json())
      .then(data => this.handleRedirectLogin(data.authenticated)
      );



  }

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Lütfen Giriş Yapın</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Kullanıcı adı" onChange={this.handleChangeUsername} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Parola" onChange={this.handleChangePassword} />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" className="px-4" onClick={this.handleLogin}>Giriş Yap</CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }

}
