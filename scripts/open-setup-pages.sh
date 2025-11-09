#!/bin/bash

echo "🚀 Öffne Supabase Setup-Seiten..."
echo ""

# SQL Editor für Tabelle
echo "1️⃣ Öffne SQL Editor für Datenbank-Schema..."
open "https://app.supabase.com/project/ribcbajrgmmxjidemyvj/sql/new"
echo "   ✅ SQL Editor geöffnet"
echo "   📋 Kopiere SQL aus QUICK_SETUP.md → Schritt 1"
echo ""
sleep 2

# Storage Buckets
echo "2️⃣ Öffne Storage für Bucket-Erstellung..."
open "https://app.supabase.com/project/ribcbajrgmmxjidemyvj/storage/buckets"
echo "   ✅ Storage geöffnet"
echo "   📋 Erstelle Bucket 'uploads' (Public)"
echo ""
sleep 2

# SQL Editor für Storage Policies
echo "3️⃣ Öffne SQL Editor für Storage Policies..."
open "https://app.supabase.com/project/ribcbajrgmmxjidemyvj/sql/new"
echo "   ✅ SQL Editor geöffnet"
echo "   📋 Kopiere SQL aus QUICK_SETUP.md → Schritt 3"
echo ""

echo "═══════════════════════════════════════"
echo "✅ Alle Setup-Seiten geöffnet!"
echo "═══════════════════════════════════════"
echo ""
echo "📖 Folge den Anweisungen in QUICK_SETUP.md"
echo ""
