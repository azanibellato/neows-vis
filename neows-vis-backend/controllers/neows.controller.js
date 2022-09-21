const { getWeekBrightest } = require("../models/neows.model");
const Neows = require("../models/neows.model");

NeowsController = {
  getDay : function(req, res){
    Neows.getDayData(req.params.day, (err, data)=>{
      if (err)
            res.status(500).send({
            message: err.message || "Some error occurred while retrieving the data."
        });
        else {
            res.send(data);
        }
    });
  },

  getWeekBrightest : function(req, res){
    Neows.getWeekBrightest((err, data)=>{
      if (err)
            res.status(500).send({
            message: err.message || "Some error occurred while retrieving the data."
        });
        else {
            res.send(data);
        }
    });
  }
  
};

module.exports = NeowsController;
