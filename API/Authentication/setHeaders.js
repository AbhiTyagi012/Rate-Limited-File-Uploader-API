function setHeaders(req, res, next) {
    res.setHeader(
      "Content-Security-Policy",
      "default-src: 'self'; object-src: 'none'; script-src: 'self'; style-src: 'self'; img-src: 'self'; connect-src: 'self'; media-src: 'none'; frames-src: 'none'; sandbox allow-same-origin; child-src: 'none'; form-action: 'self'; base-uri: 'self'"
    );
    res.setHeader("Access-Control-Allow-Origin", "");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Strict-Transport-Security", "max-age=315360000; includeSubDomains; preload");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-Download-Options", "noopen");
    next();
  }
  
  module.exports = {
    setHeaders,
  };
  