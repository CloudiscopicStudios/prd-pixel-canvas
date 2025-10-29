// Mock data for PantryPilot application

export const mockUser = {
  id: "1",
  name: "Sarah Martinez",
  email: "sarah@thegourmetkitchen.com",
  role: "Manager",
  restaurant: "The Gourmet Kitchen",
  avatar: "SM",
};

export const mockMetrics = {
  foodCostPercent: { current: 28.5, previous: 31.2, change: -2.7 },
  wasteAmount: { current: 1245, previous: 1890, change: -645 },
  inventoryValue: { current: 12847, previous: 11956, change: 891 },
  pendingOrders: 3,
};

export const mockPendingOrders = [
  {
    id: "1234",
    supplier: "Sysco Foods",
    total: 847.32,
    itemCount: 12,
    status: "Pending Approval",
    createdAt: "Oct 29, 9:00 AM",
    expectedDelivery: "Oct 30, 2025",
  },
  {
    id: "1235",
    supplier: "Restaurant Depot",
    total: 654.89,
    itemCount: 8,
    status: "Pending Approval",
    createdAt: "Oct 29, 9:15 AM",
    expectedDelivery: "Oct 31, 2025",
  },
  {
    id: "1236",
    supplier: "Fresh Farms Co.",
    total: 423.56,
    itemCount: 15,
    status: "Pending Approval",
    createdAt: "Oct 29, 9:30 AM",
    expectedDelivery: "Oct 30, 2025",
  },
];

export const mockOrders = [
  {
    id: "1234",
    supplier: "Sysco Foods",
    status: "Pending Approval",
    total: 847.32,
    itemCount: 12,
    createdAt: "Oct 29, 2025 9:00 AM",
    orderDate: "Oct 30, 2025",
    expectedDelivery: "Oct 31, 2025",
    createdBy: "AI Agent",
    items: [
      { name: "Chicken Breast", qty: 30, unit: "lbs", pricePerUnit: 4.5, total: 135 },
      { name: "Romaine Lettuce", qty: 10, unit: "cases", pricePerUnit: 18.5, total: 185 },
      { name: "Tomatoes (Roma)", qty: 15, unit: "lbs", pricePerUnit: 3.2, total: 48 },
      { name: "Mozzarella", qty: 20, unit: "lbs", pricePerUnit: 6.75, total: 135 },
      { name: "Olive Oil", qty: 5, unit: "gallons", pricePerUnit: 28, total: 140 },
    ],
    notes: ["Chicken increased 25% due to weekend forecast", "Lettuce reduced 10% - current inventory sufficient"],
  },
  {
    id: "1233",
    supplier: "Restaurant Depot",
    status: "Delivered",
    total: 1234.56,
    itemCount: 18,
    createdAt: "Oct 28, 2025 9:00 AM",
    orderDate: "Oct 28, 2025",
    expectedDelivery: "Oct 29, 2025",
    deliveredAt: "Oct 29, 2025",
    createdBy: "AI Agent",
  },
  {
    id: "1232",
    supplier: "Fresh Farms Co.",
    status: "Sent",
    total: 567.89,
    itemCount: 22,
    createdAt: "Oct 27, 2025 9:00 AM",
    orderDate: "Oct 28, 2025",
    expectedDelivery: "Oct 29, 2025",
    createdBy: "Sarah Martinez",
  },
];

export const mockInventoryItems = [
  { name: "Chicken Breast", current: 15.5, unit: "lbs", min: 20, status: "low", stockoutDate: "Oct 31" },
  { name: "Romaine Lettuce", current: 8, unit: "heads", min: 10, status: "low", stockoutDate: "Oct 30" },
  { name: "Tomatoes", current: 25.3, unit: "lbs", min: 15, status: "good", stockoutDate: "Nov 2" },
  { name: "Mozzarella", current: 18, unit: "lbs", min: 12, status: "good", stockoutDate: "Nov 4" },
  { name: "Ground Beef", current: 22, unit: "lbs", min: 15, status: "good", stockoutDate: "Nov 3" },
  { name: "Pasta (Penne)", current: 45, unit: "lbs", min: 30, status: "good", stockoutDate: "Nov 10" },
  { name: "Olive Oil", current: 8, unit: "gallons", min: 5, status: "good", stockoutDate: "Nov 8" },
  { name: "Parmesan", current: 6, unit: "lbs", min: 8, status: "low", stockoutDate: "Oct 30" },
];

