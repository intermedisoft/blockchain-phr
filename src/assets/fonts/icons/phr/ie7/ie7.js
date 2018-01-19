/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'PHR-Blox\'">' + entity + '</span>' + html;
	}
	var icons = {
		'iconFemale': '&#xe90e;',
		'iconFacebook': '&#xe90d;',
		'iconBack': '&#xe900;',
		'iconBlood': '&#xe901;',
		'iconCheckup': '&#xe902;',
		'iconEdit': '&#xe903;',
		'iconLogout': '&#xe904;',
		'iconNotification': '&#xe905;',
		'iconPassword': '&#xe906;',
		'iconSee': '&#xe907;',
		'iconMale': '&#xe908;',
		'iconTab': '&#xe909;',
		'iconUsername': '&#xe90a;',
		'iconVisit': '&#xe90b;',
		'iconWellness': '&#xe90c;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
