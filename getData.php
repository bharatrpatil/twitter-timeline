<?php

	define('INCLUDE_CHECK',1);
	require "connect.php";
	date_default_timezone_set('Asia/Kolkata');

	$result = mysql_query("SELECT * FROM demo_twitter_timeline ORDER BY ID");

	$output = array();
	while($row = mysql_fetch_assoc($result)) {
		$encode = array();
		$encode["tweet"] = $row["tweet"];
		$encode["date"] = $row["dt"];
		$encode["name"] = "Bharat Patil"; //default user as we dont have user login functionality
		$encode["username"] = "Bharat";
		$encode["totalReply"] = 0;
		$encode["retweets"] = 0;
		$encode["likes"] = 0;
		array_push($output, $encode);
	}

	echo json_encode($output);

?>
