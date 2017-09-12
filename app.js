
$(document).ready(function(){
	$(".circle").mouseenter(function(){
		if(this.id === "all"){
				$("#allp").append("<span class = 'span1'> All</span>");
			} else if(this.id === "online"){
				$("#onlinep").append("<span class = 'span1'> Online</span>");
			} else {
				$("#offlinep").append("<span class = 'span1'> Offline</span>");
			}
	});
	$(".circle").mouseleave(function(){
		$(".span1").remove();
	});

	var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];
	var twitchAPI = "https://wind-bow.gomix.me/twitch-api/";
	var callback = "?callback=?";

	var chanOnline = "";
	var chanOffline = "";


	streamers.forEach(function(streamer){

		var userCall = twitchAPI + "users/" + streamer + callback;
		var streamCall = twitchAPI + "streams/" + streamer + callback;
		var twitch = "https://www.twitch.tv/"
		var placeholder = "http://static.merayog.com/assets/user_placeholder-f8ffce0880efca42fd242a3ae1a9d6ab.jpg"
		$.getJSON(userCall, function(users){
			$.getJSON(streamCall, function(streams){
				console.log(users);
				if (users.error){
					chanOffline += "<hr><div class = 'channel offline'><a href =" + twitch + streamer + " target = '_blank'><img class = 'logo' src="
					chanOffline += placeholder + "></a> <div> <strong>" + streamer + "</strong> </div>"
					chanOffline += "<div class = 'status'>" + '<i class="fa fa-video-camera"  aria-hidden="true"></i>'
					chanOffline += " Offline </div><div><blockquote><em>This user doesn't exist, or has closed their account</em></blockquote></div></div>"
				}

				else if(streams.stream !== null){
					chanOnline += "<hr><div class = 'channel online'><a href =" + twitch + users.display_name + " target = '_blank'><img class = 'logo' src="
					chanOnline += users.logo + "></a> <div> <strong>" + users.display_name + "</strong> </div>"
					chanOnline += "<div class = 'status on'>" + '<i class="fa fa-video-camera"  aria-hidden="true"></i>'
					chanOnline += " Online </div><div><blockquote><em>" + streams.stream.channel.status
					chanOnline += "</em></blockquote></div></div>"
				} else {
					chanOffline += "<hr><div class = 'channel offline'><a href =" + twitch + users.display_name + " target = '_blank'><img class = 'logo' src="
					chanOffline += users.logo + "></a> <div> <strong>" + users.display_name + "</strong> </div>"
					chanOffline += "<div class = 'status'>" + '<i class="fa fa-video-camera"  aria-hidden="true"></i>'
					chanOffline += " Offline </div></div>"
				}

				$("#content").html(chanOnline + chanOffline);

				$(".circle").click(function(){
					if(this.id === "all"){
						$("#status").html("All");
						$("#status").css("color", "white")
						$("#content").html(chanOnline + chanOffline);
					} else if(this.id === "online"){
						$("#status").html("Online");
						$("#status").css("color", "green")
						$("#content").html(chanOnline);
					} else {
						$("#status").html("Offline");
						$("#status").css("color", "red")
						$("#content").html(chanOffline);
					}
				});
			});
		});
	});
});


