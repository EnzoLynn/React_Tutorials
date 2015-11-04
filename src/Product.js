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
	filterList: function() {
	 
		this.props.onFilter($('#checkbox').prop('checked'));
	},
	render: function() {
		return (
			<div> 
				<div className="form-group">
					<input  type="text"  placeholder="Search..."/> 
				</div>
				<div className="form-group">
					<input id="checkbox"  type="checkbox" onChange={this.filterList}/>Only show products in stock
				</div> 
			</div>
		);
	}

});

var ProductRow = React.createClass({
	render: function() {
		var name = this.props.product.stocked ? this.props.product.name :
			<span className="text-danger">{this.props.product.name}</span>
		return (
			<div className="row">
			<div className="col-md-6">{name}</div>
			<div className="col-md-6">{this.props.product.price}</div>
		</div>
		);
	}
});

var ProductRowTitle = React.createClass({
	render: function() {

		return (
			<div className="row">
			<div className="col-md-12">{this.props.category}</div>
			</div>
		);
	}
});

var ProductList = React.createClass({

	render: function() {
		var rows = [];
		var lastCategory = null;
		this.props.products.forEach(function(product, key) {
			if (product.category !== lastCategory) {
				rows.push(<ProductRowTitle category={product.category} key={product.category} />);
			}
			rows.push(<ProductRow product={product} key={product.name} />);
			lastCategory = product.category;
		});

		return (
			<div>
			<div className="row">
				<div className="col-md-6">Name</div>
				<div className="col-md-6">Price</div>
			</div>

				{rows}
			</div>
		);

	}
});

var FilterProduct = React.createClass({
	getInitialState: function() {
		return {
			products: PRODUCTS
		};
	},
	handleFilter: function(checked) {

		var products = PRODUCTS; 
		if (!checked) {
			this.setState({
				products: products
			});
			return;
		}; 
		var newproducts = [];
		products.forEach(function(product, key) {
			if (!product.stocked) {
				 newproducts.push(product); 
			}
			
		}); 
		this.setState({
			products: newproducts
		});
	},
	render: function() {

		return (
			<div>
			<SearchForm onFilter={this.handleFilter}></SearchForm>
			<ProductList products={this.state.products}></ProductList>
			</div>
		);
	}

});


$(function() {
	ReactDOM.render(
		<FilterProduct ></FilterProduct>,
		$('#Product').get(0)
	);
});