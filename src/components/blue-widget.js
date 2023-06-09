/*
  Example component selling a blue widget
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Form, Button, Image, Spinner } from 'react-bootstrap'
import Captcha from './captcha'
import axios from 'axios'
import QRCode from 'qrcode.react'

// Local libraries
import BlueWidgetImage from '../img/blue-gear.png'

const SERVER = process.env.REACT_APP_SERVER

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
      displaySpinner: false,

      // QR Code
      displayQr: false,
      qrAddr: '',
      bchPayment: 0,
      paymentInterval: null,
      paymentDetected: false
    }

    // Bind 'this' to event handlers
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this)
    this.setCaptchaSolved = this.setCaptchaSolved.bind(this)
    this.checkPayment = this.checkPayment.bind(this)
    this.OrderForm = this.OrderForm.bind(this)
    this.PaymentDetails = this.PaymentDetails.bind(this)
    this.PaymentDetected = this.PaymentDetected.bind(this)
    this.CheckPaymentAnimation = this.CheckPaymentAnimation.bind(this)

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
            <Col style={{ textAlign: 'center' }}>
              <br />
              <h3><u>Price:</u> <b>$0.05 USD</b></h3>
              <br />
            </Col>
          </Row>

          <Row>
            <Col>
              <h4>Product Description</h4>
              <p>
                Isn't this blue widget awesome! Don't you want to buy it?
                Of course, widgets don't really exist. This is just an example
                of a product description. You should fork <a href='https://github.com/Permissionless-Software-Foundation/merchant-demo-spa' rel='noreferrer' target='_blank'>this code repository</a> and
                replace the blue widget with your own product! That way you
                can use this application to sell your own products for Bitcoin
                Cash (BCH).
              </p>
              <p>
                If you need help customizing this template for your own store,
                you can <a href='https://fullstack.cash/consulting' target='_blank' rel='noreferrer'>hire developers here</a>.
              </p>
            </Col>
          </Row>
          <br />
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
            !this.state.displayQr && !this.state.paymentDetected
              ? <this.OrderForm />
              : null
          }

          {
            this.state.displayQr && !this.state.paymentDetected
              ? <this.PaymentDetails />
              : null
          }

          {
            this.state.displayQr && this.state.paymentDetected
              ? <this.PaymentDetected />
              : null
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
  setCaptchaSolved () {
    console.log('child component signalling solved captcha')
    this.setState({
      captchaSolved: true
    })
  }

  // Handler for the 'Submit Shipping Info' button.
  async handlePlaceOrder (event) {
    try {
      console.log('handlePlaceOrder() called')

      console.log('this.state.captchaSolved: ', this.state.captchaSolved)

      // If the captcha has not been solved, then display a warning and exit.
      if (!this.state.captchaSolved) {
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
      const request = await axios.post(`${SERVER}/order`, formData)
      const response = request.data

      console.log('Return value: ', response)

      this.setState({
        displayQr: true,
        bchAddr: response.bchAddr,
        bchPayment: response.bchPayment,
        paymentInterval: setInterval(this.checkPayment, 5000)
      })
    } catch (err) {
      console.error('Error in handlePlaceOrder(): ', err)
    }
  }

  // Check to see if payment has been detected and processed.
  async checkPayment () {
    try {
      // Show the spinner when this function starts.
      await this.setState({
        displaySpinner: true
      })

      const request = await axios.get(`${SERVER}/order/payment/${this.state.bchAddr}`)

      const hasPaid = request.data.paid
      console.log('hasPaid: ', hasPaid)

      if (hasPaid) {
        clearInterval(this.state.paymentInterval)

        this.setState({
          paymentDetected: true
        })
      }

      // Wait a couple seconds to make sure the animation is seen.
      await this.sleep(2000)

      // Hide the spinner after this function completes.
      await this.setState({
        displaySpinner: false
      })
    } catch (err) {
      console.error('Error in checkPayment(): ', err)
    }
  }

  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // This component displays the order form. This order form is hidden after
  // the order is placed. It is replaced by the PaymentDetails component.
  OrderForm (props) {
    return (
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
              <Form.Control as='textarea' onChange={e => this.setState({ shippingAddress: e.target.value })} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='name'>
              <Form.Label><b>Quantity to Purchase</b>:</Form.Label>
              <Form.Control type='text' onChange={e => this.setState({ qty: e.target.value })} />
            </Form.Group>

            <p style={{ color: 'red' }}>{this.state.warningMsg}</p>

          </Form>

          <Captcha setCaptchaSolved={this.setCaptchaSolved} />

          <Button variant='primary' onClick={this.handlePlaceOrder}>
            Submit Shipping Info
          </Button>
        </Col>
      </Row>
    )
  }

  // This component displays the payment QR code and amount of BCH to send.
  PaymentDetails (props) {
    return (
      <>
        <Row style={{ textAlign: 'center' }}>
          <Col>
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
            <p>Send exactly <b>{this.state.bchPayment}</b> BCH</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Leave this page open. It will check for payment confirmation every
              few seconds. Once payment is detected, you'll see a success message.
              Please be patient, this can take several minutes.
            </p>
            <p>
              Orders that are not funded within 24 hours will be deleted. Once
              your order has been funded, your order will be sent to the seller
              and they will ship the product to you. If they have questions,
              they will contact you via the email address you provided.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            {
              !this.state.displaySpinner
                ? null
                : (
                  <this.CheckPaymentAnimation />
                  )

            }
          </Col>
        </Row>
      </>
    )
  }

  CheckPaymentAnimation (props) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>
          Checking for payment confirmation... <span><Spinner animation='border' /></span>
        </p>
      </div>
    )
  }

  PaymentDetected (props) {
    return (
      <>
        <Row style={{ textAlign: 'center' }}>
          <Col>
            <h4>Payment Detected!</h4>
            <p>Payment detected! Your order will be shipped soon.</p>
          </Col>
        </Row>
      </>
    )
  }
}

export default BlueWidget
