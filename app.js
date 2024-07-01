let d = document ;

let data = [];
let currentId ;

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = d.querySelector(".calendar-dates"),
currentDate = d.querySelector(".calendar-current-date"),
prenexIcons = d.querySelectorAll(".calendar-navigation span"),
calendarContainer = d.querySelector('.calendar-container'),
calendarDates = d.querySelector('.calendar-dates');
let calendarDays;

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const addTodoBtn = d.querySelector('.add-item'),
modalNewTodo = d.querySelector('.modal-new-todo'),
darkBg1 = d.querySelector('.dark-bg-1'),
darkBg2 = d.querySelector('.dark-bg-2');

const usedChar = d.querySelector('.used-char'),
warningTitle = d.querySelector('.title-cont .warning-cont .warning'),
addTitle = d.getElementById('add-title');

const startTodayBtn = d.querySelector('.start-today'),
deadLineTodayBtn = d.querySelector('.deadline-today');

const startCalendarBtn = d.querySelector('.start-calendar'),
deadlineCalendarBtn = d.querySelector( '.deadline-calendar');

const modalStartMonth = d.querySelector( '.start-inputs .month-input'),
modalStartDay = d.querySelector( '.start-inputs .day-input'),
modalDeadLineMonth = d.querySelector( '.deadline-cont .month-input'),
modalDeadLineDay = d.querySelector( '.deadline-cont .day-input');

const warningStartInput = d.querySelector('.start-cont .warning-cont .warning-input'),
warningDeadlineInput = d.querySelector('.deadline-cont .warning-cont .warning-input');

let selectedDay;
let selectedMonth;
let calendarFlag;

let WTFlag = true;
let WSFlag = true;
let WDFlag = true;
 
// WT = Wavning Title
// WS = Warning start date
// WD = warning Deadlin date

const addDescription = document.getElementById('add-description');

const cancelBtn = d.querySelector('.cancel'),
addBtn = d.querySelector('.add'),
applyBtn = d.querySelector('.apply');

let frameTodo = d.querySelector('.frame-items');

const modalDescrTitle = d.querySelector( '.title-text' ),
modalDescText = d.querySelector('.description-cont #description'),
closeBtn = d.querySelector( '.description-cont .close'),
modalDescr = document.querySelector('.modal-description'),
descrAlert = document.querySelector('.description-alert');

function setChecker() {

    currentId = event.target.id.slice(5);

    let checkbox = d.querySelector( `#checkbox${currentId}` );
    let checkmark = d.querySelector( `#checkmark${currentId}` );
    let marker = d.querySelector( `#marker${currentId}` );

    checkmark.classList.toggle('checkbox-bg')
    marker.classList.toggle('block-disp' , 'fade-in-checker');

    if ( checkmark.classList.item(1) === 'checkbox-bg' ) {
        checkbox.checked = true ;
        data[currentId-1].checked = true ;
    } else {
        checkbox.checked = false ;
        data[currentId-1].checked = false ;
    }

}

function extractMonthNum( month ) {

    if ( month === 'Jan') {
        return '01'
    }
    if ( month === 'Feb' ) {
        return '02'
    }
    if ( month === 'Mar' ) {
        return '03'
    }
    if ( month === 'Apr' ) {
        return '04'
    }
    if ( month === 'May' ) {
        return '05'
    }
    if ( month === 'Jun' ) {
        return '06'
    }
    if ( month === 'Mar' ) {
        return '03'
    }
    if ( month === 'Jul' ) {
        return '07'
    }
    if ( month === 'Aug' ) {
        return '08'
    }
    if ( month === 'Sep' ) {
        return '09'
    }
    if ( month === 'Oct' ) {
        return '10'
    }
    if ( month === 'Nov' ) {
        return '11'
    }
    if ( month === 'Dec' ) {
        return '12'
    }

}

function showWarningTitle() {

    let valueLength = String(addTitle.value).length;
    usedChar.innerHTML = valueLength;

    if ( valueLength > 33 ) {
        warningTitle.classList.add('block-disp');
        addTitle.classList.add('red-outline');
        WTFlag = false;
    } else {
        warningTitle.classList.remove('block-disp');
        addTitle.classList.remove('red-outline');
        WSFlag = true;
    }

} 

function setDateToday( event ) {

    let date = String( new Date() );
    let month = date.slice(4,7);
    let day = date.slice(8,10);

    month = extractMonthNum ( month );

    if ( event.target.className === 'start-today' ) {
        modalStartMonth.value = month;
        modalStartDay.value = day;
    } else {
        modalDeadLineMonth.value = month;
        modalDeadLineDay.value = day;
    }

}

