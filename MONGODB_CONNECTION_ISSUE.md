# MongoDB Connection Issue

## Error
```
Error connecting to MongoDB: querySrv EREFUSED _mongodb._tcp.hackwithmumbai.kreimvp.mongodb.net
```

## Possible Causes

1. **Incorrect Cluster Name**: The cluster name might be wrong
2. **Network/Firewall Issue**: Your network might be blocking MongoDB Atlas
3. **IP Whitelist**: Your IP address might not be whitelisted in MongoDB Atlas
4. **Cluster Not Running**: The MongoDB cluster might be paused or deleted

## How to Fix

### 1. Verify MongoDB Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Login to your account
3. Click on "Connect" for your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Update `server/.env` with the correct connection string

The format should be:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net
```

### 2. Check IP Whitelist

1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Either:
   - Add your current IP
   - Or add `0.0.0.0/0` to allow all IPs (not recommended for production)

### 3. Verify Cluster is Running

1. In MongoDB Atlas dashboard
2. Check if your cluster shows as "Active"
3. If paused, click "Resume"

### 4. Test Connection

Once you have the correct connection string, test it:

```bash
cd server
npm run create-admin
```

If this works, the connection is good and you can restart the server:

```bash
npm run dev
```

## Current Connection String

The current connection string in `.env` is:
```
mongodb+srv://sahilkhan09k:sahilkhan007@hackwithmumbai.kreimvp.mongodb.net
```

Please verify:
- Username: `sahilkhan09k`
- Password: `sahilkhan007`
- Cluster: `hackwithmumbai.kreimvp.mongodb.net`

## Alternative: Use Local MongoDB

If you can't connect to Atlas, you can use a local MongoDB instance:

1. Install MongoDB locally
2. Update `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017
   ```
3. Restart the server

## Need Help?

Check the MongoDB Atlas documentation:
https://www.mongodb.com/docs/atlas/troubleshoot-connection/
