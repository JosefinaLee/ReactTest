(function(){
	var ImgApp = React.createClass({
		render: function(){
			// console.log(this.props.data);
			return (
				<figure className='img-fg'>
					<img src= {'img/' + this.props.data.fileName}></img>
					<figcaption>
						<h2>{this.props.data.title}</h2>
						<div></div>
					</figcaption>
				</figure>
				);
		}
	});
	var NavApp = React.createClass({
		render: function(){
			return (
				<span></span>
				);
		}
	});
	var Photowall = React.createClass({
		render: function(){
			var imgArr = [],
				navArr = [];
			imgDatas.forEach(function(elem, index){
				imgArr.push(<ImgApp data={elem} key={index}/>);
				navArr.push(<NavApp key={index}/>);
			});

			return (
				<section>
					{imgArr}
					{navArr}
				</section>
				);
		}		
	});

	ReactDOM.render(
		<Photowall/>,
		document.getElementById('photo-wall')
		);





})();