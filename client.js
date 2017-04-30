console.log('JQ');

$(document).ready(onReady);

function onReady(){
var clientObject;
// add event listeners
$('#createtask').on('click', createTask);
$('#updatetask').on('click', updateTask);

// will run on click to create new task
function createTask(){
  var clientObject = {
    task: $('task').val(),
    complete_by: $('completeby').val(),
    //complete: $('complete').val(),
    //update: $('update').val(),
    //delete: $('delete').val()
  };
  console.log('create task');
}// end createTask

// ajax call to send createTask
$.ajax ({
  url: '/createTask',
  type: 'POST',
  data: clientObject,
  success: function(data){
    console.log('creating task ->' , data);
  }
});
createTask();  // questioning this
} // end createTask

// function to update task
function updateTask(){
  console.log('update task');
  $.ajax({
    url: '/updateTask',
    type: 'GET',
    success: function(response){
      console.log('updating task', response);
      for (var i = 0; i < response.length; i++) {
        $('.savedTasks').append('<option>' + response[i].task + " " + response[i].completeby + " " + '</option>');
      }
    }
  });






}
