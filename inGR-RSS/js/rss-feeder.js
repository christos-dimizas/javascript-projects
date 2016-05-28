/**
 * Created by christos on 28/5/2016.
 */
google.load("feeds", "1"); //Load Google Ajax Feed API (version 1)

var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");


// DOM Categories containers
var greek_news   = document.getElementById("greece_category");
var general_news = document.getElementById("general_news");
var world_news   = document.getElementById("world_news");
var science_news = document.getElementById("science_news");
var economy_news = document.getElementById("economy_news");


// RSS URLs
var rss_greece="http://rss.in.gr/feed/news/greece";
var rss_general_news="http://rss.in.gr/feed/news";
var rss_world_news="http://rss.in.gr/feed/news/world";
var rss_science_news="http://rss.in.gr/feed/news/science";
var rss_economy_news="http://rss.in.gr/feed/news/economy";

// general vars
var feedlimit=10;

// GREEK NEWS
function parceGreekNews(result){
    var rssoutput="<ul>";
    if (!result.error){
        var thefeeds=result.feed.entries;
        for (var i=0; i<thefeeds.length; i++) {
            var date = new Date(thefeeds[i].publishedDate);
            date = date.getUTCHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + " - " + date.getUTCDay() + " " + months[date.getUTCMonth()] + " " + date.getUTCFullYear();
            rssoutput += "<li>" +
                                "<a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a>" +
                                "</br>" +
                                "<span>" + date + "</span" +
                        "</li>";
        }
        rssoutput+="</ul>";
        greek_news.innerHTML = rssoutput;
    } else
        alert("Error fetching GREEK NEWS feeds!");
}

// GENERAL NEWS
function parceGeneralNews(result){
    var rssoutput="<ul>";
    if (!result.error){
        var thefeeds=result.feed.entries;
        for (var i=0; i<thefeeds.length; i++) {
            var date = new Date(thefeeds[i].publishedDate);
            date = date.getUTCHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + " - " + date.getUTCDay() + " " + months[date.getUTCMonth()] + " " + date.getUTCFullYear();
            rssoutput += "<li>" +
            "<a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a>" +
            "</br>" +
            "<span>" + date + "</span" +
            "</li>";
        }
        rssoutput+="</ul>";
        general_news.innerHTML = rssoutput;
    } else
        alert("Error fetching GENERAL NEWS feeds!");
}

// WORLD NEWS
function parceWorldNews(result){
    var rssoutput="<ul>";
    if (!result.error){
        var thefeeds=result.feed.entries;
        for (var i=0; i<thefeeds.length; i++) {
            var date = new Date(thefeeds[i].publishedDate);
            date = date.getUTCHours() + ":" + date.getUTCMinutes() + " - " + date.getUTCDay() + " " + months[date.getUTCMonth()] + " " + date.getUTCFullYear();
            rssoutput += "<li>" +
            "<a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a>" +
            "</br>" +
            "<span>" + date + "</span" +
            "</li>";
        }
        rssoutput+="</ul>";
        world_news.innerHTML = rssoutput;
    } else
        alert("Error fetching GENERAL NEWS feeds!");
}

// SCIENCE NEWS
function parceScienceNews(result){
    var rssoutput="<ul>";
    if (!result.error){
        var thefeeds=result.feed.entries;
        for (var i=0; i<thefeeds.length; i++) {
            var date = new Date(thefeeds[i].publishedDate);
            date = date.getUTCHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + " - " + date.getUTCDay() + " " + months[date.getUTCMonth()] + " " + date.getUTCFullYear();
            rssoutput += "<li>" +
            "<a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a>" +
            "</br>" +
            "<span>" + date + "</span" +
            "</li>";
        }
        rssoutput+="</ul>";
        science_news.innerHTML = rssoutput;
    } else
        alert("Error fetching GENERAL NEWS feeds!");
}

// ECONOMY NEWS
function parceEconomyNews(result){
    var rssoutput="<ul>";
    if (!result.error){
        var thefeeds=result.feed.entries;
        for (var i=0; i<thefeeds.length; i++) {
            var date = new Date(thefeeds[i].publishedDate);
            date = date.getUTCHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + " - " + date.getUTCDay() + " " + months[date.getUTCMonth()] + " " + date.getUTCFullYear();
            rssoutput += "<li>" +
            "<a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a>" +
            "</br>" +
            "<span>" + date + "</span" +
            "</li>";
        }
        rssoutput+="</ul>";
        economy_news.innerHTML = rssoutput;
    } else
        alert("Error fetching GENERAL NEWS feeds!");
}


function rssfeedsetup(url, parceContent){
    var feedpointer =new google.feeds.Feed(url); //Google Feed API method
    feedpointer.setNumEntries(feedlimit); //Google Feed API method
    feedpointer.load(parceContent); //Google Feed API method
}

window.onload=function(){
    rssfeedsetup(rss_greece, parceGreekNews);
    rssfeedsetup(rss_general_news, parceGeneralNews);
    rssfeedsetup(rss_world_news, parceWorldNews);
    rssfeedsetup(rss_science_news, parceScienceNews);
    rssfeedsetup(rss_economy_news, parceEconomyNews);
};
