# merchant-demo-spa

This is a single page app (**SPA**) template for buildinga single-product ecommerce store, and selling that product for Bitcoin Cash (BCH). This open source template is intended for developers to fork and customize, to make their own ecommerce stores. This front end app is intended to be paired with the [merchant-demo-server](https://github.com/Permissionless-Software-Foundation/merchant-demo-server) back end.

- [Live Demo](https://merchant.cashstack.info/)

If you would like to hire someone to customize this app for your store, you can [find BCH developers here](https://fullstack.cash/consulting).

## Videos

- [Part 1: Introduction and Demo](https://youtu.be/jOv2c6kvdX4)
- [Part 2: Customizing the React front end](https://youtu.be/QghTUkx1hk0)
- [Part 3: Customizing the node.js back end](https://youtu.be/yMFNbqU3icM)
- [Part 4: Setting up email notifications](https://youtu.be/3gCvxNx-P30)

## Major Features
- Animations make it clear to the customer when the front end is communicating with the blockchain.
- New orders are end-to-end encrypted (**e2ee**) and sent to the merchants BCH address. [e2ee-email-notifier](https://github.com/Permissionless-Software-Foundation/e2ee-email-notifier) can then send an email to the merchant to alert them to a new order. But email is not required to receive new orders.

## Installation
```bash
git clone https://github.com/Permissionless-Software-Foundation/merchant-demo-spa
cd merchant-demo-spa
npm install
```

- `npm start` will start the app in development mode
- `npm run build` will build a static, production site

## Configuration

- Edit the [.env.production](./.env.production) file to point to your instance of [merchant-demo-server](https://github.com/Permissionless-Software-Foundation/merchant-demo-server).

## Support

Have questions? Need help? Join our community support
[Telegram channel](https://t.me/bch_js_toolkit)

## Donate

This open source software is developed and maintained by the [Permissionless Software Foundation](https://psfoundation.cash). If this library provides value to you, please consider making a donation to support the PSF developers:

<div align="center">
<img src="./img/donation-qr.png" />
<p>bitcoincash:qqsrke9lh257tqen99dkyy2emh4uty0vky9y0z0lsr</p>
</div>

## License
[MIT](./LICENSE.md)
