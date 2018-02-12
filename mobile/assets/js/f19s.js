if (typeof Object.create !== "function") {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}
(function(window,$,document){
	function SlideMore(element) {
		this.$section = element, 
		this.$detail = element.find(".section-detail"), 
		this.$hero = element.find(".section-hero"),
		this.$showBtn = element.find(".btn-show"),
		this.$closeBtn = element.find(".btn-close"), 
		this.$main = $("#J_fragment"),
		this.$allSection = this.$main.children(), 
		this.CLASS_ANIMATING = "section-animating", 
		this.CLASS_OPENED = "section-opened", 
		this.CLASS_TRANSITION = "transition-animating", 
		this.$showBtn.on("click", this.open.bind(this)), 
		this.$closeBtn.on("click", this.close.bind(this))
	}

	function viewDist(dist) {
		var num = .85 * dist;
		return num < 600 && (num = 600), num
	}

	function cadence(t) {
		return t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1
	}

	function slideAnimte(t, o, i, e) {
		function n() {
			var h = (Date.now() - c) / t,
				r = e ? e(h) : h;
			o(r), h <= 1 ? window.animation(n) : (slideAnim = !0, i())
		}
		var c = Date.now();
		slideAnim = !1, window.animation(n)
	}
	var slideAnim = true,
		sliding = false,
		opening = null,
		prefix = function() {
			var t = window.getComputedStyle(document.documentElement, "");
			return "-" + (Array.prototype.slice.call(t).join("").match(/-(moz|webkit|ms)-/) || "" === t.OLink && ["", "o"])[1] + "-"
		}();
		
	$(window).on("mousewheel", function() {
		return slideAnim
	}), 
	
	window.animation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
		window.setTimeout(t, 1e3 / 60)
	}, 
	
	SlideMore.prototype.prevScopeNum = function(item) {
		var offTop = item.offset().top,
			sclTop = $(document).scrollTop(),
			prevItem = item.prev();
		return sclTop < offTop ? 1 + this.prevScopeNum(prevItem) : 0
	}, 
	SlideMore.prototype.nextScopeNum = function(item) {
		var winHeight = $(window).height(),
			itemHeight = item.height(),
			offTop = item.offset().top,
			sclTop = $(document).scrollTop(),
			nextItem = item.next(),
			count = winHeight - (offTop - sclTop) - itemHeight;
			
		return count > 0 && 0 !== nextItem.length ? 1 + this.nextScopeNum(nextItem) : count > 0 && 0 === nextItem.length ? 1 : 0
	}, 
	SlideMore.prototype.scopeSection = function() {
		for (var arr = {
				prev: [],
				next: [],
				all: []
			}, prevNum = this.prevScopeNum(this.$section), nextNum = this.nextScopeNum(this.$section), prevEle = this.$section.prev(), n = 0; n < prevNum; n++){ 
				prevEle.addClass("being"), 
				arr.prev.push(prevEle),
				prevEle = prevEle.prev();
		}
			
		for (var nextEle = this.$section.next(); nextNum > 0;) {
			for (;"none" === nextEle.css("display");) nextEle = nextEle.next();
			
			0 === nextEle.length && (nextEle = $(".footer")), 
			nextEle.addClass("being"), 
			arr.next.push(nextEle), 
			nextEle = nextEle.next(), 
			nextNum--
		}
		return this.$section.addClass("being"), 
		arr.all = arr.prev.concat(this.$section, arr.next), arr
	}, 
	SlideMore.prototype.fixedSection = function() {
		var sclTop = $(window).scrollTop();
		this.$main.css("height", this.$main.height()), 
		this.$allSection.each(function() {
			if ("fixed" !== $(this).children().first().css("position")) {
				var screenTop = $(this).offset().top - sclTop;
				$(this).css("top", screenTop)
			}
		}), 
		this.$allSection.each(function() {
			$(this).css("position", "fixed")
		})
	}, 
	SlideMore.prototype.closeOpened = function() {
		if(opening){
			opening.find(".section-detail").removeClass("active").css("position", "absolute").css("margin-top", "0").hide(), 
			opening.removeClass(this.CLASS_OPENED), 
			opening.removeClass(this.CLASS_ANIMATING), 
			opening = this.$section
		}else{
			opening = this.$section
		}
	}, 
	SlideMore.prototype.sectionSlideDown = function(item) {
		var sclTop = $(document).scrollTop(),
				winHeight = $(window).height(),
				itmeHeight = this.$section.height(),
				offTop = this.$section.offset().top,
				count = winHeight - (offTop - sclTop) - itmeHeight,
				NUM = viewDist(count),
				openingDetailHeight = 0,
				closeTop;
		if(opening){
			openingDetailHeight = opening.find(".section-detail").innerHeight(), 
			closeTop = opening.offset().top
		}
		var _this = this;
		slideAnimte(NUM, function(step) {
			if (opening && closeTop < offTop) {
				var scl = sclTop - (openingDetailHeight - 60) * step;
				$(window).scrollTop(scl)
			}
			var secTran = count * step,
				detailTran = -60 * step;
				
			_this.$detail.css(prefix + "transform", "translate3d(0," + detailTran + "px,0)"),
			item.forEach(function(sec) {
				sec.css(prefix + "transform", "translate3d(0," + secTran + "px,0)")
			})
		}, function() {
			opening && closeTop < offTop && $(window).scrollTop(sclTop - (openingDetailHeight - 60)), 
			_this.closeOpened(), 
			_this.$main.css("height", ""), 
			_this.$allSection.each(function() {
				$(this).css("position", ""), 
				$(this).css("top", "")
			}), 
			_this.$detail.css("position", "relative"), 
			_this.$detail.css(prefix + "transform", ""), 
			_this.$detail.css("margin-top", "-60px"), 
			item.forEach(function(sec) {
				sec.css(prefix + "transform", ""), 
				sec.removeClass(_this.CLASS_TRANSITION)
			}), 
			_this.$section.addClass(_this.CLASS_OPENED), 
			$(".being").removeClass("being"), 
			sliding = false
		}, cadence)
	}, 
	SlideMore.prototype.closeBtnFixed = function() {
		var scrlTop = $(document).scrollTop(),
				winHeight = $(window).height(),
				detailHeight = this.$detail.height(),
				offTop = this.$detail.offset().top;
		
		if(offTop - scrlTop <= 60 && winHeight - (offTop - scrlTop) - detailHeight <= winHeight - 150){
			this.$closeBtn.css("position", "fixed"), 
			this.$closeBtn.css("top", "75px")
		}else{
			this.$closeBtn.css("position", ""), 
			this.$closeBtn.css("top", "")
		}
	}, 
	SlideMore.prototype.open = function() {
		if (!sliding) {
			sliding = true;
			var _this = this,
				nexts = this.scopeSection().next;
			this.fixedSection(), 
			this.$closeBtn.css("position", ""), 
			this.$closeBtn.css("top", ""), 
			this.$section.addClass(this.CLASS_ANIMATING), 
			nexts.forEach(function(el) {
				el.addClass(_this.CLASS_TRANSITION)
			}), 
			this.$detail.addClass("active"), 
			this.$detail.css("position", "absolute"), 
			this.$detail.show(), 
			this.$showBtn.addClass("active"),
			this.sectionSlideDown(nexts);
			var scrolled = false;
			$(window).on("scroll", function() {
				scrolled || window.animation(function() {
					_this.closeBtnFixed(), 
					scrolled = false
				}), 
				scrolled = true
			})
		}
	}, 
	SlideMore.prototype.nextScopeSection = function(item) {
		for (var scrTop = $(document).scrollTop(), winHeight = $(window).height(), offTop = item.offset().top, heroHeight = item.find(".section-hero").height(), nextSec = item.next(), arr = [], r = winHeight - (offTop - scrTop) - heroHeight; r > 0;) {
			
			for (;"none" === nextSec.css("display");) nextSec = nextSec.next();
			0 === nextSec.length && (nextSec = o(".footer")), 
			arr.push(nextSec), 
			r -= nextSec.height(), 
			nextSec = nextSec.next()
		}
		return arr
	}, 
	SlideMore.prototype.sectionSlideUp = function() {
		var _this = this,
				nexts = this.nextScopeSection(this.$section);
				
		nexts.forEach(function(sec) {
			sec.addClass(_this.CLASS_TRANSITION)
		});
		
		var _transition = $("." + _this.CLASS_TRANSITION),
				nextView = nexts[0].offset().top - $(window).scrollTop() - $(window).height(),
				view = $(window).height() + $(window).scrollTop() - (this.$detail.offset().top + 60),
				num = .75 * view;
				
		num < 600 && (num = 600), 
		slideAnimte(num, function(step) {
			var detailTran = 60 * step,
					secTran = -(nextView + view * step);
					
			_this.$detail.css(prefix + "transform", "translate3d(0," + detailTran + "px,0)"), 
			_transition.css(prefix + "transform", "translate3d(0," + secTran + "px,0)")
		}, function() {
			_transition.removeClass(_this.CLASS_TRANSITION), 
			_this.$detail.css("position", "absolute"), 
			_this.$detail.css("margin-top", "0"), 
			_this.$detail.hide(), 
			_transition.css(prefix + "transform", ""), 
			sliding = false
		}, cadence)
	}, 
	SlideMore.prototype.prevScopeSection = function(item) {
		for (var scrTop = $(window).scrollTop(), detailHeight = item.find(".section-detail").height(), offTop = item.find(".section-detail").offset().top, prevSec = item.prev(), arr = [], h = offTop - scrTop + detailHeight - item.find(".section-hero").height(); h > 0;) {
			
			for (;"none" === prevSec.css("display");) prevSec = prevSec.prev();
			arr.push(prevSec), 
			h -= prevSec.hasClass("card-section") ? prevSec.find(".section-hero").height() : prevSec.height(), prevSec = prevSec.prev()
		}
		return arr
	}, 
	SlideMore.prototype.sectionSlideTop = function() {
		var _this = this;
		this.$hero.addClass(this.CLASS_TRANSITION), 
		this.prevScopeSection(this.$section).forEach(function(s) {
			s.addClass(_this.CLASS_TRANSITION)
		});
		var _transition = $("." + _this.CLASS_TRANSITION),
				nextView = this.$section.next().offset().top - $(window).scrollTop(),
				view = $(window).scrollTop() - this.$hero.offset().top - this.$hero.height(),
				num = viewDist(nextView),
				offTop = this.$detail.offset().top;
			
		this.fixedSection(), 
		slideAnimte(num, function(step) {
			var winScr = offTop - nextView * step + 60,
					secTran = view + nextView * step;
			$(window).scrollTop(winScr),
			_transition.css(prefix + "transform", "translate3d(0," + secTran + "px,0)")
		}, function() {
			_transition.removeClass(_this.CLASS_TRANSITION), 
			_this.$detail.css("position", "absolute"), 
			_this.$detail.css("margin-top", ""), 
			_this.$detail.hide(), 
			_transition.css(prefix + "transform", ""),
			_this.$main.css("height", ""), 
			_this.$allSection.each(function() {
				$(this).css("position", ""), 
				$(this).css("top", "")
			}), 
			sliding = !1
		}, cadence)
	},
	SlideMore.prototype.sectionSlideCenter = function() {
		var _this = this,
			winHeight = $(window).height(),
			half = parseInt(winHeight / 2, 10),
			view = winHeight - half,
			heroView = $(window).scrollTop() - this.$hero.offset().top - this.$hero.height(),
			nextView = this.$section.next().offset().top - $(window).height() - $(window).scrollTop(),
			offTop = this.$detail.offset().top,
			num = .75 * half;
			
		num < 600 && (num = 600), 
		this.$section.next().addClass(this.CLASS_TRANSITION),
		this.$hero.addClass(this.CLASS_TRANSITION), 
		this.fixedSection(), 
		slideAnimte(num, function(step) {
			var secTran = -(nextView + view * step),
					heroTran = heroView + half * step;
			_this.$hero.css(prefix + "transform", "translate3d(0," + heroTran + "px,0)"), 
			_this.$section.next().css(prefix + "transform", "translate3d(0," + secTran + "px,0)");
			var winScr = offTop - half * step + 60;
			$(window).scrollTop(winScr)
		}, function() {
			_this.$hero.removeClass(_this.CLASS_TRANSITION), 
			_this.$section.next().removeClass(_this.CLASS_TRANSITION), 
			_this.$detail.css("position", "absolute"), 
			_this.$detail.css("margin-top", ""), 
			_this.$detail.hide(),
			_this.$section.next().css(prefix + "transform", ""),
			_this.$hero.css(prefix + "transform", ""),
			_this.$main.css("height", ""), 
			_this.$allSection.each(function() {
				$(this).css("position", ""), 
				$(this).css("top", "")
			}), sliding = !1
		}, cadence)
	}, 
	SlideMore.prototype.close = function() {
		if (!sliding) {
			sliding = true, 
			$(window).off("scroll", this.closeBtnFixed),
			this.$closeBtn.css("position", ""), 
			this.$closeBtn.css("top", "");
			
			var scrlTop = $(window).scrollTop(),
				offTop = this.$detail.offset().top,
				detailCount = this.$detail.height() + offTop,
				winCount = $(window).height() + scrlTop;
				
			this.$detail.removeClass("active"), 
			this.$section.removeClass(this.CLASS_OPENED),
			this.$section.removeClass(this.CLASS_ANIMATING),
			opening = null, 
			scrlTop < offTop ? this.sectionSlideUp() : detailCount < winCount ? this.sectionSlideTop() : this.sectionSlideCenter()
		}
	}, 
	$(".card-section").each(function(e) {
		new SlideMore($(this))
	})

}(window,jQuery,document))