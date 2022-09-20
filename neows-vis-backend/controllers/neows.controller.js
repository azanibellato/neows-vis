const Neows = require("../models/neows.model");

NeowsController = {
  getWeek : function(req, res){
    Neows.getWeekData((err, data)=>{
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
