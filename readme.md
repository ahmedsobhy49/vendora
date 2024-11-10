This project is a sophisticated e-commerce platform with an advanced multi-role dashboard system designed to streamline operations for both admin and seller roles. The application enables admins to oversee platform-wide functions such as user and product management, order tracking, and statistics analysis, while sellers can manage their product offerings and monitor their sales. Leveraging cutting-edge technology, the platform includes a highly customizable multi-step product form, integrated analytics, and order processing capabilities, ensuring seamless functionality tailored to each role.

I am currently in the process of refining features and integrating additional capabilities. 

This project has been a unique learning experience, marking my first venture into Node.js and backend development, where I am applying new concepts while evolving this platform's functionality.

Admin Dashboard Features

1-Authentication and User Management

Authentication:
Secure login for admins to access the dashboard.

Seller Management: 
Admins can view, approve, or reject new seller applications, manage seller profiles, and monitor account status.

Status Management: Admins can change seller statuses (e.g., active, inactive, suspended) based on performance or compliance.

2-Order Management

Order Overview:
Admins have comprehensive visibility over orders across the platform, with access to details like order ID, customer information, items purchased, and payment status.

Order Classification: 
Recent orders are classified based on order date, allowing admins to prioritize handling the latest requests. Orders are also organized by their current status, such as pending, shipped, or completed, to streamline order management workflows.

Multi-Seller Orders: 
For orders that contain products from multiple sellers, the system automatically splits these orders so that each seller only sees their own products and associated order details. However, the admin retains access to the entire order, with a holistic view of all items, sellers involved, and the overall payment and shipping details.

Order Statistics:
The dashboard provides monthly and yearly statistics, offering admins valuable insights into total sales, revenue, and order volume trends over time. These insights help the admin monitor platform growth and identify high-demand periods.

3-Category and Brand Management

Category Creation:
Admins can create and manage product categories and subcategories, enabling better product organization.

Brand Management:
Admins can add top brands and link them to specific categories, giving sellers a curated set of brand options to select from.

Multi-level Taxonomy:
Hierarchical structure for categories (main categories, subcategories, etc.) helps ensure clarity in product classification.

4-Statistics and Reporting
Seller Statistics:
Detailed analytics for each seller, including product performance, total orders, and monthly sales, help track seller activity and engagement.

Charts and Visualizations:
Leveraging ApexCharts, admins can visualize data trends in sales, orders, and seller growth through interactive charts.

Order and Revenue Analysis:
Provides insights into seasonal demand and revenue peaks, helping to inform promotional strategies and inventory management.
-----------------------------------------------------------------
Seller Dashboard Features

Access to Curated Categories and Brands
Category Selection: 
Sellers can browse categories created by the admin to determine where their products fit best.
Brand Access:
Sellers have access to the top brands approved by the admin, ensuring brand consistency and adherence to platform standards.

Product Management and Multi-step Product Form
Category-Based Product Addition: Dynamic Multi-step Form
Sellers use a tailored, multi-step form to add products, which dynamically adjusts based on category-specific fields. For example:
Mobile Category: Fields for storage, RAM, and color.
Fashion Category: Options for size, material, and color.
Product Details and Images: Sellers can add multiple images, detailed descriptions, pricing, and inventory information.
SKU and Inventory Management: SKU generation and stock tracking ensure streamlined inventory management.

Sales and Inventory Tracking
Monthly Product Statistics: A breakdown of the number of products added each month, with tracking of product sales and returns.
Order Details: Sellers can view and manage orders for their products, including order status, payment confirmation, and shipping tracking.
Revenue Insights: Monthly revenue tracking allows sellers to monitor their sales performance and adjust their strategies accordingly.
