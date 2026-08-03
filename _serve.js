const http = require('http');
const fs = require('fs');
const path = require('path');
const root = process.argv[2] || process.cwd();
const port = Number(process.argv[3] || 8123);
const types = {'.html':'text/html; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.css':'text/css','.js':'application/javascript','.svg':'image/svg+xml','.ico':'image/x-icon'};
http.createServer((req,res)=>{
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let p = path.normalize(path.join(root, urlPath === '/' ? 'index.html' : urlPath));
  if(!p.startsWith(root)){ res.writeHead(403); return res.end(); }
  fs.readFile(p,(err,data)=>{
    if(err){ res.writeHead(404); return res.end('not found'); }
    res.writeHead(200,{'Content-Type': types[path.extname(p).toLowerCase()] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(port, ()=>console.log('serving', root, 'at', port));