//---------------------------calendar------------------------

function manipulate() {

    let calendarDates = document.querySelector('.calendar-dates');

	let dayOne = new Date(year, month, 1).getDay();
	let lastDate = new Date(year, month + 1, 0).getDate();
	let dayEnd = new Date(year, month, lastDate).getDay();
	let monthLastDate = new Date(year, month, 0).getDate();

	let lit = "";

	for (let i = dayOne; i > 0; i--) {
		lit +=
			`<li class="inactive">${monthLastDate - i + 1}</li>`;
	}

	for (let i = 1; i <= lastDate; i++) {
		let isToday = i === date.getDate()
			&& month === new Date().getMonth()
			&& year === new Date().getFullYear()
			? "active"
			: "";
		lit += `<li class="${isToday}" onclick="getInfoCalender()">${i}</li>`;
	}

	for (let i = dayEnd; i < 6; i++) {
		lit += `<li class="inactive">${i - dayEnd + 1}</li>`
	}

	currentDate.innerText = `${months[month]} ${year}`;

	day.innerHTML = lit;

}

manipulate();

prenexIcons.forEach(icon => {

	icon.addEventListener("click", () => {

		month = icon.id === "calendar-prev" ? month - 1 : month + 1;

		if (month < 0 || month > 11) {

			date = new Date(year, month, new Date().getDate());
			year = date.getFullYear();
			month = date.getMonth();
		} else {
			date = new Date();
		}
		manipulate();
	});
});

//-------------------------------------------------------------

function showCalendar() {
    
    calendarContainer.classList.add('block-disp' , 'fade-in');
    darkBg2.classList.add('block-disp' , 'fade-in');

    let BtnClass = event.target.className;

    if ( BtnClass === 'start-calendar' ) {
        calendarFlag = 'start';
    } else {
        calendarFlag = 'deadline';
    }

}

function showAddNewTodo() {

    usedChar.innerHTML = '0'

    modalNewTodo.classList.add('block-disp' ,'fade-in' );
    darkBg1.classList.add('block-disp' , 'fade-in' );
    addBtn.classList.add('block-disp');

    if ( applyBtn.classList.item(1) === 'block-disp' ){
        applyBtn.classList.remove('block-disp');
    } 

}

function closeAddTodo() {

    modalNewTodo.classList.add('fade-out');
    darkBg1.classList.add('fade-out');
   
    setTimeout( ()=> {
        modalNewTodo.classList.remove('block-disp' , 'fade-in' , 'fade-out' );
        darkBg1.classList.remove('block-disp' , 'fade-in' , 'fade-out' );
        clearValue()
    } , 410 )

}

function getInfoCalender() {

    selectedDay = event.target.innerHTML;
    if ( selectedDay.length === 1 ) {
        selectedDay = `0${selectedDay}`
    }
    selectedMonth = currentDate.innerHTML.slice(0,3);
    selectedMonth = extractMonthNum ( selectedMonth );

    calendarContainer.classList.add('fade-out');
    darkBg2.classList.add('fade-out');

    setDateCalendar()

    setTimeout( ()=> {
        calendarContainer.classList.remove('block-disp');
        darkBg2.classList.remove('block-disp');
        
    } , 410 )

    setTimeout( ()=> {
        calendarContainer.classList.remove('fade-out');
        darkBg2.classList.remove('fade-out');
    } , 410 )
}

function setDateCalendar() {
    
    if ( calendarFlag === 'start' ) {
        modalStartMonth.value = selectedMonth;
        modalStartDay.value = selectedDay;
    } else {
        modalDeadLineMonth.value = selectedMonth;
        modalDeadLineDay.value = selectedDay;
    }

}

function repairDateInput() {

    if ( event.target.value != 0 ) {

        let day = event.target.value;

        if ( day.length === 1 ) {
        
            event.target.value = `0${day}`;

        }
    }
}
 
function showWarningInputDate() {

    let valid = true;
    let lastDay = new Date(year, month + 1, 0).getDate();
    let value = event.target.value;
    let parent = event.target.parentElement;

    if ( event.target.className === "day-input" ) {
        if ( value > lastDay ) {
            valid = false;
        }
    } else {
        if ( value > 12 ) {
            valid = false;
        }
    }

    if ( parent.className === 'start-inputs' ) {
        if ( !valid ) {
            warningStartInput.classList.add('block-disp');
            warningStartInput.innerHTML = 'invalid value!';
            event.target.classList.add('red-outline');
            WSFlag = false;
        } else {
            warningStartInput.classList.remove('block-disp');
            event.target.classList.remove('red-outline');
        }
    } else {
        if ( !valid ) {
            warningDeadlineInput.classList.add('block-disp');
            warningDeadlineInput.innerHTML = 'invalid value!';
            event.target.classList.add('red-outline');
            WDFlag = false;
        } else {
            warningDeadlineInput.classList.remove('block-disp');
            event.target.classList.remove('red-outline');
        }
    }

}

