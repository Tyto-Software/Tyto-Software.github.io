// Auth check
firebase.auth().onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html"; // redirect if not signed in
  }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    window.location.href = "index.html";
  });
});

// Canvas setup
const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clearBtn");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const downloadBtn = document.getElementById("downloadBtn");

let painting = false;

function startPaint(e) {
  painting = true;
  draw(e);
}

function endPaint() {
  painting = false;
  ctx.beginPath();
}

function draw(e) {
  if (!painting) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = brushSize.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = colorPicker.value;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("mouseup", endPaint);
canvas.addEventListener("mouseout", endPaint);
canvas.addEventListener("mousemove", draw);

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

downloadBtn.addEventListener("click", () => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement('a');
  link.href = image;
  link.download = `tytochan_drawing_${Date.now()}.png`;
  link.click();
});
