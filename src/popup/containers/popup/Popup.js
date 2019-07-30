import React from 'react'
import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';
import sendMessage from '../../services/comunicationManager';

const axios = require('axios');

const override = css`
    display: block;
    margin: 0 auto;
    margin-top: 65px;
    border-color: red;
`;

export default class Popup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mocapi: '5c75c230',
      status: "home",
      fields: [],
    }
    this.checkUrl = this.checkUrl.bind(this)
    this.handleQuestions = this.handleQuestions.bind(this)
    this.getRandom = this.getRandom.bind(this)
    this.handleRecords = this.handleRecords.bind(this)
    this.fillTheForm = this.fillTheForm.bind(this)
  }

  checkUrl() {
    sendMessage('get-url')
      .then((response) => {
        let url = response.info
        let isJotform = url.includes("form.jotform.com")

        if (isJotform) {
          this.setState({ status: "analyzing" })
          sendMessage('get-questions')
            .then((response) => {
              this.handleQuestions(response.info)
            })
        } else {
          alert("Sorry, this is not a jotform form!")
        }
      })
  }

  handleQuestions(question) {
    this.setState(state => {
      const fields = [];
      return { fields }
    })

    let value = null

    for (const id in question) {
      if (question[id] !== null && question[id].name !== "tags") {
        switch (question[id].type) {
          case 'control_fullname':
            value = {
              "qid": question[id].qid,
              "qes": question[id].text,
              "name": "control_fullname",
              "type": "Full Name",
              "value": ""
            }
            break;
          case 'control_email':
            value = {
              "qid": question[id].qid,
              "qes": question[id].text,
              "name": "control_email",
              "type": "Email Address",
              "value": ""
            }
            break;
          case 'control_address':
            value = {
              "qid": question[id].qid,
              "qes": question[id].text,
              "name": "control_address",
              "type": "Street Address",
              "value": ""
            }
            break;
          case 'control_phone':
            value = {
              "qid": question[id].qid,
              "qes": question[id].text,
              "name": "control_phone",
              "type": "Phone",
              "format": "### ### ####",
              "value": ""
            }
            break;
          case 'control_datetime':
            value = {
              "qid": question[id].qid,
              "qes": question[id].text,
              "name": "control_datetime",
              "type": "Date",
              "format": "%m-%d-%Y",
              "value": ""
            }
            break;
          case 'control_time':
            value = {
              "qid": question[id].qid,
              "qes": question[id].text,
              "name": "control_time",
              "type": "Date",
              "format": "%H-%M-%p",
              "value": ""
            }
            break;
          case 'control_textbox':
            value = {
              "qid": question[id].qid,
              "qes": question[id].text,
              "name": "control_textbox",
              "type": "Words",
              "min": 1,
              "max": 5,
              "value": ""
            }
            break;
          case 'control_textarea':
            value = {
              "qid": question[id].qid,
              "qes": question[id].text,
              "name": "control_textarea",
              "type": "Words",
              "min": 5,
              "max": 20,
              "value": ""
            }
            break;
          case 'control_dropdown':
            value = {
              "qid": question[id].qid,
              "qes": question[id].text,
              "name": "control_dropdown",
              "type": "Title",
              "value": ""
            }
            break;
          case 'control_radio':
            value = {
              "qid": question[id].qid,
              "qes": question[id].text,
              "name": "control_radio",
              "type": "Title",
              "value": ""
            }
            break;
          case 'control_checkbox':
            value = {
              "qid": question[id].qid,
              "qes": question[id].text,
              "name": "control_checkbox",
              "type": "Title",
              "value": ""
            }
            break;
          case 'control_number':
            value = {
              "qid": question[id].qid,
              "qes": question[id].text,
              "name": "control_number",
              "type": "Number",
              "min": 1,
              "max": 99999,
              "decimals": 2,
              "value": ""
            }
            break;
          default: break;
        }

        if (value !== null) {
          this.setState(state => {
            const fields = state.fields.concat(value);
            return { fields }
          })
          value = null
        }
      }
    }

    this.getRandom()
  }

  getRandom() {
    axios({
      method: 'post',
      url: 'http://www.mockaroo.com/api/generate.json',
      headers: {
        'Accept': 'application/json'
      },
      params: {
        key: this.state.mocapi,
        count: 1,
        fields: JSON.stringify(this.state.fields)
      }
    })
      .then(this.handleRecords)
      .catch((error) => {
        alert(error)
      })
  }

  handleRecords(records) {
    for (const key in records.data) {
      const fields = this.state.fields
      var foundIndex = this.state.fields.findIndex(x => x.name == key);

      if (fields[foundIndex].name !== 'control_dropdown' || fields[foundIndex].name !== 'control_radio' || fields[foundIndex].name !== 'control_checkbox') {
        this.setState(state => {
          const fields = state.fields;
          fields[foundIndex].value = records.data[key]
          return { fields }
        })
      }
    }

    this.setState({ status: "done" })
  }

  fillTheForm() {
    sendMessage('fill-form', { fields: this.state.fields })
  }

  render() {
    if (this.state.status === "home") {
      return (
        <div style={{ width: 300, height: 295 }}>
          <div style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '140px',
            paddingTop: 10,
          }}>
            <img style={{ width: 140, height: 140 }} src='https://www.jotform.com/resources/assets/logo/jotform-icon-transparent-280x280.png' />
          </div>
          <div style={{
            fontSize: 22,
            fontFamily: 'Ubuntu',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: -25,
            paddingBottom: 10,
            color: 'white'
          }}>
            <h5>JotForm Mock Data Generator</h5>
          </div>
          <div style={{
            textAlign: 'center',
            paddingBottom: 15
          }}>
            <button onClick={this.checkUrl} style={{
              width: 260,
              height: 50,
              fontFamily: 'Source Sans Pro',
              fontSize: 18,
              color: 'white',
              backgroundColor: '#434343',
              borderWidth: 0,
              borderRadius: 10
            }}>Analyze the form</button>
          </div>
        </div>
      )
    }

    if (this.state.status === "analyzing") {
      return (
        <div style={{ width: 300, height: 230 }}>
          <BounceLoader
            css={override}
            sizeUnit={"px"}
            size={100}
            color={'#FFFFFF'}
            loading={this.state.loading}
          />
          <div style={{
            fontSize: 22,
            fontFamily: 'Ubuntu',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 0,
            color: 'white'
          }}>
            <h5>Please wait...</h5>
          </div>
        </div>
      )
    }

    if (this.state.status === "done") {
      return (
        <div style={{ width: 300 }}>
          <div style={{
            fontSize: 22,
            fontFamily: 'Ubuntu',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: -10,
            color: 'white'
          }}>
            <h5>Your mock data is:</h5>
          </div>
          <div>
            <table className="darkTable" style={{ marginTop: -10 }}>
              <thead>
                <tr>
                  <th>Questions</th>
                  <th>Answers</th>
                </tr>
              </thead>
              <tbody>
                {this.state.fields.length !== 0 ? (
                  this.state.fields.map(question => (
                    <tr>
                      <td>{question.qes}</td>
                      <td>{question.name === 'control_dropdown' || question.name === 'control_radio' || question.name === 'control_checkbox' ? "Preview is not supported yet but it will be generated when the fill button is clicked." : question.value}</td>
                    </tr>
                  ))
                ) : null}
              </tbody>
            </table>
          </div>
          <div style={{
            textAlign: 'center',
            paddingBottom: 15,
            paddingTop: 20,
          }}>
            <button onClick={this.checkUrl} style={{
              width: 260,
              height: 50,
              fontFamily: 'Source Sans Pro',
              fontSize: 18,
              color: 'white',
              backgroundColor: '#3366cc',
              borderWidth: 0,
              borderRadius: 10
            }}>Regenerate the data</button>
          </div>
          <div style={{
            textAlign: 'center',
            paddingBottom: 15
          }}>
            <button onClick={this.fillTheForm} style={{
              width: 260,
              height: 50,
              fontFamily: 'Source Sans Pro',
              fontSize: 18,
              color: 'white',
              backgroundColor: '#434343',
              borderWidth: 0,
              borderRadius: 10
            }}>Fill the form</button>
          </div>
        </div>
      )
    }

    return (
      null
    )

  }
}