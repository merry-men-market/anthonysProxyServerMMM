'use strict';

module.exports = {
  generateRandomStockId
};


function generateRandomStockId(userContext, events, done){
  const id = Math.floor(Math.random() * Math.floor(10000000) + 1);
  userContext.vars.id = id;
  return done();
}