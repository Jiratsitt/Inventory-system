document.querySelectorAll('.sidebar-menu li a').forEach(item => {
  item.addEventListener('click', event => {
    document.querySelectorAll('.sidebar-menu li a').forEach(link => link.classList.remove('active'));
    event.currentTarget.classList.add('active');
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

// ฟังก์ชันแสดงตัวอย่างภาพ
document.getElementById('product-image').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const imagePreview = document.createElement('img');
    imagePreview.src = e.target.result;
    imagePreview.alt = 'Product Image';
    imagePreview.style.maxWidth = '200px';

    const imageContainer = document.querySelector('.popup-content');
    const oldImage = imageContainer.querySelector('img');
    if (oldImage) {
      oldImage.remove();
    }
    imageContainer.appendChild(imagePreview);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

// เมื่อคลิกปุ่ม "Save" เพื่อบันทึกข้อมูลและเพิ่มแถวใหม่ในตาราง
document.querySelector('.btn-submit').addEventListener('click', function (e) {
  e.preventDefault(); // ป้องกันการโหลดเพจใหม่

  // ดึงข้อมูลจากฟอร์ม
  const productId = document.getElementById('product-id').value;
  const productName = document.getElementById('product-name').value;
  const productQty = document.getElementById('product-qty').value;

  // ค้นหาภาพที่อัปโหลด
  const image = document.querySelector('.popup-content img');
  const imageUrl = image ? image.src : 'https://via.placeholder.com/50'; // ถ้าไม่มีรูป จะใช้ placeholder

  const tableBody = document.querySelector('.listings-table tbody');

  // หากกำลังแก้ไขข้อมูลให้หาบรรทัดที่เลือกและอัปเดต
  const selectedRow = document.querySelector('.editing'); // หาผู้ใช้ที่ถูกเลือกเพื่อแก้ไข
  if (selectedRow) {
    // แก้ไขข้อมูลในแถวที่เลือก
    selectedRow.cells[0].innerText = productId;
    selectedRow.cells[1].querySelector('img').src = imageUrl;
    selectedRow.cells[2].innerText = productName;
    selectedRow.cells[3].innerText = productQty;

    // ลบคลาส 'editing' หลังจากที่แก้ไขเสร็จ
    selectedRow.classList.remove('editing');
  } else {
    // เพิ่มแถวใหม่หากไม่มีการแก้ไข
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${productId}</td>
      <td><img src="${imageUrl}" alt="Product"></td>
      <td>${productName}</td>
      <td>${productQty}</td>
      <td>-</td>
      <td>
        <button class="action-btn edit-btn"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete-btn"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tableBody.appendChild(newRow);
  }

  closePopup(); // ปิด Popup หลังจากการเพิ่ม/แก้ไข
});

// การจัดการปุ่ม Edit และ Delete ในแต่ละแถว
document.querySelector('.listings-table').addEventListener('click', function (e) {
  // การจัดการเมื่อคลิกปุ่มแก้ไข
  if (e.target.closest('.edit-btn')) {
    const row = e.target.closest('tr');
    const productId = row.cells[0].innerText;
    const productName = row.cells[2].innerText;
    const productQty = row.cells[3].innerText;
    const productImage = row.cells[1].querySelector('img').src;

    // กำหนดข้อมูลใน Popup
    document.getElementById('product-id').value = productId;
    document.getElementById('product-name').value = productName;
    document.getElementById('product-qty').value = productQty;

    // แสดงตัวอย่างภาพใน Popup
    const imagePreview = document.createElement('img');
    imagePreview.src = productImage;
    imagePreview.alt = 'Product Image';
    imagePreview.style.maxWidth = '200px';

    const imageContainer = document.querySelector('.popup-content');
    const oldImage = imageContainer.querySelector('img');
    if (oldImage) {
      oldImage.remove();
    }
    imageContainer.appendChild(imagePreview);

    // เพิ่มคลาส 'editing' ให้กับแถวที่ถูกเลือกเพื่อระบุว่าเรากำลังแก้ไขแถวนี้
    row.classList.add('editing');

    openPopup(); // เปิด Popup เพื่อแก้ไขข้อมูล
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
