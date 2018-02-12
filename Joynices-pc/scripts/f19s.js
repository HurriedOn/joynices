//wow
(function() {
  var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in defaults) {
        value = defaults[key];
        if (custom[key] == null) {
          custom[key] = value;
        }
      }
      return custom;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    };

    Util.prototype.createEvent = function(event, bubble, cancel, detail) {
      var customEvent;
      if (bubble == null) {
        bubble = false;
      }
      if (cancel == null) {
        cancel = false;
      }
      if (detail == null) {
        detail = null;
      }
      if (document.createEvent != null) {
        customEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent(event, bubble, cancel, detail);
      } else if (document.createEventObject != null) {
        customEvent = document.createEventObject();
        customEvent.eventType = event;
      } else {
        customEvent.eventName = event;
      }
      return customEvent;
    };

    Util.prototype.emitEvent = function(elem, event) {
      if (elem.dispatchEvent != null) {
        return elem.dispatchEvent(event);
      } else if (event in (elem != null)) {
        return elem[event]();
      } else if (("on" + event) in (elem != null)) {
        return elem["on" + event]();
      }
    };

    Util.prototype.addEvent = function(elem, event, fn) {
      if (elem.addEventListener != null) { 
        return elem.addEventListener(event, fn, false);
      } else if (elem.attachEvent != null) { 
        return elem.attachEvent("on" + event, fn);
      } else { 
        return elem[event] = fn;
      }
    };

    Util.prototype.removeEvent = function(elem, event, fn) {
      if (elem.removeEventListener != null) {
        return elem.removeEventListener(event, fn, false);
      } else if (elem.detachEvent != null) {
        return elem.detachEvent("on" + event, fn);
      } else {
        return delete elem[event];
      }
    };

    Util.prototype.innerHeight = function() {
      if ('innerHeight' in window) {
        return window.innerHeight;
      } else {
        return document.documentElement.clientHeight;
      }
    };

    return Util;

  })();

  WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {
    function WeakMap() {
      this.keys = [];
      this.values = [];
    }

    WeakMap.prototype.get = function(key) {
      var i, item, j, len, ref;
      ref = this.keys;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        if (item === key) {
          return this.values[i];
        }
      }
    };

    WeakMap.prototype.set = function(key, value) {
      var i, item, j, len, ref;
      ref = this.keys;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        item = ref[i];
        if (item === key) {
          this.values[i] = value;
          return;
        }
      }
      this.keys.push(key);
      return this.values.push(value);
    };

    return WeakMap;

  })());

  MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {
    function MutationObserver() {
      if (typeof console !== "undefined" && console !== null) {
        console.warn('MutationObserver is not supported by your browser.');
      }
      if (typeof console !== "undefined" && console !== null) {
        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
      }
    }

    MutationObserver.notSupported = true;

    MutationObserver.prototype.observe = function() {};

    return MutationObserver;

  })());

  getComputedStyle = this.getComputedStyle || function(el, pseudo) {
    this.getPropertyValue = function(prop) {
      var ref;
      if (prop === 'float') {
        prop = 'styleFloat';
      }
      if (getComputedStyleRX.test(prop)) {
        prop.replace(getComputedStyleRX, function(_, _char) {
          return _char.toUpperCase();
        });
      }
      return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
    };
    return this;
  };

  getComputedStyleRX = /(\-([a-z]){1})/g;

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'appear',
      offset: 0,
      mobile: true,
      live: true,
      callback: null
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = bind(this.scrollCallback, this);
      this.scrollHandler = bind(this.scrollHandler, this);
      this.resetAnimation = bind(this.resetAnimation, this);
      this.start = bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
      this.animationNameCache = new WeakMap();
      this.wowEvent = this.util().createEvent(this.config.boxClass);
    }
    WOW.prototype.init = function() {
      var ref;
      this.element = window.document.documentElement;
      if ((ref = document.readyState) === "interactive" || ref === "complete") {
        this.start();
      } else {
        this.util().addEvent(document, 'DOMContentLoaded', this.start);
      }
      return this.finished = [];
    };

    WOW.prototype.start = function() {
      var box, j, len, ref;
      this.stopped = false;
      this.boxes = (function() {
        var j, len, ref, results;
        ref = this.element.querySelectorAll("." + this.config.boxClass);
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          box = ref[j];
          results.push(box);
        }
        return results;
      }).call(this);
      this.all = (function() {
        var j, len, ref, results;
        ref = this.boxes;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          box = ref[j];
          results.push(box);
        }
        return results;
      }).call(this);
      if (this.boxes.length) {
        if (this.disabled()) {
          this.resetStyle();
        } else {
          ref = this.boxes;
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            this.applyStyle(box, true);
          }
        }
      }
      if (!this.disabled()) {
        this.util().addEvent(window, 'scroll', this.scrollHandler);
        this.util().addEvent(window, 'resize', this.scrollHandler);
        this.interval = setInterval(this.scrollCallback, 50);
      }
      if (this.config.live) {
        return new MutationObserver((function(_this) {
          return function(records) {
            var k, len1, node, record, results;
            results = [];
            for (k = 0, len1 = records.length; k < len1; k++) {
              record = records[k];
              results.push((function() {
                var l, len2, ref1, results1;
                ref1 = record.addedNodes || [];
                results1 = [];
                for (l = 0, len2 = ref1.length; l < len2; l++) {
                  node = ref1[l];
                  results1.push(this.doSync(node));
                }
                return results1;
              }).call(_this));
            }
            return results;
          };
        })(this)).observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    };

    WOW.prototype.stop = function() {
      this.stopped = true;
      this.util().removeEvent(window, 'scroll', this.scrollHandler);
      this.util().removeEvent(window, 'resize', this.scrollHandler);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.sync = function(element) {
      if (MutationObserver.notSupported) {
        return this.doSync(this.element);
      }
    };

    WOW.prototype.doSync = function(element) {
      var box, j, len, ref, results;
      if (element == null) {
        element = this.element;
      }
      if (element.nodeType !== 1) {
        return;
      }
      element = element.parentNode || element;
      ref = element.querySelectorAll("." + this.config.boxClass);
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        box = ref[j];
        if (indexOf.call(this.all, box) < 0) {
          this.boxes.push(box);
          this.all.push(box);
          if (this.stopped || this.disabled()) {
            this.resetStyle();
          } else {
            this.applyStyle(box, true);
          }
          results.push(this.scrolled = true);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      box.className = box.className + " " + this.config.animateClass;
      if (this.config.callback != null) {
        this.config.callback(box);
      }
      this.util().emitEvent(box, this.wowEvent);
      this.util().addEvent(box, 'animationend', this.resetAnimation);
      this.util().addEvent(box, 'oanimationend', this.resetAnimation);
      this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
      this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);
      return box;
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute('data-wow-duration');
      delay = box.getAttribute('data-wow-delay');
      iteration = box.getAttribute('data-wow-iteration');
      return this.animate((function(_this) {
        return function() {
          return _this.customStyle(box, hidden, duration, delay, iteration);
        };
      })(this));
    };

    WOW.prototype.animate = (function() {
      if ('requestAnimationFrame' in window) {
        return function(callback) {
          return window.requestAnimationFrame(callback);
        };
      } else {
        return function(callback) {
          return callback();
        };
      }
    })();

    WOW.prototype.resetStyle = function() {
      var box, j, len, ref, results;
      ref = this.boxes;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        box = ref[j];
        results.push(box.style.visibility = 'visible');
      }
      return results;
    };

    WOW.prototype.resetAnimation = function(event) {
      var target;
      if (event.type.toLowerCase().indexOf('animationend') >= 0) {
        target = event.target || event.srcElement;
        return target.className = target.className.replace(this.config.animateClass, '').trim();
      }
    };

    WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
      if (hidden) {
        this.cacheAnimationName(box);
      }
      box.style.visibility = hidden ? 'hidden' : 'visible';
      if (duration) {
        this.vendorSet(box.style, {
          animationDuration: duration
        });
      }
      if (delay) {
        this.vendorSet(box.style, {
          animationDelay: delay
        });
      }
      if (iteration) {
        this.vendorSet(box.style, {
          animationIterationCount: iteration
        });
      }
      this.vendorSet(box.style, {
        animationName: hidden ? 'none' : this.cachedAnimationName(box)
      });
      return box;
    };

    WOW.prototype.vendors = ["moz", "webkit"];

    WOW.prototype.vendorSet = function(elem, properties) {
      var name, results, value, vendor;
      results = [];
      for (name in properties) {
        value = properties[name];
        elem["" + name] = value;
        results.push((function() {
          var j, len, ref, results1;
          ref = this.vendors;
          results1 = [];
          for (j = 0, len = ref.length; j < len; j++) {
            vendor = ref[j];
            results1.push(elem["" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);
          }
          return results1;
        }).call(this));
      }
      return results;
    };

    WOW.prototype.vendorCSS = function(elem, property) {
      var j, len, ref, result, style, vendor;
      style = getComputedStyle(elem);
      result = style.getPropertyCSSValue(property);
      ref = this.vendors;
      for (j = 0, len = ref.length; j < len; j++) {
        vendor = ref[j];
        result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
      }
      return result;
    };

    WOW.prototype.animationName = function(box) {
      var animationName;
      try {
        animationName = this.vendorCSS(box, 'animation-name').cssText;
      } catch (_error) {
        animationName = getComputedStyle(box).getPropertyValue('animation-name');
      }
      if (animationName === 'none') {
        return '';
      } else {
        return animationName;
      }
    };

    WOW.prototype.cacheAnimationName = function(box) {
      return this.animationNameCache.set(box, this.animationName(box));
    };

    WOW.prototype.cachedAnimationName = function(box) {
      return this.animationNameCache.get(box);
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = (function() {
          var j, len, ref, results;
          ref = this.boxes;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            if (!(box)) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            results.push(box);
          }
          return results;
        }).call(this);
        if (!(this.boxes.length || this.config.live)) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      while (element.offsetTop === void 0) {
        element = element.parentNode;
      }
      top = element.offsetTop;
      while (element = element.offsetParent) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util != null ? this._util : this._util = new Util();
    };

    WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;

  })();

}).call(this);
new WOW().init();
$(function() {
	$(document).scroll(function() {
		$(document).scrollTop() > $(".navbar").height() ? $(".localnav-wrappe").addClass("fiex-localnav") : $(".localnav-wrappe").removeClass("fiex-localnav")
	})
});

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
