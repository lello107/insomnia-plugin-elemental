# insomnia-plugin-elemental
Generate and add headers in all request in Insomnia REST Client!

----

Need to setup the envirenmont with this information at:
```json
{
  "ELEMENTAL_user": "admin",
  "ELEMENTAL_key": "Xxldodkddskdsadk",
  "ELEMENTAL_secs": 30
}
```

ELEMENTAL_user:

![find user and api key](/images/ELEMENTAL_key_01.png)

Settings -> User Profiles 

![find user and api key](/images/ELEMENTAL_key_02.png)

According with rest authentification of Elemental:

Authentication and REST
When authentication is enabled on the Elemental Live system, additional information must be sent with the REST command in order to properly authenticate the request. The following additional headers must be set: X-Auth-User, X-Auth-Expires, X-Auth-Key.

The X-Auth-User header contains the login of the user to authenticate.

The X-Auth-Expires header contains the Unix timestamp (in UTC) that indicates the time after which the server will no longer accept the request as valid. For security purposes, Elemental recommends that this value should be ~30 seconds in the future.

The X-Auth-Key header should be constructed using the following algorithm:

md5(api_key + md5(url + X-Auth-User + api_key + X-Auth-Expires))

Each parameter in this expression should be entered as a string, and the '+' operator indicates string concatenation without any delimiters. The api_key parameter is the user's secret API key that can be retrieved on the User Profile page. For security, it is recommended that this key be reset periodically. The url parameter is the path part of the request URL minus any query parameters and without any API version prefix.

For example, consider a GET request to https://<server_ip>/api/live_events/1?clean=true by the user 'admin' with the api_key '1acpJN7oEDn3BDDYhQ' that expires on June 1, 2011 UTC. In this case the url parameter is '/live_events/1' and the X-Auth-Expires value is '1306886400'. Thus the value of X-Auth-Key should be computed as follows:

md5('1acpJN7oEDn3BDDYhQ' + md5('/live_events/1'+'admin'+'1acpJN7oEDn3BDDYhQ'+'1306886400'))
=> md5('1acpJN7oEDn3BDDYhQ' + md5('/live_events/1admin1acpJN7oEDn3BDDYhQ1306886400'))
=> '180c88df8d0d4182385f6eb7e7045a42'
This is a single access request, it is not persisted. If another request needs to be made, the X-Auth-Key must be recalculated and all the headers must be set correctly.

AuthCurl Scripts


Then you can create GET, POST, PUT, DELETE requests in Insomnia.


----

## TODO:

* handling missing evirenmont information.

