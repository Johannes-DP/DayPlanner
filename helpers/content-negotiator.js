const xml = require('xml-js');

const contentNegotiator = (req, res, next) => {
  if (req.accepts('xml') && !req.accepts('json')) {
    res.type('application/xml');
  } else { res.type('application/json'); }

  next();
};

const dataConverter = (req, data) => {
  let convertedData = data;
  if (req.accepts('xml') && !req.accepts('json')) {
    const options = { compact: true, ignoreComment: true, spaces: 4 };
    convertedData = xml.json2xml(data, options);
  } else {
    convertedData = JSON.stringify(data);
  }

  return convertedData;
};

module.exports = {
  contentNegotiator,
  dataConverter,
};
