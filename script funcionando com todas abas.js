// ==UserScript==
// @name         DegenIdle Market Scraper - Telegram
// @namespace    http://tampermonkey.net/
// @version      4.5
// @description  Lê o mercado item por item (todas as páginas), envia alertas ao Telegram se encontrar ofertas vantajosas. Agora com paginação ajustada para abas invisíveis (ex: 6 só aparece se 5 estiver ativa).
// @author       DarkDragon + Lucashmg
// @match        https://degenidle.com/market
// @grant        GM_xmlhttpRequest
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const BOT_TOKEN = '8212301892:AAFGNTLNXhzo04DPfpd-VbgUdKUru6KxN44';
    const CHAT_ID = '-1003066433402';

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
  // Itens base
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

  // Itens para armas
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
  { "Name": "Tough Leather Handle", "Variants": [{ "Rarity": "Common", "Value": 800, "XP": 400 }] },

  //craft

  {
    "Name": "Copper Axe",
        "Variants": [
            { "Rarity": "Common", "Value": 6000, "XP": 3000 },
            { "Rarity": "Uncommon", "Value": 6300, "XP": 3150 },
            { "Rarity": "Rare", "Value": 6930, "XP": 3465 },
            { "Rarity": "Epic", "Value": 7970, "XP": 3985 },
            { "Rarity": "Legendary", "Value": 9563, "XP": 4782 },
            { "Rarity": "Mythic", "Value": 12432, "XP": 6216 }
        ]
},
{
    "Name": "Copper Fishing Rod",
        "Variants": [
            { "Rarity": "Common", "Value": 6000, "XP": 3000 },
            { "Rarity": "Uncommon", "Value": 6300, "XP": 3150 },
            { "Rarity": "Rare", "Value": 6930, "XP": 3465 },
            { "Rarity": "Epic", "Value": 7970, "XP": 3985 },
            { "Rarity": "Legendary", "Value": 9563, "XP": 4782 },
            { "Rarity": "Mythic", "Value": 12432, "XP": 6216 }
        ]
},
{
    "Name": "Copper Pickaxe",
        "Variants": [
            { "Rarity": "Common", "Value": 6000, "XP": 3000 },
            { "Rarity": "Uncommon", "Value": 6300, "XP": 3150 },
            { "Rarity": "Rare", "Value": 6930, "XP": 3465 },
            { "Rarity": "Epic", "Value": 7970, "XP": 3985 },
            { "Rarity": "Legendary", "Value": 9563, "XP": 4782 },
            { "Rarity": "Mythic", "Value": 12432, "XP": 6216 }
        ]
},
{
    "Name": "Copper Trap",
        "Variants": [
            { "Rarity": "Common", "Value": 6000, "XP": 3000 },
            { "Rarity": "Uncommon", "Value": 6300, "XP": 3150 },
            { "Rarity": "Rare", "Value": 6930, "XP": 3465 },
            { "Rarity": "Epic", "Value": 7970, "XP": 3985 },
            { "Rarity": "Legendary", "Value": 9563, "XP": 4782 },
            { "Rarity": "Mythic", "Value": 12432, "XP": 6216 }
        ]
},
{
    "Name": "Leather Pouch",
        "Variants": [
            { "Rarity": "Common", "Value": 6000, "XP": 3000 },
            { "Rarity": "Uncommon", "Value": 6300, "XP": 3150 },
            { "Rarity": "Rare", "Value": 6930, "XP": 3465 },
            { "Rarity": "Epic", "Value": 7970, "XP": 3985 },
            { "Rarity": "Legendary", "Value": 9563, "XP": 4782 },
            { "Rarity": "Mythic", "Value": 12432, "XP": 6216 }
        ]
},
{
    "Name": "Wool Basket",
        "Variants": [
            { "Rarity": "Common", "Value": 6000, "XP": 3000 },
            { "Rarity": "Uncommon", "Value": 6300, "XP": 3150 },
            { "Rarity": "Rare", "Value": 6930, "XP": 3465 },
            { "Rarity": "Epic", "Value": 7970, "XP": 3985 },
            { "Rarity": "Legendary", "Value": 9563, "XP": 4782 },
            { "Rarity": "Mythic", "Value": 12432, "XP": 6216 }
        ]
},
{
    "Name": "Iron Axe",
        "Variants": [
            { "Rarity": "Common", "Value": 8000, "XP": 4000 },
            { "Rarity": "Uncommon", "Value": 8400, "XP": 4200 },
            { "Rarity": "Rare", "Value": 9240, "XP": 4620 },
            { "Rarity": "Epic", "Value": 10626, "XP": 5313 },
            { "Rarity": "Legendary", "Value": 12751, "XP": 6313 },
            { "Rarity": "Mythic", "Value": 16577, "XP": 8288 }
        ]
},
{
    "Name": "Iron Fishing Rod",
        "Variants": [
            { "Rarity": "Common", "Value": 8000, "XP": 4000 },
            { "Rarity": "Uncommon", "Value": 8400, "XP": 4200 },
            { "Rarity": "Rare", "Value": 9240, "XP": 4620 },
            { "Rarity": "Epic", "Value": 10626, "XP": 5313 },
            { "Rarity": "Legendary", "Value": 12751, "XP": 6313 },
            { "Rarity": "Mythic", "Value": 16577, "XP": 8288 }
        ]
},
{
    "Name": "Iron Pickaxe",
        "Variants": [
            { "Rarity": "Common", "Value": 8000, "XP": 4000 },
            { "Rarity": "Uncommon", "Value": 8400, "XP": 4200 },
            { "Rarity": "Rare", "Value": 9240, "XP": 4620 },
            { "Rarity": "Epic", "Value": 10626, "XP": 5313 },
            { "Rarity": "Legendary", "Value": 12751, "XP": 6313 },
            { "Rarity": "Mythic", "Value": 16577, "XP": 8288 }
        ]
},
{
    "Name": "Iron Trap",
        "Variants": [
            { "Rarity": "Common", "Value": 8000, "XP": 4000 },
            { "Rarity": "Uncommon", "Value": 8400, "XP": 4200 },
            { "Rarity": "Rare", "Value": 9240, "XP": 4620 },
            { "Rarity": "Epic", "Value": 10626, "XP": 5313 },
            { "Rarity": "Legendary", "Value": 12751, "XP": 6313 },
            { "Rarity": "Mythic", "Value": 16577, "XP": 8288 }
        ]
},
{
    "Name": "Thick Leather Pouch",
        "Variants": [
            { "Rarity": "Common", "Value": 8000, "XP": 4000 },
            { "Rarity": "Uncommon", "Value": 8400, "XP": 4200 },
            { "Rarity": "Rare", "Value": 9240, "XP": 4620 },
            { "Rarity": "Epic", "Value": 10626, "XP": 5313 },
            { "Rarity": "Legendary", "Value": 12751, "XP": 6313 },
            { "Rarity": "Mythic", "Value": 16577, "XP": 8288 }
        ]
},
{
    "Name": "Silk Basket",
        "Variants": [
            { "Rarity": "Common", "Value": 8000, "XP": 4000 },
            { "Rarity": "Uncommon", "Value": 8400, "XP": 4200 },
            { "Rarity": "Rare", "Value": 9240, "XP": 4620 },
            { "Rarity": "Epic", "Value": 10626, "XP": 5313 },
            { "Rarity": "Legendary", "Value": 12751, "XP": 6313 },
            { "Rarity": "Mythic", "Value": 16577, "XP": 8288 }
        ]
},
{
    "Name": "Silver Axe",
        "Variants": [
            { "Rarity": "Common", "Value": 12000, "XP": 6000 },
            { "Rarity": "Uncommon", "Value": 12600, "XP": 6300 },
            { "Rarity": "Rare", "Value": 13860, "XP": 6930 },
            { "Rarity": "Epic", "Value": 15939, "XP": 7970 },
            { "Rarity": "Legendary", "Value": 19127, "XP": 9563 },
            { "Rarity": "Mythic", "Value": 24865, "XP": 12432 }
        ]
},
{
    "Name": "Silver Fishing Rod",
        "Variants": [
            { "Rarity": "Common", "Value": 12000, "XP": 6000 },
            { "Rarity": "Uncommon", "Value": 12600, "XP": 6300 },
            { "Rarity": "Rare", "Value": 13860, "XP": 6930 },
            { "Rarity": "Epic", "Value": 15939, "XP": 7970 },
            { "Rarity": "Legendary", "Value": 19127, "XP": 9563 },
            { "Rarity": "Mythic", "Value": 24865, "XP": 12432 }
        ]
},
{
    "Name": "Silver Pickaxe",
        "Variants": [
            { "Rarity": "Common", "Value": 12000, "XP": 6000 },
            { "Rarity": "Uncommon", "Value": 12600, "XP": 6300 },
            { "Rarity": "Rare", "Value": 13860, "XP": 6930 },
            { "Rarity": "Epic", "Value": 15939, "XP": 7970 },
            { "Rarity": "Legendary", "Value": 19127, "XP": 9563 },
            { "Rarity": "Mythic", "Value": 24865, "XP": 12432 }
        ]
},
{
    "Name": "Silver Trap",
        "Variants": [
            { "Rarity": "Common", "Value": 12000, "XP": 6000 },
            { "Rarity": "Uncommon", "Value": 12600, "XP": 6300 },
            { "Rarity": "Rare", "Value": 13860, "XP": 6930 },
            { "Rarity": "Epic", "Value": 15939, "XP": 7970 },
            { "Rarity": "Legendary", "Value": 19127, "XP": 9563 },
            { "Rarity": "Mythic", "Value": 24865, "XP": 12432 }
        ]
},
{
    "Name": "Sturdy Leather Pouch",
        "Variants": [
            { "Rarity": "Common", "Value": 12000, "XP": 6000 },
            { "Rarity": "Uncommon", "Value": 12600, "XP": 6300 },
            { "Rarity": "Rare", "Value": 13860, "XP": 6930 },
            { "Rarity": "Epic", "Value": 15939, "XP": 7970 },
            { "Rarity": "Legendary", "Value": 19127, "XP": 9563 },
            { "Rarity": "Mythic", "Value": 24865, "XP": 12432 }
        ]
},
{
    "Name": "Moonlit Basket",
        "Variants": [
            { "Rarity": "Common", "Value": 12000, "XP": 6000 },
            { "Rarity": "Uncommon", "Value": 12600, "XP": 6300 },
            { "Rarity": "Rare", "Value": 13860, "XP": 6930 },
            { "Rarity": "Epic", "Value": 15939, "XP": 7970 },
            { "Rarity": "Legendary", "Value": 19127, "XP": 9563 },
            { "Rarity": "Mythic", "Value": 24865, "XP": 12432 }
        ]
},
{
    "Name": "Gold Axe",
        "Variants": [
            { "Rarity": "Common", "Value": 16000, "XP": 8000 },
            { "Rarity": "Uncommon", "Value": 16800, "XP": 8400 },
            { "Rarity": "Rare", "Value": 18480, "XP": 9240 },
            { "Rarity": "Epic", "Value": 21252, "XP": 10626 },
            { "Rarity": "Legendary", "Value": 25502, "XP": 12751 },
            { "Rarity": "Mythic", "Value": 22153, "XP": 16577 }
        ]
},
{
    "Name": "Gold Fishing Rod",
        "Variants": [
            { "Rarity": "Common", "Value": 16000, "XP": 8000 },
            { "Rarity": "Uncommon", "Value": 16800, "XP": 8400 },
            { "Rarity": "Rare", "Value": 18480, "XP": 9240 },
            { "Rarity": "Epic", "Value": 21252, "XP": 10626 },
            { "Rarity": "Legendary", "Value": 25502, "XP": 12751 },
            { "Rarity": "Mythic", "Value": 22153, "XP": 16577 }
        ]
},
{
    "Name": "Gold Pickaxe",
        "Variants": [
            { "Rarity": "Common", "Value": 16000, "XP": 8000 },
            { "Rarity": "Uncommon", "Value": 16800, "XP": 8400 },
            { "Rarity": "Rare", "Value": 18480, "XP": 9240 },
            { "Rarity": "Epic", "Value": 21252, "XP": 10626 },
            { "Rarity": "Legendary", "Value": 25502, "XP": 12751 },
            { "Rarity": "Mythic", "Value": 22153, "XP": 16577 }
        ]
},
{
    "Name": "Gold Trap",
        "Variants": [
            { "Rarity": "Common", "Value": 16000, "XP": 8000 },
            { "Rarity": "Uncommon", "Value": 16800, "XP": 8400 },
            { "Rarity": "Rare", "Value": 18480, "XP": 9240 },
            { "Rarity": "Epic", "Value": 21252, "XP": 10626 },
            { "Rarity": "Legendary", "Value": 25502, "XP": 12751 },
            { "Rarity": "Mythic", "Value": 22153, "XP": 16577 }
        ]
},
{
    "Name": "Heavy Leather Pouch",
        "Variants": [
            { "Rarity": "Common", "Value": 16000, "XP": 8000 },
            { "Rarity": "Uncommon", "Value": 16800, "XP": 8400 },
            { "Rarity": "Rare", "Value": 18480, "XP": 9240 },
            { "Rarity": "Epic", "Value": 21252, "XP": 10626 },
            { "Rarity": "Legendary", "Value": 25502, "XP": 12751 },
            { "Rarity": "Mythic", "Value": 22153, "XP": 16577 }
        ]
},
{
    "Name": "Etheric Basket",
        "Variants": [
            { "Rarity": "Common", "Value": 16000, "XP": 8000 },
            { "Rarity": "Uncommon", "Value": 16800, "XP": 8400 },
            { "Rarity": "Rare", "Value": 18480, "XP": 9240 },
            { "Rarity": "Epic", "Value": 21252, "XP": 10626 },
            { "Rarity": "Legendary", "Value": 25502, "XP": 12751 },
            { "Rarity": "Mythic", "Value": 22153, "XP": 16577 }
        ]
},
{
    "Name": "Platinum Amulet",
        "Variants": [
            { "Rarity": "Common", "Value": 1600, "XP": 800 },
            { "Rarity": "Uncommon", "Value": 1680, "XP": 840 }
        ]
},
{
    "Name": "Platinum Axe",
        "Variants": [
            { "Rarity": "Common", "Value": 20000, "XP": 10000 },
            { "Rarity": "Uncommon", "Value": 21000, "XP": 10500 },
            { "Rarity": "Rare", "Value": 23100, "XP": 11550 },
            { "Rarity": "Epic", "Value": 26565, "XP": 13283 },
            { "Rarity": "Legendary", "Value": 31878, "XP": 15939 },
            { "Rarity": "Mythic", "Value": 41441, "XP": 20721 }
        ]
},
{
    "Name": "Platinum Fishing Rod",
        "Variants": [
            { "Rarity": "Common", "Value": 20000, "XP": 10000 },
            { "Rarity": "Uncommon", "Value": 21000, "XP": 10500 },
            { "Rarity": "Rare", "Value": 23100, "XP": 11550 },
            { "Rarity": "Epic", "Value": 26565, "XP": 13283 },
            { "Rarity": "Legendary", "Value": 31878, "XP": 15939 },
            { "Rarity": "Mythic", "Value": 41441, "XP": 20721 }
        ]
},
{
    "Name": "Platinum Pickaxe",
        "Variants": [
            { "Rarity": "Common", "Value": 20000, "XP": 10000 },
            { "Rarity": "Uncommon", "Value": 21000, "XP": 10500 },
            { "Rarity": "Rare", "Value": 23100, "XP": 11550 },
            { "Rarity": "Epic", "Value": 26565, "XP": 13283 },
            { "Rarity": "Legendary", "Value": 31878, "XP": 15939 },
            { "Rarity": "Mythic", "Value": 41441, "XP": 20721 }
        ]
},
{
    "Name": "Platinum Trap",
        "Variants": [
            { "Rarity": "Common", "Value": 20000, "XP": 10000 },
            { "Rarity": "Uncommon", "Value": 21000, "XP": 10500 },
            { "Rarity": "Rare", "Value": 23100, "XP": 11550 },
            { "Rarity": "Epic", "Value": 26565, "XP": 13283 },
            { "Rarity": "Legendary", "Value": 31878, "XP": 15939 },
            { "Rarity": "Mythic", "Value": 41441, "XP": 20721 }
        ]
},
{
    "Name": "Tough Leather Pouch",
        "Variants": [
            { "Rarity": "Common", "Value": 20000, "XP": 10000 },
            { "Rarity": "Uncommon", "Value": 21000, "XP": 10500 },
            { "Rarity": "Rare", "Value": 23100, "XP": 11550 },
            { "Rarity": "Epic", "Value": 26565, "XP": 13283 },
            { "Rarity": "Legendary", "Value": 31878, "XP": 15939 },
            { "Rarity": "Mythic", "Value": 41441, "XP": 20721 }
        ]
},
{
    "Name": "Shadow Basket",
        "Variants": [
            { "Rarity": "Common", "Value": 20000, "XP": 10000 },
            { "Rarity": "Uncommon", "Value": 21000, "XP": 10500 },
            { "Rarity": "Rare", "Value": 23100, "XP": 11550 },
            { "Rarity": "Epic", "Value": 26565, "XP": 13283 },
            { "Rarity": "Legendary", "Value": 31878, "XP": 15939 },
            { "Rarity": "Mythic", "Value": 41441, "XP": 20721 }
        ]
},
{
    "Name": "Platinum Ring",
        "Variants": [
            { "Rarity": "Common", "Value": 1600, "XP": 800 },
            { "Rarity": "Uncommon", "Value": 1680, "XP": 840 }
        ]
},
{
    "Name": "Mithril Axe",
        "Variants": [
            { "Rarity": "Common", "Value": 24000, "XP": 12000 },
            { "Rarity": "Uncommon", "Value": 25200, "XP": 12600 },
            { "Rarity": "Rare", "Value": 27720, "XP": 13860 },
            { "Rarity": "Epic", "Value": 31878, "XP": 15939 },
            { "Rarity": "Legendary", "Value": 38254, "XP": 19127 },
            { "Rarity": "Mythic", "Value": 49730, "XP": 24865 }
        ]
},
{
    "Name": "Mithril Fishing Rod",
        "Variants": [
            { "Rarity": "Common", "Value": 24000, "XP": 12000 },
            { "Rarity": "Uncommon", "Value": 25200, "XP": 12600 },
            { "Rarity": "Rare", "Value": 27720, "XP": 13860 },
            { "Rarity": "Epic", "Value": 31878, "XP": 15939 },
            { "Rarity": "Legendary", "Value": 38254, "XP": 19127 },
            { "Rarity": "Mythic", "Value": 49730, "XP": 24865 }
        ]
},
{
    "Name": "Mithril Pickaxe",
        "Variants": [
            { "Rarity": "Common", "Value": 24000, "XP": 12000 },
            { "Rarity": "Uncommon", "Value": 25200, "XP": 12600 },
            { "Rarity": "Rare", "Value": 27720, "XP": 13860 },
            { "Rarity": "Epic", "Value": 31878, "XP": 15939 },
            { "Rarity": "Legendary", "Value": 38254, "XP": 19127 },
            { "Rarity": "Mythic", "Value": 49730, "XP": 24865 }
        ]
},
{
    "Name": "Mithril Trap",
        "Variants": [
            { "Rarity": "Common", "Value": 24000, "XP": 12000 },
            { "Rarity": "Uncommon", "Value": 25200, "XP": 12600 },
            { "Rarity": "Rare", "Value": 27720, "XP": 13860 },
            { "Rarity": "Epic", "Value": 31878, "XP": 15939 },
            { "Rarity": "Legendary", "Value": 38254, "XP": 19127 },
            { "Rarity": "Mythic", "Value": 49730, "XP": 24865 }
        ]
},
{
    "Name": "Reinforced Leather Pouch",
        "Variants": [
            { "Rarity": "Common", "Value": 24000, "XP": 12000 },
            { "Rarity": "Uncommon", "Value": 25200, "XP": 12600 },
            { "Rarity": "Rare", "Value": 27720, "XP": 13860 },
            { "Rarity": "Epic", "Value": 31878, "XP": 15939 },
            { "Rarity": "Legendary", "Value": 38254, "XP": 19127 },
            { "Rarity": "Mythic", "Value": 49730, "XP": 24865 }
        ]
},
{
    "Name": "Celestial Basket",
        "Variants": [
            { "Rarity": "Common", "Value": 24000, "XP": 12000 },
            { "Rarity": "Uncommon", "Value": 25200, "XP": 12600 },
            { "Rarity": "Rare", "Value": 27720, "XP": 13860 },
            { "Rarity": "Epic", "Value": 31878, "XP": 15939 },
            { "Rarity": "Legendary", "Value": 38254, "XP": 19127 },
            { "Rarity": "Mythic", "Value": 49730, "XP": 24865 }
        ]
},
{
    "Name": "Adamantite Axe",
        "Variants": [
            { "Rarity": "Common", "Value": 28000, "XP": 14000 },
            { "Rarity": "Uncommon", "Value": 29400, "XP": 14700 },
            { "Rarity": "Rare", "Value": 32340, "XP": 16170 },
            { "Rarity": "Epic", "Value": 37191, "XP": 18596 },
            { "Rarity": "Legendary", "Value": 44629, "XP": 22315 },
            { "Rarity": "Mythic", "Value": 58018, "XP": 29009 }
        ]
},
{
    "Name": "Adamantite Fishing Rod",
        "Variants": [
           { "Rarity": "Common", "Value": 28000, "XP": 14000 },
            { "Rarity": "Uncommon", "Value": 29400, "XP": 14700 },
            { "Rarity": "Rare", "Value": 32340, "XP": 16170 },
            { "Rarity": "Epic", "Value": 37191, "XP": 18596 },
            { "Rarity": "Legendary", "Value": 44629, "XP": 22315 },
            { "Rarity": "Mythic", "Value": 58018, "XP": 29009 }
        ]
},
{
    "Name": "Adamantite Pickaxe",
        "Variants": [
            { "Rarity": "Common", "Value": 28000, "XP": 14000 },
            { "Rarity": "Uncommon", "Value": 29400, "XP": 14700 },
            { "Rarity": "Rare", "Value": 32340, "XP": 16170 },
            { "Rarity": "Epic", "Value": 37191, "XP": 18596 },
            { "Rarity": "Legendary", "Value": 44629, "XP": 22315 },
            { "Rarity": "Mythic", "Value": 58018, "XP": 29009 }
        ]
},
{
    "Name": "Adamantite Trap",
        "Variants": [
            { "Rarity": "Common", "Value": 28000, "XP": 14000 },
            { "Rarity": "Uncommon", "Value": 29400, "XP": 14700 },
            { "Rarity": "Rare", "Value": 32340, "XP": 16170 },
            { "Rarity": "Epic", "Value": 37191, "XP": 18596 },
            { "Rarity": "Legendary", "Value": 44629, "XP": 22315 },
            { "Rarity": "Mythic", "Value": 58018, "XP": 29009 }
        ]
},
{
    "Name": "Arcane Basket",
        "Variants": [
            { "Rarity": "Common", "Value": 28000, "XP": 14000 },
            { "Rarity": "Uncommon", "Value": 29400, "XP": 14700 },
            { "Rarity": "Rare", "Value": 32340, "XP": 16170 },
            { "Rarity": "Epic", "Value": 37191, "XP": 18596 },
            { "Rarity": "Legendary", "Value": 44629, "XP": 22315 },
            { "Rarity": "Mythic", "Value": 58018, "XP": 29009 }
        ]
},
{
    "Name": "Shadowhide Pouch",
        "Variants": [
            { "Rarity": "Common", "Value": 28000, "XP": 14000 },
            { "Rarity": "Uncommon", "Value": 29400, "XP": 14700 },
            { "Rarity": "Rare", "Value": 32340, "XP": 16170 },
            { "Rarity": "Epic", "Value": 37191, "XP": 18596 },
            { "Rarity": "Legendary", "Value": 44629, "XP": 22315 },
            { "Rarity": "Mythic", "Value": 58018, "XP": 29009 }
        ]
},
{
    "Name": "Eternium Axe",
        "Variants": [
            { "Rarity": "Common", "Value": 32000, "XP": 16000 },
            { "Rarity": "Uncommon", "Value": 33600, "XP": 16800 },
            { "Rarity": "Rare", "Value": 36960, "XP": 18480 },
            { "Rarity": "Epic", "Value": 42504, "XP": 21252 },
            { "Rarity": "Legendary", "Value": 51005, "XP": 25502 },
            { "Rarity": "Mythic", "Value": 66306, "XP": 33153 }
        ]
},
{
    "Name": "Eternium Fishing Rod",
        "Variants": [
            { "Rarity": "Common", "Value": 32000, "XP": 16000 },
            { "Rarity": "Uncommon", "Value": 33600, "XP": 16800 },
            { "Rarity": "Rare", "Value": 36960, "XP": 18480 },
            { "Rarity": "Epic", "Value": 42504, "XP": 21252 },
            { "Rarity": "Legendary", "Value": 51005, "XP": 25502 },
            { "Rarity": "Mythic", "Value": 66306, "XP": 33153 }
        ]
},
{
    "Name": "Eternium Pickaxe",
        "Variants": [
            { "Rarity": "Common", "Value": 32000, "XP": 16000 },
            { "Rarity": "Uncommon", "Value": 33600, "XP": 16800 },
            { "Rarity": "Rare", "Value": 36960, "XP": 18480 },
            { "Rarity": "Epic", "Value": 42504, "XP": 21252 },
            { "Rarity": "Legendary", "Value": 51005, "XP": 25502 },
            { "Rarity": "Mythic", "Value": 66306, "XP": 33153 }
        ]
},
{
    "Name": "Eternium Trap",
        "Variants": [
            { "Rarity": "Common", "Value": 32000, "XP": 16000 },
            { "Rarity": "Uncommon", "Value": 33600, "XP": 16800 },
            { "Rarity": "Rare", "Value": 36960, "XP": 18480 },
            { "Rarity": "Epic", "Value": 42504, "XP": 21252 },
            { "Rarity": "Legendary", "Value": 51005, "XP": 25502 },
            { "Rarity": "Mythic", "Value": 66306, "XP": 33153 }
        ]
},
{
    "Name": "Dragonhide Pouch",
        "Variants": [
            { "Rarity": "Common", "Value": 32000, "XP": 16000 },
            { "Rarity": "Uncommon", "Value": 33600, "XP": 16800 },
            { "Rarity": "Rare", "Value": 36960, "XP": 18480 },
            { "Rarity": "Epic", "Value": 42504, "XP": 21252 },
            { "Rarity": "Legendary", "Value": 51005, "XP": 25502 },
            { "Rarity": "Mythic", "Value": 66306, "XP": 33153 }
        ]
},
{
    "Name": "Aether Basket",
        "Variants": [
            { "Rarity": "Common", "Value": 32000, "XP": 16000 },
            { "Rarity": "Uncommon", "Value": 33600, "XP": 16800 },
            { "Rarity": "Rare", "Value": 36960, "XP": 18480 },
            { "Rarity": "Epic", "Value": 42504, "XP": 21252 },
            { "Rarity": "Legendary", "Value": 51005, "XP": 25502 },
            { "Rarity": "Mythic", "Value": 66306, "XP": 33153 }
        ]
},
{
    "Name": "Nyxium Axe",
        "Variants": [
            { "Rarity": "Common", "Value": 36000, "XP": 18000 },
            { "Rarity": "Uncommon", "Value": 37800, "XP": 18900 },
            { "Rarity": "Rare", "Value": 41580, "XP": 20790 },
            { "Rarity": "Epic", "Value": 47817, "XP": 23909 },
            { "Rarity": "Legendary", "Value": 57380, "XP": 28690 },
            { "Rarity": "Mythic", "Value": 74595, "XP": 37297 }
        ]
},
{
    "Name": "Nyxium Fishing Rod",
        "Variants": [
            { "Rarity": "Common", "Value": 36000, "XP": 18000 },
            { "Rarity": "Uncommon", "Value": 37800, "XP": 18900 },
            { "Rarity": "Rare", "Value": 41580, "XP": 20790 },
            { "Rarity": "Epic", "Value": 47817, "XP": 23909 },
            { "Rarity": "Legendary", "Value": 57380, "XP": 28690 },
            { "Rarity": "Mythic", "Value": 74595, "XP": 37297 }
        ]
},
{
    "Name": "Nyxium Pickaxe",
        "Variants": [
            { "Rarity": "Common", "Value": 36000, "XP": 18000 },
            { "Rarity": "Uncommon", "Value": 37800, "XP": 18900 },
            { "Rarity": "Rare", "Value": 41580, "XP": 20790 },
            { "Rarity": "Epic", "Value": 47817, "XP": 23909 },
            { "Rarity": "Legendary", "Value": 57380, "XP": 28690 },
            { "Rarity": "Mythic", "Value": 74595, "XP": 37297 }
        ]
},
{
    "Name": "Nyxium Trap",
        "Variants": [
            { "Rarity": "Common", "Value": 36000, "XP": 18000 },
            { "Rarity": "Uncommon", "Value": 37800, "XP": 18900 },
            { "Rarity": "Rare", "Value": 41580, "XP": 20790 },
            { "Rarity": "Epic", "Value": 47817, "XP": 23909 },
            { "Rarity": "Legendary", "Value": 57380, "XP": 28690 },
            { "Rarity": "Mythic", "Value": 74595, "XP": 37297 }
        ]
},
{
    "Name": "Abyssal Pouch",
        "Variants": [
            { "Rarity": "Common", "Value": 36000, "XP": 18000 },
            { "Rarity": "Uncommon", "Value": 37800, "XP": 18900 },
            { "Rarity": "Rare", "Value": 41580, "XP": 20790 },
            { "Rarity": "Epic", "Value": 47817, "XP": 23909 },
            { "Rarity": "Legendary", "Value": 57380, "XP": 28690 },
            { "Rarity": "Mythic", "Value": 74595, "XP": 37297 }
        ]
},
{
    "Name": "Astral Basket",
        "Variants": [
            { "Rarity": "Common", "Value": 36000, "XP": 18000 },
            { "Rarity": "Uncommon", "Value": 37800, "XP": 18900 },
            { "Rarity": "Rare", "Value": 41580, "XP": 20790 },
            { "Rarity": "Epic", "Value": 47817, "XP": 23909 },
            { "Rarity": "Legendary", "Value": 57380, "XP": 28690 },
            { "Rarity": "Mythic", "Value": 74595, "XP": 37297 }
        ]
}

];

    const processedItems = new Set();

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
        const num = parseFloat(cleaned.replace(/[km]/, '')) || 0;
        return text.includes('M') ? num * 1_000_000 : text.includes('k') ? num * 1_000 : num;
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
            }, 200);
        });
    }

    // 🔧 Função corrigida para evitar loop infinito
    async function clickPaginationButton(pageNumber) {
        let attempt = 0;

        while (attempt < 3) {
            attempt++;

            // procura o botão da página
            let pagButton = Array.from(document.querySelectorAll('button, a'))
                .find(x => x.innerText && x.innerText.trim() === String(pageNumber));

            if (pagButton) {
                pagButton.click();
                await new Promise(r => setTimeout(r, 800));
                return true;
            }

            // caso especial: página >= 6 (não está visível ainda)
            if (pageNumber >= 6) {
                console.warn(`[PAG] Página ${pageNumber} não visível. Tentando mostrar a anterior (${pageNumber - 1})...`);
                let prevButton = Array.from(document.querySelectorAll('button, a'))
                    .find(x => x.innerText && x.innerText.trim() === String(pageNumber - 1));

                if (prevButton) {
                    prevButton.click();
                    await new Promise(r => setTimeout(r, 800));
                    continue; // tenta de novo procurar a página certa
                }
            }

            // fallback → botão "Next"
            let nextBtn = Array.from(document.querySelectorAll('button, a'))
                .find(x => x.innerText && x.innerText.toLowerCase() === 'next');

            if (nextBtn) {
                nextBtn.click();
                await new Promise(r => setTimeout(r, 800));
                continue; // tenta de novo procurar a página certa
            }

            console.warn(`[PAG] Não achei botão para página ${pageNumber}.`);
            return false;
        }

        return false;
    }

    function parseTotalPages() {
        const el = Array.from(document.querySelectorAll('div, span')).find(x => x.innerText && /Showing\s+\d+\-\d+\s+of\s+\d+\s+items/i.test(x.innerText));
        if (!el) return 1;
        const match = el.innerText.match(/Showing\s+\d+\-\d+\s+of\s+(\d+)\s+items/i);
        if (!match) return 1;
        const total = parseInt(match[1], 10);
        const perPage = Array.from(document.querySelectorAll('.bg-\\[\\#252B3B\\]\\/30')).length || 25;
        return Math.max(1, Math.ceil(total / perPage));
    }

    async function closeItemDetails() {
        try {
            const closeBtn = document.querySelector("button.mb-4 > span");
            if (closeBtn && closeBtn.parentElement) {
                closeBtn.parentElement.click();
                await new Promise(r => setTimeout(r, 400));
            } else {
                const alt = document.querySelector('div.bg-\\[\\#1E2330\\]\\/40 button');
                if (alt) { alt.click(); await new Promise(r => setTimeout(r, 400)); }
            }
        } catch (err) {
            console.warn("[DEBUG] Falha ao fechar janela:", err.message);
        }
    }

    async function processItemElement(el, item) {
        el.click();
        await waitForElement('div.bg-\\[\\#1E2330\\]\\/40', 5000).catch(()=>{});
        try {
            const container = await waitForElement('div.space-y-3', 5000);
            const orders = container.querySelectorAll('button.grid');

            if (!orders.length) {
                console.log("[DEBUG] Nenhuma ordem de venda");
            } else {
                let grouped = new Map();

                for (const order of orders) {
                    const priceEl = order.querySelector('.text-yellow-400.font-mono');
                    const qtyEl = order.querySelector('span.text-gray-300');
                    const rarityEl = order.querySelector('.text-right.text-sm');

                    const price = priceEl ? convertPrice(priceEl.textContent.trim()) : 0;
                    const quantity = qtyEl ? parseInt(qtyEl.textContent.replace('x', '').trim()) : 1;
                    const rarity = rarityEl ? rarityEl.textContent.trim() : 'Desconhecida';

                    const variant = item.Variants.find(v => v.Rarity.toLowerCase() === rarity.toLowerCase());
                    if (!variant) continue;

                    if (price <= variant.Value) {
                        const xp = variant.XP || 0;
                        const key = `${price}_${rarity}`;

                        if (!grouped.has(key)) {
                            grouped.set(key, {
                                price,
                                rarity,
                                quantity: 0,
                                xp
                            });
                        }
                        const entry = grouped.get(key);
                        entry.quantity += quantity;
                    }
                }

                let foundOffers = [];
                for (const entry of grouped.values()) {
                    const custo = entry.xp > 0 ? (entry.price / entry.xp).toFixed(2) : 'N/A';
                    foundOffers.push(`💰Valor: ${entry.price} - ${entry.rarity} - ${entry.quantity}\n✨XP: ${entry.xp}\n💰Custo ${custo} G/XP`);
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

    async function processPage(pageNumber, totalPages) {
        await clickPaginationButton(pageNumber);

        await new Promise(r => setTimeout(r, 300));
        const cards = Array.from(document.querySelectorAll('.bg-\\[\\#252B3B\\]\\/30'));
        const namesOnPage = cards.map(c => c.querySelector('h3.font-medium')?.innerText?.trim()).filter(Boolean);

        for (const name of namesOnPage) {
            if (processedItems.has(name)) continue;

            const item = ITEMS_TO_WATCH.find(i => i.Name === name);
            if (!item) continue;

            const freshCard = Array.from(document.querySelectorAll('.bg-\\[\\#252B3B\\]\\/30')).find(c => {
                const n = c.querySelector('h3.font-medium')?.innerText?.trim();
                return n === name;
            });

            if (!freshCard) {
                console.warn('[WARN] Elemento não encontrado para', name, 'na página', pageNumber);
                continue;
            }

            processedItems.add(name);
            await processItemElement(freshCard, item);

            await clickPaginationButton(pageNumber);
            await new Promise(r => setTimeout(r, 500));
        }
    }

    async function processAllPages() {
        console.log('[PAG] Iniciando varredura de páginas...');
        const totalPages = parseTotalPages();
        console.log('[PAG] Total de páginas estimado:', totalPages);

        for (let p = 1; p <= totalPages; p++) {
            console.log(`[PAG] Processando página ${p}/${totalPages}...`);
            await processPage(p, totalPages);
            await new Promise(r => setTimeout(r, 600));
        }

        console.log('[PAG] Varredura completa.');
    }

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
            processAllPages().then(() => {
                btn.disabled = false;
                btn.innerText = 'Iniciar Scraper';
                console.log("[DEBUG] Processamento finalizado.");
            });
        });

        document.body.appendChild(btn);
    }

    window.addEventListener('load', () => {
        setTimeout(() => createStartButton(), 800);
    });

})();
