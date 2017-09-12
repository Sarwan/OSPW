var ospw=angular.module('keyboardLayouts',['ngRoute']);
var currentSubID=0;
ospw.config(function($routeProvider){
    //console.log("config.route");
    $routeProvider
        .when('/',{
        templateUrl:'pages/home.html',
        controller:'homeController'
    })
    .when('/play',{
        templateUrl:'pages/play.html',
        controller:'playController'
    })
    .when('/play/:scid',{
        templateUrl:'pages/play.html',
        controller:'playController'
    })
     .when('/about',{
        templateUrl:'pages/about.html',
        controller:'aboutController'
    })
     .when('/files',{
        templateUrl:'pages/files.html',
        controller:'filesController'
    })
});

ospw.directive('mainCategoryItem',function(){
     //console.log(" mainCategoryItem directive");
    return {
        restrict:'E',
        templateUrl:'directives/mainCategoryItem.html',
        replace:true
        
    }
});

ospw.directive('sentencesList',function(){
     //console.log(" sentencesList directive");
    return {
        restrict:'E',
        templateUrl:'directives/sentencesList.html',
        replace:true
        
    }
});

ospw.filter("sentence",function(){
    return function(sen,subid){
        //console.log("======in sentence filter "+sen);
        //console.log(sen);
         //for each (var sub in sen.SubCategories)
        var sensen={};
        //console.log("sen is Array-"+Array.isArray(sen));
        if(Array.isArray(sen))
            {
                 for (i = 0; i < sen.length; i++) { 
                     //console.log("subcategory--")
                    //console.log(sen[i].SubCategories);
                     
                     for (j =0;j< sen[i].SubCategories.length;j++)
                         {
                                //console.log("sentences###")
                                //console.log(sen[i].SubCategories[j].Sentences);
                             if(sen[i].SubCategories[j].id==currentSubID)
                                 {
                                     sensen= sen[i].SubCategories[j].Sentences;
                                 }
                             
                         }
                }
                
            }
       return sensen;
    }
    
});

ospw.controller('homeController',['$scope','$http',function($scope,$http){
     //console.log("home controller");

    $http.get('data/ospw.json')
    .success(function(data, status, headers){
        //console.log(" status:"+status);
        //console.log(data);
        $scope.data=data;
    })
    .error(function(data, status, headers, config){
        //console.log("Error Data:"+data);
        //console.log("Error status:"+status);
        //console.log("Error headers:"+headers);
    })
}]);

ospw.controller('aboutController',['$scope','$http',function($scope,$http){
    //console.log("about controller");
}]);

ospw.controller('filesController',['$scope','$http',function($scope,$http){
    //console.log("files controller");
    
        $http.get('data/files-cn.json')
    .success(function(data, status, headers){
        //console.log(" status:"+status);
        //console.log(data);
        $scope.files=data;
    })
    .error(function(data, status, headers, config){
        //console.log("Error Data:"+data);
        //console.log("Error status:"+status);
        //console.log("Error headers:"+headers);
    })
    
}]);

ospw.controller('playController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
    //console.log("play controller");
    $scope.subcatid=$routeParams.scid;
    //console.log($scope.subcatid);
    currentSubID=$scope.subcatid;
    $scope.CurrentSentence={};
     $scope.selSen= function selSen(sen,index)
        {
            //console.log("++++++++++++++++++selSen function");
            //console.log(sen.ID);
         $scope.CurrentSentence=sen;
            //alert(sen.ID);
         var audio = document.getElementById('aplayer');
         //console.log(audio);
         audio.src="files/mp3/"+sen.Sound;
         audio.play();
         
         
         // for select row effect
            $scope.selectedRow = null;  // initialize our variable to null
            $scope.selectedRow = index;
         //console.log("selectedRow:"+$scope.selectedRow);

        }
     $http.get('data/ospw.json')
    .success(function(data, status, headers){
        //console.log(" status:"+status);
        //console.log(data);
        $scope.data=data;
       var playFrist=function(data) //paly frist sentence
         {
              if(Array.isArray(data))
            {
                 for (i = 0; i < data.length; i++) { 
                     //console.log("++++++++++++++++ play frist subcategory--")
                    //console.log(data[i].SubCategories);
                     
                     for (j =0;j< data[i].SubCategories.length;j++)
                         {
                                //console.log("++++++++++++++++ play frist sentences###")
                                //console.log(data[i].SubCategories[j].Sentences);
                             //console.log("current sub id:"+currentSubID);
                             if(data[i].SubCategories[j].id==currentSubID)
                                 {
                                     //console.log("call senSel for play frist sentence.")
                                     $scope.selSen(data[i].SubCategories[j].Sentences[0],0);
                                     
                                 }
                             
                         }
                }
                
            }
         }
         playFrist(data);
         var subcat=function getSubcat(data,id){
             var mCat="";
             var sCat="";
			 
            if(Array.isArray(data))
            {
                 for (i = 0; i < data.length; i++) { 
                     
                     mCat=data[i].TitleCn;
                    
                     
                     for (j =0;j< data[i].SubCategories.length;j++)
                         {
                               
                                sCat=data[i].SubCategories[j].TitleCn
                               
                            
                             if(data[i].SubCategories[j].id==currentSubID)
                                 {
                                    
                                     $scope.CategoryName=mCat+"-"+sCat;
                                    return;
                                 }
                             else
                                 {
                                     $scope.CategoryName="Category Not Found!";
                                 }
                             
                         }
                }
                
            }
         
            }
         subcat(data,currentSubID);
    })
    .error(function(data, status, headers, config){
        //console.log("Error Data:"+data);
        //console.log("Error status:"+status);
        //console.log("Error headers:"+headers);
    })
     
     
     
    
}]);



