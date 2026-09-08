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

  type Query {
    menuItems: [MenuItem!]!
    menuItem(id: Int!): MenuItem
    offers: [Offer!]!
    locations: [Location!]!
    order(orderNumber: String!): Order
  }

  type Mutation {
    createOrder(items: [CartItemInput!]!, subtotal: Int!, deliveryFee: Int!, total: Int!, fulfillment: String!, payment: String!, customer: CustomerInput!): Order!
  }
`;
