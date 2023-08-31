
const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".icons span");
import { groupedWorkers } from './employee.js';

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const renderCalendar = () => {
    let firstDateofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i= firstDateofMonth; i > 0; i--){
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i=1; i <= lastDateofMonth; i++){
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                        && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth+ 1}</li>`;
        
    }

    currentDate.innerText = `${month[currMonth]}월 ${currYear}년`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth -1 : currMonth + 1;
        
        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});

const daysLi = daysTag.querySelectorAll("li");

const scheduleList = document.getElementById("schedule_list");


const updateDateInfo = (clickedDay) => {
    const clickedDate = new Date(currYear, currMonth, clickedDay);
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][clickedDate.getDay()];

    document.getElementById("Day").innerText = `${clickedDay}일`;
    document.getElementById("weekDay").innerText = `(${dayOfWeek}요일)`;

    const scheduleList = document.getElementById("schedule-list");
    scheduleList.innerHTML = ''; // 기존 리스트 초기화

    if (groupedWorkers[dayOfWeek]) {
        groupedWorkers[dayOfWeek].forEach(workerInfo => {
            const scheduleItem = document.createElement('li');
            scheduleItem.textContent = workerInfo;
            scheduleList.appendChild(scheduleItem);
        });
    } else {
        const scheduleItem = document.createElement('li');
        scheduleItem.textContent = '해당 요일에 근무자 정보가 없습니다.';
        scheduleList.appendChild(scheduleItem);
    }
};


daysLi.forEach(li => {
    li.addEventListener("click", () => {
        const clickedDay = parseInt(li.innerText);
        updateDateInfo(clickedDay);
    });
});


// // 엑셀 파일 읽기

// const readXlsxFile = fetch('read-excel-file/node');
// const fs = fetch('fs');

// readXlsxFile("./아동센터_근무자.xlsx").then((rows) => {
//     let jsonData = [];
//     for (let i = 0; i < rows.length; i++) {
//         if(i != 0) {
//             const inputData = {
//                 key: rows[i][0],
//                 name: rows[i][1],
//                 school: rows[i][2],
//                 phone: rows[i][3],
//                 mon: rows[i][4],
//                 tue: rows[i][5],
//                 wed: rows[i][6],
//                 thu: rows[i][7],
//                 fri: rows[i][8],
//             };
//             jsonData.push(inputData);
//         }
//     }
//     const jsonDataToString = JSON.stringify(jsonData);
//     fs.writeFileSync("./dataToJSon.json", jsonDataToString);
// });
// console.log(rows);

// function findWorkersOnDay {

// }
// // Call updateDateInfo with today's date initially
// updateDateInfo(date.getDate());
// const employeeBtn = document.getElementById("employee_btn");
// const scheduleBtn = document.getElementById("schedule_btn");
// const scheduleList = document.getElementById("schedule_list");
// const scheduleText = document.getElementById("schedule_text");

// // 근무자 버튼 클릭 이벤트
// employeeBtn.addEventListener("click", () => {
//     scheduleText.innerText = "근무자";
    
// });
// scheduleBtn.addEventListener("click", () => {
//     scheduleText.innerText = "일정";
// });

// function navigateToNoticeBoard(noticeId) {
//     window.location.href = `notice_board.html?id=${noticeId}`;
// }

// // 날짜 클릭 이벤트에 추가
// daysLi.forEach(li => {
//     li.addEventListener("click", () => {
//         // ...
        
//         const employeeDayInfo = getEmployeeInfo(clickedDay);
//         const scheduleList = document.querySelector(".schedule-list");

//         updateScheduleList(scheduleList, employeeDayInfo);
//     });
// });
