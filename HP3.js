document.addEventListener('DOMContentLoaded', () => {
    console.log('자기소개 홈페이지가 로드되었습니다.');

    const calendarElement = $('#calendar');
    const correctPassword = '1111'; // 비밀번호 설정
    // 로컬 스토리지에서 일정 불러오기
    const events = JSON.parse(localStorage.getItem('events')) || [];

    calendarElement.fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        droppable: true, // 드래그 앤 드롭 허용
        events: events,
        dayClick: function(date) {
            const enteredPassword = prompt('일정을 추가하려면 비밀번호를 입력하세요(비밀번호:1111):');
            if (enteredPassword === correctPassword) {
                const eventTitle = prompt('일정을 입력하세요:');
                if (eventTitle) {
                    const event = {
                        id: new Date().getTime(),
                        title: eventTitle,
                        start: date,
                        allDay: true
                    };

                    calendarElement.fullCalendar('renderEvent', event);
                    events.push(event);
                    localStorage.setItem('events', JSON.stringify(events)); // 일정 저장
                    alert('일정이 추가되었습니다.');
                }
            } else {
                alert('비밀번호가 틀렸습니다. 일정을 추가할 수 없습니다.');
            }
        },
        eventClick: function(event) {
            const enteredPassword = prompt('일정을 삭제하려면 비밀번호를 입력하세요:');
            if (enteredPassword === correctPassword) {
                if (confirm('이 일정을 삭제하시겠습니까?(비밀번호:1111)')) {
                    calendarElement.fullCalendar('removeEvent', event.id);

                    // 로컬 스토리지에서 이벤트 삭제
                    const updatedEvents = events.filter(e => e.id !== event.id);
                    localStorage.setItem('events', JSON.stringify(updatedEvents));

                    // 달력에서 이벤트 삭제
                    calendarElement.fullCalendar('removeEvent', event._id);
                    alert('일정이 삭제되었습니다.');
                }
            } else {
                alert('비밀번호가 틀렸습니다. 일정을 삭제할 수 없습니다.');
            }
        }
    });

    // 캘린더 열고 닫기 토글 기능
    document.getElementById('toggle-btn').addEventListener('click', function() {
        const calendar = document.getElementById('calendar');
        if (calendar.style.display === 'none') { // 수정된 부분
            calendar.style.display = 'block'; // 닫혀 있으면 열기
            $('#calendar').fullCalendar('render'); // 캘린더 다시 렌더링
        } else {
            calendar.style.display = 'none';  // 열려 있으면 닫기
        }
    });

    // X 버튼을 클릭하면 캘린더를 닫음
    document.getElementById('close-btn').addEventListener('click', function() {
        document.getElementById('calendar').style.display = 'none';
    });

    // 새 페이지 버튼 클릭 시 새로운 페이지로 이동
    document.getElementById('new-page-btn').addEventListener('click', function() {
        window.location.href = 'index2.html'; // 새로운 페이지로 이동
    });

    // 새 고양이 페이지 버튼 클릭 시 새로운 페이지로 이동
    document.getElementById('new-cat-btn').addEventListener('click', function() {
        window.location.href = 'index3.html'; // 새로운 페이지로 이동
    });

    // 화면 크기 조정 함수 호출 (예시로 표준 해상도를 1920x1080으로 설정)
    const standardWidth = 1920;
    const standardHeight = 1080;
    const resizeHandler = getResizeEventListener(standardWidth, standardHeight);
    resizeHandler(); // 초기 화면 크기 조정

    // 창 크기 변경 시 크기 조정
    window.addEventListener('resize', resizeHandler);
});
