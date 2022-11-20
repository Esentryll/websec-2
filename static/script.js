fetch('/rasp?groupId=531873998')
    .then((data) => data.json())
    .then((res) => {
        console.log(res);
        renderSchedule(res);
        currentWeek = parseInt(res.currentWeek);
        document.querySelector("#currentWeek").innerHTML = `${currentWeek} неделя`;
        if (currentWeek == 1) {
            document.querySelector("#previousButton").style.visibility = "hidden";
        } else {
            document.querySelector("#previousButton").style.visibility = "visible";
        }
    })

setTimeout(() => {
    fetch('/getGroups')
        .then((data) => data.json())
        .then((res) => {
            console.log('asdasdas');
            console.log(res);
            let selectElement = document.querySelector("#select");
            for (let group of res.groups) {
                let groupElement = document.createElement("option");
                groupElement.innerHTML = group.name;
                groupElement.setAttribute("value", group.link);
                selectElement.appendChild(groupElement);
            }
            selectElement.addEventListener("change", () => {
                updateSchedule(selectElement.value);
            })
        })
}, 2000);

let currentUrl = '/rasp?groupId=531873998';
let currentWeek;
let currentDay = new Date().getDay();
let styles = "";
let styleSheet = document.createElement("style");

function changeDayOnMobile(goNextDay = undefined) {
	if (currentDay === 6) {
        currentDay = 5;
    }
    styles = "";
    let isInitState = false;

    if (typeof goNextDay === "undefined") {
        isInitState = true;
    }
    if (!isInitState) {
        document.head.removeChild(styleSheet);
        if (goNextDay) {
            currentDay === 5 ? currentDay = 0 : currentDay++;
        } else {
            currentDay === 0 ? currentDay = 5 : currentDay--;
        }
    }

    for (let i = 0; i < 7; i++) {
        if (i === currentDay) continue;
        styles += `
            .column-${i} {
                display: none;
            }
            
        `
    }
    console.log(currentDay);
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

const isMobile = navigator.userAgentData.mobile;
window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};
if (window.mobileCheck()) {
    changeDayOnMobile();
    let btn = document.querySelector("#nextDay");
    btn.style.display = "block";
    btn = document.querySelector("#previousDay");
    btn.style.display = "block";
}

function updateSchedule(url) {
    currentUrl = url;
    fetch(url)
        .then((data) => data.json())
        .then((res) => {
            renderSchedule(res);
            console.log(res);
            currentWeek = parseInt(res.currentWeek);
            document.querySelector("#currentWeek").innerHTML = `${currentWeek} неделя`;
            if (currentWeek == 1) {
                document.querySelector("#previousButton").style.visibility = "hidden";
            } else {
                document.querySelector("#previousButton").style.visibility = "visible";
            }
        })
}

function renderSchedule(data) {
    let table = document.querySelector("#schedule");
    table.innerHTML = "";
    console.log(table);
    let headers = table.insertRow();
    headers.classList.add("first-row"); // класс верхней строчки
    headers.insertCell().appendChild(document.createTextNode("Время"));

    let ind = 0;
    for (let date of data.dates) {
        let cell = headers.insertCell();
        cell.appendChild(document.createTextNode(date));
        cell.classList.add(`column-${ind}`);
        ind++;
    }

    ind = 0;
    let days = data.daysOfSchedule;

    for (let time of data.times) {
        let row = table.insertRow();
        row.classList.add("one-row"); // класс <tr>
        row.insertCell().appendChild(document.createTextNode(time));

        for (let day of days) {
            if (ind > 5) {
                break;
            }
            if (day.subject !== null) {
                let infoToInsert = document.createElement("div");
                let correctTeacher = JSON.parse(day.teacher);
                infoToInsert.innerHTML = `${day.subject}<br>${day.place}<br>`;
                let teacherElement;
                if (correctTeacher.link !== null) {
                    teacherElement = document.createElement("a");
                    teacherElement.href = "#";
                    teacherElement.innerHTML = correctTeacher.name;
                    teacherElement.addEventListener('click', () => updateSchedule(correctTeacher.link));
                } else {
                    teacherElement = document.createElement("div");
                    teacherElement.innerHTML = correctTeacher.name;
                }
                infoToInsert.classList.add("text-style1"); // класс <div>'а внутри ячейки <td>
                infoToInsert.appendChild(teacherElement);
                infoToInsert.appendChild(document.createElement("br"));
                console.log(correctTeacher);
                for (let group of day.groups) {
                    let correctGroup = JSON.parse(group);
                    let aNode;
                    if (correctGroup.link !== null) {
                        aNode = document.createElement("a");
                        aNode.href = "#";
                        aNode.innerHTML = correctGroup.name;
                        aNode.addEventListener('click', () => updateSchedule(correctGroup.link));
                    } else {
                        aNode = document.createElement("div");
                        aNode.innerHTML = correctGroup.name;
                    }
                    infoToInsert.appendChild(aNode);
                    infoToInsert.appendChild(document.createElement("br"));
                }
                let cell = row.insertCell();
                cell.classList.add(`column-${ind}`);
                cell.appendChild(infoToInsert);
                cell.classList.add("one-cell"); // класс <td> в таблице
            } else {
                let cell = row.insertCell();
                cell.classList.add("one-cell"); // класс <td> в таблице
                cell.classList.add(`column-${ind}`);
            }
            ind++;
        }
        days = days.slice(ind);
        ind = 0;
    }
}

function changePage(goNextPage) {
    let ind = 0;
    while (currentUrl[ind] !== "&" && ind <= 100) ind++;
    if (currentUrl[ind] !== "&") {
        currentUrl += `&selectedWeek=${goNextPage ? currentWeek + 1 + "" : currentWeek - 1 + ""}`;
    } else {
        currentUrl = currentUrl.slice(0, currentUrl.length - (currentWeek > 9 ? 2 : 1));
        currentUrl += goNextPage ? currentWeek + 1 + "" : currentWeek - 1 + "";
    }
    console.log(currentWeek);
    console.log(currentUrl);
    updateSchedule(currentUrl);
}