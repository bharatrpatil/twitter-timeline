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
	getData();

	getUser1Data()
	getUser2Data()
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

$('.trigger').click(function() {
     $('.modal-wrapper').toggleClass('open');
    $('.page-wrapper').toggleClass('blur');
     return false;
});

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

			var li = '<li><a href="#"><img class="avatar" src="img/user2.jpg" alt="avatar" /></a><div class="tweetTxt"><strong><a href="#">'+ data.name +'</a></strong><span class="username2">'+ '@' +data.username +'</span><span class="date">' + time + '</span><div class="comment">'+ data.tweet + '</div></div>'+ buttons +'<div class="clear"></div></li>';
			var msg ='';
				$('ul.latest_statuses li:first-child').before(li);
				$("ul.latest_statuses:empty").append(li);
				
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
			console.log(data);
			var li = '';
			for (var i = 0; i < data.length; i++) {
				li += setTweetData(data[i]);
			}
			$('.statuses').html(li);
		}
	});
}

function getUser1Data() {
	$('#user1').click(function () {
		var url = 'data/document.json';
		$.ajax({
			type: 'GET',
			data: '',
			url: url,
			success: function(responseText) {
				var data = responseText;
				var li = '';
				for (var i = 0; i < data.length; i++) {
					if (data[i].id === 1) {
						li = setTweetData(data[i]);
					}
				}
				$('.statuses').html(li);

				setProfileData(data[0]);
			}
		});
	});			

}

function getUser2Data() {
	$('#user2').click(function () {
		var url = 'data/document.json';
		$.ajax({
			type: 'GET',
			data: '',
			url: url,
			success: function(responseText) {
				var data = responseText;
				var li = '';
				var buttons = '';
				for (var i = 0; i < data.length; i++) {
					if (data[i].id === 2) {
						li = setTweetData(data[i]);
					}
				}
				$('.statuses').html(li);
				setProfileData(data[1]);
			}
		});
	});
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
});