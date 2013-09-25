var app= angular.module('planits', ['ui.bootstrap']);

app.controller('planitsCtrl', function($scope) {
  $scope.tasks=[
    {title: "run", description: "run 2.2 miles", ttl: "8", due: "2013-09-22T01:01:03.747Z", orbit: "1" },
    {title: "laundry", description: "go to super laundryland and get my clothes fresh", ttl: "8", due: "2013-09-22T01:01:03.747Z", orbit: "1" },
    {title: "meanstack.com", description: "code up the layout I made in photoshop", ttl: "4", due: "2013-09-22T01:01:03.747Z", orbit: "2" },
    {title: "Planits mockup UI", description: "sketch out a UI for the iOS version of Planits", ttl: "2", due: "2013-09-22T01:01:03.747Z", orbit: "2" },
    ];

  //filter data by task.orbit 
  $scope.isOrbit = function(orbitId) {
      // take task and return the ones where the orbitID==task.orbit
        return function(task) {
            return task.orbit == orbitId;
        }
  }

  $scope.sortTasks=function() {
     var today = $filter('date')(new Date(), 'yyyy-MM-dd');
      alert(today);
  }
 
  $scope.sortOrbit=function() {
    var today= new Date();
    alert(today);
    $scope.$watch(task, function() {
      if(task==today) {
        alert(today);
      }
    })
  }
  $scope.orbits=[5,4,3,2,1];
  //we're gonna reset our form to these empty values on submit
  var defaultForm = {
              tite : "",
              description : "",
              due: "",
              ttl:"",
              orbit:""
    };



  $scope.addTask = function(task) {
    $scope.master= angular.copy(task);
    $scope.tasks.push({title:task.title, description: task.description, due: task.due, ttl: task.ttl, orbit:task.orbit});
    $scope.sortOrbit();
  }
 
  $scope.resetForm = function(task){
      //make the record pristine
      $scope.taskForm.$setPristine();
      //clear the form by setting to defaultForm
      $scope.task = defaultForm;
     };

  $scope.submit=function(task) {
    $scope.addTask(task);
    $scope.resetForm(task);
    $scope.taskForm.$setPristine();

  }

  //add orbit select field that takes the options of the orbit objects. 

})

app.directive('task', function() {
  return {
    restrict:"E",
    scope:{
      title:"@",
      description:"@",
      due:"@",
      ttl:"@",
      orbit:"@"
    },
    template:"<div class='task'><h4 ng-click='toggleDetail()'>{{title}} <span class='badge pull-right'>{{orbit}}</span></h4><p ng-show='showDetail'>{{description}} {{ttl}} {{due}}</p></div>",
    link:function(scope, element, attrs) {
      scope.showDetail=false;
      scope.isTaskDone=false;
      scope.toggleDetail=function() {
        scope.showDetail=! scope.showDetail;
      }
      scope.toggleDone=function() {
        scope.isTaskDone=! scope.isTaskDone;
      }
      
    }
  }
})

app.directive('planet', function() {
  return {
    restrict:"A",
    scope:{
      title:"@",
      description:"@",
      due:"@",
      ttl:"@",
      orbit:"@",
      size:"@"
    },
    template:"<div class='taskWrapper' style='height:{{83+ttl*25}}px; margin-top:{{-54-12.5*ttl}}px;'><div class='taskPlanet {{size}}' style='width:{{50+25*ttl}}px; height:{{50+25*ttl}}px;'><div class='taskTTL'><h3>{{ttl}}</h3></div></div><div class='taskTitle'><h4 class='lead'>{{title}}</h4></div><h1 ng-show='showTaskMenu'>Blah</h1> </div>",
    link:function(scope, element, attrs) {
      scope.showTaskMenu=false;
      scope.toggleTaskMenu=function() {
        scope.showTaskMenu=! scope.showTaskMenu;
      }
      attrs.$observe('ttl', function(value) {
        if(value<4) {
         attrs.$set('size', 'smallPlanet')
        }
        if(value>=4) {
          attrs.$set('size', 'mediumPlanet')
        }
        if(value>6) {
          attrs.$set('size', 'largePlanet')
        }
      })
      
    }
  }
})


