# 🛒 E-Commerce Shopping App

A full-stack e-commerce application built with React.js frontend and Node.js/Express backend, featuring secure user authentication, product management, shopping cart functionality, and integrated Razorpay payment gateway.

## 🚀 Features

### Frontend (React.js)
- **Responsive Design**: Modern, mobile-first UI with Tailwind CSS
- **User Authentication**: Secure login/signup with JWT tokens
- **Product Catalog**: Browse and search products with pagination
- **Shopping Cart**: Add/remove items with real-time updates
- **Payment Integration**: Razorpay demo payment gateway
- **User Dashboard**: View profile and order history
- **Toast Notifications**: User-friendly feedback messages

### Backend (Node.js/Express)
- **RESTful API**: Well-structured API endpoints
- **Authentication**: JWT-based secure authentication
- **Database**: MongoDB with Mongoose ODM
- **Email Service**: OTP verification system
- **Cart Management**: Add/remove items from cart
- **Order Processing**: Complete order lifecycle management
- **Data Validation**: Input validation and sanitization

## 🛠️ Tech Stack

### Frontend
- **React.js** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **Razorpay** - Payment gateway integration

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Nodemailer** - Email service
- **Bcrypt** - Password hashing

## 📁 Project Structure

```
MERN/
├── BACKEND/                    # Node.js/Express Backend
│   ├── api/
│   │   └── v1/
│   │       ├── auth/          # Authentication routes
│   │       ├── carts/         # Cart management
│   │       ├── orders/        # Order processing
│   │       ├── products/      # Product management
│   │       └── users/         # User management
│   ├── config/
│   │   └── db.js             # Database configuration
│   ├── models/               # Mongoose schemas
│   ├── utils/                # Utility functions
│   └── app.js               # Main server file
│
├── FRONTEND SETUP/           # React.js Frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React Context
│   │   ├── utils/           # Utility functions
│   │   └── config.js        # Configuration
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shopping-app.git
   cd shopping-app
   ```

2. **Backend Setup**
   ```bash
   cd BACKEND
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../FRONTEND SETUP
   npm install
   ```

4. **Environment Variables**
   
   Create `.env` file in BACKEND directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/shopping-app
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

5. **Start the application**
   
   Backend (Terminal 1):
   ```bash
   cd BACKEND
   npm start
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd "FRONTEND SETUP"
   npm run dev
   ```

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/logout` - User logout

### Products
- `GET /api/v1/products/` - Get all products
- `GET /api/v1/products/:id` - Get product by ID
- `POST /api/v1/products/` - Create product (Admin)
- `PUT /api/v1/products/:id` - Update product (Admin)

### Cart
- `GET /api/v1/cart/` - Get user cart
- `POST /api/v1/cart/:productId` - Add to cart
- `DELETE /api/v1/cart/:productId` - Remove from cart

### Orders
- `POST /api/v1/orders/` - Place order
- `GET /api/v1/orders/` - Get user orders

## 💳 Payment Integration

The app integrates with **Razorpay** for secure payment processing:

- **Demo Mode**: Uses Razorpay test environment
- **Test Cards**: Use `4111 1111 1111 1111` for testing
- **Real-time Processing**: Instant payment confirmation
- **Error Handling**: Comprehensive payment failure handling

## 🎨 Key Features

### User Experience
- **Responsive Design**: Works on all device sizes
- **Fast Loading**: Optimized with Vite build tool
- **Intuitive Navigation**: Easy-to-use interface
- **Real-time Updates**: Live cart and order updates

### Security
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: Bcrypt encryption
- **Input Validation**: Server-side validation
- **CORS Protection**: Cross-origin request security

### Performance
- **Database Indexing**: Optimized queries
- **Image Optimization**: Compressed product images
- **Code Splitting**: Lazy loading components
- **Caching**: Efficient data caching

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Backend (Railway/Heroku)
1. Create new project on Railway/Heroku
2. Connect GitHub repository
3. Set environment variables
4. Deploy automatically

## 📱 Screenshots

### Homepage
- Clean, modern design with product grid
- Search and filter functionality
- Responsive navigation

### Product View
- Detailed product information
- Add to cart functionality
- Image gallery

### Shopping Cart
- Real-time cart updates
- Quantity management
- Total calculation

### Checkout
- Address input
- Payment integration
- Order confirmation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Tailwind CSS for the utility-first CSS framework
- Razorpay for payment gateway integration
- MongoDB for the flexible database solution

---

⭐ **Star this repository if you found it helpful!**
