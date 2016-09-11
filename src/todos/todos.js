import _ from 'lodash';

export default function($scope, todoFactory) {
  let params = {
    createHasInput: false
  };

  console.log(todoFactory.createTask);

  $scope.todos = [
    {
      task: 'do dishes',
      isCompleted: false,
      isEditing: false
    },
    {
      task: 'walk the dog',
      isCompleted: 'false',
      isEditing: false
    }
  ];

  $scope.onCompletedClick = todo => {
    todo.isCompleted = !todo.isCompleted;
  };
  $scope.onEditClick = todo => {
    todo.isEditing = true;
    todo.updatedTask = todo.task;
  }
  $scope.onCancelClick = todo => {
    todo.isEditing = false;
  }

  $scope.createTask = () => {
    params.createHasInput = false;
    $scope.createTaskInput = '';
  }

  $scope.updateTask = todo => {
    todo.task = todo.updatedTask;
    todo.isEditing = false;
  }

  $scope.deleteTask = todoToDelete => {
    _.remove($scope.todos, todo => todo.task === todoToDelete.task);

  }

  $scope.$watch('createTaskInput', val => {
    if( !val && params.createHasInput) {
      $scope.todos.pop();
      params.createHasInput = false;
    } else if (val && !params.createHasInput) {
      $scope.todos.push({task: val, isCompleted: false});
      params.createHasInput = true;
    } else if( val && params.createHasInput) {
      $scope.todos[$scope.todos.length - 1].task = val;
    }

  });
}