/*
  Example component selling a blue widget
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Form, Button, Spinner, Image } from 'react-bootstrap'
import Captcha from './captcha'
import axios from 'axios'
import QRCode from 'qrcode.react'

// Local libraries
import BlueWidgetImage from '../img/blue-gear.png'

class BlueWidget extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      wallet: props.appData.wallet,

      // Form state
      emailAddress: '',
      shippingName: '',
      shippingAddress: '',
      qty: '',
      captchaSolved: false,
      warningMsg: '',
      
      // QR Code
      displayQr: false,
      qrAddr: '',
      bchPayment: 0
    }

    // Bind 'this' to event handlers
    this.handleGetBalance = this.handleGetBalance.bind(this)
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
    this.setCaptchaSolved = this.setCaptchaSolved.bind(this)

    // _this = this
  }

  render () {
    return (

      <>
        <Container>
          <Row>
            <Col style={{ textAlign: 'center' }}>
              <Image src={BlueWidgetImage} />
            </Col>
          </Row>

          <Row>
            <Col style={{ textAlign: 'center' }}>
              <h2>Blue Widget</h2>
            </Col>
          </Row>

          <Row>
            <Col>
              <h4>Product Description</h4>
              <p>
                Isn't this blue widget awesome! Don't you want to buy it?
                Of course, widgets don't really exist. This is just an example
                of a product description. You should fork this code repository
                and replace the blue widget with your own product! That way you
                can use this application to sell your own products for Bitcoin
                Cash (BCH).
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <h4>Order Instructions</h4>
              <p>
                To order a widget fill out this form below. Once your information
                is submitted, you will be shown a QR code for BCH payment. Once paid,
                your order will be sent to the seller. If you have any questions, email
                the seller at <a href='mailto:test@test.com'>test@test.com</a>.
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <hr />
            </Col>
          </Row>

          {
            this.state.displayQr ?
              (
                <>
                  <Row style={{ textAlign: 'center' }}>
                    <Col >
                      <h4>Payment Details</h4>
                      <QRCode
                        className='qr-code'
                        value={this.state.bchAddr}
                        size={256}
                        includeMargin
                        fgColor='#333'
                      />
                    </Col>
                  </Row>
                  <Row style={{ textAlign: 'center' }}>
                    <Col>
                      <p>{this.state.bchAddr}</p>
                      <p>Send exactly {this.state.bchPayment} BCH</p>
                    </Col>
                  </Row>
                </>
              ) : (
              <Row>
                <Col className='text-break'>
                  <Form>
                    <Form.Group className='mb-3' controlId='contact'>
                      <Form.Label><b>Email address</b> (or some other way for us to communicate with you):</Form.Label>
                      <Form.Control type='text' onChange={e => this.setState({ emailAddress: e.target.value })} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='name'>
                      <Form.Label><b>Name</b> (for shipping):</Form.Label>
                      <Form.Control type='text' onChange={e => this.setState({ shippingName: e.target.value })} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='name'>
                      <Form.Label><b>Shipping Address</b>:</Form.Label>
                      <Form.Control as="textarea" onChange={e => this.setState({ shippingAddress: e.target.value })} />
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='name'>
                      <Form.Label><b>Quantity to Purchase</b>:</Form.Label>
                      <Form.Control type='text' onChange={e => this.setState({ qty: e.target.value })} />
                    </Form.Group>

                    <Captcha setCaptchaSolved={this.setCaptchaSolved} />

                    <p style={{color: 'red'}}>{this.state.warningMsg}</p>

                    <Button variant='primary' onClick={this.handlePlaceOrder}>
                      Submit Shipping Info
                    </Button>
                  </Form>
                </Col>
              </Row>
              )
          }

          
          
          <br />
          <Row>
            <Col style={{ textAlign: 'center' }}>
              {this.state.balance}
            </Col>
          </Row>
        </Container>
      </>
    )
  }

  // This function is passed to the Captcha component as a prop. That child
  // component calls this function when the captcha has been successfully solved.
  setCaptchaSolved() {
    console.log('child component signalling solved captcha')
    this.setState({
      captchaSolved: true
    })
  }

  // Handler for the 'Submit Shipping Info' button.
  async handlePlaceOrder(event) {
    try {
      console.log('handlePlaceOrder() called')

      console.log('this.state.captchaSolved: ', this.state.captchaSolved)

      // If the captcha has not been solved, then display a warning and exit.
      if(!this.state.captchaSolved) {
        this.setState({ warningMsg: 'Captcha not completed successfully' })
        return
      }

      // TODO: Create a waiting modal

      // Aggregate order form data.
      const formData = {
        order: {
          emailAddress: this.state.emailAddress,
          shippingName: this.state.shippingName,
          shippingAddress: this.state.shippingAddress,
          qty: this.state.qty
        }
      }
      console.log('formData: ', formData)

      // Submit the form data to the server and get a QR code.
      const request = await axios.post('http://localhost:5020/order', formData)
      const response = request.data

      console.log('Return value: ', response)

      this.setState({
        displayQr: true,
        bchAddr: response.bchAddr,
        bchPayment: response.bchPayment
      })
    } catch(err) {
      console.error('Error in handlePlaceOrder(): ', err)
    }
  }

  async handleGetBalance (event) {
    try {
      const textInput = this.state.textInput

      // Exit on invalid input
      if (!textInput) return
      if (!textInput.includes('bitcoincash:')) return

      this.setState({
        balance: (<span>Retrieving balance... <Spinner animation='border' /></span>)
      })

      const balance = await this.state.wallet.getBalance(textInput)
      console.log('balance: ', balance)

      const bchBalance = this.state.wallet.bchjs.BitcoinCash.toBitcoinCash(balance)

      this.setState({
        balance: `Balance: ${balance} sats, ${bchBalance} BCH`
      })
    } catch (err) {
      this.setState({
        balance: (<p><b>Error</b>: {`${err.message}`}</p>)
      })
    }
  }
}

export default BlueWidget
