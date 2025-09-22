// ==UserScript==
// @name         DegenIdle Market Scraper - Item a Item (Corrigido) + Botão Start
// @namespace    http://tampermonkey.net/
// @version      4.3
// @description  Lê o mercado item por item, envia alertas ao Telegram se encontrar ofertas vantajosas. Agora com botão para iniciar.
// @author       DarkDragon + GPT
// @match        https://degenidle.com/market
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const BOT_TOKEN = '8212301892:AAFGNTLNXhzo04DPfpd-VbgUdKUru6KxN44';
    const CHAT_ID = '-1003066433402';

    // Sua lista ITEMS_TO_WATCH (com variantes, XP e valores) deve estar aqui
const ITEMS_TO_WATCH = [
  {
    "Name": "Copper Bodyarmor",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 },
      { "Rarity": "Legendary", "Value": 576, "XP": 288 },
      { "Rarity": "Mythic", "Value": 628, "XP": 312 }
    ]
  },
  {
    "Name": "Copper Boots",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 },
      { "Rarity": "Legendary", "Value": 576, "XP": 288 },
      { "Rarity": "Mythic", "Value": 628, "XP": 312 }
    ]
  },
  {
    "Name": "Copper Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 },
      { "Rarity": "Legendary", "Value": 576, "XP": 288 },
      { "Rarity": "Mythic", "Value": 628, "XP": 312 }
    ]
  },
  {
    "Name": "Copper Helmet",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 },
      { "Rarity": "Legendary", "Value": 576, "XP": 288 },
      { "Rarity": "Mythic", "Value": 628, "XP": 312 }
    ]
  },
  {
    "Name": "Copper Sword",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 }
    ]
  },
  {
    "Name": "Copper Shield",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 }
    ]
  },
  {
    "Name": "Leather Bodyarmor",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 },
      { "Rarity": "Legendary", "Value": 576, "XP": 288 },
      { "Rarity": "Mythic", "Value": 628, "XP": 312 }
    ]
  },
  {
    "Name": "Leather Boots",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 },
      { "Rarity": "Legendary", "Value": 576, "XP": 288 },
      { "Rarity": "Mythic", "Value": 628, "XP": 312 }
    ]
  },
  {
    "Name": "Leather Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 },
      { "Rarity": "Legendary", "Value": 576, "XP": 288 },
      { "Rarity": "Mythic", "Value": 628, "XP": 312 }
    ]
  },
  {
    "Name": "Leather Hat",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 },
      { "Rarity": "Legendary", "Value": 576, "XP": 288 },
      { "Rarity": "Mythic", "Value": 628, "XP": 312 }
    ]
  },
  {
    "Name": "Leather Bow",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 }
    ]
  },
  {
    "Name": "Wool Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 },
      { "Rarity": "Legendary", "Value": 576, "XP": 288 },
      { "Rarity": "Mythic", "Value": 628, "XP": 312 }
    ]
  },
  {
    "Name": "Wool Hat",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 },
      { "Rarity": "Legendary", "Value": 576, "XP": 288 },
      { "Rarity": "Mythic", "Value": 628, "XP": 312 }
    ]
  },
  {
    "Name": "Wool Robe",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 },
      { "Rarity": "Legendary", "Value": 576, "XP": 288 },
      { "Rarity": "Mythic", "Value": 628, "XP": 312 }
    ]
  },
  {
    "Name": "Wool Shoes",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 },
      { "Rarity": "Legendary", "Value": 576, "XP": 288 },
      { "Rarity": "Mythic", "Value": 628, "XP": 312 }
    ]
  },
  {
    "Name": "Wool Staff",
    "Variants": [
      { "Rarity": "Common", "Value": 480, "XP": 240 },
      { "Rarity": "Uncommon", "Value": 504, "XP": 252 },
      { "Rarity": "Rare", "Value": 528, "XP": 264 },
      { "Rarity": "Epic", "Value": 552, "XP": 276 }
    ]
  },
  {
    "Name": "Iron Bodyarmor",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 },
      { "Rarity": "Epic", "Value": 736, "XP": 368 }
    ]
  },
  {
    "Name": "Iron Boots",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 },
      { "Rarity": "Epic", "Value": 736, "XP": 368 }
    ]
  },
  {
    "Name": "Iron Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 },
      { "Rarity": "Epic", "Value": 736, "XP": 368 }
    ]
  },
  {
    "Name": "Iron Helmet",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 },
      { "Rarity": "Epic", "Value": 736, "XP": 368 }
    ]
  },
  {
    "Name": "Iron Sword",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 }
    ]
  },
  {
    "Name": "Iron Shield",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 }
    ]
  },
  {
    "Name": "Thick Leather Bodyarmor",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 },
      { "Rarity": "Epic", "Value": 736, "XP": 368 }
    ]
  },
  {
    "Name": "Thick Leather Boots",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 },
      { "Rarity": "Epic", "Value": 736, "XP": 368 }
    ]
  },
  {
    "Name": "Thick Leather Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 },
      { "Rarity": "Epic", "Value": 736, "XP": 368 }
    ]
  },
  {
    "Name": "Thick Leather Hat",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 },
      { "Rarity": "Epic", "Value": 736, "XP": 368 }
    ]
  },
  {
    "Name": "Thick Leather Bow",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 }
    ]
  },
  {
    "Name": "Silk Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 },
      { "Rarity": "Epic", "Value": 736, "XP": 368 }
    ]
  },
  {
    "Name": "Silk Hat",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 },
      { "Rarity": "Epic", "Value": 736, "XP": 368 }
    ]
  },
  {
    "Name": "Silk Robe",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 },
      { "Rarity": "Epic", "Value": 736, "XP": 368 }
    ]
  },
  {
    "Name": "Silk Shoes",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 },
      { "Rarity": "Epic", "Value": 736, "XP": 368 }
    ]
  },
  {
    "Name": "Silk Staff",
    "Variants": [
      { "Rarity": "Common", "Value": 640, "XP": 320 },
      { "Rarity": "Uncommon", "Value": 672, "XP": 336 },
      { "Rarity": "Rare", "Value": 704, "XP": 352 }
    ]
  },
  {
    "Name": "Silver Bodyarmor",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 },
      { "Rarity": "Uncommon", "Value": 1008, "XP": 504 },
      { "Rarity": "Rare", "Value": 1056, "XP": 528 }
    ]
  },
  {
    "Name": "Silver Boots",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 },
      { "Rarity": "Uncommon", "Value": 1008, "XP": 504 },
      { "Rarity": "Rare", "Value": 1056, "XP": 528 }
    ]
  },
  {
    "Name": "Silver Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 },
      { "Rarity": "Uncommon", "Value": 1008, "XP": 504 },
      { "Rarity": "Rare", "Value": 1056, "XP": 528 }
    ]
  },
  {
    "Name": "Silver Helmet",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 },
      { "Rarity": "Uncommon", "Value": 1008, "XP": 504 },
      { "Rarity": "Rare", "Value": 1056, "XP": 528 }
    ]
  },
  {
    "Name": "Silver Sword",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 }
    ]
  },
  {
    "Name": "Silver Shield",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 }
    ]
  },
  {
    "Name": "Sturdy Leather Bodyarmor",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 },
      { "Rarity": "Uncommon", "Value": 1008, "XP": 504 },
      { "Rarity": "Rare", "Value": 1056, "XP": 528 }
    ]
  },
  {
    "Name": "Sturdy Leather Boots",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 },
      { "Rarity": "Uncommon", "Value": 1008, "XP": 504 },
      { "Rarity": "Rare", "Value": 1056, "XP": 528 }
    ]
  },
  {
    "Name": "Sturdy Leather Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 },
      { "Rarity": "Uncommon", "Value": 1008, "XP": 504 },
      { "Rarity": "Rare", "Value": 1056, "XP": 528 }
    ]
  },
  {
    "Name": "Sturdy Leather Hat",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 },
      { "Rarity": "Uncommon", "Value": 1008, "XP": 504 },
      { "Rarity": "Rare", "Value": 1056, "XP": 528 }
    ]
  },
  {
    "Name": "Sturdy Leather Bow",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 }
    ]
  },
  {
    "Name": "Moonlit Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 },
      { "Rarity": "Uncommon", "Value": 1008, "XP": 504 },
      { "Rarity": "Rare", "Value": 1056, "XP": 528 }
    ]
  },
  {
    "Name": "Moonlit Hat",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 },
      { "Rarity": "Uncommon", "Value": 1008, "XP": 504 },
      { "Rarity": "Rare", "Value": 1056, "XP": 528 }
    ]
  },
  {
    "Name": "Moonlit Robe",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 },
      { "Rarity": "Uncommon", "Value": 1008, "XP": 504 },
      { "Rarity": "Rare", "Value": 1056, "XP": 528 }
    ]
  },
  {
    "Name": "Moonlit Shoes",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 },
      { "Rarity": "Uncommon", "Value": 1008, "XP": 504 },
      { "Rarity": "Rare", "Value": 1056, "XP": 528 }
    ]
  },
  {
    "Name": "Moonlit Staff",
    "Variants": [
      { "Rarity": "Common", "Value": 960, "XP": 480 }
    ]
  },
  {
    "Name": "Gold Bodyarmor",
    "Variants": [
      { "Rarity": "Common", "Value": 1280, "XP": 640 },
      { "Rarity": "Uncommon", "Value": 1344, "XP": 672 },
      { "Rarity": "Rare", "Value": 1459, "XP": 704 }
    ]
  },
  {
    "Name": "Gold Boots",
    "Variants": [
      { "Rarity": "Common", "Value": 1280, "XP": 640 },
      { "Rarity": "Uncommon", "Value": 1344, "XP": 672 },
      { "Rarity": "Rare", "Value": 1459, "XP": 704 }
    ]
  },
  {
    "Name": "Gold Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 1280, "XP": 640 },
      { "Rarity": "Uncommon", "Value": 1344, "XP": 672 },
      { "Rarity": "Rare", "Value": 1459, "XP": 704 }
    ]
  },
  {
    "Name": "Gold Helmet",
    "Variants": [
      { "Rarity": "Common", "Value": 1280, "XP": 640 },
      { "Rarity": "Uncommon", "Value": 1344, "XP": 672 },
      { "Rarity": "Rare", "Value": 1459, "XP": 704 }
    ]
  },
  {
    "Name": "Heavy Leather Bodyarmor",
    "Variants": [
      { "Rarity": "Common", "Value": 1280, "XP": 640 },
      { "Rarity": "Uncommon", "Value": 1344, "XP": 672 },
      { "Rarity": "Rare", "Value": 1459, "XP": 704 }
    ]
  },
  {
    "Name": "Heavy Leather Boots",
    "Variants": [
      { "Rarity": "Common", "Value": 1280, "XP": 640 },
      { "Rarity": "Uncommon", "Value": 1344, "XP": 672 },
      { "Rarity": "Rare", "Value": 1459, "XP": 704 }
    ]
  },
  {
    "Name": "Heavy Leather Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 1280, "XP": 640 },
      { "Rarity": "Uncommon", "Value": 1344, "XP": 672 },
      { "Rarity": "Rare", "Value": 1459, "XP": 704 }
    ]
  },
  {
    "Name": "Heavy Leather Hat",
    "Variants": [
      { "Rarity": "Common", "Value": 1280, "XP": 640 },
      { "Rarity": "Uncommon", "Value": 1344, "XP": 672 },
      { "Rarity": "Rare", "Value": 1459, "XP": 704 }
    ]
  },
  {
    "Name": "Etheric Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 1280, "XP": 640 },
      { "Rarity": "Uncommon", "Value": 1344, "XP": 672 },
      { "Rarity": "Rare", "Value": 1459, "XP": 704 }
    ]
  },
  {
    "Name": "Etheric Hat",
    "Variants": [
      { "Rarity": "Common", "Value": 1280, "XP": 640 },
      { "Rarity": "Uncommon", "Value": 1344, "XP": 672 },
      { "Rarity": "Rare", "Value": 1459, "XP": 704 }
    ]
  },
  {
    "Name": "Etheric Robe",
    "Variants": [
      { "Rarity": "Common", "Value": 1280, "XP": 640 },
      { "Rarity": "Uncommon", "Value": 1344, "XP": 672 },
      { "Rarity": "Rare", "Value": 1459, "XP": 704 }
    ]
  },
  {
    "Name": "Etheric Shoes",
    "Variants": [
      { "Rarity": "Common", "Value": 1280, "XP": 640 },
      { "Rarity": "Uncommon", "Value": 1344, "XP": 672 },
      { "Rarity": "Rare", "Value": 1459, "XP": 704 }
    ]
  },
  {
    "Name": "Platinum Bodyarmor",
    "Variants": [
      { "Rarity": "Common", "Value": 1600, "XP": 800 }
    ]
  },
  {
    "Name": "Platinum Boots",
    "Variants": [
      { "Rarity": "Common", "Value": 1600, "XP": 800 }
    ]
  },
  {
    "Name": "Platinum Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 1600, "XP": 800 }
    ]
  },
  {
    "Name": "Platinum Helmet",
    "Variants": [
      { "Rarity": "Common", "Value": 1600, "XP": 800 }
    ]
  },
  {
    "Name": "Tough Leather Bodyarmor",
    "Variants": [
      { "Rarity": "Common", "Value": 1600, "XP": 800 }
    ]
  },
  {
    "Name": "Tough Leather Boots",
    "Variants": [
      { "Rarity": "Common", "Value": 1600, "XP": 800 }
    ]
  },
  {
    "Name": "Tough Leather Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 1600, "XP": 800 }
    ]
  },
  {
    "Name": "Tough Leather Hat",
    "Variants": [
      { "Rarity": "Common", "Value": 1600, "XP": 800 }
    ]
  },
  {
    "Name": "Shadow Gloves",
    "Variants": [
      { "Rarity": "Common", "Value": 1600, "XP": 800 }
    ]
  },
  {
    "Name": "Shadow Hat",
    "Variants": [
      { "Rarity": "Common", "Value": 1600, "XP": 800 }
    ]
  },
  {
    "Name": "Shadow Robe",
    "Variants": [
      { "Rarity": "Common", "Value": 1600, "XP": 800 }
    ]
  },
  {
    "Name": "Shadow Shoes",
    "Variants": [
      { "Rarity": "Common", "Value": 1600, "XP": 800 }
    ]
  },
  { "Name": "Leather", "Variants": [{ "Rarity": "Common", "Value": 30, "XP": 15 }] },
  { "Name": "Wool Cloth", "Variants": [{ "Rarity": "Common", "Value": 30, "XP": 15 }] },
  { "Name": "Copper Bar", "Variants": [{ "Rarity": "Common", "Value": 30, "XP": 15 }] },

  { "Name": "Thick Leather", "Variants": [{ "Rarity": "Common", "Value": 40, "XP": 20 }] },
  { "Name": "Silk Cloth", "Variants": [{ "Rarity": "Common", "Value": 40, "XP": 20 }] },
  { "Name": "Iron Bar", "Variants": [{ "Rarity": "Common", "Value": 40, "XP": 20 }] },

  { "Name": "Sturdy Leather", "Variants": [{ "Rarity": "Common", "Value": 60, "XP": 30 }] },
  { "Name": "Moonlit Cloth", "Variants": [{ "Rarity": "Common", "Value": 60, "XP": 30 }] },
  { "Name": "Silver Bar", "Variants": [{ "Rarity": "Common", "Value": 60, "XP": 30 }] },

  { "Name": "Heavy Leather", "Variants": [{ "Rarity": "Common", "Value": 80, "XP": 40 }] },
  { "Name": "Etheric Cloth", "Variants": [{ "Rarity": "Common", "Value": 80, "XP": 40 }] },
  { "Name": "Gold Bar", "Variants": [{ "Rarity": "Common", "Value": 80, "XP": 40 }] },

  { "Name": "Tough Leather", "Variants": [{ "Rarity": "Common", "Value": 100, "XP": 50 }] },
  { "Name": "Shadow Cloth", "Variants": [{ "Rarity": "Common", "Value": 100, "XP": 50 }] },
  { "Name": "Platinum Bar", "Variants": [{ "Rarity": "Common", "Value": 100, "XP": 50 }] },

  { "Name": "Reinforced Leather", "Variants": [{ "Rarity": "Common", "Value": 120, "XP": 60 }] },
  { "Name": "Mystweave Cloth", "Variants": [{ "Rarity": "Common", "Value": 120, "XP": 60 }] },
  { "Name": "Mithril Bar", "Variants": [{ "Rarity": "Common", "Value": 120, "XP": 60 }] },

  { "Name": "Shadowhide Leather", "Variants": [{ "Rarity": "Common", "Value": 140, "XP": 70 }] },
  { "Name": "Arcane Cloth", "Variants": [{ "Rarity": "Common", "Value": 140, "XP": 70 }] },
  { "Name": "Adamantite Bar", "Variants": [{ "Rarity": "Common", "Value": 140, "XP": 70 }] },

  { "Name": "Dragonhide Leather", "Variants": [{ "Rarity": "Common", "Value": 160, "XP": 80 }] },
  { "Name": "Aether Cloth", "Variants": [{ "Rarity": "Common", "Value": 160, "XP": 80 }] },
  { "Name": "Eternium Bar", "Variants": [{ "Rarity": "Common", "Value": 160, "XP": 80 }] },

  { "Name": "Abyssal Leather", "Variants": [{ "Rarity": "Common", "Value": 180, "XP": 90 }] },
  { "Name": "Astral Cloth", "Variants": [{ "Rarity": "Common", "Value": 180, "XP": 90 }] },
  { "Name": "Nyxium Bar", "Variants": [{ "Rarity": "Common", "Value": 180, "XP": 90 }] },

  { "Name": "Wool Bowstring", "Variants": [{ "Rarity": "Common", "Value": 240, "XP": 120 }] },
  { "Name": "Copper Gemstone", "Variants": [{ "Rarity": "Common", "Value": 240, "XP": 120 }] },
  { "Name": "Leather Handle", "Variants": [{ "Rarity": "Common", "Value": 240, "XP": 120 }] },

  { "Name": "Silk Bowstring", "Variants": [{ "Rarity": "Common", "Value": 320, "XP": 160 }] },
  { "Name": "Iron Gemstone", "Variants": [{ "Rarity": "Common", "Value": 320, "XP": 160 }] },
  { "Name": "Thick Leather Handle", "Variants": [{ "Rarity": "Common", "Value": 320, "XP": 160 }] },

  { "Name": "Moonlit Bowstring", "Variants": [{ "Rarity": "Common", "Value": 480, "XP": 240 }] },
  { "Name": "Silver Gemstone", "Variants": [{ "Rarity": "Common", "Value": 480, "XP": 240 }] },
  { "Name": "Sturdy Leather Handle", "Variants": [{ "Rarity": "Common", "Value": 480, "XP": 240 }] },

  { "Name": "Etheric Bowstring", "Variants": [{ "Rarity": "Common", "Value": 640, "XP": 320 }] },
  { "Name": "Gold Gemstone", "Variants": [{ "Rarity": "Common", "Value": 640, "XP": 320 }] },
  { "Name": "Heavy Leather Handle", "Variants": [{ "Rarity": "Common", "Value": 640, "XP": 320 }] },

  { "Name": "Shadow Bowstring", "Variants": [{ "Rarity": "Common", "Value": 800, "XP": 400 }] },
  { "Name": "Platinum Gemstone", "Variants": [{ "Rarity": "Common", "Value": 800, "XP": 400 }] },
  { "Name": "Tough Leather Handle", "Variants": [{ "Rarity": "Common", "Value": 800, "XP": 400 }] }

];    const processedItems = new Set();

    function sendTelegramMessage(message) {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const params = {
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        };

        GM_xmlhttpRequest({
            method: 'POST',
            url: url,
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(params),
            onload: (res) => console.log("✅ Mensagem enviada:", res.responseText),
            onerror: (res) => console.error("❌ Erro ao enviar mensagem:", res.responseText)
        });
    }

    function convertPrice(text) {
        if (!text) return 0;
        const cleaned = text.toLowerCase().replace(/[^\d.km]/g, '');
        const num = parseFloat(cleaned.replace(/[km]/, ''));
        return text.includes('m') ? num * 1_000_000 : text.includes('k') ? num * 1_000 : num;
    }

    function waitForElement(selector, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const timer = setInterval(() => {
                const el = document.querySelector(selector);
                if (el) {
                    clearInterval(timer);
                    resolve(el);
                } else if (Date.now() - start > timeout) {
                    clearInterval(timer);
                    reject(new Error(`Elemento "${selector}" não encontrado após ${timeout / 1000}s.`));
                }
            }, 300);
        });
    }

    async function closeItemDetails() {
        console.log("[DEBUG] Tentando clicar no botão de fechar...");
        try {
            const closeBtn = await waitForElement("button.mb-4 > span", 5000);
            closeBtn.parentElement.click();
            console.log("[DEBUG] Clique no botão de fechar (sem verificação).");
        } catch (err) {
            console.warn("[DEBUG] Falha ao fechar janela:", err.message);
        }
    }

    async function processSingleItem(el) {
        console.log("[DEBUG] processSingleItem chamado para um elemento", el);

        const name = el.querySelector('h3.font-medium')?.innerText.trim();
        if (!name) return;

        if (processedItems.has(name)) {
            console.log(`[DEBUG] Item ${name} já processado`);
            return;
        }
        processedItems.add(name);

        console.log("[DEBUG] Nome do item:", name);

        const item = ITEMS_TO_WATCH.find(i => i.Name === name);
        if (!item) {
            console.log("[DEBUG] Item não está na lista ITEMS_TO_WATCH:", name);
            return;
        }

        el.click();
        console.log("[DEBUG] Clique no item realizado");

        try {
            await waitForElement('div.bg-\\[\\#1E2330\\]\\/40', 5000);
            const container = await waitForElement('div.space-y-3', 5000);
            const orders = container.querySelectorAll('button.grid');

            if (!orders.length) {
                console.log("[DEBUG] Nenhuma ordem de venda");
            } else {
                let foundOffers = [];

                for (const order of orders) {
                    const priceEl = order.querySelector('.text-yellow-400.font-mono');
                    const qtyEl = order.querySelector('span.text-gray-300');
                    const rarityEl = order.querySelector('.text-right.text-sm');

                    const price = priceEl ? convertPrice(priceEl.textContent.trim()) : 0;
                    const quantity = qtyEl ? parseInt(qtyEl.textContent.replace('x', '').trim()) : 1;
                    const rarity = rarityEl ? rarityEl.textContent.trim() : 'Desconhecida';

                    console.log("[DEBUG] Order:", { price, quantity, rarity });

                    const variant = item.Variants.find(v => v.Rarity.toLowerCase() === rarity.toLowerCase());
                    if (!variant) continue;

                    if (price <= variant.Value) {
                        const xp = variant.XP || 0;
                        const custo = xp > 0 ? (price / xp).toFixed(2) : 'N/A';

                        foundOffers.push(`💰Valor: ${price} - ${rarity} - ${quantity}\n✨XP: ${xp}\n💰Custo ${custo} G/XP`);
                    }
                }

                if (foundOffers.length > 0) {
                    const message = `⚠️ Item encontrado ⚠️\n\n` +
                                    `❗ Item: ${item.Name}\n\n` +
                                    foundOffers.join('\n\n');

                    sendTelegramMessage(message);
                } else {
                    console.log("[DEBUG] Nenhuma oferta vantajosa para o item", item.Name);
                }
            }
        } catch (err) {
            console.error("[DEBUG] Erro ao processar detalhes do item:", err);
        } finally {
            await closeItemDetails();
        }
    }

    async function processNextItem() {
        console.log("[DEBUG] processNextItem chamado");

        while (true) {
            const items = Array.from(document.querySelectorAll('.bg-\\[\\#252B3B\\]\\/30'))
                .filter(el => {
                    const name = el.querySelector('h3.font-medium')?.innerText.trim();
                    return name && !processedItems.has(name);
                });

            if (items.length === 0) {
                console.log("[DEBUG] Todos os itens foram processados.");
                break;
            }

            const el = items[0];
            await processSingleItem(el);

            // Pausa 1s antes de processar próximo item
            await new Promise(r => setTimeout(r, 1000));
        }
    }

    // Criar botão fixo no canto inferior direito para iniciar o script
    function createStartButton() {
        const btn = document.createElement('button');
        btn.innerText = 'Iniciar Scraper';
        btn.style.position = 'fixed';
        btn.style.bottom = '20px';
        btn.style.right = '20px';
        btn.style.zIndex = 9999;
        btn.style.padding = '10px 20px';
        btn.style.backgroundColor = '#4CAF50';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '5px';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '16px';
        btn.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';

        btn.addEventListener('click', () => {
            if (btn.disabled) return;
            btn.disabled = true;
            btn.innerText = 'Rodando...';
            console.log("[DEBUG] Script iniciado pelo botão.");
            processNextItem().then(() => {
                btn.disabled = false;
                btn.innerText = 'Iniciar Scraper';
                console.log("[DEBUG] Processamento finalizado.");
            });
        });

        document.body.appendChild(btn);
    }

    // Esperar DOM carregado e criar botão
    window.addEventListener('load', () => {
        createStartButton();
    });

})();
