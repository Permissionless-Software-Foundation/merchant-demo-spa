# merchant-demo-spa

This is a single page app (**SPA**) based on the [react-bootstrap-web3-spa template](https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-spa). This app is a template for building an ecommerce store that accepts Bitcoin Cash (BCH) for purchsing products. The app leverages the [Cash Stack](https://cashstack.info) web 3 architecture, a censorship-resistant back-end for accessing the Bitcoin Cash blockchain.

This app is the *front end* part of the software. It pairs with [merchant-demo-server](https://github.com/Permissionless-Software-Foundation/merchant-demo-server) REST API *back end*. 

If you would like to hire someone to customize this app for your store, you can [find BCH developers here](https://fullstack.cash/consulting).


- [Live Demo on GitHub Pages](https://permissionless-software-foundation.github.io/react-bootstrap-web3-spa/)
- [Live Demo on Filecoin](https://bafybeic3nuawgogcfjkxxstyqyg6dmzajvkxp55ccldipwmgiyuikhrq5y.ipfs.dweb.link/)

## Major Features
- [react-bootstrap](https://react-bootstrap.github.io/) is used for general style and layout control.
- An easily customized *waiting modal* component can be invoked while waiting for network calls to complete.
- [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet) is used to access tokens and BCH on the Bitcoin Cash blockchain.
- A 'server selection' dropdown allows the user to select from an array of redundant [web3 back end servers](https://cashstack.info).
- This site is statically compiled, uploaded to Filecoin, and served over IPFS for censorship resistance and version control.
- A collapsible navigation menu is used to load different views.
- This app can be compiled into an native Android app using [react-bootstrap-web3-android](https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-android).

## Installation
```bash
git clone https://github.com/Permissionless-Software-Foundation/merchant-demo-spa
cd merchant-demo-spa
npm install
npm start
npm run build
```

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
