# Fix MongoDB DNS Resolution Issue

## The Problem
Your system cannot resolve MongoDB Atlas SRV records due to DNS issues.

## Quick Fix Options

### Option 1: Change DNS Servers (Recommended)

1. Open **Network Settings**
2. Go to **Network and Internet** → **Change adapter options**
3. Right-click your network connection → **Properties**
4. Select **Internet Protocol Version 4 (TCP/IPv4)** → **Properties**
5. Select **Use the following DNS server addresses**:
   - Preferred DNS: `8.8.8.8` (Google)
   - Alternate DNS: `8.8.4.4` (Google)
6. Click **OK** and restart your network connection

### Option 2: Use Standard Connection String

Instead of SRV format (`mongodb+srv://`), use standard format.

In MongoDB Atlas:
1. Click **Connect** → **Drivers**
2. Look for the standard connection string (starts with `mongodb://`)
3. It will look like:
   ```
   mongodb://cluster0-shard-00-00.rtags.mongodb.net:27017,cluster0-shard-00-01.rtags.mongodb.net:27017,cluster0-shard-00-02.rtags.mongodb.net:27017/?replicaSet=atlas-xxxxx-shard-0
   ```

Update `server/.env`:
```
MONGODB_URI=mongodb://Gaurav5327:Gaurav%402005@cluster0-shard-00-00.rtags.mongodb.net:27017,cluster0-shard-00-01.rtags.mongodb.net:27017,cluster0-shard-00-02.rtags.mongodb.net:27017/?replicaSet=atlas-xxxxx-shard-0&ssl=true&authSource=admin
```

### Option 3: Disable VPN/Proxy

If you're using a VPN or proxy:
1. Temporarily disable it
2. Try connecting again
3. If it works, configure VPN to allow MongoDB Atlas

### Option 4: Use Mobile Hotspot

As a temporary solution:
1. Enable mobile hotspot on your phone
2. Connect your computer to it
3. Try running the server

## After Applying Fix

1. Flush DNS cache:
   ```cmd
   ipconfig /flushdns
   ```

2. Restart the server:
   ```cmd
   cd server
   npm run dev
   ```

## Still Not Working?

Contact your network administrator or ISP - they might be blocking MongoDB Atlas connections.
