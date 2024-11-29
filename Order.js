document.querySelectorAll('.sidebar-menu li a').forEach(item => {
    item.addEventListener('click', event => {
      document.querySelectorAll('.sidebar-menu li a').forEach(link => link.classList.remove('active'));
      event.currentTarget.classList.add('active');
    });
  });

  // ฟังก์ชันเปิด Popup พร้อม Animation
// เปิด Popup
function openPopup() {
  const popupOverlay = document.getElementById('popup');
  const popupContent = popupOverlay.querySelector('.popup-content');

  popupOverlay.style.display = 'flex'; // แสดง Popup
  setTimeout(() => {
    popupOverlay.classList.add('show'); // เพิ่มคลาสสำหรับ Animation
    popupContent.classList.add('show'); // เพิ่ม Animation ของ Popup Content
  }, 10); // หน่วงเวลาสั้นๆ เพื่อให้ Transition ทำงาน
}

// ปิด Popup
function closePopup() {
  const popupOverlay = document.getElementById('popup');
  popupOverlay.classList.remove('show');
  setTimeout(() => popupOverlay.style.display = 'none', 300);
}

// เพิ่มข้อมูลไปยังตาราง
function addOrder() {
  // รับค่าจากฟอร์ม
  const orderId = document.getElementById('order-id').value;
  const customerName = document.getElementById('customer-name').value;
  const totalAmount = document.getElementById('total-amount').value;
  const orderDate = document.getElementById('order-date').value;
  const deliveryStatus = document.getElementById('delivery-status').value;

  // สร้างแถวใหม่
  const table = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${orderId}</td>
    <td>${customerName}</td>
    <td>${totalAmount}</td>
    <td>${orderDate}</td>
    <td>${deliveryStatus}</td>
  `;

  // รีเซ็ตฟอร์มและปิด Popup
  document.getElementById('orderForm').reset();
  closePopup();
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
