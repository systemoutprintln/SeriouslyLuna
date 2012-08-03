
// ==UserScript==
// @name           Project Serious
// @namespace      http://www.reddit.com/r/SeriouslyLuna
// @version        0.4
// @include        *
// ==/UserScript==

var SeriousLevels = [0,25,50,75];
var SeriousColors = ['#40A040','#FFFF66','#FFA347','#FF3333'];
var SeriousImages = ['http://i.imgur.com/L9xxf.png','http://i.imgur.com/5kHaD.png','http://i.imgur.com/6PhmI.png','http://i.imgur.com/oZvNo.png'];
var SeriousMessage =['\'Tis Not Serious At All!','Not Sure If Serious','\'Tis Getting Serious','Dat Seriousness'];

main();

function main()
{
    var html = document.getElementsByTagName('body')[0].innerHTML;
	var search = "(serious(ly)?|srs(ly)?)";
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

/////////////\\\\\\\\\\\\\
//		Progress Bar	\\
/////////////\\\\\\\\\\\\\
var max;
var cur;
var progbar;
var pbholder;
var srstext;
var srsimg;

function showPB(nSteps)
{
	 var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".pbholder { position:fixed; height: 57px; width:100%; top: 0px; left: 0px; z-index: 99999; text-align:left;}\
	.pbar { position:fixed; height: 23px; top: 2px; left: 10%; -webkit-border-top-right-radius: 8px;	-webkit-border-bottom-right-radius: 8px; -moz-border-radius-topright: 8px;-moz-border-radius-bottomright: 8px;border-top-right-radius: 8px;border-bottom-right-radius: 8px;-webkit-border-top-left-radius: 8px;-webkit-border-bottom-left-radius: 8px;-moz-border-radius-topleft: 8px;-moz-border-radius-bottomleft: 8px;border-top-left-radius: 8px;border-bottom-left-radius: 8px;}\
	.pbtext { posistion: fixed; background-color:white; top: 0px; margin-top:2px; left:10px; width:15%; font-size:20px; height: 23px;}\
	.srstext {posistion: fixed; top: 25px; margin-top:2px; height: 30px;font-size:30px;text-align:center;}\
	.srsimg {position:fixed; top:25px; right:2px !important; border-style:solid; border-width:2px; width:130px;height:130px;}\
	body{margin-top:60px !important;}";
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
	
	var pbtext = document.createElement("div");
	pbtext.innerHTML = "Seriousness:";
	pbtext.className = "pbtext";
	pbholder.appendChild(pbtext);
	
	srstext = document.createElement("div");
	srstext.className = "srstext";
	pbholder.appendChild(srstext);
	
	srsimg = document.createElement("div");
	srsimg.className = "srsimg";
	pbholder.appendChild(srsimg);
	
	max = nSteps;
	cur = 0;

}

function advancePB(value)
{
	var adv=value;
	var inc=0;
	var clr;
	var txt;
	var img;
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
				txt = SeriousMessage[lvl];
				img = SeriousImages[lvl];
				
			}
			else
			{
				break;
			}
			lvl++;
		}
		//console.log(inc);
		progbar.style.width = res + "%";
		progbar.style.backgroundColor = clr;
		srstext.innerHTML = txt;
		srsimg.style.background = "url("+img+") bottom left no-repeat";
		console.log(srsimg.backgroundImage);
		
		if(inc >= adv)
		{
			clearInterval(loadBar);
		}
	
	}, 50);
}

function hidePB()
{

}