export const mockSuppliers = [
  {
    id: "1",
    name: "Sysco Foods",
    contact: "John Smith",
    email: "john@sysco.com",
    phone: "(555) 123-4567",
    preferred: true,
    lastOrder: "Oct 28",
    ytdSpend: 45234,
    onTimeRate: 96,
    avgDeliveryDays: 1.2,
  },
  {
    id: "2",
    name: "Restaurant Depot",
    contact: "Self-Service",
    email: "depot@email.com",
    phone: "(555) 987-6543",
    preferred: false,
    lastOrder: "Oct 27",
    ytdSpend: 28190,
    onTimeRate: 100,
    avgDeliveryDays: 0,
    notes: "Pick-up only",
  },
  {
    id: "3",
    name: "Fresh Farms Co.",
    contact: "Maria Garcia",
    email: "maria@freshfarms.com",
    phone: "(555) 234-5678",
    preferred: true,
    lastOrder: "Oct 26",
    ytdSpend: 32450,
    onTimeRate: 94,
    avgDeliveryDays: 1.5,
  },
];

export const mockPosData = {
  status: "connected",
  provider: "Toast",
  lastSync: "2 minutes ago",
  nextSync: "In 28 minutes",
  menuItemsCount: 87,
  categoriesCount: 12,
};

export const mockMenuItems = [
  { id: "1", name: "Grilled Chicken", category: "Entrees", price: 18.99, mapped: "Chicken Breast", unit: "oz" },
  { id: "2", name: "Caesar Salad", category: "Salads", price: 12.99, mapped: "Romaine Lettuce", unit: "heads" },
  { id: "3", name: "Margherita Pizza", category: "Pizza", price: 16.99, mapped: "Mozzarella", unit: "lbs" },
  { id: "4", name: "Craft Beer IPA", category: "Beverages", price: 7.99, mapped: null, unit: null },
  { id: "5", name: "Spaghetti Carbonara", category: "Pasta", price: 15.99, mapped: "Pasta (Penne)", unit: "lbs" },
];

export const mockSalesData = [
  { date: "Oct 1", sales: 2845, waste: 145 },
  { date: "Oct 5", sales: 3120, waste: 178 },
  { date: "Oct 10", sales: 2950, waste: 132 },
  { date: "Oct 15", sales: 3380, waste: 195 },
  { date: "Oct 20", sales: 3200, waste: 156 },
  { date: "Oct 25", sales: 3450, waste: 142 },
  { date: "Oct 29", sales: 3580, waste: 128 },
];

export const mockActivity = [
  { id: "1", type: "order", text: "Order #1234 placed to Sysco Foods", time: "10 minutes ago", icon: "package" },
  { id: "2", type: "sync", text: "POS sync completed successfully", time: "2 hours ago", icon: "refresh" },
  { id: "3", type: "waste", text: "Waste logged: 2.5 lbs Chicken Breast", time: "3 hours ago", icon: "alert" },
  { id: "4", type: "approval", text: "Sarah Martinez approved Order #1233", time: "5 hours ago", icon: "check" },
  { id: "5", type: "order", text: "Order #1233 delivered by Restaurant Depot", time: "Yesterday", icon: "package" },
];

export const mockWasteData = [
  { item: "Chicken Breast", amount: 12.5, cost: 56.25, reason: "Spoilage", date: "Oct 28" },
  { item: "Romaine Lettuce", amount: 8, cost: 35.2, reason: "Prep Error", date: "Oct 27" },
  { item: "Ground Beef", amount: 6, cost: 42, reason: "Over-ordering", date: "Oct 26" },
  { item: "Tomatoes", amount: 4.5, cost: 14.4, reason: "Spoilage", date: "Oct 25" },
];
