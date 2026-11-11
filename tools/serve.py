"""Local dev server that disables browser caching, so edits show up on a normal refresh.
Usage: python3 tools/serve.py [port]   (default 8080)"""
import http.server, socketserver, sys

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()

class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    with Server(("", port), NoCacheHandler) as httpd:
        print(f"Serving on http://localhost:{port} (no-cache)")
        httpd.serve_forever()
