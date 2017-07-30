<?php

	define('INCLUDE_CHECK',1);
	require "connect.php";
	date_default_timezone_set('Asia/Kolkata');
	if(ini_get('magic_quotes_gpc'))
	$_POST['inputField']=stripslashes($_POST['inputField']);

	$_POST['inputField'] = mysql_real_escape_string(strip_tags($_POST['inputField']),$link);

	if(mb_strlen($_POST['inputField']) < 1 || mb_strlen($_POST['inputField'])>140)
	die("0");

	$date = date("Y-m-d H:i:s");
	mysql_query("INSERT INTO demo_twitter_timeline SET tweet='".$_POST['inputField']."',dt='".$date."'");

	if(mysql_affected_rows($link)!=1)
	die("0");

	$t=time();

	$result = mysql_query("SELECT * from demo_twitter_timeline order by id desc");
	$row = mysql_fetch_assoc($result);

	$encode = array();
	$encode["tweet"] = $row["tweet"];
	$encode["date"] = $row["dt"];
	$encode["name"] = "Bharat Patil"; //default user as we dont have user login functionality
	$encode["username"] = "Bharat";
	$encode["totalReply"] = 0;
	$encode["retweets"] = 0;
	$encode["likes"] = 0;
	$encode["profile_image_url"] = "img/user2.jpg";

	echo json_encode($encode);

?>
