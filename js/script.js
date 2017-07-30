$(document).ready(function(){
						   
	$('#inputField').bind("blur focus keydown keypress keyup", function() {
		recount();
	});

	$('input.submitButton').attr('disabled','disabled');
	
	$('#tweetForm').submit(function(e){
		tweet();
		e.preventDefault();
	
	});

	//get all user data
	getData(); //get json file
	getDbData(); // get db data
});


function recount()
{
	var maxlen=140;
	var current = maxlen-$('#inputField').val().length;
	$('.counter').html(current);
	
	if(current<0 || current==maxlen)
	{
		$('.counter').css('color','#666');
		$('input.submitButton').attr('disabled','disabled').addClass('inact');
	}
	else
		$('input.submitButton').removeAttr('disabled').removeClass('inact');
	
	if(current<10)
		$('.counter').css('color','#666');
	
	else if(current<20)
		$('.counter').css('color','#5C0002');

	else
		$('.counter').css('color','#cccccc');
}

function tweet()
{
	var submitData = $('#tweetForm').serialize();
		
	$.ajax({
		type: "POST",
		url: "submit.php",
		data: submitData,
		dataType: "html",
		success: function(responseText){
			var data = JSON.parse(responseText);
			var date = data.date;
			var time = timeAgo(date.toString());
			var buttons = '<div class="bottom_buttons"><span><a href=""><i class="fa fa-comment-o"></i>'+ data.totalReply + '</a></span><span><a href=""><i class="fa fa-retweet"></i>'+ data.retweets + '</a></span><span><a href=""><i class="fa fa-heart-o"></i>'+ data.likes + '</a></span></div>';

			var li = '<li><a href="#"><img class="avatar" src="'+data.profile_image_url+'" alt="avatar" /></a><div class="tweetTxt"><strong><a href="#">'+ data.name +'</a></strong><span class="username2">'+ '@' +data.username +'</span><span class="date">' + time + '</span><div class="comment">'+ data.tweet + '</div></div>'+ buttons +'<div class="clear"></div></li>';
			var msg ='';
				$('ul.statuses li:first-child').before(li);
				$("ul.statuses:empty").append(li);
				
				$('#lastTweet').html($('#inputField').val());
				
				$('#inputField').val('');
				recount();
			
		}
		
	});

}

function timeAgo(dateString) {
	var rightNow = new Date();
	var then = new Date(dateString);
		
	then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
	
	var diff = rightNow - then;
	var second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24,
	week = day * 7;

	if (isNaN(diff) || diff < 0) {
		return ""; // return blank string if unknown
	}

	if (diff < second * 2) {
		// within 2 seconds
		return "1s";
	}

	if (diff < minute) {
		return Math.floor(diff / second) + "s";
	}

	if (diff < minute * 2) {
		return "1m";
	}

	if (diff < hour) {
		return Math.floor(diff / minute) + "m";
	}

	if (diff < hour * 2) {
		return "1h";
	}

	if (diff < day) {
		return  Math.floor(diff / hour) + "h";
	}

	if (diff > day && diff < day * 2) {
		return "yesterday";
	}

	if (diff < day * 365) {
		return Math.floor(diff / day) + " days";
	}

	else {
		return "over a year ago";
	}
}

function getData() {	
	var url = 'data/document.json';
	$.ajax({
		type: 'GET',
		data: '',
		url: url,
		success: function(responseText) {
			var data = responseText;
			var li = '';
			for (var i = 0; i < data.length; i++) {
				li += setTweetData(data[i]);
			}
			$('.statuses').html(li);
		}
	});
}

function getDbData() {	
	var url = 'getData.php';
	$.ajax({
		type: 'GET',
		data: '',
		url: url,
		success: function(response) {
			if (response) {
				var data = JSON.parse(response);
				for (var i = 0; i < data.length; i++) {
					var date = data[i].date;
					var time = timeAgo(date.toString());
					var buttons = '<div class="bottom_buttons"><span><a href=""><i class="fa fa-comment-o"></i>'+ data[i].totalReply + '</a></span><span><a href=""><i class="fa fa-retweet"></i>'+ data[i].retweets + '</a></span><span><a href=""><i class="fa fa-heart-o"></i>'+ data[i].likes + '</a></span></div>';

					var li = '<li><a href="#"><img class="avatar" src="img/user2.jpg" alt="avatar" /></a><div class="tweetTxt"><strong><a href="#">'+ data[i].name +'</a></strong><span class="username2">'+ '@' +data[i].username +'</span><span class="date">' + time + '</span><div class="comment">'+ data[i].tweet + '</div></div>'+ buttons +'<div class="clear"></div></li>';
					$('ul.statuses li:first-child').before(li);
					$("ul.statuses:empty").html(li);
				}
			}
		}
	});
}

function getUser1Data() {
	var url = 'data/user1.json';
	$.ajax({
		type: 'GET',
		data: '',
		url: url,
		success: function(responseText) {
			common(responseText);
		}
	});
}

function getUser2Data() {
	var url = 'data/user2.json';
	$.ajax({
		type: 'GET',
		data: '',
		url: url,
		success: function(responseText) {
			common(responseText);
		}
	});
}

function common(data) {
	var li = '';		
	li = setTweetData(data);			
	$('.statuses').html(li);
	setProfileData(data);
}

function setTweetData(data) {
	var tweets = data.tweets;
	var li = '';
	for (var j = 0; j < tweets.length; j++) {
		var time = timeAgo(tweets[j].time.toString());
		var img = '<img class="tweetImg" src="'+ tweets[j].tweetImg +'"/>';
		var buttons = '<div class="bottom_buttons"><span><a href=""><i class="fa fa-comment-o"></i>'+ tweets[j].totalReply + '</a></span><span><a href=""><i class="fa fa-retweet"></i>'+ tweets[j].retweets + '</a></span><span><a href=""><i class="fa fa-heart-o"></i>'+ tweets[j].likes + '</a></span></div>';
		li += '<li><a href="#"><img class="avatar" src="'+data.profile_image_url+'" alt="avatar" /></a><div class="tweetTxt"><strong><a href="#">'+ data.name +'</a></strong><span class="verified"><i class="fa fa-check-circle"></i></span><span class="username2">'+ '@' +data.username +'</span><span class="date">' +'. '+ time + '</span><div class="comment">'+ tweets[j].comment + '</div></div>'+ img + buttons +'<div class="clear"></div></li>';         
	}
	return li;
}

function setProfileData(data) {
	$('.bio').html(data.name);
	$('.username').html('@'+data.username);
	$('.avatar').html(data.profile_image_url);
	$(".avatar").attr("src", data.profile_image_url);
}

$('#all').click(function() {
	getData();
	getDbData();
});

$('#user1').click(function() {
	getUser1Data();
	getDbData();
});

$('#user2').click(function() {
	getUser2Data();
	getDbData();
});