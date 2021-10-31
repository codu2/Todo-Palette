const calendar_week = document.querySelector('.calendar-week');
const month = document.querySelector('.month');
const week = document.querySelector('.week');
const date = document.querySelector('.date');
const selected_date = document.querySelector('.selected-date');
const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let today = new Date();

let get_year = today.getFullYear();
let get_month = today.getMonth() + 1; // 1월달의 index가 0이므로 1을 더해줘야 함
let get_day = today.getDay();
let get_date = today.getDate();

let this_week = [];
let selected_get_date = [];

month.innerText = `${get_year}.${get_month}`;
week.innerHTML = `
                <div class="sun">Sun</div>
                <div class="mon">Mon</div>
                <div class="tue">Tue</div>
                <div class="wed">Wed</div>
                <div class="thu">Thu</div>
                <div class="fri">Fri</div>
                <div class="sat">Sat</div>
`;

let last_month = new Date(get_year, get_month - 1, 0);
let last_day = last_month.getDate();

for(let i = 0; i < 7; i++) {
    let resultDay = new Date(get_year, get_month - 1, get_date + (i - get_day)); 
    //위에서 today.getMonth()에 1을 더해줬으므로 get_month에서 1을 빼줌, 원래는 today.getMonth()에 해당하는 값만 들어가야 함
    let theMonth = Number(resultDay.getMonth()) + 1;
    let theDate = resultDay.getDate();

    theMonth = String(theMonth).length === 1 ? '0' + theMonth : theMonth;
    theDate = String(theDate).length === 1 ? '0' + theDate : theDate;
    //날짜가 표시되는 자릿수를 맞추는 식

    this_week[i] = theDate;

    date.innerHTML = `
                <div class="each-day">${this_week[0]}</div>
                <div class="each-day">${this_week[1]}</div>
                <div class="each-day">${this_week[2]}</div>
                <div class="each-day">${this_week[3]}</div>
                <div class="each-day">${this_week[4]}</div>
                <div class="each-day">${this_week[5]}</div>
                <div class="each-day">${this_week[6]}</div>
    `;
    console.log(this_week)

    const each_day = document.querySelectorAll('.each-day');
    function removeAllDate() {
        each_day.forEach(e => {
            e.classList.remove('active');
        })
    }
  
    each_day.forEach(e => {
        if(e.innerText == get_date) {
            e.classList.add('active');
        }

        e.addEventListener('click', () => {
            removeAllDate();
            e.classList.add('active');

            if(e.classList.contains('active')) {
                selected_get_date = e.innerText;
            }
            //console.log(e.nextElementSibling.innerText)
            if(e.innerText != this_week[6]) {
                console.log(e)
                if(e.innerText > e.nextElementSibling.innerText) {
                    if(e.previousElementSibling.innerText < e.innerText) {
                        selected_date.innerText = `${get_year}.${theMonth-1}.${selected_get_date}`;      
                    } else {
                        selected_date.innerText = `${get_year}.${theMonth-1}.${selected_get_date}`;
                    }
                } else {
                    selected_date.innerText = `${get_year}.${theMonth}.${selected_get_date}`;
                }
            } else {
                selected_date.innerText = `${get_year}.${theMonth}.${this_week[6]}`;
            }
        })
        selected_date.innerText = `${get_year}.${get_month}.${get_date}`;
    })
}

const text_area = document.querySelector('.textarea');
const submit = document.querySelector('.submit');
const todoList = document.querySelector('.todo-list-content');
const task = document.querySelectorAll('.task div');
const add_sort = document.querySelectorAll('.add-sort > div');
const study = document.querySelector('.study');
const exercise = document.querySelector('.exercise');
const other = document.querySelector('.other');

//localStorage.clear();
let index = 0;

submit.addEventListener('click', () => {
    let now = new Date();
    let get_hour = now.getHours();
    let get_data_hour = get_hour < 10 ? `0${get_hour}` : `${get_hour}`;
    let get_min = now.getMinutes();
    let get_data_min = get_min < 10 ? `0${get_min}` : `${get_min}`;
    let get_sec = now.getSeconds();
    let get_data_sec = get_sec < 10 ? `0${get_sec}` : `${get_sec}`;

    let content = `
                <div class="todo">
                    ${text_area.value} 
                    <div class="time">
                        ${get_data_hour}:${get_data_min}:${get_data_sec}
                    </div>
                    <div class="button button${index}">
                        <div class="check"><i class="ri-check-line"></i></div>
                        <div class="delete"><i class="ri-close-line"></i></div>
                    </div>
                </div>
    `;
    
    myStorage = window.localStorage;
    if(myStorage.getItem(`todo${index}`) == null) {
        myStorage.setItem(`todo${index}`, JSON.stringify(content));
    } else {
        index += 1;
        myStorage.setItem(`todo${index}`, JSON.stringify(content));
    }
  
    let get_content = JSON.parse(myStorage.getItem(`todo${index}`));
    todoList.insertAdjacentHTML('beforeend', get_content);

    text_area.value = "";

    const check_button = document.querySelectorAll('.check');
    const delete_button = document.querySelectorAll('.delete');

    check_button.forEach(e => {
        e.addEventListener('click', () => {
            /*
            if(e.classList.contains('active')) {
                e.classList.toggle('active');
                e.parentElement.parentElement.style.textDecoration = 'none';
                e.style.textDecoration = "none";
                check_length--;
            }
            */
            e.parentElement.parentElement.style.textDecoration = "line-through";
            e.classList.add('active');
            e.style.textDecoration = "line-through";
        })    
    })

    delete_button.forEach(e => {
        e.addEventListener('click', () => {
            let remove_content = e.parentElement.parentElement;
            console.log(remove_content)
            remove_content.remove()
            for(let i = 0; i < index; i++) {
                if(delete_button[i].parentElement.parentElement == remove_content) {
                    console.log(i)
                    myStorage.removeItem(`todo${i}`);
                    index--;
                }
            }
            if(e.previousElementSibling.classList.contains('active')) {
                check_length--;
            }
        }, false);
    })

    index++;

    const todo = document.querySelectorAll('.todo-list .todo');
    console.log(todo)

    task.forEach(e => {
        e.addEventListener('click', () => {
            e.classList.toggle('active')
        })

        if(e.classList.contains('active')) {
            todo[index-1].style.backgroundColor = e.id;
        } 
    })
})

function removeAllColor() {
    task.forEach(e => {
        e.classList.remove('active');
    })
}

task.forEach(e => {
    e.addEventListener('click', () => {
        if(e.classList.contains('active')) {
            e.classList.remove('active');
        } else {
            removeAllColor();
            e.classList.add('active');
        }
    })
})

function removeAllSort() {
    add_sort.forEach(e => {
        e.classList.remove('active');
    })
}

add_sort.forEach(e => {
    e.addEventListener('click', () => {
        removeAllSort();
        e.classList.add('active');
    })
})
