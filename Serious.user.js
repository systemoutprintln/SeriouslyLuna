
// ==UserScript==
// @name           Project Serious
// @namespace      http://www.reddit.com/r/SeriouslyLuna
// @version        0.1
// @include        http://www.reddit.com/*
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==

main();

function main()
{
    var html = document.getElementsByTagName('body')[0].innerHTML;
	var search = "seriously";
	count(html, search);
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
	Console.log("Resut:" + cnt);
	return cnt;

}