// ==================== COMMON TYPES ====================
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
  code?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface AuthToken {
  token: string
  refreshToken?: string
  expiresIn?: number
}

// ==================== AUTH TYPES ====================
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  role: "user" | "admin" | "manager"
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
  phone?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SocialLoginRequest {
  provider: "google" | "facebook"
  token: string
  email?: string
  name?: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

// ==================== USER TYPES ====================
export interface UserProfile extends User {
  bio?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  loyaltyPoints?: number
  tier?: "bronze" | "silver" | "gold"
}

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  product?: Product
  createdAt: string
}

export interface CompareItem {
  id: string
  userId: string
  productId: string
  product?: Product
  createdAt: string
}

// ==================== CATEGORY TYPES ====================
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  icon?: string
  featured?: boolean
  parentId?: string
  order?: number
  createdAt: string
  updatedAt: string
}

export interface CategoryWithProducts extends Category {
  products: Product[]
  productCount: number
}

// ==================== BRAND TYPES ====================
export interface Brand {
  id: string
  name: string
  slug: string
  logo?: string
  description?: string
  website?: string
  featured?: boolean
  order?: number
  createdAt: string
  updatedAt: string
}

export interface BrandWithProducts extends Brand {
  products: Product[]
  productCount: number
}

// ==================== PRODUCT TYPES ====================
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  price: number
  originalPrice?: number
  discount?: number
  category: Category | string
  brand: Brand | string
  image: string
  images?: string[]
  stock: number
  rating: number
  reviewCount: number
  featured?: boolean
  new?: boolean
  hot?: boolean
  sku?: string
  specifications?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface ProductFilters {
  categoryId?: string
  brandId?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  inStock?: boolean
  search?: string
  sortBy?: "newest" | "popular" | "price-low" | "price-high" | "rating"
  page?: number
  limit?: number
}

// ==================== ORDER TYPES ====================
export interface OrderItem {
  productId: string
  product?: Product
  quantity: number
  price: number
  subtotal: number
  variants?: Record<string, string>
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount?: number
  total: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "returned"
  paymentStatus: "pending" | "completed" | "failed"
  paymentMethod: "card" | "bkash" | "nagad" | "bank" | "cod"
  shippingAddress: Address
  billingAddress?: Address
  notes?: string
  trackingNumber?: string
  createdAt: string
  updatedAt: string
}

export interface CreateOrderRequest {
  items: OrderItem[]
  shippingAddressId: string
  billingAddressId?: string
  paymentMethod: string
  couponCode?: string
  notes?: string
}

export interface OrderStatus {
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "returned"
  notes?: string
}

export interface EMICalculation {
  amount: number
  months: number
  interestRate: number
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
}

export interface EMICalculationRequest {
  amount: number
  months: number
}

// ==================== ADDRESS TYPES ====================
export interface Address {
  id?: string
  userId?: string
  type?: "shipping" | "billing"
  fullName: string
  phone: string
  email?: string
  street: string
  city: string
  state: string
  zipCode: string
  country?: string
  isDefault?: boolean
  createdAt?: string
  updatedAt?: string
}

// ==================== WARRANTY TYPES ====================
export interface Warranty {
  id: string
  userId: string
  productId: string
  imei: string
  type: "standard" | "care-plus"
  status: "active" | "expired" | "claimed"
  activatedAt: string
  expiresAt: string
  createdAt: string
}

export interface WarrantyActivationRequest {
  productId: string
  imei: string
  type: "standard" | "care-plus"
}

export interface WarrantyLog {
  id: string
  warrantyId: string
  action: string
  notes?: string
  createdAt: string
}

// ==================== GIVEAWAY TYPES ====================
export interface GiveawayEntry {
  id: string
  userId: string
  email: string
  name: string
  phone?: string
  createdAt: string
}

export interface GiveawayEntryRequest {
  email: string
  name: string
  phone?: string
}

// ==================== POLICY TYPES ====================
export interface Policy {
  id: string
  slug: string
  title: string
  content: string
  type: "privacy" | "terms" | "shipping" | "return" | "faq"
  published: boolean
  createdAt: string
  updatedAt: string
}

// ==================== FAQ TYPES ====================
export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order?: number
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface FAQRequest {
  question: string
  answer: string
  category?: string
}

// ==================== REVIEW TYPES ====================
export interface Review {
  id: string
  productId: string
  userId: string
  user?: User
  rating: number
  title: string
  comment: string
  helpful: number
  unhelpful: number
  verified: boolean
  createdAt: string
  updatedAt: string
}

export interface ReviewRequest {
  productId: string
  rating: number
  title: string
  comment: string
}

// ==================== LOYALTY TYPES ====================
export interface LoyaltyPoints {
  userId: string
  balance: number
  tier: "bronze" | "silver" | "gold"
  redeemableAmount: number
  history?: LoyaltyTransaction[]
}

export interface LoyaltyTransaction {
  id: string
  userId: string
  type: "earn" | "redeem"
  points: number
  reason: string
  createdAt: string
}

export interface RedeemRequest {
  points: number
}

// ==================== SEO TYPES ====================
export interface SEOMetadata {
  id: string
  title: string
  description: string
  keywords: string[]
  image?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterCard?: string
}

export interface SitemapEntry {
  loc: string
  lastmod: string
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority: number
}

// ==================== MARKETING TYPES ====================
export interface MarketingEmailRequest {
  to: string
  subject: string
  template: string
  variables?: Record<string, unknown>
}

// ==================== ADMIN TYPES ====================
export interface DashboardStats {
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  newOrdersToday: number
  averageOrderValue: number
  conversionRate: number
  topProducts: Product[]
  recentOrders: Order[]
}

export interface Analytics {
  period: "day" | "week" | "month" | "year"
  data: {
    date: string
    orders: number
    revenue: number
    users: number
  }[]
}

export interface StockAlert {
  id: string
  productId: string
  product?: Product
  currentStock: number
  minStock: number
  threshold: "critical" | "low" | "warning"
  createdAt: string
}

// ==================== ERROR TYPES ====================
export interface ApiError {
  code: string
  message: string
  details?: unknown
}
