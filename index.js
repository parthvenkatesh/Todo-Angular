var module = angular.module("app", []);
module.controller('ctrl', function($scope,$window) {
	$scope.li=[]
	$scope.data=''
	$scope.reminders=[]
	$scope.mymap=new Map()
	$scope.rem = function(){
		len = $scope.li.length
		if(len==0)
			alert('No notes selected')
		else{
			var retrievedData = localStorage.getItem("current_reminders");
			var reminders = JSON.parse(retrievedData);
			for(let i=0;i<len;i++){
					$scope.li[i].parentNode.removeChild($scope.li[i])
					reminders.splice(reminders.indexOf($scope.li[i].innerHTML),1)
			}
			localStorage.setItem("current_reminders", JSON.stringify(reminders))				
				$scope.li=[]
			}
		}


	$scope.save = (data) =>{
		$scope.data=''
		if(data===''){
			alert('Enter text')
			return
			}
		$scope.reminders.push(data)
		var list = document.getElementById('list');
		var entry = document.createElement('li');
		entry.appendChild(document.createTextNode(data));
		localStorage.setItem("current_reminders", JSON.stringify($scope.reminders))
		$scope.mymap.set(entry,0)
		entry.onclick=function(){
			if($scope.mymap.get(this)==0){
				this.style.background='limeGreen';
				$scope.mymap.set(entry,0)
				$scope.li.push(this)
			}
			else{
				this.style.background='pink';
				$scope.mymap.set(entry,1)
				$scope.li.splice($scope.li.indexOf(this),1)
			}
		}
		list.appendChild(entry);
	}
	
	$scope.load = () => {
		var retrievedData = localStorage.getItem("current_reminders");
		var x = JSON.parse(retrievedData);
		if(x.length == 0){
			localStorage.setItem("current_reminders", JSON.stringify($scope.reminders))
			console.log('Empty')
			return
			}
		//$scope.reminders = JSON.parse(x);
		//console.log($scope.reminders)
		localStorage.setItem("current_reminders", JSON.stringify([]))
		for(let i=0;i<x.length;i++){
			$scope.save(x[i])
			console.log(x[i])			
		}
	}
});	
