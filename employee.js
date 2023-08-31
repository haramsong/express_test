const XLSX = require('xlsx');
const workbook = XLSX.readFile('아동센터_근무자.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);



const dayOfWeek = ['월', '화', '수', '목', '금'];
const groupedWorkers = {};
dayOfWeek.forEach(day => {
    const workersOnDay = data.filter(worker => worker[day] !== 'X');
    
    if (workersOnDay.length > 0) {
        const workersOfDay = [];
        
        workersOnDay.forEach(worker => {
            workersOfDay.push(worker['이름'] + ' ' + worker[day]);
        });

        // 그룹화된 객체에 요일별 근무자 정보 추가
        groupedWorkers[day] = workersOfDay;

        // // 웹 페이지에도 표시
        // const scheduleItem = document.createElement('li');
        // scheduleItem.textContent = workersOfDay.join(', '); // 배열을 문자열로 변환하여 출력
        // scheduleList.appendChild(scheduleItem);
    }
});

console.log(groupedWorkers);





