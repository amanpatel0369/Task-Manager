window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");
    const stat = document.querySelector("#status");

    const inprogress = document.querySelector("#inprogress");
    const completed = document.querySelector("#completed");
    const pending = document.querySelector("#pending");
    const cancel = document.querySelector("#cancel");

    const Task_id = document.querySelector("#Taskid");
    const email = document.querySelector('email');
    const start_date = document.querySelector('#start-date');
    let end_date = document.querySelector('#end-date');
	const srhbx = document.querySelector('.inputBx input');
	let emails = document.querySelector('#email').value.split(/[\n,]+/).map(email => email.trim());



	let tasks = [];
    task_arr = [];
	task_name = [];
	let today = new Date();
	srhbx.addEventListener('input' , function(e){
		let search_value = e.target.value;
	
		let filteredTasks = tasks.filter(task => 
			task.name.includes(search_value) || 
			task.id.toString() === search_value
		);
	
		// get the results div
		let resultsDiv = document.querySelector('#results');
	
		// clear the current results
		resultsDiv.innerHTML = '';
	
		// add each filtered task to the results div
		filteredTasks.forEach(task => {
			let p = document.createElement('p');
			p.textContent = `Task ID: ${task.id}, Task Name: ${task.name}`;
			resultsDiv.appendChild(p);
		});
		document.addEventListener('click', function() {
			// hide the results div
			resultsDiv.style.display = 'none';
		});
		
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;
        const status = stat.value;
		const tasksid = Task_id.value;

		let newTask = {
			id: tasksid,
			name: task
		};

		tasks.push(newTask);
		
		start_date.addEventListener('change', function() {
			end_date.min = this.value;
		});
        

        if(!task) {
            alert("Please fill out the task");
            return
        }

		// we also combine both codes below is the syntax for it 

		// if( task_name.includes(task) && task_arr.includes(Task_id.value)){  //THis is the code for the validation of the task name already exist
		// 	alert("Task already exist");
		// 	return
		// }
		// else{
		// 	task_name.push(task);
		// 	task_arr.push(Task_id.value);
		// }

		if( task_name.includes(task)){  //THis is the code for the validation of the task name already exist
			alert("Task already exist");
			return
		}
		else{
			task_name.push(task);
		}
		console.log(task);
		if (task_arr.includes(Task_id.value)) {   //THis is the code for the validation of the task id already exist
			alert(`The Task ID ${Task_id.value} already exist please choose another task id.`);
		}
		else{
			task_arr.push(Task_id.value);
			console.log(task_name);
			if(status == "cancel") {

				const task_el = document.createElement('div');
				task_el.classList.add('task');
	
				const task_content_el = document.createElement('div');
				task_content_el.classList.add('content');

				const task_content_id = document.createElement('div');
				task_content_id.classList.add('content-id');
	
				task_el.appendChild(task_content_el);
				const task_input_el = document.createElement('input');
				task_input_el.classList.add('text');
				task_input_el.type = 'text';
				task_input_el.value = task;
				task_input_el.setAttribute('readonly', 'readonly');
	
				task_content_el.appendChild(task_input_el);
				console.log(end_date);

				today1 = today.setHours(0, 0, 0, 0);
				let endDate = new Date(end_date.value);
				endDate.setHours(0, 0, 0, 0);

				let isEndDateOver = today1 > endDate;

				// For Displaying status in the template
				const Status_container = document.createElement('div');
				Status_container.classList.add('status-container');
				task_el.appendChild(Status_container);

				const Status_container_el = document.createElement('select');
				Status_container_el.classList.add('status_container_el');
				// To add option 1 in the select element
				
				if (!isEndDateOver) {
					const option_1 = document.createElement('option');
					option_1.value = 'inprogress';
					option_1.innerText = 'Inprogress';
					Status_container_el.appendChild(option_1);
				
					const option_3 = document.createElement('option');
					option_3.value = 'pending';
					option_3.innerText = 'Pending';
					Status_container_el.appendChild(option_3);
				}

				const option_2 = document.createElement('option');
				option_2.value = 'completed';
				option_2.innerText = 'Completed';
				Status_container_el.appendChild(option_2);

				const option_4 = document.createElement('option');
				option_4.value = 'cancel';
				option_4.innerText = 'Cancel';
				Status_container_el.appendChild(option_4);

				Status_container.appendChild(Status_container_el);
				task_el.appendChild(Status_container);

				// to append the template in the respective status containers
				Status_container_el.addEventListener('change', function() {
					if(this.value == "inprogress") {
						inprogress.appendChild(task_el);
					}
					else if(this.value == "completed") {
						completed.appendChild(task_el);
					}
					else if(this.value == "pending") {
						pending.appendChild(task_el);
					}
					else if(this.value == "cancel") {
						cancel.appendChild(task_el);
					}
				})
	

				// to append the template in the respective status containers

				// For Edit and Delete buttons
				const task_actions_el = document.createElement('div');
				task_actions_el.classList.add('actions');
				const task_edit_el = document.createElement('button');
				task_edit_el.classList.add('edit');
				task_edit_el.innerText = 'Edit';
	
				const task_delete_el = document.createElement('button');
				task_delete_el.classList.add('delete');
				task_delete_el.innerText = 'Delete';
	
				task_actions_el.appendChild(task_edit_el);
				task_actions_el.appendChild(task_delete_el);
	
				task_el.appendChild(task_actions_el);
				cancel.appendChild(task_el);
	
				input.value = '';
	
			task_edit_el.addEventListener('click', (e) => {
				if (task_edit_el.innerText.toLowerCase() == "edit") {
					task_edit_el.innerText = "Save";
					task_input_el.removeAttribute("readonly");
					task_input_el.focus();
				} else {
					task_edit_el.innerText = "Edit";
					task_input_el.setAttribute("readonly", "readonly");
				}
			});
	
			task_delete_el.addEventListener('click', (e) => {
				cancel.removeChild(task_el);
			});
			}
	
	
			if(status == "pending") {
				const task_el = document.createElement('div');
				task_el.classList.add('task');
	
				const task_content_el = document.createElement('div');
				task_content_el.classList.add('content');
	
				task_el.appendChild(task_content_el);
				const task_input_el = document.createElement('input');
				task_input_el.classList.add('text');
				task_input_el.type = 'text';
				task_input_el.value = task;
				task_input_el.setAttribute('readonly', 'readonly');
	
				task_content_el.appendChild(task_input_el);
	
				const task_actions_el = document.createElement('div');
				task_actions_el.classList.add('actions');
				const task_edit_el = document.createElement('button');
				task_edit_el.classList.add('edit');
				task_edit_el.innerText = 'Edit';
	
				const task_delete_el = document.createElement('button');
				task_delete_el.classList.add('delete');
				task_delete_el.innerText = 'Delete';
	
				task_actions_el.appendChild(task_edit_el);
				task_actions_el.appendChild(task_delete_el);
	
				task_el.appendChild(task_actions_el);
				pending.appendChild(task_el);
	
				input.value = '';
	
			task_edit_el.addEventListener('click', (e) => {
				if (task_edit_el.innerText.toLowerCase() == "edit") {
					task_edit_el.innerText = "Save";
					task_input_el.removeAttribute("readonly");
					task_input_el.focus();
				} else {
					task_edit_el.innerText = "Edit";
					task_input_el.setAttribute("readonly", "readonly");
				}
			});
	
			task_delete_el.addEventListener('click', (e) => {
				pending.removeChild(task_el);
			});
			}
	
	
	
			if(status == "completed") {
				const task_el = document.createElement('div');
				task_el.classList.add('task');
	
				const task_content_el = document.createElement('div');
				task_content_el.classList.add('content');
	
				task_el.appendChild(task_content_el);
				const task_input_el = document.createElement('input');
				task_input_el.classList.add('text');
				task_input_el.type = 'text';
				task_input_el.value = task;
				task_input_el.setAttribute('readonly', 'readonly');
	
				task_content_el.appendChild(task_input_el);
	
				const task_actions_el = document.createElement('div');
				task_actions_el.classList.add('actions');
				const task_edit_el = document.createElement('button');
				task_edit_el.classList.add('edit');
				task_edit_el.innerText = 'Edit';
	
				const task_delete_el = document.createElement('button');
				task_delete_el.classList.add('delete');
				task_delete_el.innerText = 'Delete';
	
				task_actions_el.appendChild(task_edit_el);
				task_actions_el.appendChild(task_delete_el);
	
				task_el.appendChild(task_actions_el);
				completed.appendChild(task_el);
	
				input.value = '';
	
			task_edit_el.addEventListener('click', (e) => {
				if (task_edit_el.innerText.toLowerCase() == "edit") {
					task_edit_el.innerText = "Save";
					task_input_el.removeAttribute("readonly");
					task_input_el.focus();
				} else {
					task_edit_el.innerText = "Edit";
					task_input_el.setAttribute("readonly", "readonly");
				}
			});
	
			task_delete_el.addEventListener('click', (e) => {
				completed.removeChild(task_el);
			});
			}
	
	
			if(status == "inprogress") {
				const task_el = document.createElement('div');
				task_el.classList.add('task');
	
				const task_content_el = document.createElement('div');
				task_content_el.classList.add('content');
	
				task_el.appendChild(task_content_el);
				const task_input_el = document.createElement('input');
				task_input_el.classList.add('text');
				task_input_el.type = 'text';
				task_input_el.value = task;
				task_input_el.setAttribute('readonly', 'readonly');
	
				task_content_el.appendChild(task_input_el);
	
				const task_actions_el = document.createElement('div');
				task_actions_el.classList.add('actions');
				const task_edit_el = document.createElement('button');
				task_edit_el.classList.add('edit');
				task_edit_el.innerText = 'Edit';
	
				const task_delete_el = document.createElement('button');
				task_delete_el.classList.add('delete');
				task_delete_el.innerText = 'Delete';
	
				task_actions_el.appendChild(task_edit_el);
				task_actions_el.appendChild(task_delete_el);
	
				task_el.appendChild(task_actions_el);
				inprogress.appendChild(task_el);
	
				input.value = '';
	
			task_edit_el.addEventListener('click', (e) => {
				if (task_edit_el.innerText.toLowerCase() == "edit") {
					task_edit_el.innerText = "Save";
					task_input_el.removeAttribute("readonly");
					task_input_el.focus();
				} else {
					task_edit_el.innerText = "Edit";
					task_input_el.setAttribute("readonly", "readonly");
				}
			});
	
			task_delete_el.addEventListener('click', (e) => {
				inprogress.removeChild(task_el);
			});
			}
		}

	});
});