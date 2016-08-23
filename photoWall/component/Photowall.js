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
		Ranges: {
			center: {
				left: 0,
				top: 0
			},
			imgRange: {
				leftRangeX: [0, 0],
				rightRangeX: [0, 0],
				rangeY: 0
			}
		},

		setRanges: function(){
			var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
				imgDOM = React.findDOMNode(this.refs.img0);
			var stgW = stageDOM.clientWidth,
				stgH = stageDOM.clientHeight,
				imgW = imgDOM.clientWidth,
				imgH = imgDOM.clientHeight,
				hstgW = stgW / 2,
				hstgH = stgH / 2,
				himgW = imgW / 2,
				himgH = imgH / 2;
			this.Ranges.center = {
				left: hstgW - himgW,
				top: hstgH - himgH
			};
			this.Ranges.imgRange = {
				leftRangeX: [-himgW, hstgW - 3*himgW],
				rightRangeX: [hstgW + himgW, stgW - himgW],
				y: [-himgH, stgH - himgH]
			};
			console.log(this.Ranges);
		},

		getInitialState: function(){
			return {
				imgInfos: {
					top: 0,
					left: 0
				}
			}
		},

		rearrange: function(){
			var rearrangeInfo = this.state.imgInfos;
		},

		render: function(){
			var imgArr = [],
				navArr = [];
			imgDatas.forEach(function(elem, index){
				imgArr.push(<ImgApp data={elem} key={index} ref={"img"+index}/>);
				navArr.push(<NavApp key={index}/>);
			});

			return (
				<section ref="stage">
					<section>
						{imgArr}
					</section>
					<nav>
						{navArr}
					</nav>
				</section>
				);
		},
		componentDidMount: function(){
			this.setRanges();
		}

	});

	ReactDOM.render(
		<Photowall/>,
		document.getElementById('photo-wall')
		);





})();