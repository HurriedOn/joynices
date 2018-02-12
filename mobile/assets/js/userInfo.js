! function(t) {
	function a(i) {
		if(e[i]) return e[i].exports;
		var o = e[i] = {
			exports: {},
			id: i,
			loaded: !1
		};
		return t[i].call(o.exports, o, o.exports, a), o.loaded = !0, o.exports
	}
	var e = {};
	return a.m = t, a.c = e, a.p = "", a(0)
}([function(t, a, e) {
	t.exports = e(1)
}, function(t, a, e) {
	e(2),e(3),
	$(document).ready(function(){
		var COUNTRY_PANEL="country-container-panel",
			COUNTRY_CONTAINER="country-container";
		$("."+COUNTRY_PANEL).each(function(X, Y) {
			var W = $("<div>").addClass(COUNTRY_CONTAINER);
			W.html(RegionsCode.getAll({
				usual: "常用"
			}, true));
			$(Y).append(W)
		});
		$("#J_countryCode").click(function() {
			$("."+COUNTRY_CONTAINER).toggle();
		});
		$("."+COUNTRY_PANEL).on("click",".btn-cancel", function(e) { 
			e.preventDefault();
			$(this).closest("."+COUNTRY_CONTAINER).hide()
		});
		$("."+COUNTRY_CONTAINER).on("click",".record",function(R) { 
			$("."+COUNTRY_CONTAINER).hide();
			var S = $(R.target).closest(".record");
			var O = S.find(".record-country");
			var M = S.find(".record-code");
			var Q = $.trim(M.text()),
				N = $.trim(O.text()),
				P = O.data("code");
			$("#J_countryCode").attr("_code", P).val(N + "(" + Q + ")");
		});
		
		var time = new Date();
		var year=time.getFullYear(),
			month=time.getMonth()+1,
			day=time.getDate(); 
		new DateSelector({
	        input : 'J_dateSelectorInput',
	        container : 'J_targetContainer',
	        type : 0,
	        param : [1,1,1,0,0],
	        beginTime : [1900,1,1],
	        endTime : [year,month,day],
	        recentTime : [],
	        success : function(arr){
	            var b="";
	            for(var i=0;i<arr.length;i++){
	            	b+=arr[i]+"-";
	            }
	            document.getElementById("J_dateSelectorInput").value=b.substring(0,b.length-1);
	        }
	    });
	})
}, function(t, a, e) {
(function (wid, dcm) {
	var win = wid;
	var doc = dcm;
	function $id(id) {
		return doc.getElementById(id);
	}
	function $class(name) {
		return doc.getElementsByClassName(name);
	}
	function loop(begin, length, fuc) {
		for ( var i = begin; i < length; i++ ) {
			if (fuc(i)) break;
		}
	}
	
	function on(action, selector, callback) {
		doc.addEventListener(action, function (e) {
			if (selector == e.target.tagName.toLowerCase() || selector == e.target.className || selector == e.target.id) {
				callback(e);
			}
		})
	}
	
	function DateSelector(config) {
		this.input      = config.input;
		this.container  = config.container;
		this.type       = config.type;
		this.param      = (config.type == 1) ? [1, 1, 1, 1, 1] : config.param;
		this.beginTime  = config.beginTime;
		this.endTime    = config.endTime;
		this.recentTime = config.recentTime;
		this.success    = config.success;
		
		this.ulCount     = 0;
		this.ulDomArr    = [];
		this.idxArr      = [];
		this.liHeight    = wid.lib ? parseInt(doc.getElementsByTagName('HTML')[0].style.fontSize) * 1 : 40;
		this.maxHeight   = [];
		this.distance    = [];
		this.start       = {
			Y: 0,
			time: ''
		};
		this.move        = {
			Y: 0,
			speed: []
		};
		this.end         = {
			Y: 0,
			index: 0
		};
		this.resultArr   = [];
		this.begin_time  = [1970, 1, 1, 0, 0];
		this.end_time    = [new Date().getFullYear() + 1, 12, 31, 23, 59];
		this.recent_time = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), new Date().getHours(), new Date().getMinutes()];
		
		this.initDomFuc();
		this.initReady();
		this.initBinding();
	}
	
	DateSelector.prototype = {
		constructor: DateSelector,
		checkParam: function () {
			var idxArr = [];
			var _this  = this;
			loop(0, _this.param.length, function (i) {
				if (_this.param[i] > 0) {
					idxArr.push(i);
				}
			});
			this.ulCount = idxArr[idxArr.length - 1] - idxArr[0] + 1;
			loop(idxArr[0], idxArr[idxArr.length - 1] + 1, function (i) {
				_this.param[i] = 1;
				_this.idxArr.push(i);
			});
		},
		checkTime: function () {
			var _this       = this;
			var begin_time  = this.begin_time;
			var end_time    = this.end_time;
			var recent_time = this.recent_time;
			if (_this.beginTime.length == 0) {
				loop(0, _this.idxArr.length, function (i) {
					_this.beginTime.push(begin_time[_this.idxArr[i]]);
				});
			}
			if (_this.endTime.length == 0) {
				loop(0, _this.idxArr.length, function (i) {
					_this.endTime.push(end_time[_this.idxArr[i]]);
				});
			}
			if (_this.recentTime.length == 0) {
				loop(0, _this.idxArr.length, function (i) {
					_this.recentTime.push(recent_time[_this.idxArr[i]]);
				});
			}
			if (_this.idxArr.length == _this.beginTime.length && _this.beginTime.length == _this.endTime.length && _this.endTime.length == _this.recentTime.length) {
				var _idxArrIndex = 0;
				loop(0, _this.param.length, function (i) {
					if (_this.param[i] == 0) {
						switch (i) {
							case 0:
								begin_time[i] = new Date().getFullYear();
								end_time[i]   = new Date().getFullYear();
								break;
							case 1:
								begin_time[i] = new Date().getMonth() + 1;
								end_time[i]   = new Date().getMonth() + 1;
								break;
							case 2:
								begin_time[i] = new Date().getDate();
								end_time[i]   = new Date().getDate();
								break;
							case 3:
								begin_time[i] = new Date().getHours();
								end_time[i]   = new Date().getHours();
								break;
							case 4:
								begin_time[i] = new Date().getMinutes();
								end_time[i]   = new Date().getMinutes();
								break;
						}
					} else {
						switch (i) {
							case 0:
								_this.beginTime[_idxArrIndex] = begin_time[i] = _this.beginTime[_idxArrIndex] >= 1900 ? _this.beginTime[_idxArrIndex] : new Date().getFullYear();
								_this.endTime[_idxArrIndex] = end_time[i] = _this.endTime[_idxArrIndex] >= 1900 ? _this.endTime[_idxArrIndex] : new Date().getFullYear() + 1;
								recent_time[i] = _this.recentTime[_idxArrIndex];
								break;
							case 1:
								_this.beginTime[_idxArrIndex] = begin_time[i] = (_this.beginTime[_idxArrIndex] > 0 && _this.beginTime[_idxArrIndex] <= 12) ? _this.beginTime[_idxArrIndex] : 1;
								_this.endTime[_idxArrIndex] = end_time[i] = (_this.endTime[_idxArrIndex] > 0 && _this.endTime[_idxArrIndex] <= 12) ? _this.endTime[_idxArrIndex] : 12;
								recent_time[i] = _this.recentTime[_idxArrIndex];
								break;
							case 2:
								_this.beginTime[_idxArrIndex] = begin_time[i] = (_this.beginTime[_idxArrIndex] > 0 && _this.beginTime[_idxArrIndex] <= new Date(begin_time[0], begin_time[1], 0).getDate()) ? _this.beginTime[_idxArrIndex] : 1;
								_this.endTime[_idxArrIndex] = end_time[i] = (_this.endTime[_idxArrIndex] > 0 && _this.endTime[_idxArrIndex] <= new Date(end_time[0], end_time[1], 0).getDate()) ? _this.endTime[_idxArrIndex] : new Date(end_time[0], end_time[1], 0).getDate();
								recent_time[i] = _this.recentTime[_idxArrIndex];
								break;
							case 3:
								_this.beginTime[_idxArrIndex] = begin_time[i] = (_this.beginTime[_idxArrIndex] >= 0 && _this.beginTime[_idxArrIndex] <= 23) ? _this.beginTime[_idxArrIndex] : 0;
								_this.endTime[_idxArrIndex] = end_time[i] = (_this.endTime[_idxArrIndex] >= 0 && _this.endTime[_idxArrIndex] <= 23) ? _this.endTime[_idxArrIndex] : 23;
								recent_time[i] = _this.recentTime[_idxArrIndex];
								break;
							case 4 :
								_this.beginTime[_idxArrIndex] = begin_time[i] = (_this.beginTime[_idxArrIndex] >= 0 && _this.beginTime[_idxArrIndex] <= 59) ? _this.beginTime[_idxArrIndex] : 0;
								_this.endTime[_idxArrIndex] = end_time[i] = (_this.endTime[_idxArrIndex] >= 0 && _this.endTime[_idxArrIndex] <= 59) ? _this.endTime[_idxArrIndex] : 59;
								recent_time[i] = _this.recentTime[_idxArrIndex];
								break;
						}
						_idxArrIndex++;
					}
				});
				var bt = new Date(begin_time[0], begin_time[1], begin_time[2], begin_time[3], begin_time[4]).getTime();
				var et = new Date(end_time[0], end_time[1], end_time[2], end_time[3], end_time[4]).getTime();
				var rt = new Date(recent_time[0], recent_time[1], recent_time[2], recent_time[3], recent_time[4]).getTime();
				rt < bt ? alert('当前时间小于开始时间') : "";
				rt > et ? alert('当前时间超过结束时间') : "";
				return (bt <= rt && rt <= et);
			} else {
				alert('error,please open the console to see the errmsg');
				console.warn('type为1时,时间数组长度为0或5');
				console.warn('构造函数的参数param或recentTime设置有误');
				console.warn('param必须是连续的1，recentTime的值必须与param中的值对应');
				console.warn('构造函数调用失败，请重新设置参数');
				return false;
			}
		},
		checkTimeArr: function (arr1, arr2, length) {
			var checkStatus = true;
			loop(0, length, function (i) {
				if (arr1[i] != arr2[i]) checkStatus = false;
			});
			return checkStatus;
		},
		initDomFuc: function () {
			var _this = this;
			this.checkParam();
			if (!this.checkTime())return;
			var html = '';
			html += '<div class="date-selector-bg" id="date-selector-bg-' + _this.container + '">' +
				'<div  class="date-selector-container" id="date-selector-container-' + _this.container + '">' +
				'<div class="date-selector-btn-box">' +
				'<div class="date-selector-btn" id="date-selector-btn-cancel">返回</div>';
			
			if (this.type == 1) {
				html += '<div class="date-selector-tab-box">' +
					'<div class="date-selector-tab date-selector-' + _this.container + '-tab date-selector-tab-active">年月日</div>' +
					'<div class="date-selector-tab date-selector-' + _this.container + '-tab">时分</div>' +
					'</div>';
			}
			
			html += '<div class="date-selector-btn" id="date-selector-btn-save-' + _this.container + '">确定</div>' +
				'</div>' +
				'<div class="date-selector-content">';
			
			if (_this.type == 0) {
				loop(0, _this.idxArr.length, function (i) {
					html += '<div class="date-selector date-selector-left">' +
						'<ul id="date-selector-' + _this.container + '-' + _this.idxArr[i] + '"></ul>' +
						'</div>';
				});
				html += '<div class="date-selector-up-shadow"></div>' +
					'<div class="date-selector-down-shadow"></div>' +
					'<div class="date-selector-line"></div>' +
					'</div>';
				html += '</div></div>';
				$id(_this.container).innerHTML = html;
				loop(0, _this.ulCount, function (i) {
					$id('date-selector-container-' + _this.container).querySelectorAll(".date-selector")[i].style.width = (100 / _this.ulCount).toFixed(2) + '%';
				});
			} else if (_this.type == 1) {
				html += '<div class="date-selector date-selector-left">' +
					'<ul id="date-selector-' + _this.container + '-0"></ul>' +
					'</div>' +
					'<div class="date-selector date-selector-left">' +
					'<ul id="date-selector-' + _this.container + '-1"></ul>' +
					'</div>' +
					'<div class="date-selector date-selector-left">' +
					'<ul id="date-selector-' + _this.container + '-2"></ul>' +
					'</div>' +
					'<div class="date-selector-up-shadow"></div>' +
					'<div class="date-selector-down-shadow"></div>' +
					'<div class="date-selector-line"></div>' +
					'</div>' +
					'<div class="date-selector-content date-selector-content-right">' +
					'<div class="date-selector date-selector-right">' +
					'<ul id="date-selector-' + _this.container + '-3"></ul>' +
					'</div>' +
					'<div class="date-selector date-selector-right">' +
					'<ul id="date-selector-' + _this.container + '-4"></ul>' +
					'</div>' +
					'<div class="date-selector-up-shadow"></div>' +
					'<div class="date-selector-down-shadow"></div>' +
					'<div class="date-selector-line"></div>' +
					'</div>';
				html += '</div></div>';
				$id(_this.container).innerHTML = html;
			}
		},
		initReady: function () {
			var _this   = this;
			var realIdx = 0;
			loop(0, _this.ulCount, function (i) {
				realIdx       = _this.idxArr[i];
				var min       = 0;
				var max       = 0;
				var tempDomUl = $id('date-selector-' + _this.container + '-' + _this.idxArr[i]);
				var tempArray = _this['array' + _this.idxArr[i]] = [];
				switch (realIdx) {
					case 0:
						_this.initCommonArr(tempDomUl, tempArray, _this.beginTime[i], _this.endTime[i], '年', i);
						break;
					case 1:
						min = (_this.checkTimeArr(_this.begin_time, _this.recent_time, 1)) ? _this.beginTime[i] : 1;
						max = (_this.checkTimeArr(_this.end_time, _this.recent_time, 1)) ? _this.endTime[i] : 12;
						_this.initCommonArr(tempDomUl, tempArray, min, max, '月', i);
						break;
					case 2:
						min = (_this.checkTimeArr(_this.begin_time, _this.recent_time, 2)) ? _this.beginTime[i] : 1;
						max = (_this.checkTimeArr(_this.end_time, _this.recent_time, 2)) ? _this.endTime[i] : new Date(_this.recent_time[0], _this.recent_time[1], 0).getDate();
						_this.initCommonArr(tempDomUl, tempArray, min, max, '日', i);
						break;
					case 3:
						min = (_this.checkTimeArr(_this.begin_time, _this.recent_time, 3)) ? _this.beginTime[i] : 0;
						max = (_this.checkTimeArr(_this.end_time, _this.recent_time, 3)) ? _this.endTime[i] : 23;
						_this.initCommonArr(tempDomUl, tempArray, min, max, '时', i);
						break;
					case 4 :
						min = (_this.checkTimeArr(_this.begin_time, _this.recent_time, 4)) ? _this.beginTime[i] : 0;
						max = (_this.checkTimeArr(_this.end_time, _this.recent_time, 4)) ? _this.endTime[i] : 59;
						_this.initCommonArr(tempDomUl, tempArray, min, max, '分', i);
						break;
				}
				tempDomUl.addEventListener('touchstart', function () {
					_this.touch(event, _this, tempDomUl, _this['array' + _this.idxArr[i]], i);
				}, false);
				tempDomUl.addEventListener('touchmove', function () {
					_this.touch(event, _this, tempDomUl, _this['array' + _this.idxArr[i]], i);
				}, false);
				tempDomUl.addEventListener('touchend', function () {
					_this.touch(event, _this, tempDomUl, _this['array' + _this.idxArr[i]], i);
				}, true);
			});
		},
		initBinding: function () {
			var _this     = this;
			var bg        = $id('date-selector-bg-' + _this.container);
			var container = $id('date-selector-container-' + _this.container);
			var body      = doc.body;
			on('touchstart', _this.input, function () {
				bg.classList.add('date-selector-bg-up', 'date-selector-bg-delay');
				container.classList.add('date-selector-container-up');
				body.classList.add('date-selector-locked');
			}, false);
			
			on('touchstart', 'date-selector-btn-save-' + _this.container, function () {
				_this.success(_this.resultArr);
				bg.classList.remove('date-selector-bg-up');
				container.classList.remove('date-selector-container-up');
				setTimeout(function () {
					bg.classList.remove('date-selector-bg-delay');
				}, 350);
				body.classList.remove('date-selector-locked');
			}, false);
			
			on('touchstart', 'date-selector-bg-' + _this.container, function () {
				bg.classList.remove('date-selector-bg-up');
				container.classList.remove('date-selector-container-up');
				setTimeout(function () {
					bg.classList.remove('date-selector-bg-delay');
				}, 350);
				body.classList.remove('date-selector-locked');
			}, false);
			
			on('touchstart', 'date-selector-btn-cancel', function () {
				bg.classList.remove('date-selector-bg-up');
				container.classList.remove('date-selector-container-up');
				setTimeout(function () {
					bg.classList.remove('date-selector-bg-delay');
				}, 350);
				body.classList.remove('date-selector-locked');
			}, false);
			
			on('touchstart', 'date-selector-tab date-selector-' + _this.container + '-tab', function (event) {
				var tab     = container.getElementsByClassName('date-selector-tab');
				var content = container.getElementsByClassName('date-selector-content');
				loop(0, tab.length, function (i) {
					tab[i].classList.remove('date-selector-tab-active');
				});
				event.target.classList.add('date-selector-tab-active');
				if (event.target.innerHTML == '年月日') {
					content[0].classList.remove('date-selector-content-left');
					content[1].classList.add('date-selector-content-right');
				} else {
					content[0].classList.add('date-selector-content-left');
					content[1].classList.remove('date-selector-content-right');
				}
			}, false);
		},
		initCommonArr: function (tempDomUl, tempArr, min, max, str, idx) {
			var _this = this;
			var Html  = '';
			loop(min, max + 1, function (i) {
				tempArr.push(i);
			});
			_this.maxHeight.push(_this.liHeight * (max - min));
			var res = _this.recentTime[idx];
			_this.resultArr.push(res);
			tempArr.unshift('', '');
			tempArr.push('', '');
			tempDomUl.style.transform       = 'translate3d(0,-' + this.liHeight * (tempArr.indexOf(res) - 2) + 'px, 0)';
			tempDomUl.style.webkitTransform = 'translate3d(0,-' + this.liHeight * (tempArr.indexOf(res) - 2) + 'px, 0)';
			_this.distance.push(this.liHeight * (tempArr.indexOf(res) - 2));
			loop(0, tempArr.length, function (j) {
				Html += '<li>' + tempArr[j] + (tempArr[j] === '' ? '' : str) + '</li>';
			});
			tempDomUl.innerHTML = Html;
		},
		initRangeArr: function (min, max, str, checkIdx, dir) {
			var _this      = this;
			var realIdx    = _this.idxArr[checkIdx];
			var arr        = [];
			var $selector  = $id('date-selector-' + _this.container + '-' + realIdx);
			var targetLong = 0;
			loop(min, max + 1, function (k) {
				arr.push(k);
			});
			var Html = '';
			arr.unshift('', '');
			arr.push('', '');
			for ( var i = 0; i < arr.length; i++ ) {
				Html += '<li>' + arr[i] + (arr[i] === '' ? '' : str) + '</li>';
			}
			_this['array' + realIdx] = [];
			_this['array' + realIdx] = arr;
			$selector.innerHTML      = Html;
			
			if (dir == 0) {
				targetLong                               = min > this.resultArr[checkIdx] ? 0 : -arr.indexOf(this.resultArr[checkIdx]) * this.liHeight + this.liHeight * 2;
				this.resultArr[checkIdx]                 = this.resultArr[checkIdx] < min ? min : this.resultArr[checkIdx];
				this.recent_time[_this.idxArr[checkIdx]] = _this.resultArr[checkIdx];
			} else if (dir == 1) {
				targetLong                               = max > this.resultArr[checkIdx] ?
				-arr.indexOf(this.resultArr[checkIdx]) * this.liHeight + this.liHeight * 2 :
				-arr.indexOf(max) * this.liHeight + this.liHeight * 2;
				this.resultArr[checkIdx]                 = this.resultArr[checkIdx] > max ? max : this.resultArr[checkIdx];
				this.recent_time[_this.idxArr[checkIdx]] = _this.resultArr[checkIdx];
			} else {
				if (arr.indexOf(this.resultArr[checkIdx]) == -1) {
					targetLong = (this.maxHeight[checkIdx] > this.liHeight * (max - min)) ? -this.liHeight * (max - min) : -this.distance[checkIdx];
				} else {
					targetLong = -arr.indexOf(this.resultArr[checkIdx]) * this.liHeight + 2 * this.liHeight;
				}
				this.recent_time[realIdx] = -targetLong / this.liHeight + 1;
				this.resultArr[checkIdx]  = arr[-targetLong / this.liHeight + 2];
			}
			
			$selector.style.transform        = 'translate3d(0,' + targetLong + 'px, 0)';
			$selector.style.webkitTransform  = 'translate3d(0,' + targetLong + 'px, 0)';
			$selector.style.transition       = 'transform 0.15s ease-out';
			$selector.style.webkitTransition = '-webkit-transform 0.15s ease-out';
			this.maxHeight[checkIdx]         = this.liHeight * (max - min);
			this.distance[checkIdx]          = Math.abs(targetLong);
		},
		checkRange: function (checkIdx) {
			var _this = this;
			if (checkIdx >= _this.ulCount - 1) return;
			var min     = 0;
			var max     = 0;
			var str     = '';
			var dir     = 0; //0在顶部,1在底部,-1在中间
			var realIdx = _this.idxArr[checkIdx];
			switch (realIdx) {
				case 0:
					min = 1;
					max = 12;
					str = '月';
					break;
				case 1:
					min = 1;
					max = new Date(_this.recent_time[0], _this.recent_time[1], 0).getDate();
					str = '日';
					break;
				case 2:
					min = 0;
					max = 23;
					str = '时';
					break;
				case 3:
					min = 0;
					max = 59;
					str = '分';
					break;
			}
			loop(0, checkIdx + 1, function (p) {
				if (_this.beginTime[p] != _this.resultArr[p]) {
					dir = 1;
					loop(0, checkIdx + 1, function (q) {
						if (_this.endTime[q] != _this.resultArr[q]) dir = -1;
					});
				}
			});
			
			if (dir == 0) {
				min = _this.beginTime[checkIdx + 1] >= min ? _this.beginTime[checkIdx + 1] : 0;
			} else if (dir == 1) {
				max = _this.endTime[checkIdx + 1] <= max ? _this.endTime[checkIdx + 1] : 0;
			}
			_this.initRangeArr(min, max, str, checkIdx + 1, dir);
			_this.checkRange(checkIdx + 1);
		},
		initPosition: function (dis, max, idx) {
			dis     = dis < 0 ? 0 : dis;
			dis     = dis > max ? max : dis;
			var sub = dis % this.liHeight;
			if (sub < this.liHeight / 2) {
				this.distance[idx] = dis - sub;
			} else {
				this.distance[idx] = dis + (this.liHeight - sub);
			}
			return this;
		},
		initSpeed: function (arr, dir, max, idx) {
			var variance = 0;
			var sum      = 0;
			for ( var i in arr ) {
				sum += arr[i] - 0;
			}
			for ( var j in arr ) {
				variance += (arr[j] - (sum / arr.length)) * (arr[j] - (sum / arr.length));
			}
			var rate = 0;
			if ((variance / arr.length).toFixed(2) > .1) {
				rate = max > this.liHeight * 15 ? dir * 2 : 0;
				this.initPosition(this.distance[idx] + rate, max, idx);
				this.move.speed[0] = .2;
			} else {
				this.initPosition(this.distance[idx], max, idx);
				this.move.speed[0] = this.move.speed[0] > 0.2 ? .2 : this.move.speed[0];
			}
			return this;
		},
		touch: function (event, that, $selector, array, idx) {
			event = event || window.event;
			event.preventDefault();
			switch (event.type) {
				case "touchstart":
					that.move.speed = [];
					that.start.Y    = event.touches[0].clientY;
					that.start.time = Date.now();
					break;
				case "touchend":
					that.end.Y         = event.changedTouches[0].clientY;
					var tempDis        = that.distance[idx] + (that.start.Y - that.end.Y);
					that.distance[idx] = tempDis < 0 ? 0 : (tempDis < that.maxHeight[idx] ? tempDis : that.maxHeight[idx]);
					that.initSpeed(that.move.speed, that.start.Y - that.end.Y, that.maxHeight[idx], idx);
					var tempRes = that.end.index = that.distance[idx] / that.liHeight + 2;
					
					$selector.style.transform        = 'translate3d(0,-' + that.distance[idx] + 'px, 0)';
					$selector.style.webkitTransform  = 'translate3d(0,-' + that.distance[idx] + 'px, 0)';
					$selector.style.transition       = 'transform ' + that.move.speed[0] + 's ease-out';
					$selector.style.webkitTransition = '-webkit-transform ' + that.move.speed[0] + 's ease-out';
					
					that.recent_time[that.idxArr[idx]] = that.resultArr[idx] = that['array' + that.idxArr[idx]][tempRes];
					that.checkRange(0);
					
					break;
				case "touchmove":
					event.preventDefault();
					that.move.Y = event.touches[0].clientY;
					var offset  = that.start.Y - that.move.Y;
					if (that.distance[idx] == 0 && offset < 0) {
						$selector.style.transform        = 'translate3d(0,' + 1.5 * that.liHeight + 'px, 0)';
						$selector.style.webkitTransform  = 'translate3d(0,' + 1.5 * that.liHeight + 'px, 0)';
						$selector.style.transition       = 'transform 0.3s ease-out';
						$selector.style.webkitTransition = '-webkit-transform 0.3s ease-out';
					} else {
						$selector.style.transform       = 'translate3d(0,-' + (offset + that.distance[idx]) + 'px, 0)';
						$selector.style.webkitTransform = 'translate3d(0,-' + (offset + that.distance[idx]) + 'px, 0)';
					}
					if (this.distance[idx] <= -that.maxHeight[idx]) {
						$selector.style.transform        = 'translate3d(0, -' + that.liHeight + 'px, 0)';
						$selector.style.webkitTransform  = 'translate3d(0, -' + that.liHeight + 'px, 0)';
						$selector.style.transition       = 'transform 0.3s ease-out';
						$selector.style.webkitTransition = '-webkit-transform 0.3s ease-out';
					}
					if (Math.abs(offset).toFixed(0) % 5 === 0) {
						var time = Date.now();
						that.move.speed.push((Math.abs(offset) / (time - that.start.time)).toFixed(2));
					}
					break;
			}
		}
	};
	if (typeof exports == "object") {
		module.exports = DateSelector;
	} else if (typeof define == "function" && define.amd) {
		define([], function () {
			return DateSelector;
		})
	} else {
		win.DateSelector = DateSelector;
	}
})(window, document);
}, function(t, a, e) {
	(function() {
	var k = ["usual", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	var j = {
		usual: [{
			C: "中国",
			N: "+86",
			B: "CN"
		}, {
			C: "中国台湾",
			N: "+886",
			B: "TW"
		}, {
			C: "中国香港",
			N: "+852",
			B: "HK"
		}, {
			C: "Brazil",
			N: "+55",
			B: "BR"
		}, {
			C: "India",
			N: "+91",
			B: "IN"
		}, {
			C: "Indonesia",
			N: "+62",
			B: "ID"
		}, {
			C: "Malaysia",
			N: "+60",
			B: "MY"
		}],
		A: [{
			B: "AD",
			C: "Andorra",
			N: "+376"
		}, {
			B: "AF",
			C: "Afghanistan",
			N: "+93"
		}, {
			B: "AG",
			C: "Antigua and Barbuda",
			N: "+1"
		}, {
			B: "AI",
			C: "Anguilla",
			N: "+1"
		}, {
			B: "AL",
			C: "Albania",
			N: "+355"
		}, {
			B: "AM",
			C: "Armenia",
			N: "+374"
		}, {
			B: "AO",
			C: "Angola",
			N: "+244"
		}, {
			B: "AR",
			C: "Argentina",
			N: "+54"
		}, {
			B: "AS",
			C: "American Samoa",
			N: "+1"
		}, {
			B: "AT",
			C: "Austria",
			N: "+43"
		}, {
			B: "AU",
			C: "Australia",
			N: "+61"
		}, {
			B: "AW",
			C: "Aruba",
			N: "+297"
		}, {
			B: "AZ",
			C: "Azerbaijan",
			N: "+994"
		}, {
			B: "DZ",
			C: "Algeria",
			N: "+213"
		}],
		B: [{
			B: "BA",
			C: "Bosnia and Herzegovina",
			N: "+387"
		}, {
			B: "BB",
			C: "Barbados",
			N: "+1"
		}, {
			B: "BD",
			C: "Bangladesh",
			N: "+880"
		}, {
			B: "BE",
			C: "Belgium",
			N: "+32"
		}, {
			B: "BF",
			C: "Burkina Faso",
			N: "+226"
		}, {
			B: "BG",
			C: "Bulgaria",
			N: "+359"
		}, {
			B: "BH",
			C: "Bahrain",
			N: "+973"
		}, {
			B: "BI",
			C: "Burundi",
			N: "+257"
		}, {
			B: "BJ",
			C: "Benin",
			N: "+229"
		}, {
			B: "BM",
			C: "Bermuda",
			N: "+1"
		}, {
			B: "BN",
			C: "Brunei",
			N: "+673"
		}, {
			B: "BO",
			C: "Bolivia",
			N: "+591"
		}, {
			B: "BQ",
			C: "Bonaire, Sint Eustatius and Saba",
			N: "+599"
		}, {
			B: "BR",
			C: "Brazil",
			N: "+55"
		}, {
			B: "BS",
			C: "Bahamas",
			N: "+1"
		}, {
			B: "BT",
			C: "Bhutan",
			N: "+975"
		}, {
			B: "BW",
			C: "Botswana",
			N: "+267"
		}, {
			B: "BY",
			C: "Belarus",
			N: "+375"
		}, {
			B: "BZ",
			C: "Belize",
			N: "+501"
		}, {
			B: "IO",
			C: "British Indian Ocean Territory",
			N: "+246"
		}, {
			B: "VG",
			C: "British Virgin Islands",
			N: "+1"
		}],
		C: [{
			B: "CA",
			C: "Canada",
			N: "+1"
		}, {
			B: "CC",
			C: "Cocos Islands",
			N: "+61"
		}, {
			B: "CF",
			C: "Central African Republic",
			N: "+236"
		}, {
			B: "CG",
			C: "Congo",
			N: "+242"
		}, {
			B: "CI",
			C: "C么te d'Ivoire",
			N: "+225"
		}, {
			B: "CK",
			C: "Cook Islands",
			N: "+682"
		}, {
			B: "CL",
			C: "Chile",
			N: "+56"
		}, {
			B: "CM",
			C: "Cameroon",
			N: "+237"
		}, {
			B: "CN",
			C: "China",
			N: "+86"
		}, {
			B: "CO",
			C: "Colombia",
			N: "+57"
		}, {
			B: "CR",
			C: "Costa Rica",
			N: "+506"
		}, {
			B: "CU",
			C: "Cuba",
			N: "+53"
		}, {
			B: "CV",
			C: "Cape Verde",
			N: "+238"
		}, {
			B: "CW",
			C: "Curacao",
			N: "+599"
		}, {
			B: "CX",
			C: "Christmas Island",
			N: "+61"
		}, {
			B: "CY",
			C: "Cyprus",
			N: "+357"
		}, {
			B: "CZ",
			C: "Czech Republic",
			N: "+420"
		}, {
			B: "HR",
			C: "Croatia",
			N: "+385"
		}, {
			B: "KH",
			C: "Cambodia",
			N: "+855"
		}, {
			B: "KM",
			C: "Comoros",
			N: "+269"
		}, {
			B: "KY",
			C: "Cayman Islands",
			N: "+1"
		}, {
			B: "TD",
			C: "Chad",
			N: "+235"
		}],
		D: [{
			B: "DJ",
			C: "Djibouti",
			N: "+253"
		}, {
			B: "DK",
			C: "Denmark",
			N: "+45"
		}, {
			B: "DM",
			C: "Dominica",
			N: "+1"
		}, {
			B: "DO",
			C: "Dominican Republic",
			N: "+1"
		}],
		E: [{
			B: "EC",
			C: "Ecuador",
			N: "+593"
		}, {
			B: "EE",
			C: "Estonia",
			N: "+372"
		}, {
			B: "EG",
			C: "Egypt",
			N: "+20"
		}, {
			B: "ER",
			C: "Eritrea",
			N: "+291"
		}, {
			B: "ET",
			C: "Ethiopia",
			N: "+251"
		}, {
			B: "GQ",
			C: "Equatorial Guinea",
			N: "+240"
		}, {
			B: "SV",
			C: "El Salvador",
			N: "+503"
		}],
		F: [{
			B: "FI",
			C: "Finland",
			N: "+358"
		}, {
			B: "FJ",
			C: "Fiji",
			N: "+679"
		}, {
			B: "FK",
			C: "Falkland Islands",
			N: "+5+"
		}, {
			B: "FO",
			C: "Faroe Islands",
			N: "+298"
		}, {
			B: "FR",
			C: "France",
			N: "+33"
		}, {
			B: "GF",
			C: "French Guiana",
			N: "+594"
		}, {
			B: "PF",
			C: "French Polynesia",
			N: "+689"
		}],
		G: [{
			B: "DE",
			C: "Germany",
			N: "+49"
		}, {
			B: "GA",
			C: "Gabon",
			N: "+241"
		}, {
			B: "GD",
			C: "Grenada",
			N: "+1"
		}, {
			B: "GE",
			C: "Georgia",
			N: "+995"
		}, {
			B: "GG",
			C: "Guernsey",
			N: "+44"
		}, {
			B: "GH",
			C: "Ghana",
			N: "+233"
		}, {
			B: "GI",
			C: "Gibraltar",
			N: "+350"
		}, {
			B: "GL",
			C: "Greenland",
			N: "+299"
		}, {
			B: "GM",
			C: "Gambia",
			N: "+220"
		}, {
			B: "GN",
			C: "Guinea",
			N: "+224"
		}, {
			B: "GP",
			C: "Guadeloupe",
			N: "+590"
		}, {
			B: "GR",
			C: "Greece",
			N: "+30"
		}, {
			B: "GT",
			C: "Guatemala",
			N: "+502"
		}, {
			B: "GU",
			C: "Guam",
			N: "+1"
		}, {
			B: "GW",
			C: "Guinea-Bissau",
			N: "+245"
		}, {
			B: "GY",
			C: "Guyana",
			N: "+592"
		}],
		H: [{
			B: "HK",
			C: "Hong Kong",
			N: "+852"
		}, {
			B: "HN",
			C: "Honduras",
			N: "+504"
		}, {
			B: "HT",
			C: "Haiti",
			N: "+509"
		}, {
			B: "HU",
			C: "Hungary",
			N: "+36"
		}],
		I: [{
			B: "ID",
			C: "Indonesia",
			N: "+62"
		}, {
			B: "IE",
			C: "Ireland",
			N: "+353"
		}, {
			B: "IL",
			C: "Israel",
			N: "+972"
		}, {
			B: "IM",
			C: "Isle Of Man",
			N: "+44"
		}, {
			B: "IN",
			C: "India",
			N: "+91"
		}, {
			B: "IQ",
			C: "Iraq",
			N: "+964"
		}, {
			B: "IR",
			C: "Iran",
			N: "+98"
		}, {
			B: "IS",
			C: "Iceland",
			N: "+354"
		}, {
			B: "IT",
			C: "Italy",
			N: "+39"
		}],
		J: [{
			B: "JE",
			C: "Jersey",
			N: "+44"
		}, {
			B: "JM",
			C: "Jamaica",
			N: "+1"
		}, {
			B: "JO",
			C: "Jordan",
			N: "+962"
		}, {
			B: "JP",
			C: "Japan",
			N: "+81"
		}],
		K: [{
			B: "KE",
			C: "Kenya",
			N: "+254"
		}, {
			B: "KG",
			C: "Kyrgyzstan",
			N: "+996"
		}, {
			B: "KI",
			C: "Kiribati",
			N: "+686"
		}, {
			B: "KW",
			C: "Kuwait",
			N: "+965"
		}, {
			B: "KZ",
			C: "Kazakhstan",
			N: "+7"
		}],
		L: [{
			B: "LA",
			C: "Laos",
			N: "+856"
		}, {
			B: "LB",
			C: "Lebanon",
			N: "+961"
		}, {
			B: "LI",
			C: "Liechtenstein",
			N: "+423"
		}, {
			B: "LR",
			C: "Liberia",
			N: "+231"
		}, {
			B: "LS",
			C: "Lesotho",
			N: "+266"
		}, {
			B: "LT",
			C: "Lithuania",
			N: "+370"
		}, {
			B: "LU",
			C: "Luxembourg",
			N: "+352"
		}, {
			B: "LV",
			C: "Latvia",
			N: "+371"
		}, {
			B: "LY",
			C: "Libya",
			N: "+218"
		}],
		M: [{
			B: "FM",
			C: "Micronesia",
			N: "+691"
		}, {
			B: "MA",
			C: "Morocco",
			N: "+212"
		}, {
			B: "MC",
			C: "Monaco",
			N: "+377"
		}, {
			B: "MD",
			C: "Moldova",
			N: "+373"
		}, {
			B: "ME",
			C: "Montenegro",
			N: "+382"
		}, {
			B: "MG",
			C: "Madagascar",
			N: "+261"
		}, {
			B: "MH",
			C: "Marshall Islands",
			N: "+692"
		}, {
			B: "MK",
			C: "Macedonia",
			N: "+389"
		}, {
			B: "ML",
			C: "Mali",
			N: "+223"
		}, {
			B: "MM",
			C: "Myanmar",
			N: "+95"
		}, {
			B: "MN",
			C: "Mongolia",
			N: "+976"
		}, {
			B: "MO",
			C: "Macao",
			N: "+853"
		}, {
			B: "MQ",
			C: "Martinique",
			N: "+596"
		}, {
			B: "MR",
			C: "Mauritania",
			N: "+222"
		}, {
			B: "MS",
			C: "Montserrat",
			N: "+1"
		}, {
			B: "MT",
			C: "Malta",
			N: "+356"
		}, {
			B: "MU",
			C: "Mauritius",
			N: "+230"
		}, {
			B: "MV",
			C: "Maldives",
			N: "+960"
		}, {
			B: "MW",
			C: "Malawi",
			N: "+265"
		}, {
			B: "MX",
			C: "Mexico",
			N: "+52"
		}, {
			B: "MY",
			C: "Malaysia",
			N: "+60"
		}, {
			B: "MZ",
			C: "Mozambique",
			N: "+258"
		}, {
			B: "YT",
			C: "Mayotte",
			N: "+262"
		}],
		N: [{
			B: "KP",
			C: "North Korea",
			N: "+850"
		}, {
			B: "MP",
			C: "Northern Mariana Islands",
			N: "+1"
		}, {
			B: "NA",
			C: "Namibia",
			N: "+264"
		}, {
			B: "NC",
			C: "New Caledonia",
			N: "+687"
		}, {
			B: "NE",
			C: "Niger",
			N: "+227"
		}, {
			B: "NF",
			C: "Norfolk Island",
			N: "+672"
		}, {
			B: "NG",
			C: "Nigeria",
			N: "+234"
		}, {
			B: "NI",
			C: "Nicaragua",
			N: "+505"
		}, {
			B: "NL",
			C: "Netherlands",
			N: "+31"
		}, {
			B: "NO",
			C: "Norway",
			N: "+47"
		}, {
			B: "NP",
			C: "Nepal",
			N: "+977"
		}, {
			B: "NR",
			C: "Nauru",
			N: "+674"
		}, {
			B: "NU",
			C: "Niue",
			N: "+683"
		}, {
			B: "NZ",
			C: "New Zealand",
			N: "+64"
		}],
		O: [{
			B: "OM",
			C: "Oman",
			N: "+968"
		}],
		P: [{
			B: "PA",
			C: "Panama",
			N: "+507"
		}, {
			B: "PE",
			C: "Peru",
			N: "+51"
		}, {
			B: "PG",
			C: "Papua New Guinea",
			N: "+675"
		}, {
			B: "PH",
			C: "Philippines",
			N: "+63"
		}, {
			B: "PK",
			C: "Pakistan",
			N: "+92"
		}, {
			B: "PL",
			C: "Poland",
			N: "+48"
		}, {
			B: "PR",
			C: "Puerto Rico",
			N: "+1"
		}, {
			B: "PS",
			C: "Palestine",
			N: "+970"
		}, {
			B: "PT",
			C: "Portugal",
			N: "+351"
		}, {
			B: "PW",
			C: "Palau",
			N: "+680"
		}, {
			B: "PY",
			C: "Paraguay",
			N: "+595"
		}],
		Q: [{
			B: "QA",
			C: "Qatar",
			N: "+974"
		}],
		R: [{
			B: "RE",
			C: "Reunion",
			N: "+262"
		}, {
			B: "RO",
			C: "Romania",
			N: "+40"
		}, {
			B: "RU",
			C: "Russia",
			N: "+7"
		}, {
			B: "RW",
			C: "Rwanda",
			N: "+250"
		}],
		S: [{
			B: "BL",
			C: "Saint Barthélemy",
			N: "+590"
		}, {
			B: "CH",
			C: "Switzerland",
			N: "+41"
		}, {
			B: "ES",
			C: "Spain",
			N: "+34"
		}, {
			B: "KN",
			C: "Saint Kitts And Nevis",
			N: "+1"
		}, {
			B: "KR",
			C: "South Korea",
			N: "+82"
		}, {
			B: "LC",
			C: "Saint Lucia",
			N: "+1"
		}, {
			B: "LK",
			C: "Sri Lanka",
			N: "+94"
		}, {
			B: "MF",
			C: "Saint Martin",
			N: "+590"
		}, {
			B: "PM",
			C: "Saint Pierre And Miquelon",
			N: "+508"
		}, {
			B: "RS",
			C: "Serbia",
			N: "+381"
		}, {
			B: "SA",
			C: "Saudi Arabia",
			N: "+966"
		}, {
			B: "SB",
			C: "Solomon Islands",
			N: "+677"
		}, {
			B: "SC",
			C: "Seychelles",
			N: "+248"
		}, {
			B: "SD",
			C: "Sudan",
			N: "+249"
		}, {
			B: "SE",
			C: "Sweden",
			N: "+46"
		}, {
			B: "SG",
			C: "Singapore",
			N: "+65"
		}, {
			B: "SH",
			C: "Saint Helena",
			N: "+290"
		}, {
			B: "SI",
			C: "Slovenia",
			N: "+386"
		}, {
			B: "SJ",
			C: "Svalbard And Jan Mayen",
			N: "+47"
		}, {
			B: "SK",
			C: "Slovakia",
			N: "+421"
		}, {
			B: "SL",
			C: "Sierra Leone",
			N: "+232"
		}, {
			B: "SM",
			C: "San Marino",
			N: "+378"
		}, {
			B: "SN",
			C: "Senegal",
			N: "+221"
		}, {
			B: "SO",
			C: "Somalia",
			N: "+252"
		}, {
			B: "SR",
			C: "Suriname",
			N: "+597"
		}, {
			B: "ST",
			C: "Sao Tome And Principe",
			N: "+239"
		}, {
			B: "SX",
			C: "Sint Maarten (Dutch part)",
			N: "+1"
		}, {
			B: "SY",
			C: "Syria",
			N: "+963"
		}, {
			B: "SZ",
			C: "Swaziland",
			N: "+268"
		}, {
			B: "VC",
			C: "Saint Vincent And The Grenadines",
			N: "+1"
		}, {
			B: "WS",
			C: "Samoa",
			N: "+685"
		}, {
			B: "ZA",
			C: "South Africa",
			N: "+27"
		}],
		T: [{
			B: "CD",
			C: "The Democratic Republic Of Congo",
			N: "+243"
		}, {
			B: "TC",
			C: "Turks And Caicos Islands",
			N: "+1"
		}, {
			B: "TG",
			C: "Togo",
			N: "+228"
		}, {
			B: "TH",
			C: "Thailand",
			N: "+66"
		}, {
			B: "TJ",
			C: "Tajikistan",
			N: "+992"
		}, {
			B: "TK",
			C: "Tokelau",
			N: "+690"
		}, {
			B: "TL",
			C: "Timor-Leste",
			N: "+670"
		}, {
			B: "TM",
			C: "Turkmenistan",
			N: "+993"
		}, {
			B: "TN",
			C: "Tunisia",
			N: "+216"
		}, {
			B: "TO",
			C: "Tonga",
			N: "+676"
		}, {
			B: "TR",
			C: "Turkey",
			N: "+90"
		}, {
			B: "TT",
			C: "Trinidad and Tobago",
			N: "+1"
		}, {
			B: "TV",
			C: "Tuvalu",
			N: "+688"
		}, {
			B: "TW",
			C: "Taiwan",
			N: "+886"
		}, {
			B: "TZ",
			C: "Tanzania",
			N: "+255"
		}],
		U: [{
			B: "AE",
			C: "United Arab Emirates",
			N: "+971"
		}, {
			B: "GB",
			C: "United Kingdom",
			N: "+44"
		}, {
			B: "UA",
			C: "Ukraine",
			N: "+380"
		}, {
			B: "UG",
			C: "Uganda",
			N: "+256"
		}, {
			B: "US",
			C: "United States",
			N: "+1"
		}, {
			B: "UY",
			C: "Uruguay",
			N: "+598"
		}, {
			B: "UZ",
			C: "Uzbekistan",
			N: "+998"
		}, {
			B: "VI",
			C: "U.S. Virgin Islands",
			N: "+1"
		}],
		V: [{
			B: "VA",
			C: "Vatican",
			N: "+379"
		}, {
			B: "VE",
			C: "Venezuela",
			N: "+58"
		}, {
			B: "VN",
			C: "Vietnam",
			N: "+84"
		}, {
			B: "VU",
			C: "Vanuatu",
			N: "+678"
		}],
		W: [{
			B: "EH",
			C: "Western Sahara",
			N: "+212"
		}, {
			B: "WF",
			C: "Wallis And Futuna",
			N: "+681"
		}],
		Y: [{
			B: "YE",
			C: "Yemen",
			N: "+967"
		}],
		Z: [{
			B: "ZM",
			C: "Zambia",
			N: "+260"
		}, {
			B: "ZW",
			C: "Zimbabwe",
			N: "+263"
		}]
	};

	function f(w, x, r) {
		var v = ["<div class='country-code'>"];
		var u, o;
		for(var q, y, t = 0; q = k[t++];) { //q=user A B
			u = j[q]; //u= user［C: "中国",N: "+86",B: "CN"
			y = "";
			if(w && (q in w)) {
				y = w[q]
			}
			if(u) {
				v.push("<div class='countrycode-" + q + "'><div class='coun-header'>" + (y || q) + "</div>");
				v.push("<ul class='list'>");
				for(var m, s = 0; m = u[s++];) {　　
					o = x ? (m.N + "").replace(/^0+/, function() {　　
						return "+"
					}) : "";
					v.push("<li class='record'><span class='record-country' data-code='" + o + "' data-brief='" + m.B + "'>" + m.C + "</span><span class='record-code'>" + o + "</span></li>")
				}
				v.push("</ul></div>")
			}
		}
		
//		var z = cancelStr = "";
//		cancelStr = (!!JSP_VAR && !!JSP_VAR.cancel) ? JSP_VAR.cancel : "Cancel";
//		!!r ? z = "" : z = '<div class="cancel-panel"><div class="cancel-box"><a class="btnadpt bg_white btn-cancel" href="javascript:void(0);">' + cancelStr + "</a></div></div>";
		
		v.push("</div>");
//		v.push(z);

		var c = "<div class='cancel-panel'><div class='cancel-box'><a class='btnadpt bg_white btn-cancel' href='javascript:void(0);'>取消</a></div></div>";
		v.push(c);
		return v.join("")
	}

	function i(m, s) {
		var r;
		if(m) {
			var u;
			var q = (s ? 1 : 0);
			for(; u = k[q++];) {
				r = j[u];
				if(r) {
					for(var t, o = 0; t = r[o]; o++) {
						if(m(u, t) === true) {
							break
						}
					}
				}
			}
		}
	}

	function d(n) {
		var m;
		i(function(o, p) {
			if((n + "").toUpperCase() === p.B) {
				m = m || p;
				return true
			}
		});
		return m
	}

	function h(n) {
		var m;
		i(function(o, q) {
			n = (n + "").replace(/^0+/, "").replace(/^\+/, "");
			var p = (q.N + "").replace(/^0+/, "").replace(/^\+/, "");
			if(n === p) {
				m = q
			}
		});
		return m
	}

	function e(n) {
		var m;
		i(function(o, p) {
			if((n + "").toLowerCase() === p.C.toLowerCase()) {
				m = p;
				return true
			}
		});
		return m
	}

	function l(n) {
		var m = d(n) || h(n) || e(n);
		return m
	}

	function a(n) {
		var m = [];
		n = (n + "").replace(/^\+/, "");
		if(n) {
			var o = l(n);
			o && m.push(o);
			i(function(p, q) {
				if(q.C.toLowerCase().indexOf(n) !== -1) {
					m.push(q)
				} else {
					if((q.N + "").indexOf(n) !== -1) {
						m.push(q)
					}
				}
			})
		}
		return m
	}

	function g(n) {
		var m = [];
		n = (n + "").replace(/^\+/, "");
		if(n) {
			var o = l(n);
			o && m.push(o);
			i(function(p, q) {
				if(new RegExp("^" + n, "i").test(q.C.toLowerCase())) {
					m.push(q)
				} else {
					if(new RegExp("^" + n).test(q.N.replace(/^\+/, ""))) {
						m.push(q)
					}
				}
			})
		}
		return m
	}

	function b(m) {
		if(m.B && m.C && m.N && !c(m)) {
			j.usual && j.usual.unshift(m)
		}
	}

	function c(o) {
		for(var n = 0, m; m = j.usual[n++];) {
			if(m.N === o.N || o.B === m.B) {
				return true
			}
		}
		return false
	}
	window.RegionsCode = {
		getAll: f,
		getData: function() {
			return {
				list: k,
				data: j
			}
		},
		getByBrief: d,
		getByCode: h,
		getByCountry: e,
		search: l,
		searchLike: a,
		searchLikeData: g,
		addUsual: b
	}
})();
}])