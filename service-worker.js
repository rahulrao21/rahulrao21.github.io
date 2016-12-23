"use strict"; 


function saveEncryptionKeys() {
    self.registration.pushManager.getSubscription()
    .then(function(subscription) {
        if (subscription) {            
            var subscriptionJson = JSON.stringify(subscription);
            var subscriptionId = getDeviceID(subscription.endpoint);
            var subscriptionObj = JSON.parse(subscriptionJson);
            if(subscriptionObj.keys.auth && subscriptionObj.keys.p256dh) {
                fetch('https://ravitejak.pushengage.com/setKeys.php?subscriptionId='+subscriptionId+'&subscription='+subscriptionJson);
            }
        }
    }).
    catch(function() {
    });
}


var payload_notifs=[];

self.addEventListener('push', function(event) { 
   event.waitUntil(self.registration.pushManager.getSubscription().then(function(o) {    
    if (event.data) {
        console.log(event.data);        
        var json=event.data.json();
        for (var index = 0; index < json.length; index++)         
        payload_notifs.push(self.registration.showNotification(json[index].title, json[index].options));
        return Promise.all(payload_notifs);
      }
     return fetch('https://ravitejak.pushengage.com/notification.php?getmesg&version=1.2&device='+getDeviceID(o.endpoint)).then(function (response) {          
        return response.json().then(function (jsondata) {
            var json = jsondata;
            // var options = {
            //     body: json.body,
            //     tag: json.tag,
            //     icon: json.icon,
            //     data: json.url
            // };                        
            // return self.registration.showNotification(json.title, options);
            var nlist=[];          
            var notificationcontent="";      
                for (var i = json.length - 1; i >= 0; i--) {                    
                    /* notificationcontent = {
                        body: json[i].body,
                        tag: json[i].tag,
                        icon: json[i].icon,
                        data: json[i].url,
						requireInteraction : json[i].requireinteraction
                    }; */
					var notificationcontent = json[i].notification;
                    nlist.push(handle_notification(json[i].title, notificationcontent));
                    
                };                
            return Promise.all(nlist);
        })
    });
  }));


});
var device="";
self.addEventListener('notificationclick', function (event) {  
    event.waitUntil(self.registration.pushManager.getSubscription().then(function(o) {
        device=getDeviceID(o.endpoint);        
        handle_click(event,device);
    }));
     event.notification.close();
});

self.addEventListener("install", function (event) {
    event.waitUntil(self.skipWaiting());
    saveEncryptionKeys();
});
function handle_click (event,device) {
	
	//Multi element notification
	var usr_action ='';
	var notification_redirect_url = event.notification.data;
	if(event.action!="" && typeof(event.action)!='undefined')
	var action_str = JSON.parse(event.action);
	else
	var action_str = '';

	//console.log(event);console.log(action_str);
	if( action_str == '')
	{
		usr_action = 'action3';
		notification_redirect_url = event.notification.data;
	}
	else
	{
		if(action_str.action == 'action1') 
		{
			usr_action = 'action1';
			notification_redirect_url = action_str.action_url;
		}
		else if(action_str.action == 'action2') 
		{
			usr_action = 'action2';
			notification_redirect_url = action_str.action_url;
		}
	}	
    
    fetch('https://ravitejak.pushengage.com/notification.php?updateclicks&device='+device+'&tag='+event.notification.tag+'&action='+usr_action).then(function (response) {      
            console.log("clicked");
        });

    return clients.openWindow(notification_redirect_url);
}
function handle_notification(t,n){
    return self.registration.showNotification(t,n);
}

function getDeviceID(endpoint)
{
	var device_id = "";
	if(endpoint.indexOf('mozilla') > -1)
    	{
        device_id = endpoint.split("/")[endpoint.split("/").length-1]; 
    	}
	else
	{
		device_id = endpoint.slice(endpoint.search("send/")+5);
	}
	
	return device_id;
}
