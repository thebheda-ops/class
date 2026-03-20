// ===== Financial App JavaScript =====

// Transaction Data
const transactions = [
  {
    id: 1,
    name: "Grocery Store",
    category: "food",
    amount: -85.5,
    date: "Mar 18, 2026",
    icon: "fa-utensils",
  },
  {
    id: 2,
    name: "Salary Deposit",
    category: "income",
    amount: 4500.0,
    date: "Mar 15, 2026",
    icon: "fa-briefcase",
  },
  {
    id: 3,
    name: "Online Shopping",
    category: "shopping",
    amount: -125.99,
    date: "Mar 14, 2026",
    icon: "fa-shopping-bag",
  },
  {
    id: 4,
    name: "Uber Ride",
    category: "transport",
    amount: -24.5,
    date: "Mar 13, 2026",
    icon: "fa-car",
  },
  {
    id: 5,
    name: "Netflix Subscription",
    category: "shopping",
    amount: -15.99,
    date: "Mar 12, 2026",
    icon: "fa-play-circle",
  },
  {
    id: 6,
    name: "Coffee Shop",
    category: "food",
    amount: -6.5,
    date: "Mar 11, 2026",
    icon: "fa-coffee",
  },
  {
    id: 7,
    name: "Freelance Payment",
    category: "income",
    amount: 850.0,
    date: "Mar 10, 2026",
    icon: "fa-laptop",
  },
  {
    id: 8,
    name: "Gas Station",
    category: "transport",
    amount: -45.0,
    date: "Mar 9, 2026",
    icon: "fa-gas-pump",
  },
];

// All Transactions (for Transactions tab)
const allTransactions = [
  ...transactions,
  {
    id: 9,
    name: "Restaurant Dinner",
    category: "food",
    amount: -78.25,
    date: "Mar 8, 2026",
    icon: "fa-utensils",
  },
  {
    id: 10,
    name: "Amazon Purchase",
    category: "shopping",
    amount: -156.0,
    date: "Mar 7, 2026",
    icon: "fa-box",
  },
  {
    id: 11,
    name: "Electricity Bill",
    category: "shopping",
    amount: -125.0,
    date: "Mar 5, 2026",
    icon: "fa-bolt",
  },
  {
    id: 12,
    name: "Subway Fare",
    category: "transport",
    amount: -12.0,
    date: "Mar 4, 2026",
    icon: "fa-subway",
  },
  {
    id: 13,
    name: "Spotify Premium",
    category: "shopping",
    amount: -9.99,
    date: "Mar 3, 2026",
    icon: "fa-music",
  },
];

// DOM Elements
const loginScreen = document.getElementById("login-screen");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const navItems = document.querySelectorAll(".nav-item[data-tab]");
const tabContents = document.querySelectorAll(".tab-content");
const pageTitle = document.getElementById("page-title");
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");
const transferForm = document.getElementById("transfer-form");
const transferTabs = document.querySelectorAll(".transfer-tab");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

// ===== Login Functionality =====
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Simulate login
  loginScreen.classList.remove("active");
  dashboard.classList.add("active");
  showToast("Welcome back, John!");
  loadTransactions();
});

// ===== Logout Functionality =====
logoutBtn.addEventListener("click", () => {
  dashboard.classList.remove("active");
  loginScreen.classList.add("active");
  showToast("Logged out successfully");
});

// ===== Mobile Menu Toggle =====
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  }
});

// ===== Tab Navigation =====
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const tabId = item.getAttribute("data-tab");

    // Update active nav item
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");

    // Update active tab content
    tabContents.forEach((content) => content.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");

    // Update page title
    pageTitle.textContent = item.querySelector("span").textContent;

    // Close mobile sidebar
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("open");
    }
  });
});

// ===== Quick Actions =====
document.querySelectorAll(".action-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.getAttribute("data-action");

    switch (action) {
      case "send":
      case "topup":
        navigateToTab("transfer");
        break;
      case "request":
        navigateToTab("transfer");
        // Switch to request tab
        transferTabs.forEach((tab) => tab.classList.remove("active"));
        document
          .querySelector('[data-transfer="request"]')
          .classList.add("active");
        break;
      case "bills":
        navigateToTab("bills");
        break;
    }
  });
});

// Helper function to navigate to a tab
function navigateToTab(tabId) {
  navItems.forEach((nav) => {
    if (nav.getAttribute("data-tab") === tabId) {
      nav.click();
    }
  });
}

// ===== Transfer Form =====
transferForm.addEventListener("submit", (e) => {
  e.preventDefault();
  showToast("Transfer initiated successfully!");
  transferForm.reset();
});

// Transfer tab switching
transferTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    transferTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
  });
});

// ===== Bill Payment =====
document.querySelectorAll(".btn-pay").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = "Paying...";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = "Paid";
      btn.classList.add("paid");
      showToast("Bill paid successfully!");
    }, 1500);
  });
});

// ===== Load Transactions =====
function loadTransactions() {
  // Load recent transactions (first 5)
  const recentTransactions = transactions.slice(0, 5);
  const transactionsList = document.getElementById("transactions-list");
  transactionsList.innerHTML = recentTransactions
    .map((t) => createTransactionHTML(t))
    .join("");

  // Load all transactions
  const allTransactionsList = document.getElementById("all-transactions-list");
  allTransactionsList.innerHTML = allTransactions
    .map((t) => createTransactionHTML(t))
    .join("");
}

// Create transaction HTML
function createTransactionHTML(transaction) {
  const amountClass = transaction.amount >= 0 ? "positive" : "negative";
  const amountPrefix = transaction.amount >= 0 ? "+" : "";

  return `
        <div class="transaction-item">
            <div class="transaction-icon ${transaction.category}">
                <i class="fas ${transaction.icon}"></i>
            </div>
            <div class="transaction-details">
                <h4>${transaction.name}</h4>
                <span>${transaction.date}</span>
            </div>
            <div class="transaction-amount">
                <span class="amount ${amountClass}">${amountPrefix}$${Math.abs(transaction.amount).toFixed(2)}</span>
            </div>
        </div>
    `;
}

// ===== Toast Notification =====
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ===== Period Select (Spending Chart) =====
document.querySelector(".period-select").addEventListener("change", (e) => {
  showToast(`Showing data for ${e.target.value}`);
});

// ===== Filter Select =====
document.querySelectorAll(".filter-select").forEach((select) => {
  select.addEventListener("change", () => {
    showToast("Filter applied");
  });
});

// ===== Add New Account =====
document
  .querySelector(".account-card.add-new")
  .addEventListener("click", () => {
    showToast("Add new account feature coming soon!");
  });

// ===== Notification Bell =====
document.querySelector(".notification-bell").addEventListener("click", () => {
  showToast("You have 3 new notifications");
});

// ===== User Profile =====
document.querySelector(".user-profile").addEventListener("click", () => {
  showToast("Profile settings coming soon!");
});

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
  // Pre-load transactions when page loads
  loadTransactions();
});
