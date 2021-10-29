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
let get_hour = today.getHours();
let get_min = today.getMinutes();

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

for(let i = 0; i < 7; i++) {
    let resultDay = new Date(get_year, get_month - 1, get_date + (i - get_day));
    let theMonth = Number(resultDay.getMonth()) + 1;
    let theDate = resultDay.getDate();

    theMonth = String(theMonth).length === 1 ? '0' + theMonth : theMonth;
    theDate = String(theDate).length === 1 ? '0' + theDate : theDate;

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
                selected_date.innerText = `${get_year}.${get_month}.${selected_get_date}`;
            }
        })

        if(e.classList.contains('active')) {
            selected_get_date = e.innerText;
        }
    })
}

selected_date.innerText = `${get_year}.${get_month}.${selected_get_date}`;

const check_button = document.querySelectorAll('.check');
const delete_button = document.querySelectorAll('.delete');
const text_area = document.querySelector('.textarea');
const submit = document.querySelector('.submit');
const todoList = document.querySelector('.todo-list-content');
const task = document.querySelectorAll('.task div');
const add_sort = document.querySelectorAll('.add-sort > div');

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

check_button.forEach(e => {
    e.addEventListener('click', () => {
        if(e.classList.contains('active')) {
            e.classList.remove('active');
            e.parentElement.parentElement.style.textDecoration = 'none';
            e.style.color = '#fff';
        } else {
            //console.log(e.parentElement.parentElement.innerText)
            e.parentElement.parentElement.style.textDecoration = "line-through";
            e.style.color = 'gray';
            e.classList.add('active');
        }
    })    
})

delete_button.forEach(e => {
    e.addEventListener('click', () => {
        console.log(e)
    })
})

submit.addEventListener('click', () => {
    let content = `
                <div class="todo">
                    ${text_area.value} 
                    <div class="time">
                        ${get_hour}:${get_min}
                    </div>
                    <div class="button">
                        <div class="check"><i class="ri-check-line"></i></div>
                        <div class="delete"><i class="ri-close-line"></i></div>
                    </div>
                </div>
    `;
    todoList.insertAdjacentHTML('beforeend', content);
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

