/*
  This component creates a captcha.
*/

// Global npm libraries
import React from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import ClientCaptcha from 'react-client-captcha'

class Captcha extends React.Component {
  constructor (props) {
    super(props)

    console.log('props: ', props)
    this.setCaptchaSolved = props.setCaptchaSolved

    this.state = {
      code: '',
      value: '',
      captchaSolves: false
    }

    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render () {
    return (
      <>
        <Row>
          <Col>
            <p>Please copy the four letters below into the text box, to prove you are not a bot.</p>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <ClientCaptcha
              captchaCode={code => {
                // console.log(code)
                this.setState({ code })
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <Form>
              <Form.Group controlId='captcha'>
                <Form.Control type='text' onChange={this.handleUpdate} />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <br />
      </>
    )
  }

  handleUpdate (event) {
    if (event.target.value === this.state.code) {
      this.setState({
        captchaSolves: true
      })
      this.setCaptchaSolved()
      console.log('captcha solved')
    }
  }
}

export default Captcha
