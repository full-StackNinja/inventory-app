#! /usr/bin/env node

console.log(
  'This script populates some categories and items to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/database_?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/Category");
const Item = require("./models/Item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const category = new Category({
    name,
    description,
  });
  await category.save();
  categories[index] = category;
  console.log(`category ${category.name} added!`);
}

async function itemCreate(index, name, category, stock, price, description) {
  const item = new Item({
    name,
    category,
    stock,
    price,
    description,
  });

  await item.save();
  items[index] = item;
  console.log(`Item ${item.name} added!`);
}

async function createCategories() {
  console.log("Adding categories...");
  await Promise.all([
    categoryCreate(
      0,
      "Women's Clothing",
      "Women's clothing encompasses a wide range of apparel designed specifically for women, including tops, dresses, skirts, pants, outerwear, and more. Styles and designs vary widely to accommodate different preferences, occasions, and body types."
    ),
    categoryCreate(
      1,
      "Men's Clothing",
      "Men's clothing refers to garments designed for men, including shirts, t-shirts, trousers, jeans, suits, jackets, and more. Men's clothing often emphasizes functionality, comfort, and style, catering to various occasions from casual to formal settings."
    ),
    categoryCreate(
      2,
      "Kids' Clothing",
      "Children's clothing includes apparel designed for infants, toddlers, and older children. This category covers a diverse range of clothing items, including onesies, rompers, dresses, shirts, pants, pajamas, outerwear, and accessories tailored to the unique needs and preferences of children."
    ),
    categoryCreate(
      3,
      "Shoes & Footwear",
      "Shoes and footwear encompass various types of footwear designed to protect and support the feet while providing comfort and style. This category includes shoes for different purposes, such as athletic shoes, casual shoes, formal shoes, boots, sandals, slippers, and more, catering to different age groups and preferences."
    ),
  ]);
}

async function createItems() {
  console.log("Adding items...");
  await Promise.all([
    itemCreate(
      0,
      "Floral Print Maxi Dress",
      categories[0],
      50,
      44.99,
      "A flowy maxi dress featuring a vibrant floral print, perfect for summer outings and beach vacations."
    ),
    itemCreate(
      1,
      "High-Waisted Skinny Jeans",
      categories[0],
      100,
      39.95,
      "Classic high-waisted skinny jeans with stretch denim for comfort and a flattering fit."
    ),
    itemCreate(
      2,
      "Striped Cotton T-shirt",
      categories[0],
      15,
      22.95,
      "A casual striped cotton t-shirt with a relaxed fit, ideal for everyday wear."
    ),
    itemCreate(
      3,
      "Slim Fit Dress Shirt",
      categories[1],
      39,
      18.99,
      "A sleek and modern slim fit dress shirt crafted from breathable cotton fabric, suitable for formal occasions and business meetings."
    ),
    itemCreate(
      4,
      "Classic Fit Chinos",
      categories[1],
      111,
      49.85,
      "Timeless classic fit chinos made from durable cotton twill fabric, perfect for both casual and semi-formal settings."
    ),
    itemCreate(
      5,
      "Unicorn Graphic T-Shirt",
      categories[2],
      33,
      33.0,
      "A colorful and whimsical graphic t-shirt featuring a unicorn design, sure to delight young ones. Made from soft cotton material for comfort."
    ),
    itemCreate(
      6,
      "Denim Overalls",
      categories[2],
      44,
      44.59,
      "Classic denim overalls with adjustable shoulder straps and multiple pockets. Perfect for playtime and casual outings."
    ),
    itemCreate(
      7,
      "Light-Up Sneakers",
      categories[3],
      111,
      55.99,
      "Vibrant light-up sneakers for kids featuring LED lights in the soles that illuminate with every step. Made with breathable mesh and synthetic materials for comfort and durability."
    ),
    itemCreate(
      8,
      "Velcro Strap Sandals",
      categories[3],
      48,
      77.89,
      "Easy-to-wear velcro strap sandals for kids, perfect for summer adventures and beach outings. Made with water-resistant materials and cushioned footbeds for comfort."
    ),
  ]);
}
