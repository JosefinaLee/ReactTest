(function(){
	function getRandom(low, high){
		return Math.ceil(Math.random()*(high - low) + low);
	};
	var ImgApp = React.createClass({
		handleClick : function(){
			if(this.props.isCenter){
				// this.props.inverse();
			}else{
				this.props.center();
			}
		},
		render: function(){
			var style = {
				left: this.props.info.pos.left,
				top: this.props.info.pos.top
			};
			return (
				<figure className='img-fg' style={style} onClick={this.handleClick}>
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

		getInitialState: function(){
			return {
				imgInfos: [
					{
						pos: {
							top: 0,
							left: 0
						}

					}
				]
			}
		},

		Ranges: {
			center: {
				left: 0,
				top: 0
			},
			imgRange: {
				leftRangeX: [0, 0],
				rightRangeX: [0, 0],
				rangeY: [0, 0]
			}
		},

		setRanges: function(){
			var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
				imgDOM = ReactDOM.findDOMNode(this.refs.img0);
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
				rangeY: [-himgH, stgH - himgH]
			};
			// console.log(this.Ranges.imgRange.rangeY);
		},



		rearrange: function(centerIndex){
			var reArr = this.state.imgInfos;
			// console.log(reArr);
			var rangelr = null;
			reArr[centerIndex].pos = this.Ranges.center;
			for(var i=0; i<reArr.length; i++){
				if(i == centerIndex){
					continue;
				}
				if(i < reArr.length/2){
					rangelr = this.Ranges.imgRange.leftRangeX;
				}else{
					rangelr = this.Ranges.imgRange.rightRangeX;
				}
				reArr[i].pos = {
					top: getRandom(this.Ranges.imgRange.rangeY[0], this.Ranges.imgRange.rangeY[1]),
					left: getRandom(rangelr[0], rangelr[1])
				};
				// console.log(reArr[i].pos.top);
			}
			this.setState({
				imgInfos: reArr
			});

		},

		center : function(index){
			return function(){
				this.rearrange(index);
			}.bind(this);
		},

		render: function(){
			var imgArr = [],
				navArr = [];
			imgDatas.forEach(function(elem, index){


				if(!this.state.imgInfos[index]){
					this.state.imgInfos[index] = {
						pos : {
							top : 0,
							left : 0
						}
						,
						rotate : 0,
						isCenter : false,
						isInverse : false


					};
				}



				imgArr.push(<ImgApp data={elem} key={index} ref={"img"+index} info={this.state.imgInfos[index]} center={this.center(index)} isCenter={this.state.imgInfos[index].isCenter}/>);
				navArr.push(<NavApp key={index}/>);
			}.bind(this));

			return (
				<section ref="stage" className="stage">
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
			this.rearrange(0);
		}

	});

	ReactDOM.render(
		<Photowall/>,
		document.getElementById('photo-wall')
		);





})();