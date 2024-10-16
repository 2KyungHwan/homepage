document.addEventListener('DOMContentLoaded', () => {
    console.log('자기소개 홈페이지가 로드되었습니다.');

    const calendarElement = $('#calendar');

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
            }
        },
        eventClick: function(event) {
            if (confirm('일정을 삭제하시겠습니까?')) {
                calendarElement.fullCalendar('removeEvent', event.id);

                // 로컬 스토리지에서 이벤트 삭제
                const updatedEvents = events.filter(e => e.id !== event.id);
                localStorage.setItem('events', JSON.stringify(updatedEvents));
                
                // 달력에서 이벤트 삭제
                calendarElement.fullCalendar('removeEvent', event._id); 
                calendarElement.fullCalendar('refetchEvents'); 
            }
        }
    });
});
