'use strict';

/**
 * @ngdoc function
 * @name bluetoothApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bluetoothApp
 */
angular.module('bluetoothApp')
  .controller('MainCtrl', function ($scope) {

  	$scope.showbutton =  true;

    // Controlar Bluetooth
	document.addEventListener('deviceready', function () {

		alert('Hola tengo cordova');

		bluetoothSerial.isEnabled( function() {
			alert('Yay your bluetooth is on');
		}, function() {
			alert('You must turn on your bluetooth');
		});

		/*bluetoothSerial.available( function() {
			alert('Yay your bluetooth is on');
		}, function() {
			alert('You must turn on your bluetooth');
		});*/

		// Hay que hacerla funcionar como monitoreo

		bluetoothSerial.list(function(response) {
				//alert(JSON.stringify(response));	
				$scope.datas = response;						
			}, function(err) {
				alert('Ups something is wrong: ' + err);
			});

		$scope.deviceList = function() {

			$scope.showList = true;

			/*alert('vas a conectar al dispositivo');
			bluetoothSerial.connect('00:06:66:76:B3:CB', function() {
				alert('You have connected');
			}, function() {
				alert('Ups something is wrong' );
			});*/

		}

		$scope.connect = function(id) {
			//alert(id);

			bluetoothSerial.connect(id, function() {
				alert('You have connected');
				$scope.showList = false;
				$scope.showbutton = false;
			}, function() {
				alert('Ups something is wrong' );
			});
			
		}

		$scope.ledon = function() {

			bluetoothSerial.write('on', function() {
				console.log('Light is on');
			}, function() {
				alert('Ups something is wrong');
			});

		}

		$scope.ledoff = function() {

			bluetoothSerial.write('off', function() {
				console.log('Light is off');
			}, function() {
				alert('Ups something is wrong');
			});

		}

		$scope.disconnect = function() {

			bluetoothSerial.disconnect( function() {
				alert('You have disconnected');
				$scope.showbutton = true;
			},  function() {
				alert('Ups something is wrong');
			});			

		}


	});
  });
