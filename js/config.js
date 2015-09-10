function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

(function(root) {
  root.Hive5Config = {};

  root.Hive5Config.init = function () {
    root.Hive5Config.app_key = "0d410fb1-ed8b-46cc-bafd-6f93b05a474f";
    root.Hive5Config.host = "http://alpha.hornet.hive5.io";
    root.Hive5Config.platform_key = "test";
  };

  root.Hive5Config.readFromQueryString = function() {
    var app_key = getParameterByName('app_key');
    if (app_key)
    {
      root.Hive5Config.app_key = app_key;
    };

    var host = getParameterByName('host');
    if (host)
    {
      root.Hive5Config.host = host;
    };

    var platform_key = getParameterByName('platform_key');
    if (platform_key)
    {
      root.Hive5Config.platform_key = platform_key;
    };
  };

  root.Hive5Config.init();
  root.Hive5Config.readFromQueryString();

})(this);