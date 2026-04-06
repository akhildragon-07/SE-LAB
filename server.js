const http = require('http');
const fs = require('fs');
const path = require('path');

const DB_DIR = __dirname;
const USERS_FILE = path.join(DB_DIR, 'users.json');
const PACKAGES_FILE = path.join(DB_DIR, 'packages.json');
const BOOKINGS_FILE = path.join(DB_DIR, 'bookings.json');
const REQUESTS_FILE = path.join(DB_DIR, 'custom_requests.json');

// Helpers for Mock DB
const readJSON = (file) => JSON.parse(fs.readFileSync(file, 'utf8') || '[]');
const writeJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// Initialize DBs if not exist
[USERS_FILE, PACKAGES_FILE, BOOKINGS_FILE, REQUESTS_FILE].forEach(file => {
    if (!fs.existsSync(file)) writeJSON(file, []);
});

const parseBody = (req) => new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
        try { resolve(JSON.parse(body || '{}')); }
        catch (e) { reject(e); }
    });
});

const sendJSON = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => {
    // CORS Header
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // --- API ENDPOINTS --- //

    if (req.url === '/api/signup' && req.method === 'POST') {
        try {
            const data = await parseBody(req);
            const { name, email, password, role } = data;
            
            let errors = [];
            if (!name || name.trim().length < 3) errors.push("Name must be at least 3 characters.");
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!email) errors.push("Email is required.");
            else if (!emailRegex.test(email)) errors.push("Invalid email format.");
            if (!password || password.length < 6) errors.push("Password must be at least 6 characters.");
            if (!role) errors.push("Role selection is required.");

            if (errors.length > 0) return sendJSON(res, 400, { success: false, errors });

            const users = readJSON(USERS_FILE);
            if (users.find(u => u.email === email)) {
                return sendJSON(res, 400, { success: false, errors: ["Email already exists."] });
            }

            users.push({ name, email, password, role });
            writeJSON(USERS_FILE, users);

            return sendJSON(res, 201, { success: true, message: "User registered successfully!" });
        } catch (err) {
            return sendJSON(res, 400, { success: false, errors: ["Invalid JSON"] });
        }
    }

    if (req.url === '/api/login' && req.method === 'POST') {
        const data = await parseBody(req);
        const { email, password } = data;

        const users = readJSON(USERS_FILE);
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return sendJSON(res, 401, { success: false, message: "Invalid email or password." });
        }
        
        return sendJSON(res, 200, { 
            success: true, 
            user: { name: user.name, email: user.email, role: user.role } 
        });
    }

    if (req.url === '/api/packages' && req.method === 'GET') {
        return sendJSON(res, 200, readJSON(PACKAGES_FILE));
    }

    if (req.url === '/api/book' && req.method === 'POST') {
        const data = await parseBody(req);
        const bookings = readJSON(BOOKINGS_FILE);
        bookings.push({ ...data, id: Date.now(), status: "Confirmed", date: new Date().toISOString() });
        writeJSON(BOOKINGS_FILE, bookings);
        return sendJSON(res, 201, { success: true, message: "Package Booked Successfully" });
    }

    if (req.url === '/api/custom-request' && req.method === 'POST') {
        const data = await parseBody(req);
        const requests = readJSON(REQUESTS_FILE);
        requests.push({ ...data, id: Date.now(), status: "Pending", date: new Date().toISOString() });
        writeJSON(REQUESTS_FILE, requests);
        return sendJSON(res, 201, { success: true, message: "Custom request submitted." });
    }

    if (req.url === '/api/agent/requests' && req.method === 'GET') {
        return sendJSON(res, 200, readJSON(REQUESTS_FILE));
    }

    if (req.url === '/api/agent/approve' && req.method === 'POST') {
        const { id } = await parseBody(req);
        const requests = readJSON(REQUESTS_FILE);
        const index = requests.findIndex(r => r.id === id);
        if (index > -1) {
            requests[index].status = "Approved";
            writeJSON(REQUESTS_FILE, requests);
            return sendJSON(res, 200, { success: true, message: "Request approved." });
        }
        return sendJSON(res, 404, { success: false, message: "Request not found." });
    }

    if (req.url === '/api/scientist/analytics' && req.method === 'GET') {
        return sendJSON(res, 200, {
            demographics: { labels: ['Gen Z', 'Millennials', 'Gen X', 'Boomers'], data: [25, 45, 20, 10] },
            footfalls: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], data: [1200, 1900, 3000, 5000, 4200] },
            budget_ranges: { labels: ['Budget', 'Standard', 'Premium'], data: [60, 30, 10] }
        });
    }

    // --- STATIC FILES SERVER --- //
    
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = filePath.split('?')[0]; // Strip queries

    // Quick map for Dashboard APIs if hitting HTML endpoints (fallback to prevent 404s on refresh)
    if (filePath.startsWith('/api')) {
        return sendJSON(res, 404, { success: false, message: "API route not found." });
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
        '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpg',
        '.gif': 'image/gif', '.svg': 'image/svg+xml'
    };

    const absolutePath = path.join(__dirname, filePath);
    fs.readFile(absolutePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File Not Found');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': mimeTypes[extname] || 'application/octet-stream' });
            res.end(content, 'utf-8');
        }
    });

});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