function showWarningDate() {

    let date = new Date() ;
    let thisMonth = date.getMonth()+1 ;
    let today = date.getDate() ;

    let startCont = d.querySelector('.start-cont');
    let deadlineCont = d.querySelector('.deadline-cont');

    let SDValue = modalStartDay.value ; 
    let DDValue = modalDeadLineDay.value ;
    let SMValue = modalStartMonth.value ;
    let DMValue = modalDeadLineMonth.value ;

    if ( SDValue != '' && SMValue != '' && DDValue != '' && DMValue != '' ) {

        if ( thisMonth === 12 ) {

            if ( modalStartMonth.value == thisMonth ) {
    
                if ( modalStartDay.value < today ) {
    
                    startCont.classList.add('red-outline');
                    WSFlag = false ;
                    warningStartInput.classList.add('block-disp');
                    warningStartInput.innerHTML = 'expired date!';
    
                    setTimeout ( () => {
                        startCont.classList.remove('red-outline');
                        warningStartInput.classList.remove('block-disp');
                    } , 3000 );
    
                } else {
                    WSFlag = true ;
                }
            } else {
                WSFlag = true
            }
    
            if ( modalDeadLineMonth.value == thisMonth ) {
                
                if ( modalDeadLineDay < today ) {
    
                    deadlineCont.classList.add('red-outline');
                    WDFlag = false ;
                    warningDeadlineInput.classList.add('block-disp');
                    warningDeadlineInput.innerHTML = 'expired date!';
    
                    setTimeout ( () => {
                        deadlineCont.classList.remove('red-outline');
                        warningDeadlineInput.classList.remove('block-disp');
                    } , 3000 )
    
                } else {
                    WDFlag = true ;
                }
            } else {
                WDFlag = true ;
            }
    
        } else {
            
            if ( modalStartMonth.value == thisMonth ) {
    
                if ( modalStartDay.value < today ) {
    
                    startCont.classList.add('red-outline');
                    WSFlag = false ;
                    warningStartInput.classList.add('block-disp');
                    warningStartInput.innerHTML = 'expired date!';
    
                    setTimeout ( () => {
                        startCont.classList.remove('red-outline');
                        warningStartInput.classList.remove('block-disp');
                    } , 3000 );
                    
                } else {
                    WSFlag = true ;
                }
            }
            else if ( modalStartMonth.value < thisMonth ) {
    
                startCont.classList.add('red-outline');
                WSFlag = false ;
                warningStartInput.classList.add('block-disp');
                warningStartInput.innerHTML = 'expired date!';
    
                setTimeout ( () => {
                    startCont.classList.remove('red-outline');
                    warningStartInput.classList.remove('block-disp');
                } , 3000 );
    
            } else {
                WSFlag = true ;
            }
    
            if ( modalDeadLineMonth.value == thisMonth ) {
    
                if ( modalDeadLineDay.value < today ) {
                    
                    deadlineCont.classList.add('red-outline');
                    WDFlag = false ;
                    warningDeadlineInput.classList.add('block-disp');
                    warningDeadlineInput.innerHTML = 'expired date!';
    
                    setTimeout ( () => {
                        deadlineCont.classList.remove('red-outline');
                        warningDeadlineInput.classList.remove('block-disp');
                    } , 3000 );
    
                } else {
                    WDFlag = true ;
                }
            }
            else if ( modalDeadLineMonth.value < thisMonth ) {
    
                deadlineCont.classList.add('red-outline');
                WDFlag = false ;
                warningDeadlineInput.classList.add('block-disp');
                warningDeadlineInput.innerHTML = 'expired date!';
    
                setTimeout ( () => {
                     deadlineCont.classList.remove('red-outline');
                     warningDeadlineInput.classList.remove('block-disp');
                } , 3000 );
    
            } else {
                WDFlag = true ;
            }
    
        }

    }

}

