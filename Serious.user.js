
// ==UserScript==
// @name           Project Serious
// @namespace      http://www.reddit.com/r/SeriouslyLuna
// @version        0.2
// @include        http://www.reddit.com/*
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==

var SeriousLevels = [0,25,50,75];
var SeriousColors = ['#40A040','#FFFF66','#FFA347','#FF3333'];

main();

function main()
{
    var html = document.getElementsByTagName('body')[0].innerHTML;
	var search = "serious(ly)?";
	var c = count(html, search);
	showPB(100);
	advancePB(c);
	
}

function count(html, search)
{
	var cnt = 0;
	var regex = new RegExp(search, "img");
	var matches = [];
	var match;
	match = regex.exec(html);
	while( match instanceof Array  ){
		cnt++;
	  matches.push(match);
	  match = regex.exec(html);
	}
	console.log("Result:" + cnt);
	return cnt;

}

///////////////////////////
//		Progress Bar	//
//////////////////////////
var max;
var cur;
var progbar;
var pbholder;

function showPB(nSteps)
{
	 var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".pbholder { position:fixed; height: 25px; width:100%; top: 10px; left: 0px; z-index: 99999; text-align:center;}\
	.pbar { position:fixed; height: 25px; top: 2px; left: 10%; -webkit-border-top-right-radius: 8px;	-webkit-border-bottom-right-radius: 8px; -moz-border-radius-topright: 8px;-moz-border-radius-bottomright: 8px;border-top-right-radius: 8px;border-bottom-right-radius: 8px;-webkit-border-top-left-radius: 8px;-webkit-border-bottom-left-radius: 8px;-moz-border-radius-topleft: 8px;-moz-border-radius-bottomleft: 8px;border-top-left-radius: 8px;border-bottom-left-radius: 8px;}\
	.pbtext { posistion: fixed; top: 0px; margin-top:5px}";
    document.body.appendChild(css);
	
	pbholder = document.createElement("div");
	pbholder.id = "pbholder";
	pbholder.className = "pbholder";
	document.body.appendChild(pbholder);
	
	progbar = document.createElement("div");
	progbar.id = "pbar";
	progbar.className = "pbar";
	pbholder.appendChild(progbar);
	progbar.style.width = "0%";
	/*
	var pbtext = document.createElement("div");
	pbtext.innerHTML = "Loading Emotes";
	pbtext.className = "pbtext";
	pbholder.appendChild(pbtext);
	*/
	
	
	max = nSteps;
	cur = 0;

}

function advancePB(value)
{
	var adv=value;
	var inc=0;
	var clr;
	var loadBar = setInterval(function() 
	{
		inc++;
		cur ++;
		
		if(cur >= max)
		{
			cur = max;
		}
		var res = cur / max;
		res *= 90;
		
		var lvl = 0;
		while(lvl < SeriousLevels.length)
		{
			if(cur >= SeriousLevels[lvl])
			{
				clr = SeriousColors[lvl];
			}
			else
			{
				break;
			}
			lvl++;
		}
		console.log(inc);
		progbar.style.width = res + "%";
		progbar.style.backgroundColor = clr;
		
		if(inc >= adv)
		{
			clearInterval(loadBar);
		}
	
	}, 50);
}

function hidePB()
{

}

///////////////////////////
//		Emote Image		//
//////////////////////////

///////////////////////////
//			Text		//
//////////////////////////