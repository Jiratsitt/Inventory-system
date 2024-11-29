// ฟังก์ชันเปิด Popup พร้อม Animation
function openPopup() {
  const popupOverlay = document.getElementById('popup');
  const popupContent = popupOverlay.querySelector('.popup-content');
  popupOverlay.style.display = 'flex'; // แสดง Popup
  setTimeout(() => {
    popupOverlay.classList.add('show'); // เพิ่มคลาสสำหรับ Animation
    popupContent.classList.add('show'); // เพิ่ม Animation ของ Popup Content
  }, 10);
}

// ฟังก์ชันปิด Popup พร้อม Animation
function closePopup() {
  const popupOverlay = document.getElementById('popup');
  const popupContent = popupOverlay.querySelector('.popup-content');
  popupOverlay.classList.remove('show'); // ลบคลาสสำหรับ Animation
  popupContent.classList.remove('show');

  // ซ่อน Popup หลัง Animation เสร็จ
  setTimeout(() => {
    popupOverlay.style.display = 'none';
  }, 300); // ตรงกับระยะเวลา Transition (0.3s)
}

// ฟังก์ชันบันทึกข้อมูล (ใช้ทั้งสำหรับการเพิ่มและแก้ไข)
function saveShipment(isEdit = false, row = null) {
  const saleOrder = document.getElementById('product-id').value;
  const status = document.getElementById('product-status').value;
  const createDate = document.getElementById('product-qty').value;
  const product = document.getElementById('product-name').value;
  const shipmentType = document.getElementById('product-shipment').value;

  if (isEdit && row) {
    // แก้ไขแถวที่มีอยู่
    row.cells[0].textContent = saleOrder;
    row.cells[1].textContent = status;
    row.cells[2].textContent = createDate;
    row.cells[3].textContent = product;
    row.cells[4].textContent = shipmentType;
  } else {
    // เพิ่มแถวใหม่
    const tableBody = document.getElementById('shipment-table-body');
    const newRow = tableBody.insertRow();

    newRow.innerHTML = `
      <td>${saleOrder}</td>
      <td>${status}</td>
      <td>${createDate}</td>
      <td>${product}</td>
      <td>${shipmentType}</td>
      <td>
          <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
          <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
      </td>
    `;
  }

  // ปิด Popup หลังจากบันทึกข้อมูล
  closePopup();
}

// การจัดการเมื่อคลิกปุ่มแก้ไข
document.querySelector('.listings-table').addEventListener('click', function (e) {
  // การจัดการเมื่อคลิกปุ่มแก้ไข
  if (e.target.closest('.edit-btn')) {
    const row = e.target.closest('tr');
    const saleOrder = row.cells[0].textContent;
    const status = row.cells[1].textContent;
    const createDate = row.cells[2].textContent;
    const product = row.cells[3].textContent;
    const shipmentType = row.cells[4].textContent;

    // กำหนดข้อมูลใน Popup
    document.getElementById('product-id').value = saleOrder;
    document.getElementById('product-status').value = status;
    document.getElementById('product-qty').value = createDate;
    document.getElementById('product-name').value = product;
    document.getElementById('product-shipment').value = shipmentType;

    // แสดง Popup พร้อมข้อมูลที่จะแก้ไข
    openPopup();

    // เพิ่มตัวแปรสำหรับแก้ไข
    const submitButton = document.querySelector('.btn-submit');
    submitButton.onclick = function() {
      saveShipment(true, row); // บันทึกการแก้ไข
    };
  }

  // การจัดการเมื่อคลิกปุ่มลบ
  if (e.target.closest('.delete-btn')) {
    const row = e.target.closest('tr');
    row.remove(); // ลบแถว
  }
});

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