console.log('JQ');

$(document).ready(onReady);

function onReady(){
var clientObject;
// add event listeners
$('#createtask').on('click', createTask);

// will run on click to create new task
function createTask(){
  var clientObject = {
    task: $('task').val(),
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
sendTask();  // questioning this
} // end createTask

// function to delete task
$(document).on('click', '#deleteTask', function(){
  var myId = $(this).data('todolist');
    console.log('remove task');
  });

  $.ajax({
    url: '/deleteTask',
    type: 'GET',
    success: function(response){
      console.log('deleting task', response);
      for (var i = 0; i < response.length; i++) {
        $('.savedTasks').append('<option>' + response[i].task + '<button class="deleteTask" data-todolist=' + response[i].id + '</option>');
      }
    }
  });
} // causes "Uncaught SyntaxError: Unexpected token }", but when removed,
  // causes more issues --> should the ajax call be within the click function?
  // attempted to do so, but additional errors appeared 
