{\rtf1\ansi\ansicpg1252\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export default async function handler(req, res) \{\
  res.setHeader('Access-Control-Allow-Origin', '*');\
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');\
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');\
  if (req.method === 'OPTIONS') return res.status(200).end();\
  if (req.method !== 'POST') return res.status(405).json(\{ error: 'Method not allowed' \});\
  const apiKey = req.headers['x-api-key'] || process.env.ANTHROPIC_API_KEY;\
  if (!apiKey) return res.status(401).json(\{ error: 'No API key' \});\
  try \{\
    const response = await fetch('https://api.anthropic.com/v1/messages', \{\
      method: 'POST',\
      headers: \{ 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' \},\
      body: JSON.stringify(req.body),\
    \});\
    const data = await response.json();\
    return res.status(response.status).json(data);\
  \} catch (error) \{\
    return res.status(500).json(\{ error: error.message \});\
  \}\
\}}