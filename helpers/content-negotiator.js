const xml = require('xml');

const contentNegotiator = (req, res, next) => {
  if (req.accepts('xml') && !req.accepts('json')) {
    res.type('application/xml');
  } else { res.type('application/json'); }

  next();
};

const dataConverter = (req, data) => {
  let convertedData = data;
  if (req.accepts('xml') && !req.accepts('json')) {
    convertedData = xml(data, true);
  } else {
    convertedData = JSON.stringify(data);
  }

  return convertedData;
};

module.exports = {
  contentNegotiator,
  dataConverter,
};