function showWarningEmpty() {

    let titleValue = addTitle.value ;
    let SDValue = modalStartDay.value ; 
    let DDValue = modalDeadLineDay.value ;
    let SMValue = modalStartMonth.value ;
    let DMValue = modalDeadLineMonth.value ;

    let startCont = d.querySelector('.start-cont');
    let deadlineCont = d.querySelector('.deadline-cont');

    if ( SDValue == '' || SMValue == '' ) {

        startCont.classList.add('red-outline');
        WSFlag = false ;
        warningStartInput.classList.add('block-disp');
        warningStartInput.innerHTML = `this field can't be empty.`;

        setTimeout ( () => {
            startCont.classList.remove('red-outline');
            warningStartInput.classList.remove('block-disp');
        } , 3000 );
 
    } else {
        WSFlag = true ;
    }

    if ( DDValue == '' || DMValue == '' ) {

        deadlineCont.classList.add('red-outline');
        WDFlag = false ;
        warningDeadlineInput.classList.add('block-disp');
        warningDeadlineInput.innerHTML = `this field can't be empty.`;

        setTimeout ( () => {
            deadlineCont.classList.remove('red-outline');
            warningDeadlineInput.classList.remove('block-disp');
        } , 3000 );

    } else {
        WDFlag = true ;
    }

    if ( titleValue == '' ) {

        addTitle.classList.add('red-outline');
        WTFlag = false ;
        warningTitle.innerHTML = `this field can't be empty.`;
        warningTitle.classList.add('block-disp');

        setTimeout( () => {
            addTitle.classList.remove('red-outline');
            warningTitle.classList.remove('block-disp');
        } , 3000 );

    } else {
        WTFlag = true ;
    }

}

function clearValue() {

    addTitle.value = '';
    modalStartDay.value = '';
    modalStartMonth.value = '';
    modalDeadLineDay.value = '';
    modalDeadLineMonth.value = '';
    addDescription.value = '';

}

function renderTodo () {

    frameTodo.innerHTML = "";

    data.forEach ( (item) => {

        let templateTodo = 
    
            `<div class="item" id="item${item.id}">
                <div class="number-cont"></div>
                <div class="number">${item.id}</div>
                <div class="checkbox-cont">
                    <label for="checkbox${item.id}" id="label${item.id}" onclick="setChecker()"></label>
                    <input type="checkbox" name="checkbox" class="checkbox" id="checkbox${item.id}"> 
                    <span class="checkmark" id="checkmark${item.id}"></span>
                    <p class="marker" id="marker${item.id}"marker></p>
                </div>
                <div class="title"><p>${item.title}</p></div>
                <div class="start">
                    <input type="text" class="day" value="${item.Sday}" readonly>
                    <span>/</span>
                    <input type="text" class="month" value="${item.Smonth}" readonly>
                    <div class="date-format">
                        <span>day</span>
                        <span>month</span>
                    </div>
                </div>
                <div class="deadline">
                    <input type="text" class="day" value="${item.Dday}" readonly>
                    <span>/</span>
                    <input type="text" class="month" value="${item.Dmonth}" readonly>
                    <div class="date-format">
                        <span>day</span>
                        <span>month</span>
                    </div>
                </div>
                <div class="description">
                    <button onclick="showDescription()" id="descr-btn${item.id}">descr</button>
                </div>
                <div class="edit">
                    <button id="edit-btn${item.id}" onclick="showEditModal()">
                        <img id="edit-btn${item.id}" src="imgs/edit.png" alt="edit icon">
                    </button>
                    <button id="remove-btn${item.id}" onclick="removeTodo()">
                        <img id="remove-btn${item.id}" src="imgs/remove.png" alt="remove icon">
                    </button>
                </div>
            </div>`;
    
        frameTodo.innerHTML += templateTodo ;

    })

    setCheckerAll()

}

function setCheckerAll () {

    data.forEach( (item) => {

        if ( item.checked ) {

            let checkbox = d.querySelector( `#checkbox${item.id}` );
            let checkmark = d.querySelector( `#checkmark${item.id}` );
            let marker = d.querySelector( `#marker${item.id}` );

            checkmark.classList.add('checkbox-bg')
            marker.classList.add('block-disp' );

        }

    })

}

function countId () {
    let i = 1 ;
    data.forEach( (item) => {
        item.id = i;
        i++
    })
}

function addNewTodo() {

    showWarningEmpty()
    showWarningDate()
        
    if ( WTFlag && WSFlag && WDFlag ) {
    
        let titleValue = addTitle.value;
        let startDayValue = modalStartDay.value;
        let startMonthValue = modalStartMonth.value;
        let deadlineDayValue = modalDeadLineDay.value;
        let deadlineMonthValue = modalDeadLineMonth.value;
        let descrValue = addDescription.value;

        data.push({
            id : 0 ,
            title : titleValue ,
            Sday : startDayValue ,
            Smonth : startMonthValue ,
            Dday : deadlineDayValue ,
            Dmonth : deadlineMonthValue ,
            descr : descrValue,
            checked: false
        })

        countId()
        renderTodo()
        closeAddTodo()

        setTimeout( () => clearValue() , 410 )
    
    }

}

