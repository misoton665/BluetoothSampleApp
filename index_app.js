// // Angular Module

// ChromeApps API
var gBluetoothDevices = {};

var app = angular.module('index', [], function($provide) {
      $provide.decorator('$window', function($delegate) {
      $delegate.history = null;
    return $delegate;
  });
});

app.controller('HelloController', function($scope) {
  $scope.greets = [
    {message: "hellordvhbjnknjbhvgcfdx"},
    {message: "heytgvhbjnkmlkjhgvf"}
  ];
  
  updateDevices = function() {
    $scope.devices = gBluetoothDevices;
    console.log("update");
  };
  
  addGreet = function() {
    var len = $scope.greets.length;
    $scope.greets[len] = {message: "hello"};
  };
  
  $scope.onClick = function() {
    $scope.greets[0].message = "ぺやんぐ";
    addGreet();
  };
  
  $scope.updateScannedDevices = function() {
    updateDevices();
    console.log("updateScannedDevices: " + gBluetoothDevices["00:13:04:85:B8:1C"].address);
  };
  
  
});

var updateDeviceName = function(device) {
  console.log("update device name: " + device.name);
  gBluetoothDevices[device.address] = {address: device.address, name: device.name};
};
var removeDeviceName = function(device) {
  console.log("delete device name: " + device.name);
  delete gBluetoothDevices[device.address];
};

chrome.bluetooth.onDeviceAdded.addListener(updateDeviceName);
chrome.bluetooth.onDeviceChanged.addListener(updateDeviceName);
chrome.bluetooth.onDeviceRemoved.addListener(removeDeviceName);

chrome.bluetooth.getDevices(function(devices) {
  for (var i = 0; i < devices.length; i++) {
    updateDeviceName(devices[i]);
  }
});

// Now begin the discovery process.
chrome.bluetooth.startDiscovery(function() {
  console.log("start discovery.");
  // Stop discovery after 30 seconds.
  setTimeout(function() {
    chrome.bluetooth.stopDiscovery(function() {
      console.log("stop discovery.");
    });
  }, 30000);
});

