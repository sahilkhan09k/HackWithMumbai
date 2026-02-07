# Fix MongoDB Connection Issue

## Current Error
```
querySrv EREFUSED _mongodb._tcp.cluster0.rtags.mongodb.net
```

This is a **DNS resolution error**. Your computer cannot resolve the MongoDB Atlas hostname.

## Solutions (Try in order)

### Solution 1: Whitelist Your IP in MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Select your project
3. Click "Network Access" in the left sidebar
4. Click "Add IP Address"
5. Click "Allow Access from Anywhere" (adds 0.0.0.0/0)
6. Click "Confirm"
7. Wait 1-2 minutes for changes to propagate

### Solution 2: Check Your Firewall/Antivirus

Your firewall or antivirus might be blocking MongoDB connections:

1. Temporarily disable your firewall/antivirus
2. Try connecting again
3. If it works, add an exception for Node.js

### Solution 3: Use Google DNS

Your ISP's DNS might be blocking MongoDB:

**Windows:**
1. Open Control Panel → Network and Internet → Network Connections
2. Right-click your network adapter → Properties
3. Select "Internet Protocol Version 4 (TCP/IPv4)" → Properties
4. Select "Use the following DNS server addresses"
5. Preferred DNS: `8.8.8.8`
6. Alternate DNS: `8.8.4.4`
7. Click OK and restart your computer

### Solution 4: Try VPN

If your network/ISP is blocking MongoDB Atlas:
1. Connect to a VPN
2. Try running the server again

### Solution 5: Use Standard Connection String

Instead of SRV format, try the standard format:

1. In MongoDB Atlas, click "Connect"
2. Choose "Connect your application"
3. Select "2.2.12 or later" driver version
4. Copy the connection string (should start with `mongodb://` not `mongodb+srv://`)
5. Update `server/.env` with the new string

## After Fixing Connection

Once the connection works, create the admin user:

```bash
cd server
npm run create-admin
```

Then start the servers:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

## Admin Login Credentials

Once everything is running:
- URL: http://localhost:5173/login
- Email: admin@civic.com
- Password: admin123

## Still Not Working?

If none of the above works, you can:

1. **Use Local MongoDB:**
   - Install MongoDB locally
   - Update `.env`: `MONGODB_URI=mongodb://localhost:27017`
   
2. **Contact your network admin** if you're on a corporate/school network

3. **Check MongoDB Atlas Status:** https://status.mongodb.com/
