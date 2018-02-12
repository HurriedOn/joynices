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
	e(2),
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
		
		$("#J_regWay").on("click",".tab",function(){
			$(this).addClass("active").siblings().removeClass("active");
			$("#"+$(this).attr("name")).show().siblings().hide()
		});
		var saveInfo={};
		function validation(elem){
			if(elem.length) {
				var rule, 
					_this = this,
					name = elem.attr("name"),
					val = $.trim(elem.val()); 
				if("phone" === name) {
					if (rule = /^1[0-9]{10}$/, !rule.test(val) ) return showError(elem,"请输入正确的手机号"), !1;
					saveInfo.phone = val
				}else if("password"===name){
					if(val==="") return showError(elem,"请输入密码"),!1;
					if(rule=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,!rule.test(val)) return showError(elem,"密码由8-16字母和数字组成，不能是纯数字或纯英文"),!1;
					saveInfo.password=val
				}else if("email"===name){
					if(val==="") return showError(elem,"请输入邮箱"),!1;
					if(rule=/^[\w.\-]+@(?:[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.)+[A-Za-z]{2,6}$/,!rule.test(val)) return showError(elem,"邮箱格式错误"),!1;
					saveInfo.email=val
				}else if("captcha"===name){
					if(val==="") return showError(elem,"请输入验证码"),!1;
					if(rule=/^\d{4,8}$/,!rule.test(val)) return showError(elem,"验证码错误"),!1;
				}
				return !0;
			}
		}
		function showError(type,text){
			var errors="<p class='error'>"+text+"</p>",
				p=type.closest(".inputlist");
			p.find(".error").remove(),p.append(errors);
			type.on("keydown",function(){
		    	p.find(".error").remove()
		    });
		}
		//手机注册
		$("#J_phoneBtn").on("click",function(){
			saveInfo={};
			var verdict=false;
			$("#J_phoneView").find(".J_signText").each(function(){
				return verdict=validation($(this))
			});
			if(verdict){
				saveInfo.code=$("#J_countryCode").attr("_code");
				console.log(saveInfo)
//				$.ajax({
//					url:"",
//					data:{
//						phone:saveInfo.phone,
//						pwd:saveInfo.password,
//						code:saveInfo.code
//					},
//					success:function(){
//						
//					}
//				});
			}
		});
		//邮箱注册
		$("#J_emailBtn").on("click",function(){
			saveInfo={};
			var verdict=false;
			$("#J_emailView").find(".J_signText").each(function(){
				return verdict=validation($(this))
			});
			if(verdict){
				console.log(saveInfo)
//				$.ajax({
//					url:"",
//					data:{
//						email:saveInfo.email,
//						pwd:saveInfo.password
//					},
//					success:function(){
//						
//					}
//				});
			}
		});
	})
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