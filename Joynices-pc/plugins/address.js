JNC.namespace("threeAddress"), JNC.threeAddress = function() {
	function t(e, i) {
		this.$element = $(e), this.$dropdown = null, this.options = $.extend({}, t.DEFAULTS, $.isPlainObject(i) && i), this.active = !1, this.dems = [], this.needBlur = !1, this.init()
	}
	if("undefined" == typeof ChineseDistricts) throw new Error('The file "city-picker.data.js" must be included first!');
	var e = "change.citypicker",
		i = "city";
	t.prototype = {
		constructor: t,
		init: function() {
			this.defineDems(), this.render(), this.bind(), this.active = !0
		},
		render: function() {
			var t = this.getPosition(),
				e = this.$element.attr("placeholder") || this.options.placeholder,
				i = '<span class="city-picker-span" style="NaN' + t.height + "px;line-height:" + (t.height - 3) + 'px;">' + (e ? '<span class="placeholder">' + e + "</span>" : "") + '<span class="title"></span><div class="arrow iconfont icon-down"></div></span>',
				s = '<div class="city-picker-dropdown" style="left:0px;top:100%;"><div class="city-select-wrap"><div class="city-select-tab"><a class="active" data-count="province">省份</a>' + (this.includeDem("city") ? '<a data-count="city">城市</a>' : "") + (this.includeDem("district") ? '<a data-count="district">区县</a>' : "") + '</div><div class="city-select-content"><div class="city-select province" data-count="province"></div>' + (this.includeDem("city") ? '<div class="city-select city" data-count="city"></div>' : "") + (this.includeDem("district") ? '<div class="city-select district" data-count="district"></div>' : "") + "</div></div>";
			this.$element.addClass("city-picker-input"), this.$textspan = $(i).insertAfter(this.$element), this.$dropdown = $(s).insertAfter(this.$textspan);
			var n = this.$dropdown.find(".city-select");
			$.each(this.dems, $.proxy(function(t, e) {
				this["$" + e] = n.filter("." + e)
			}, this)), this.refresh()
		},
		refresh: function(t) {
			this.$dropdown.find(".city-select").data("item", null);
			var e = this.$element.val() || "";
			e = e.split(" "), $.each(this.dems, $.proxy(function(i, s) {
				e[i] && i < e.length ? this.options[s] = e[i] : t && (this.options[s] = ""), this.output(s)
			}, this)), this.tab("province"), this.feedText(), this.feedVal()
		},
		defineDems: function() {
			var t = !1;
			$.each(["province", i, "district"], $.proxy(function(e, i) {
				t || this.dems.push(i), i === this.options.level && (t = !0)
			}, this))
		},
		includeDem: function(t) {
			return -1 !== $.inArray(t, this.dems)
		},
		getPosition: function() {
			var t, e, i, s, n;
			return t = this.$element.position(), s = this.getSize(this.$element), e = s.height, i = s.width, this.options.responsive && (n = this.$element.offsetParent().width()) && ((i /= n) > .99 && (i = 1), i = 100 * i + "%"), {
				top: t.top || 0,
				left: t.left || 0,
				height: e,
				width: i
			}
		},
		getSize: function(t) {
			var e, i, s;
			return t.is(":visible") ? s = {
				width: t.outerWidth(),
				height: t.outerHeight()
			} : ((e = $("<div />").appendTo($("body"))).css({
				position: "absolute !important",
				visibility: "hidden !important",
				display: "block !important"
			}), s = {
				width: (i = t.clone().appendTo(e)).outerWidth(),
				height: i.height()
			}, e.remove()), s
		},
		getWidthStyle: function(t, e) {
			return this.options.responsive && !$.isNumeric(t) ? "width:" + t + ";" : "width:" + (e ? Math.max(320, t) : t) + "px;"
		},
		bind: function() {
			var t = this;
			$(document).on("click", this._mouteclick = function(e) {
				var i, s, n, o = $(e.target);
				o.is(".city-picker-span") ? s = o : o.is(".city-picker-span *") && (s = o.parents(".city-picker-span")), o.is(".city-picker-input") && (n = o), o.is(".city-picker-dropdown") ? i = o : o.is(".city-picker-dropdown *") && (i = o.parents(".city-picker-dropdown")), (!n && !s && !i || s && s.get(0) !== t.$textspan.get(0) || n && n.get(0) !== t.$element.get(0) || i && i.get(0) !== t.$dropdown.get(0)) && t.close(!0)
			}), this.$element.on("change", this._changeElement = $.proxy(function() {
				this.close(!0), this.refresh(!0)
			}, this)).on("focus", this._focusElement = $.proxy(function() {
				this.needBlur = !0, this.open()
			}, this)).on("blur", this._blurElement = $.proxy(function() {
				this.needBlur && (this.needBlur = !1, this.close(!0))
			}, this)), this.$textspan.on("click", function(e) {
				var i, s = $(e.target);
				t.needBlur = !1, s.is(".select-item") ? (i = s.data("count"), t.open(i)) : t.$dropdown.is(":visible") ? t.close() : t.open()
			}).on("mousedown", function() {
				t.needBlur = !1
			}), this.$dropdown.on("click", ".city-select a", function() {
				var i = $(this).parents(".city-select"),
					s = i.find("a.active"),
					n = 0 === i.next().length;
				s.removeClass("active"), $(this).addClass("active"), s.data("code") !== $(this).data("code") && ("district" === i.data("count") && $("#J_zipcodeInput").val($(this).data("zipcode")), i.data("item", {
					address: $(this).attr("title"),
					code: $(this).data("code")
				}), $(this).trigger(e), t.feedText(), t.feedVal(), n && t.close())
			}).on("click", ".city-select-tab a", function() {
				if(!$(this).hasClass("active")) {
					var e = $(this).data("count");
					t.tab(e)
				}
			}).on("mousedown", function() {
				t.needBlur = !1
			}), this.$province && this.$province.on(e, this._changeProvince = $.proxy(function() {
				this.output(i), this.output("district"), this.tab(i)
			}, this)), this.$city && this.$city.on(e, this._changeCity = $.proxy(function() {
				this.output("district"), this.tab("district")
			}, this))
		},
		open: function(t) {
			t = t || "province", this.$dropdown.show(), this.$textspan.addClass("open").addClass("focus"), this.tab(t)
		},
		close: function(t) {
			this.$dropdown.hide(), this.$textspan.removeClass("open"), t && this.$textspan.removeClass("focus")
		},
		unbind: function() {
			$(document).off("click", this._mouteclick), this.$element.off("change", this._changeElement), this.$element.off("focus", this._focusElement), this.$element.off("blur", this._blurElement), this.$textspan.off("click"), this.$textspan.off("mousedown"), this.$dropdown.off("click"), this.$dropdown.off("mousedown"), this.$province && this.$province.off(e, this._changeProvince), this.$city && this.$city.off(e, this._changeCity)
		},
		getText: function() {
			var t = "";
			return this.$dropdown.find(".city-select").each(function() {
				var e = $(this).data("item"),
					i = $(this).data("count");
				e && (t += ($(this).hasClass("province") ? "" : "/") + '<span class="select-item" data-count="' + i + '" data-code="' + e.code + '">' + e.address + "</span>")
			}), t
		},
		getPlaceHolder: function() {
			return this.$element.attr("placeholder") || this.options.placeholder
		},
		feedText: function() {
			this.getText() ? (this.$textspan.find(">.placeholder").hide(), this.$textspan.find(">.title").html(this.getText()).show()) : (this.$textspan.find(">.placeholder").text(this.getPlaceHolder()).show(), this.$textspan.find(">.title").html("").hide())
		},
		getVal: function() {
			var t = "";
			return this.$dropdown.find(".city-select").each(function() {
				var e = $(this).data("item");
				e && (t += ($(this).hasClass("province") ? "" : "/") + e.address)
			}), t
		},
		feedVal: function() {
			this.$element.val(this.getVal())
		},
		output: function(t) {
			var e, s, n, o, a = this.options,
				d = this["$" + t],
				r = "province" === t ? {} : [],
				c = null;
			d && d.length && (e = d.data("item"), o = (e ? e.address : null) || a[t], n = "province" === t ? 86 : t === i ? this.$province && this.$province.find(".active").data("code") : "district" === t ? this.$city && this.$city.find(".active").data("code") : n, s = $.isNumeric(n) ? ChineseDistricts[n] : null, $.isPlainObject(s) && $.each(s, function(e, i) {
				var s;
				if("province" === t) {
					s = [];
					for(var n = 0; n < i.length; n++) i[n].address === o && (c = {
						code: i[n].code,
						address: i[n].address
					}), s.push({
						code: i[n].code,
						address: i[n].address,
						selected: i[n].address === o
					});
					r[e] = s
				} else i === o && (c = {
					code: e,
					address: i
				}), r.push({
					code: e,
					address: i,
					selected: i === o
				})
			}), d.html("province" === t ? this.getProvinceList(r) : t === i ? this.getCityList(r) : this.getDistrictList(r)), d.data("item", c))
		},
		getProvinceList: function(t) {
			var e = [],
				i = this,
				s = this.options.simple;
			return $.each(t, function(t, n) {
				e.push('<dl class="clearfix">'), e.push("<dt>" + t + "</dt><dd>"), $.each(n, function(t, n) {
					e.push('<a title="' + (n.address || "") + '" data-code="' + (n.code || "") + '" class="' + (n.selected ? " active" : "") + '">' + (s ? i.simplize(n.address, "province") : n.address) + "</a>")
				}), e.push("</dd></dl>")
			}), e.join("")
		},
		getCityList: function(t) {
			var e = [],
				s = this,
				n = this.options.simple;
			return e.push('<dl class="clearfix"><dd>'), $.each(t, function(t, o) {
				e.push('<a title="' + (o.address || "") + '" data-code="' + (o.code || "") + '" class="' + (o.selected ? " active" : "") + '">' + (n ? s.simplize(o.address, i) : o.address) + "</a>")
			}), e.push("</dd></dl>"), e.join("")
		},
		getDistrictList: function(t) {
			var e = [],
				i = this,
				s = this.options.simple;
			return e.push('<dl class="clearfix"><dd>'), $.each(t, function(t, n) {
				e.push('<a title="' + (n.address.name || "") + '" data-code="' + (n.code || "") + '"data-zipcode="' + (n.address.zipcode || "") + '" class="' + (n.selected ? " active" : "") + '">' + (s ? i.simplize(n.address.name, "district") : n.address.name) + "</a>")
			}), e.push("</dd></dl>"), e.join("")
		},
		getList: function(t, e) {
			var i = [],
				s = this,
				n = this.options.simple;
			return i.push('<dl class="clearfix"><dd>'), $.each(t, function(t, o) {
				i.push('<a title="' + (o.address || "") + '" data-code="' + (o.code || "") + '" class="' + (o.selected ? " active" : "") + '">' + (n ? s.simplize(o.address, e) : o.address) + "</a>")
			}), i.push("</dd></dl>"), i.join("")
		},
		simplize: function(t, e) {
			return t = t || "", "province" === e ? t.replace(/[省,市,自治区,壮族,回族,维吾尔]/g, "") : e === i ? t.replace(/[市,地区,回族,蒙古,苗族,白族,傣族,景颇族,藏族,彝族,壮族,傈僳族,布依族,侗族]/g, "").replace("哈萨克", "").replace("自治州", "").replace(/自治县/, "") : "district" === e ? t.length > 2 ? t.replace(/[市,区,县,旗]/g, "") : t : void 0
		},
		tab: function(t) {
			var e = this.$dropdown.find(".city-select"),
				i = this.$dropdown.find(".city-select-tab > a"),
				s = this["$" + t],
				n = this.$dropdown.find('.city-select-tab > a[data-count="' + t + '"]');
			s && (e.hide(), s.show(), i.removeClass("active"), n.addClass("active"))
		},
		reset: function() {
			this.$element.val(null).trigger("change")
		},
		destroy: function() {
			this.unbind(), this.$element.removeData("citypicker").removeClass("city-picker-input"), this.$textspan.remove(), this.$dropdown.remove()
		}
	}, t.DEFAULTS = {
		simple: !1,
		responsive: !1,
		placeholder: "请选择省/市/区",
		level: "district",
		province: "",
		city: "",
		district: ""
	}, t.setDefaults = function(e) {
		$.extend(t.DEFAULTS, e)
	}, t.other = $.fn.citypicker, $.fn.citypicker = function(e) {
		[].slice.call(arguments, 1);
		return this.each(function() {
			var i, s = $(this);
			s.data("citypicker");
			/destroy/.test(e) || (i = $.extend({}, s.data(), $.isPlainObject(e) && e), s.data("citypicker", new t(this, i)))
		})
	}, $.fn.citypicker.Constructor = t, $.fn.citypicker.setDefaults = t.setDefaults, $.fn.citypicker.noConflict = function() {
		return $.fn.citypicker = t.other, this
	}, $(function() {
		$('[data-toggle="city-picker"]').citypicker()
	})
}