function findItem ( ID ) {

    let item = data.find( (item) => {

        if ( item.id == ID ) {
            return item
        }
    })

    return item
}

function showDescription() {

    currentId = event.target.id.slice(9);

    let item = findItem(currentId)

    let title = item.title ;
    let description = item.descr;

    modalDescrTitle.innerHTML = title;
    modalDescText.value = description;

    if ( description != '') {
        modalDescr.classList.add('block-disp' , 'fade-in' );
        darkBg1.classList.add('block-disp' , 'fade-in' );
       
    } else {
        descrAlert.classList.add('block-disp' , 'fade-in' );
        darkBg1.classList.add('block-disp' , 'fade-in' );

        setTimeout ( () => {
            descrAlert.classList.remove( 'fade-in' );
            darkBg1.classList.remove( 'fade-in' );
        } , 410)

        setTimeout( () => {
            descrAlert.classList.add( 'fade-out' );
            darkBg1.classList.add( 'fade-out' );
        } , 1600)

        setTimeout( ()=> {
            descrAlert.classList.remove('block-disp' , 'fade-out' );
            darkBg1.classList.remove('block-disp' , 'fade-out' );
        } , 2010 );
        
    }
}

function closeModalDescr() {

    modalDescr.classList.remove( 'fade-in' );
    darkBg1.classList.remove( 'fade-in' );

    modalDescr.classList.add( 'fade-out' );
    darkBg1.classList.add( 'fade-out' );

    setTimeout( () => {
        modalDescr.classList.remove( 'block-disp' , 'fade-out' );
        darkBg1.classList.remove( 'block-disp' , 'fade-out' );
    } , 410 )
    
}

function showEditModal() {
    
    modalNewTodo.classList.add('block-disp' , 'fade-in');
    darkBg1.classList.add('block-disp' , 'fade-in');
    applyBtn.classList.add('block-disp');
    if ( addBtn.classList.item(1) == 'block-disp' ) {
        addBtn.classList.remove('block-disp');
    }

    currentId = event.target.id.slice(8);
    let item = findItem(currentId);

    addTitle.value = item.title;
    modalStartDay.value = item.Sday ;
    modalStartMonth.value = item.Smonth ;
    modalDeadLineDay.value = item.Dday ;
    modalDeadLineMonth.value = item.Dmonth ;
    addDescription.value = item.descr ;
}

function editModal () {

    let index = data.findIndex( (item) => {
        return item.id == currentId;
    })

    data[index].title = addTitle.value ;
    data[index].Sday = modalStartDay.value;
    data[index].Smonth = modalStartMonth.value;
    data[index].Dday = modalDeadLineDay.value;
    data[index].Dmonth = modalDeadLineMonth.value;
    data[index].descr = addDescription.value;

    closeAddTodo()

    console.log(data);

    renderTodo()
    
}

function removeTodo() {

    currentId = event.target.id.slice(10);

    let index = data.findIndex( (item) => {
        return item.id == currentId;
    })

    let item = d.querySelector(`#item${currentId}`)

    data.splice(index,1);

    item.classList.add('zoom-out-rem');

    setTimeout( () => {
        countId()
        renderTodo()
        item.classList.remove('zoom-out-rem');
    } , 410 )
    

}


addTitle.addEventListener( 'keyup' , showWarningTitle );
startTodayBtn.addEventListener( 'click' , setDateToday );
deadLineTodayBtn.addEventListener( 'click' , setDateToday);
startCalendarBtn.addEventListener( 'click' , showCalendar );
deadlineCalendarBtn.addEventListener( 'click' , showCalendar );
addTodoBtn.addEventListener( 'click' , showAddNewTodo );

modalStartDay.addEventListener( 'blur' , repairDateInput );
modalDeadLineDay.addEventListener( 'blur' , repairDateInput );
modalStartMonth.addEventListener( 'blur' , repairDateInput );
modalDeadLineMonth.addEventListener( 'blur' , repairDateInput );

modalStartDay.addEventListener( 'keyup' , showWarningInputDate );
modalDeadLineDay.addEventListener( 'keyup' , showWarningInputDate );
modalStartMonth.addEventListener( 'keyup' , showWarningInputDate );
modalDeadLineMonth.addEventListener( 'keyup' , showWarningInputDate );

cancelBtn.addEventListener( 'click' , closeAddTodo );
addBtn.addEventListener( 'click' , addNewTodo );

closeBtn.addEventListener( 'click' , closeModalDescr );

applyBtn.addEventListener( 'click' , editModal );

