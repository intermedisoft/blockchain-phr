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
		'ico-facebook': '&#xe90d;',
		'ico-back': '&#xe900;',
		'ico-blood': '&#xe901;',
		'ico-checkup': '&#xe902;',
		'ico-edit': '&#xe903;',
		'ico-logout': '&#xe904;',
		'ico-notification': '&#xe905;',
		'ico-password': '&#xe906;',
		'ico-see': '&#xe907;',
		'ico-sex': '&#xe908;',
		'ico-tab': '&#xe909;',
		'ico-username': '&#xe90a;',
		'ico-visit': '&#xe90b;',
		'ico-wellness': '&#xe90c;',
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
		c = c.match(/ico-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
