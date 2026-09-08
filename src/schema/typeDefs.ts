import { gql } from "apollo-server";

export const typeDefs = gql`
  type MenuItem {
    id: Int!
    name: String!
    description: String
    price: Int!
    image: String
    tag: String
  }

  type Product {
    id: Int!
    name: String!
    description: String
    price: Float!
    image: String
    tag: String
    category: String
    available: Boolean
    stock: Int
  }

  input ProductInput {
    name: String!
    description: String
    price: Float!
    image: String
    tag: String
    category: String
    available: Boolean
    stock: Int
  }

  type Offer {
    id: Int!
    title: String!
    subtitle: String
    description: String
    original: Int
    price: Int!
    badge: String
    image: String
    color: String
    expires: String
  }

  type Location {
    id: Int!
    city: String!
    name: String!
    address: String!
    hours: String
    phone: String
    distance: String
    statusColor: String
  }

  type Category {
    id: Int!
    name: String!
    active: Boolean!
    order: Int
  }

  input CategoryInput {
    name: String!
    active: Boolean
    order: Int
  }

  type CartItem {
    id: Int!
    name: String!
    price: Int!
    qty: Int!
    image: String
  }

  input CartItemInput {
    id: Int!
    name: String!
    price: Int!
    qty: Int!
    image: String
  }

  input CustomerInput {
    name: String!
    surname: String
    phone: String!
    email: String
    address: String
    suburb: String
    city: String
    special: String
  }

  type Customer {
    name: String!
    surname: String
    phone: String!
    email: String
    address: String
    suburb: String
    city: String
    special: String
  }

  type Order {
    id: ID!
    orderNumber: String!
    items: [CartItem!]!
    subtotal: Int!
    deliveryFee: Int!
    total: Int!
    fulfillment: String!
    payment: String!
    customer: Customer!
    status: String!
    createdAt: String!
  }

  type Staff {
    id: ID!
    username: String!
    name: String!
    role: String!
    active: Boolean!
    createdAt: String!
  }

  type Sale {
    id: ID!
    saleNumber: String!
    items: [CartItem!]!
    subtotal: Float!
    discount: Float
    tax: Float
    total: Float!
    payment: String!
    staff: String
    status: String!
    createdAt: String!
  }

  type Query {
    menuItems: [MenuItem!]!
    menuItem(id: Int!): MenuItem
    offers: [Offer!]!
    locations: [Location!]!
    order(orderNumber: String!): Order

    products: [Product!]!
    product(id: Int!): Product
    categories: [Category!]!
    staff: [Staff!]!
    sales(from: String, to: String): [Sale!]!
  }

  type Mutation {
    createOrder(items: [CartItemInput!]!, subtotal: Int!, deliveryFee: Int!, total: Int!, fulfillment: String!, payment: String!, customer: CustomerInput!): Order!

    createProduct(input: ProductInput!): Product!
    updateProduct(id: Int!, input: ProductInput!): Product!
    deleteProduct(id: Int!): Boolean!

    createCategory(input: CategoryInput!): Category!
    updateCategory(id: Int!, input: CategoryInput!): Category!
    deleteCategory(id: Int!): Boolean!

    createStaff(username: String!, name: String!, role: String!): Staff!
    updateStaff(username: String!, name: String, role: String, active: Boolean): Staff!

    createSale(items: [CartItemInput!]!, discount: Float, tax: Float, payment: String!, staff: String): Sale!
  }
`;
