/**
 * Created by christos on 28/5/2016.
 */
google.load("feeds", "1"); //Load Google Ajax Feed API (version 1)

// DOM Categories containers
var greece=document.getElementById("greece-category");


// RSS URLs
var rss_greece="http://rss.in.gr/feed/news/greece";

// general vars
var feedlimit=50;


function rssfeedsetup(url, rss_container){
    var feedpointer =new google.feeds.Feed(url); //Google Feed API method
    feedpointer.setNumEntries(feedlimit); //Google Feed API method
    feedpointer.load(parceEntries); //Google Feed API method
}

function parceEntries(result){
    var rssoutput="<ul>";
    if (!result.error){
        var thefeeds=result.feed.entries;
        for (var i=0; i<thefeeds.length; i++) {
            var date = new Date(thefeeds[i].publishedDate).toISOString();
            //var months = Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            //var date = date.getHours() + ":" + date.getMinutes() + " - " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
            rssoutput += "<li>" +
                                "<a href='" + thefeeds[i].link + "'>" + thefeeds[i].title + "</a>" +
                                "</br>" +
                                "<span>" + date + "</span" +
                        "</li>";
        }
        rssoutput+="</ul>";
        greece.innerHTML = rssoutput;
    } else
        alert("Error fetching feeds!");
}

window.onload=function(){
    rssfeedsetup(rss_greece, greece);
};
