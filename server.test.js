const request = require('supertest');
const app = require('./server');

describe('Verdancy Storyworks Server', () => {
  describe('GET /', () => {
    it('should return 200 and serve index.html', async () => {
      const res = await request(app).get('/');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/html/);
    });
  });

  describe('GET /index.html', () => {
    it('should return 200 and serve index.html', async () => {
      const res = await request(app).get('/index.html');
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/html/);
    });
  });

  describe('GET /robots.txt', () => {
    it('should return 200 and serve robots.txt', async () => {
      const res = await request(app).get('/robots.txt');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /sitemap.xml', () => {
    it('should return 200 and serve sitemap.xml', async () => {
      const res = await request(app).get('/sitemap.xml');
      expect(res.status).toBe(200);
    });
  });

  describe('Security headers', () => {
    it('should include security headers from helmet', async () => {
      const res = await request(app).get('/');
      expect(res.headers['x-content-type-options']).toBe('nosniff');
      expect(res.headers['x-frame-options']).toBe('SAMEORIGIN');
    });
  });

  describe('404 handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const res = await request(app).get('/non-existent-page');
      expect(res.status).toBe(404);
      expect(res.text).toContain('404');
      expect(res.text).toContain('Page Not Found');
    });
  });

  describe('Private files protection', () => {
    it('should not expose server.js', async () => {
      const res = await request(app).get('/server.js');
      expect(res.status).toBe(404);
    });

    it('should not expose package.json', async () => {
      const res = await request(app).get('/package.json');
      expect(res.status).toBe(404);
    });

    it('should not expose .env', async () => {
      const res = await request(app).get('/.env');
      expect(res.status).toBe(404);
    });
  });
});
