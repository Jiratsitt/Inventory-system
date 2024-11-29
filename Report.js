// JavaScript เพื่อจัดการ active menu
document.querySelectorAll('.sidebar-menu li a').forEach(item => {
  item.addEventListener('click', event => {
    document.querySelectorAll('.sidebar-menu li a').forEach(link => link.classList.remove('active'));
    event.currentTarget.classList.add('active');
  });
});

document.querySelectorAll('.sidebar-menu li a').forEach(item => {
  item.addEventListener('click', event => {
    document.querySelectorAll('.sidebar-menu li a').forEach(link => {
      link.classList.remove('active');
      link.setAttribute('aria-current', 'false');
    });
    event.currentTarget.classList.add('active');
    event.currentTarget.setAttribute('aria-current', 'page');
  });
});

// ฟังก์ชันเปิด Popup พร้อม Animation
function openPopup() {
const popupOverlay = document.getElementById('popup');
const popupContent = popupOverlay.querySelector('.popup-content');

popupOverlay.style.display = 'flex'; // แสดง Popup
setTimeout(() => {
  popupOverlay.classList.add('show'); // เพิ่มคลาสสำหรับ Animation
  popupContent.classList.add('show'); // เพิ่ม Animation ของ Popup Content
}, 10); // หน่วงเวลาสั้นๆ เพื่อให้ Transition ทำงาน
}



function toggleDropdown() {
const dropdown = document.getElementById("user-dropdown");
dropdown.classList.toggle("show");
}

// คลิกนอก dropdown เพื่อปิด
document.addEventListener("click", function (event) {
const dropdown = document.getElementById("user-dropdown");
const userInfo = document.querySelector(".user-info");

if (!userInfo.contains(event.target)) {
  dropdown.classList.remove("show");
}
});

function logout(){
localStorage.removeItem("jwt");
window.location.href = "./index.html";
}