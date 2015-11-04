'use strict';

var PRODUCTS = [{
	category: 'Sporting Goods',
	price: '$49.99',
	stocked: true,
	name: 'Football'
}, {
	category: 'Sporting Goods',
	price: '$9.99',
	stocked: true,
	name: 'Baseball'
}, {
	category: 'Sporting Goods',
	price: '$29.99',
	stocked: false,
	name: 'Basketball'
}, {
	category: 'Electronics',
	price: '$99.99',
	stocked: true,
	name: 'iPod Touch'
}, {
	category: 'Electronics',
	price: '$399.99',
	stocked: false,
	name: 'iPhone 5'
}, {
	category: 'Electronics',
	price: '$199.99',
	stocked: true,
	name: 'Nexus 7'
}];

var SearchForm = React.createClass({
	displayName: 'SearchForm',

	filterList: function filterList() {
		this.props.onFilter();
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement('input', { type: 'text', placeholder: 'Search...' })
			),
			React.createElement(
				'div',
				{ className: 'form-group' },
				React.createElement('input', { type: 'checkbox', onChange: this.filterList }),
				'Only show products in stock'
			)
		);
	}

});

var ProductRow = React.createClass({
	displayName: 'ProductRow',

	render: function render() {
		var name = this.props.product.stocked ? this.props.product.name : React.createElement(
			'span',
			{ className: 'text-danger' },
			this.props.product.name
		);
		return React.createElement(
			'div',
			{ className: 'row' },
			React.createElement(
				'div',
				{ className: 'col-md-6' },
				name
			),
			React.createElement(
				'div',
				{ className: 'col-md-6' },
				this.props.product.price
			)
		);
	}
});

var ProductRowTitle = React.createClass({
	displayName: 'ProductRowTitle',

	render: function render() {

		return React.createElement(
			'div',
			{ className: 'row' },
			React.createElement(
				'div',
				{ className: 'col-md-12' },
				this.props.category
			)
		);
	}
});

var ProductList = React.createClass({
	displayName: 'ProductList',

	render: function render() {
		var rows = [];
		var lastCategory = null;
		this.props.products.forEach(function (product, key) {
			if (product.category !== lastCategory) {
				rows.push(React.createElement(ProductRowTitle, { category: product.category, key: product.category }));
			}
			rows.push(React.createElement(ProductRow, { product: product, key: product.name }));
			lastCategory = product.category;
		});

		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-md-6' },
					'Name'
				),
				React.createElement(
					'div',
					{ className: 'col-md-6' },
					'Price'
				)
			),
			rows
		);
	}
});

var FilterProduct = React.createClass({
	displayName: 'FilterProduct',

	getInitialState: function getInitialState() {
		return {
			products: PRODUCTS
		};
	},
	handleFilter: function handleFilter() {

		var products = this.state.products;
		var newproducts = [];
		products.forEach(function (product, key) {
			if (!product.stocked) {
				newproducts.push(product);
			}
		});
		this.setState({
			products: newproducts
		});
	},
	render: function render() {

		return React.createElement(
			'div',
			null,
			React.createElement(SearchForm, { onFilter: this.handleFilter }),
			React.createElement(ProductList, { products: this.state.products })
		);
	}

});

$(function () {
	ReactDOM.render(React.createElement(FilterProduct, null), $('#Product').get(0));
});